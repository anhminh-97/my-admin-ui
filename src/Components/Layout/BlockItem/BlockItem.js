import React, { useState } from "react";
import { Col, Row } from "antd";

import { CardItem, SmallCard } from "Components/Card";
import CommonButton from "../../Button/CommonButton";
import SliderRange from "../../Slider/SliderRange";
import { COLORS } from "Constants/CommonConstants";
import "./BlockItem.Style.less";

const BlockItem = ({
  title,
  subTitle,
  isBackground,
  value,
  topPrice,
  bottomPrice,
}) => {
  const [quantity, setQuantity] = useState(100);

  const handleData = (value) => {
    setQuantity(value);
  };

  return (
    <Row
      className="block-item-wrapper"
      justify="center"
      style={{ backgroundColor: `${isBackground && COLORS.MAIN_COLOR}` }}
    >
      <Col lg={22} xl={16}>
        <Row>
          <Col span={24}>
            <div className="title">{title}</div>
            <div className="sub-title">{subTitle}</div>
          </Col>
        </Row>
        <Row className="slider-block">
          <Col span={24}>
            <SliderRange handleData={handleData} isBackground={isBackground} />
          </Col>
        </Row>
        <Row gutter={[20, 48]}>
          <Col xs={24} md={12}>
            <h3>Chi phí đầu tư một lần</h3>
            <CardItem value={value} />
          </Col>
          <Col xs={24} md={12}>
            <h3>Chi phí vận hành hằng ngày</h3>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <SmallCard
                  name="Bò Thịt"
                  price={topPrice}
                  subTotal={quantity * topPrice}
                />
              </Col>
              <Col span={24}>
                <SmallCard
                  name="Bò Nái"
                  price={bottomPrice}
                  subTotal={quantity * bottomPrice}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center" className="btn-block">
          <Col>
            <CommonButton href="#payment" title="Cách thức thanh toán" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BlockItem;
