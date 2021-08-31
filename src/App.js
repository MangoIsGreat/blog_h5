import React from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import routes from "./Route";
import "./App.css";
import NotFound from "./views/NotFound";

function App() {
  return (
    <Router>
      <div style={{ height: "100%" }}>
        <CacheSwitch>
          {routes.map((item, index) => {
            const Component = item.component;
            if (item.cache) {
              return (
                <CacheRoute path={item.path} key={index} exact when="forward">
                  {(props) => {
                    return (
                      <div style={props.match ? null : { display: "none" }}>
                        <Component {...props} />
                      </div>
                    );
                  }}
                </CacheRoute>
              );
            }
            return (
              <Route key={index} path={item.path}>
                {(props) => {
                  return (
                    <div style={props.match ? null : { display: "none" }}>
                      <Component {...props} />
                    </div>
                  );
                }}
              </Route>
            );
          })}
          <Redirect exact from="/" to="/layout" />
          <Route component={NotFound} />
        </CacheSwitch>
      </div>
    </Router>
  );
}

export default App;
