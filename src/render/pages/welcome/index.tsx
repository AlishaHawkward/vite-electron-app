import React, { useEffect, useState, useRef } from 'react';

import './style.less';

const Index = () => {
  const [messageQueue, setMessageQueue] = useState<string[]>([]);

  const messageQueueRef = useRef<string[]>([]);

  useEffect(() => {
    messageQueueRef.current = messageQueue;
  }, [messageQueue]);

  useEffect(() => {
    ipcRenderer.on('reply_hello', (e, ...args) => {
      console.log(e, ...args);
      messageQueueRef.current.push(`MSG_RECEIVED: ${[e, ...args].join(', ')}`);
      setMessageQueue([...messageQueueRef.current]);
    });
    ipcRenderer.send('say_hello', {
      msg: 'this is a request method!',
    });
    setMessageQueue(['MSG_SEND: this is a request method!']);
    ipcRenderer.invoke('invoke').then((res) => {
      console.log(res);
      messageQueueRef.current.push(`MSG_RECEIVED: ${res}`);
      setMessageQueue([...messageQueueRef.current]);
    });
  }, []);

  return (
    <div className="welcome">
      <h1 className="title">Hello, react!</h1>
      <p>This page is powered by vite, electron and react!</p>
      <p>typescript and esbuild are also used for development!</p>
      {messageQueue.map((v) => (
        <p>{v}</p>
      ))}
    </div>
  );
};

export default Index;
