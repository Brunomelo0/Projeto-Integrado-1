import { contextBridge, ipcRenderer } from 'electron';

// Exponha APIs seguras para o processo de renderização
contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, callback) => ipcRenderer.on(channel, callback),
});