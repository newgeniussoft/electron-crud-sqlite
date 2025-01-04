const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    // CRUD operations
    getItems: () => ipcRenderer.invoke('get-items'),
    createItem: (item) => ipcRenderer.invoke('create-item', item),
    updateItem: (item) => ipcRenderer.invoke('update-item', item),
    deleteItem: (id) => ipcRenderer.invoke('delete-item', id),
});
