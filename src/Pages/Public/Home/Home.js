import { ROUTER } from "Constants/CommonConstants";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to={ROUTER.Dashboard}>Dashboard</Link>
    </div>
  );
};

export default Home;
