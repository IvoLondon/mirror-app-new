const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  myPing() {
    ipcRenderer.send('ipc-example', 'ping');
  },
  googleAuth() {
    ipcRenderer.invoke('google-auth');
  },
  on(channel, func) {
    const validChannels = ['ipc-example'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  once(channel, func) {
    const validChannels = ['ipc-example'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});
