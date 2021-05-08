import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const _ipcRenderer = {
  send: (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, ...args)
  },
  on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, callback)
  }
} as const;

export type IpcRenderer = Readonly<typeof _ipcRenderer>;

contextBridge.exposeInMainWorld('ipcRenderer', _ipcRenderer);
