const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let mainWindow;
const db = new sqlite3.Database('crud.db');

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // Remove default frame
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Window control handlers
ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('close-window', () => {
  mainWindow.close();
});

// CRUD Operations
ipcMain.handle('create-item', async (event, item) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO items (title, description) VALUES (?, ?)', 
      [item.title, item.description], 
      function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
  });
});

ipcMain.handle('get-items', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM items ORDER BY created_at DESC', [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
});

ipcMain.handle('update-item', async (event, item) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE items SET title = ?, description = ? WHERE id = ?',
      [item.title, item.description, item.id],
      (err) => {
        if (err) reject(err);
        resolve(true);
      });
  });
});

ipcMain.handle('delete-item', async (event, id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM items WHERE id = ?', [id], (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
});
