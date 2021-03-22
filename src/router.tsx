import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Welcome from './pages/welcome';
import Notfound from './pages/notfound';

const Router = () => {
  return (
    <Switch>
      <Redirect from="/" to="/welcome" exact />
      <Route path="/welcome" component={Welcome} exact />
      <Route path="*" component={Notfound} />
    </Switch>
  );
};

export default Router;
