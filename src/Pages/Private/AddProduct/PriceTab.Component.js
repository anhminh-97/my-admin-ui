import { Col, InputNumber, Row } from "antd";
import React from "react";

const PriceTab = ({ originalPrice, salePrice, handleOriginalPrice, handleSalePrice, vertical }) => {
  const onHandleOriginalPrice = (value) => {
    handleOriginalPrice(value);
  };
  const onHandleSalePrice = (value) => {
    handleSalePrice(value);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col span={vertical ? 24 : 12}>
        <p style={{ marginBottom: "8px" }}>Original price</p>
        <InputNumber
          onChange={onHandleOriginalPrice}
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          min={0}
          style={{ width: "200px" }}
          defaultValue={originalPrice}
        />
      </Col>
      <Col span={vertical ? 24 : 12}>
        <p style={{ marginBottom: "8px" }}>Sale price</p>
        <InputNumber
          onChange={onHandleSalePrice}
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          min={0}
          style={{ width: "200px" }}
          defaultValue={salePrice}
        />
      </Col>
    </Row>
  );
};

export default PriceTab;
