const { app, BrowserWindow } = require('electron');
const path = require('path');
const registerItemHandlers = require('./ipc/items');
const registerWindowControlHandlers = require('./ipc/window-controls');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));
}

app.whenReady().then(() => {
  createWindow();
  registerItemHandlers();
  registerWindowControlHandlers();
});

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
