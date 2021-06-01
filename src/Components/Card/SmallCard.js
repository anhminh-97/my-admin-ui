import { Col, Row } from "antd";
import React from "react";
import NumberFormat from "react-number-format";

import "./SmallCard.Style.less";

const SmallCard = ({ name, price, subTotal }) => {
  return (
    <Row className="small-card-wrapper">
      <Col xs={6} lg={10} className="card-name">
        {name}
      </Col>
      <Col xs={18} lg={14} className="card-price">
        <p>
          Tỉ giá:{" "}
          <NumberFormat
            value={price}
            thousandSeparator={true}
            displayType={"text"}
            suffix=" đồng/con/ngày"
          />
        </p>
        <div className="sub-total">
          <NumberFormat
            value={subTotal}
            thousandSeparator={true}
            displayType={"text"}
            suffix=" vnđ/ngày"
          />
        </div>
      </Col>
    </Row>
  );
};

export default SmallCard;
