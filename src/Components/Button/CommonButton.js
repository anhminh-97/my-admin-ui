import { Button } from "antd";
import React from "react";

import { COLOR } from "../../Constants/CommonConstants";

const CommonButton = ({ title }) => {
  return (
    <ButtonWrapper>
      <Button className="button">{title}</Button>;
    </ButtonWrapper>
  );
};

export default CommonButton;
