import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const _ipcRenderer = {
  send: (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, ...args)
  },
  invoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args)
  },
  on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, callback)
  },
  once: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.once(channel, callback)
  }
} as const;

export type IpcRenderer = Readonly<typeof _ipcRenderer>;

contextBridge.exposeInMainWorld('ipcRenderer', _ipcRenderer);
