import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './authentication/Login';
import Register from './authentication/Register';
import Homepage from './screens/Homepage';
import Single_post from './screens/Single_post';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/Login" component={Login} />
    <Route path="/Register" component={Register} />
    <Route path="/Homepage" component={Homepage} />
    <Route path="/Single_post/:id" component={Single_post} />
    <Route path="*" component={Login} />
  </Switch>
);

export default Router;
