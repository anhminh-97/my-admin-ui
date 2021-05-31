import React from "react";
import { Slider } from "antd";
import "antd/dist/antd.css";

import { COLOR } from "../../Constants/CommonConstants";

const marks = {
  100: "100 con",
  5000: "5000 con",
};

const SliderRange = () => {
  return (
    <Slider
      trackStyle={{ backgroundColor: COLOR.MAIN_COLOR }}
      handleStyle={{ borderColor: COLOR.MAIN_COLOR }}
      marks={marks}
      min={100}
      max={5000}
      step={50}
    />
  );
};

export default SliderRange;
