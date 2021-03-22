import { contextBridge, ipcRenderer } from 'electron';

const api = {
  ipc: {
    request: (...args: any) => ipcRenderer.send('request', ...args),
    response: (cb: Function) => ipcRenderer.on('response', (event, ...args) => cb(...args)),
  },
} as const;

export type ExposedInMainWorld = Readonly<typeof api>;

contextBridge.exposeInMainWorld('electron', api);
