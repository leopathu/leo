const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('leoAPI', {
  register: (data) => ipcRenderer.invoke('register', data),
  login: (data) => ipcRenderer.invoke('login', data),
  forgotPassword: (data) => ipcRenderer.invoke('forgotPassword', data)
});
