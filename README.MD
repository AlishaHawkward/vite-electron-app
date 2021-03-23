# Vite-Electron-App

Drop webpack and enjoy vite! [中文文档](https://github.com/AlishaHawkward/vite-electron-app/blob/master/READMECN.MD)

> WARNING: This project is not tested, please don't use it in production env!  
> 
> This is an example project that uses vite and electron to build apps. It's developed by vite, esbuild, electron, react and typescript.

## Dependencies

1. Vite 2.1.2
2. ESBuild 0.9.6
3. Electron 12.0.1
4. React 17.0.0
5. Typescript 4.1.2

## Contribute

### 1. First clone this project.
```
git clone https://github.com/AlishaHawkward/vite-electron-app.git
```

### 2. Show your intelligent!
```
Electron service entry: ./src/background.ts
React entry: ./src/main.tsx
```

### 3. Test your app.
```
npm run dev
```

### 4. Build your app.
```
npm run build
```

### 5. Other useful commands.
ESLint: `npm run lint`
Clean dist dir: `npm run clean`

## Communicate with main process

1. Use `window.electron.request()` in your render process.

2. Or customize your ipc in preload.ts.

## What you need to know

1. Main process & Render process use ipcRenderer to communicate.

2. Project author doesn't ensure the stability of the project at moment.

3. You can use and distribute this project anywhere, but you should keep the original README.MD.

4. Enjoy it!
