import React from "react";
import { render } from "react-dom";
import { HashRouter, Router, Route, Switch } from "react-router-dom";
import history from "./service/historian";
import config from "./config";
import HomePage from "./component/HomePage/HomePage";
import GraphPage from "./component/GraphPage/GraphPage";
import AboutPage from "./component/AboutPage/AboutPage";

const paths = {};
Object.entries(config.pages).forEach(([k, v]) => {
  paths[k] = config.hashRoutes ? v.path.slice(1) : v.path; // for hashRoutes version, each path value in config.pages starts with #
});

const _Switch = () => {
  return (
    <Switch>
      <Route exact={true} path={paths.home} component={HomePage} />
      <Route path={paths.graph} component={GraphPage} />
      <Route path={paths.about} component={AboutPage} />
    </Switch>
  );
};

render(
  config.hashRoutes ? (
    <HashRouter basename="/">
      <_Switch />
    </HashRouter>
  ) : (
    <Router history={history}>
      <_Switch />
    </Router>
  ),
  document.getElementById("root")
);
