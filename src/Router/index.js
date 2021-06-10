import * as React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { ROUTER } from "../Constants/CommonConstants";
import PrivateRoute from "./Private.Route";
import { AddProduct, CategoryAdmin, Dashboard, Home, ProductAdmin } from "Pages";
import PublicLayout from "Layout/PublicLayout";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicLayout path={ROUTER.Home} exact component={Home} />
        <PrivateRoute path={ROUTER.Dashboard} exact component={Dashboard} />
        <PrivateRoute path={ROUTER.ProductAdmin} exact component={ProductAdmin} />
        <PrivateRoute path={ROUTER.CategoryAdmin} exact component={CategoryAdmin} />
        <PrivateRoute path={ROUTER.AddProduct} exact component={AddProduct} />
      </Switch>
    </Router>
  );
};

export default Routes;
