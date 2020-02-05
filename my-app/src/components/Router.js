import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Timeline from "./screens/Timeline";
import Single_post from "./screens/Single_post";
import ServerError from "./ServerError";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Timeline} />
    <Route path="/Login" component={Login} />
    <Route path="/Register" component={Register} />
    <Route path="/Timeline" component={Timeline} />
    <Route path="/ServerError" component={ServerError} />
    <Route path="/Single_post/:id" component={Single_post} />
    <Route path="*" component={Login} />
  </Switch>
);

export default Router;
