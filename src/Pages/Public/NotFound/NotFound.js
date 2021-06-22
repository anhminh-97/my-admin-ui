import { Button, Col, Row } from "antd";
import { ROUTER } from "Constants/CommonConstants";
import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.less";

const NotFound = () => {
  const history = useHistory();
  const handleGoBack = () => {
    history.push(ROUTER.Dashboard);
  };
  return (
    <div className="notfound-wrapper">
      <Row justify="center">
        <Col span={24} className="image">
          <img
            src="https://img.freepik.com/free-vector/error-404-huge-numbers-tiny-angry-people-users_81534-2112.jpg?size=626&ext=jpg"
            alt=""
          />
        </Col>
        <Col span={6}>
          <Button type="primary" className="btn-go-back" onClick={handleGoBack}>
            Go Back Dashboard
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default NotFound;
