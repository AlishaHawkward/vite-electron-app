import React, { useEffect } from 'react';

import './style.less';

const Welcome = () => {
  useEffect(() => {
    ipcRenderer.on('reply_hello', (e, ...args) => {
      console.log(e, ...args);
    });
    ipcRenderer.send('say_hello', {
      msg: 'this is a request method!',
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
