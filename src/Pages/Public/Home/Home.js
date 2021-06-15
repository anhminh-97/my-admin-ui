import { Button } from "antd";
import { ROUTER } from "Constants/CommonConstants";
import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const onHandleClick = () => {
    history.push(ROUTER.Dashboard);
  };
  return (
    <div>
      <Button
        type="primary"
        size="large"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%)" }}
        onClick={onHandleClick}
      >
        Go To Dashboard
      </Button>
    </div>
  );
};

export default Home;
