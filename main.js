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
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
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
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('close-window', () => {
  mainWindow.close();
});

// CRUD Operations
ipcMain.handle('get-items', () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM items ORDER BY created_at DESC', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

ipcMain.handle('create-item', (event, item) => {
  return new Promise((resolve, reject) => {
    const { title, description } = item;
    db.run(
      'INSERT INTO items (title, description) VALUES (?, ?)',
      [title, description],
      function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, title, description });
      }
    );
  });
});

ipcMain.handle('update-item', (event, item) => {
  return new Promise((resolve, reject) => {
    const { id, title, description } = item;
    db.run(
      'UPDATE items SET title = ?, description = ? WHERE id = ?',
      [title, description, id],
      (err) => {
        if (err) reject(err);
        else resolve({ id, title, description });
      }
    );
  });
});

ipcMain.handle('delete-item', (event, id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM items WHERE id = ?', [id], (err) => {
      if (err) reject(err);
      else resolve(id);
    });
  });
});
