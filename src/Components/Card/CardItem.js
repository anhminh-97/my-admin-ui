import React from "react";
import NumberFormat from "react-number-format";

import "./CardItem.Style.less";

const CardItem = ({ value }) => {
  return (
    <div className="card-item-wrapper">
      <NumberFormat
        value={value}
        thousandSeparator={true}
        displayType={"text"}
        suffix="đ/lần"
      />
    </div>
  );
};

export default CardItem;
