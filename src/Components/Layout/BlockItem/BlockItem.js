import React, { useState } from "react";
import { Col, Row } from "antd";

import { CardItem, SmallCard } from "Components/Card";
import CommonButton from "../../Button/CommonButton";
import SliderRange from "../../Slider/SliderRange";
import { COLORS } from "Constants/CommonConstants";
import "./BlockItem.Style.less";
import NumberFormat from "react-number-format";

const BlockItem = ({
  title,
  subTitle,
  isBackground,
  value,
  topPrice,
  bottomPrice,
  leftTitle,
  rightTitle,
}) => {
  // State
  const [quantity, setQuantity] = useState({
    topSlider: 100,
    bottomSlider: 100,
  });

  // Function
  const handleTopData = (value) => {
    setQuantity({ ...quantity, topSlider: value });
  };
  const handleBottomData = (value) => {
    setQuantity({ ...quantity, bottomSlider: value });
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
            <SliderRange
              label="Bò thịt"
              isMark
              handleData={handleTopData}
              isBackground={isBackground}
            />
            <SliderRange
              label="Bò nái"
              handleData={handleBottomData}
              isBackground={isBackground}
            />
          </Col>
        </Row>
        <Row gutter={[20, 48]}>
          <Col xs={24} md={12}>
            <h3>{leftTitle}</h3>
            <CardItem value={value} />
          </Col>
          <Col xs={24} md={12}>
            <h3>{rightTitle}</h3>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <div
                  className="total"
                  style={{
                    color: `${isBackground ? "white" : COLORS.MAIN_COLOR}`,
                  }}
                >
                  <NumberFormat
                    value={
                      topPrice * quantity.topSlider +
                      bottomPrice * quantity.bottomSlider
                    }
                    thousandSeparator={true}
                    displayType={"text"}
                    suffix=" vnđ/ngày"
                    prefix="+ "
                  />
                </div>
              </Col>
              <Col span={24}>
                <SmallCard
                  name="Bò Thịt"
                  price={topPrice}
                  subTotal={quantity.topSlider * topPrice}
                />
              </Col>
              <Col span={24}>
                <SmallCard
                  name="Bò Nái"
                  price={bottomPrice}
                  subTotal={quantity.bottomSlider * bottomPrice}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center" className="btn-block">
          <Col>
            <CommonButton href="payment" title="Cách thức thanh toán" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BlockItem;
