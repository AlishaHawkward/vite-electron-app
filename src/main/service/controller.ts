import { IpcMain } from 'electron';

class Controller {
  private ipcMain;

  constructor(ipcMain: IpcMain) {
    this.ipcMain = ipcMain;

    this.assign('say_hello', (event, ...args) => {
      return { msg: 'Hello, react!', args: { ...args } }
    });
  }

  // default assign function, don't edit unless needed
  assign(service: string, reply: (event: Electron.IpcMainEvent, object: object) => any) {
    this.ipcMain.on(service, (event, object, channel) => {
      setTimeout(() => {
        event.reply(service, reply(event, object), channel);
      }, Math.random() * 1000)
    });
  }
}

export default Controller;
