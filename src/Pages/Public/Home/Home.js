import { Button } from "antd";
import { ROUTER } from "Constants/CommonConstants";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Button
        type="primary"
        size="large"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%)" }}
      >
        <Link to={ROUTER.Dashboard}>Go To Dashboard</Link>
      </Button>
    </div>
  );
};

export default Home;
