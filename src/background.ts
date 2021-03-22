import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

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
  console.log('hello, react!');

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('request', (event, obj) => {
  if (obj.type === 'send_msg') {
    event.reply('response', { msg: 'Hello, react!' });
  }
});
