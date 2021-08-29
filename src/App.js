import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import routes from "./Route";
import "./App.css";
import NotFound from "./views/NotFound";

function App() {
  return (
    <Router>
      <div style={{ height: "100%" }}>
        <Switch>
          {routes.map((item, index) => {
            return (
              <Route key={index} path={item.path} component={item.component} />
            );
          })}
          <Redirect exact from="/" to="/layout" />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
