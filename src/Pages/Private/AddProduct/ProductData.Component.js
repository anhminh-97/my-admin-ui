import { MinusOutlined } from "@ant-design/icons";
import { Card, Select, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import SimpleProduct from "./SimpleProduct.Component";
import VariableProduct from "./VariableProduct.Component";

const { Option } = Select;

const ProductData = ({ handleType }) => {
  // state
  const [variableMode, setVariableMode] = useState("simple");

  // Select mode
  const onChangeSelect = (value) => {
    setVariableMode(value);
    handleType(value);
  };

  return (
    <Card
      type="inner"
      title={
        <Space>
          <Text strong>Product data</Text>
          <MinusOutlined />
          <Select defaultValue="simple" onChange={onChangeSelect}>
            <Option value="simple">Simple product</Option>
            <Option value="variable">Variable product</Option>
          </Select>
        </Space>
      }
    >
      {variableMode === "variable" ? <VariableProduct /> : <SimpleProduct />}
    </Card>
  );
};

export default ProductData;
