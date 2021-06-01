import { Col, Row } from "antd";
import StepHorizontal from "Components/StepHorizontal";
import StepVertical from "Components/StepVertical";
import React from "react";

import "./BlockPayment.Style.less";

const BlockPayment = () => {
  return (
    <Row justify="center" className="block-payment-wrapper" id="payment">
      <Col lg={22} xl={16}>
        <div className="title">Cách thức thanh toán đơn giản</div>
        <div className="step-horizontal">
          <StepHorizontal />
        </div>
        <div className="step-vertical">
          <StepVertical />
        </div>
        <div className="content">
          <p>Chuyển khoản qua ngân hàng</p>
          <p className="account-number">STK: 123456789</p>
          <p>Ngân hàng: PVcom Bank</p>
          <p>Người thụ hưởng: Công ty Cổ phần MTV</p>
          <p>
            Nội dung thanh toán: [Mã trang trại] - [Tên chủ trại đăng ký] thanh
            toán phí hoạt động của trang trại [tháng]
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default BlockPayment;
