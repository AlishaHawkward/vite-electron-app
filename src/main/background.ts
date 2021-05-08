import path from 'path';
import { app, BrowserWindow } from 'electron';
import ipcSayHello from './service/sayHello';

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

  ipcSayHello();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
