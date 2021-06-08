import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { ROUTER } from "../Constants/CommonConstants";
import Home from "Pages/Public/Home";
import Dashboard from "Pages/Private/Dashboard";
import ProductAdmin from "Pages/Private/ProductAdmin";
import CategoryAdmin from "Pages/Private/CategoryAdmin";
import PrivateRoute from "./Private.Route";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={ROUTER.Home} exact component={Home} />
        <PrivateRoute path={ROUTER.Dashboard} exact component={Dashboard} />
        <PrivateRoute
          path={ROUTER.ProductAdmin}
          exact
          component={ProductAdmin}
        />
        <PrivateRoute
          path={ROUTER.CategoryAdmin}
          exact
          component={CategoryAdmin}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
