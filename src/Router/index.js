import * as React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { ROUTER } from "../Constants/CommonConstants";
import PrivateRoute from "./Private.Route";
import PublicRoute from "./Public.Route";
import {
  CategoryAdmin,
  Dashboard,
  Home,
  ProductAdmin,
  Login,
  ProductDetail,
  NotFound,
  AddProduct,
} from "Pages";
// import UserAdmin from "Pages/Private/UserAdmin";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path={ROUTER.Home} exact component={Home} />
        <PublicRoute path={ROUTER.Login} exact component={Login} />
        <PrivateRoute path={ROUTER.Dashboard} exact component={Dashboard} />
        <PrivateRoute path={ROUTER.ProductAdmin} exact component={ProductAdmin} />
        <PrivateRoute path={ROUTER.CategoryAdmin} exact component={CategoryAdmin} />
        <PrivateRoute path={ROUTER.AddProduct} exact component={AddProduct} />
        {/* <PrivateRoute path={ROUTER.User} exact component={UserAdmin} /> */}
        <PrivateRoute path={`${ROUTER.ProductDetail}/:id`} component={ProductDetail} />
        <PublicRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
