import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import Controller from './service/controller';

let controller: Controller;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  process.env.ENV === 'production' ? win.loadFile(path.join(__dirname, '../render/index.html')) :
    win.loadURL(`http://localhost:${process.env.PORT}`);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  controller = new Controller(ipcMain);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
