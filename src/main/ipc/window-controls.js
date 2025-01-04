const { ipcMain, BrowserWindow } = require('electron');

const registerWindowControlHandlers = () => {
  ipcMain.on('minimize-window', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.minimize();
  });

  ipcMain.on('maximize-window', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (!win) return;
    
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('close-window', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.close();
  });
};

module.exports = registerWindowControlHandlers;
