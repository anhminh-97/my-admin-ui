import { Button } from "antd";
import React from "react";

import "./CommonButton.Style.less";

const CommonButton = ({ title, href }) => {
  return (
    <div className="button-wrapper">
      <Button href={href} className="button">
        {title}
      </Button>
    </div>
  );
};

export default CommonButton;
