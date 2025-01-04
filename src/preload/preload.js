const { contextBridge, ipcRenderer } = require('electron');

// Window controls API
const windowControls = {
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
};

// Items API
const itemsApi = {
  getItems: () => ipcRenderer.invoke('get-items'),
  createItem: (item) => ipcRenderer.invoke('create-item', item),
  updateItem: (item) => ipcRenderer.invoke('update-item', item),
  deleteItem: (id) => ipcRenderer.invoke('delete-item', id),
};

// Expose APIs to renderer process
contextBridge.exposeInMainWorld('electron', {
  ...windowControls,
  ...itemsApi,
});
