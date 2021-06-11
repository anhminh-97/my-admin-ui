import PublicLayout from "Layout/PublicLayout";
import React from "react";

import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  //   if (loading) return <AppLoading title="Loading Page" />;
  return (
    <Route
      {...rest}
      render={(props) => (
        <PublicLayout>
          <Component {...props} />
        </PublicLayout>
      )}
    />
  );
};
export default PublicRoute;
