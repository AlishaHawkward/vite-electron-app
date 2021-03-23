import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

interface IpcRequestParams {
  service: string;
  data?: object;
  timeout?: number;
}

interface IpcListener {
  (event: IpcRendererEvent, ...args: any[]): void;
}

const api = {
  request: (params: IpcRequestParams) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(params.service, params.data);
      let listener: IpcListener | null = (event: Electron.IpcRendererEvent, object: object) => {
        listener && ipcRenderer.removeListener(params.service, listener);
        listener = null;
        resolve(object);
      };
      listener && ipcRenderer.on(params.service, listener);
      setTimeout(() => {
        if (listener) {
          ipcRenderer.removeListener(params.service, listener);
          listener = null;
          reject(new Error('request timed out!'));
        }
      }, params.timeout || 3000);
    });
  },
} as const;

export type ExposedInMainWorld = Readonly<typeof api>;

contextBridge.exposeInMainWorld('electron', api);
