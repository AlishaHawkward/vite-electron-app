import React, { useEffect } from 'react';

import './style.less';

const Welcome = () => {
  useEffect(() => {
    window.electron.request({
      service: 'say_hello',
      data: {
        msg: 'this is a request method!',
      },
      timeout: 3000,
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
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
