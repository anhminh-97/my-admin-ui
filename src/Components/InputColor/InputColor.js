import React, { useState } from "react";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Dropdown from "antd/lib/dropdown";
import Panel from "rc-color-picker/lib/Panel";

import "./InputColor.less";

const InputColor = ({ color, onChange }) => {
  const [internalColor, setInternalColor] = useState(color);

  const handleChange = (color) => {
    setInternalColor(color.color);
    if (onChange) {
      onChange(color);
    }
  };

  const overlay = (
    <div>
      <Panel color={internalColor} enableAlpha={false} onChange={handleChange} />
    </div>
  );
  return (
    <div className="input-color-wrapper">
      <Input
        value={internalColor || ""}
        onChange={(e) => {
          handleChange({ color: e.target.value });
        }}
        suffix={
          <Dropdown trigger={["click"]} overlay={overlay}>
            <Button style={{ background: internalColor }}> </Button>
          </Dropdown>
        }
      />
    </div>
  );
};
export default InputColor;
