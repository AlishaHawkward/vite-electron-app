import React from 'react';
import { useLocation } from 'react-router-dom';
import Error from '@/components/error';

import './style.less';

const Index = () => {
  const location = useLocation();

  return (
    <div className="notfound">
      <Error data={{
        title: 'Sorry, something went wrong.',
        desc: [{
          text: 'The resource you request was not found on this app.',
          type: 'primary',
        }, {
          text: 'Error Code: 404',
        }, {
          text: `Location: ${location.pathname}`,
        }, {
          text: `Time: ${new Date()}`,
        }, {
          text: <a href="/">Get Back!</a>,
        }],
        footer: 'Vite React App',
      }}
      />
    </div>
  );
};

export default Index;
