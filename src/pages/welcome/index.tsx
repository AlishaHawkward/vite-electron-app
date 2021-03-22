import React, { useEffect } from 'react';

import './style.less';

const Welcome = () => {
  useEffect(() => {
    window.electron.ipc.request({
      type: 'send_msg',
      msg: 'Welcome page uses preload.js to communicate with main process!',
    });
    window.electron.ipc.response((data: object) => {
      console.log('Welcome page received main process response!', data);
    });
  }, []);

  return (
    <div className="welcome">
      <h1 className="title">Hello, react!</h1>
      <p>This page is powered by vite, electron and react!</p>
      <p>typescript and esbuild are also used for development!</p>
    </div>
  );
};

export default Welcome;
