import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import PrivateLayout from "Layout/PrivateLayout";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { ROUTER } from "Constants/CommonConstants";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user.current);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => (
        <PrivateLayout>
          {!isEmpty(user) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: ROUTER.Login,
                state: { pathname: location.pathname, search: location.search },
              }}
            />
          )}
        </PrivateLayout>
      )}
    />
  );
};
export default PrivateRoute;
