import React, { Component } from "react";
import routeRules from "./rules";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../views/NotFound";

class Routes extends Component {
  render() {
    return (
      <Switch>
        {routeRules.map((item, index) => {
          return (
            <Route
              exact
              key={index}
              path={item.path}
              component={item.component}
            />
          );
        })}
        <Redirect exact from="/layout" to="/layout/index" />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
