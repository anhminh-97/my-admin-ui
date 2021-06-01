import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { ROUTER } from "../Constants/CommonConstants";
import Home from "Pages/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={ROUTER.Home} exact component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
