import AppLoading from "Components/AppLoading";
import React, { Suspense } from "react";
import "./App.less";
import Routes from "./Router";

const App = () => (
  <Suspense fallback={<AppLoading title="Loading" />}>
    <Routes />
  </Suspense>
);

export default App;
