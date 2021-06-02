import React, { useState } from "react";
import { Col, Row, Slider } from "antd";
import "antd/dist/antd.css";

import "./SliderRange.Style.less";
import { COLORS } from "Constants/CommonConstants";
window.addEventListener(
  "touchmove",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

const marks = {
  100: "100 con",
  5000: "5000 con",
};

const SliderRange = ({ isBackground, handleData, label, isMark }) => {
  // State
  const [quantity, setQuantity] = useState(100);

  // Function
  const handleChange = (value) => {
    setQuantity(value);
    handleData(value);
  };

  return (
    <Row>
      <Col xs={24} md={3}>
        <h3>{label}</h3>
      </Col>
      <Col xs={24} md={21}>
        <Slider
          className="slider-wrapper"
          marks={isMark && marks}
          min={100}
          max={5000}
          step={50}
          value={quantity}
          onChange={handleChange}
          railStyle={{
            border: `1px solid ${isBackground ? "white" : COLORS.MAIN_COLOR}`,
          }}
          handleStyle={{
            border: `1px solid ${isBackground ? "white" : COLORS.MAIN_COLOR}`,
          }}
          trackStyle={{
            backgroundColor: `${isBackground ? "white" : COLORS.MAIN_COLOR}`,
          }}
        />
      </Col>
    </Row>
  );
};

export default SliderRange;
