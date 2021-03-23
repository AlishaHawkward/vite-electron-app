import { IpcMain } from 'electron';

class Controller {
  private ipcMain;

  constructor(ipcMain: IpcMain) {
    this.ipcMain = ipcMain;
  }

  assign() {
    this.ipcMain.on('say_hello', (event, ...args) => {
      event.reply('say_hello', { msg: 'Hello, react!', args: { ...args } });
    });
  }
}

export default Controller;
