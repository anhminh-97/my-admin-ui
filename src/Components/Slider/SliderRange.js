import React, { useState } from "react";
import { Slider } from "antd";
import "antd/dist/antd.css";

import "./SliderRange.Style.less";
import { COLORS } from "Constants/CommonConstants";

const marks = {
  100: "100 con",
  5000: "5000 con",
};

const SliderRange = ({ isBackground, handleData }) => {
  // State
  const [quantity, setQuantity] = useState(0);

  // Function
  const handleChange = (value) => {
    setQuantity(value);
    handleData(value);
  };

  return (
    <Slider
      className="slider-wrapper"
      marks={marks}
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
  );
};

export default SliderRange;
