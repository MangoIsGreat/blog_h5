import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";

import Layout from "./views/Layout";
import NotFound from "./views/NotFound";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/layout" component={Layout} />
          <Redirect exact from="/" to="/layout" />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
