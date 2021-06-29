import { Button, Card, Col, Input, Row, Space, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import InputColor from "Components/InputColor";
import { ProductContext } from "Context/SimpleProductContext";
import React, { useContext, useEffect, useState } from "react";

const AttributeTab = () => {
  const { setSimpleProduct } = useContext(ProductContext);

  // State
  const [attributes, setAttributes] = useState({
    color: [],
    size: [],
  });

  const [data, setData] = useState({
    color: "",
    size: "",
  });
  const [error, setError] = useState({
    color: false,
    size: false,
  });

  useEffect(() => {
    setSimpleProduct((prev) => ({ ...prev, ...attributes }));
  }, [attributes, setSimpleProduct]);

  // Handle color
  const onhandleColor = (color) => {
    setData((prev) => ({ ...prev, color: color.color }));
  };
  const handleAddColor = () => {
    if (data.color) {
      const newValue = [...attributes.color, data.color];
      setAttributes((prev) => ({ ...prev, color: newValue }));
      setData((prev) => ({ ...prev, color: "" }));
      setError((prev) => ({ ...prev, color: false }));
    } else setError((prev) => ({ ...prev, color: true }));
  };
  const handleRemoveColor = (value) => {
    setAttributes((prev) => ({
      ...prev,
      color: attributes.color.filter((item) => item !== value),
    }));
  };

  // Hanlde size
  const onHandleSize = (e) => {
    setData((prev) => ({ ...prev, size: e.target.value }));
  };
  const handleAddSize = () => {
    if (data.size) {
      const newValue = [...attributes.size, data.size];
      setAttributes((prev) => ({ ...prev, size: newValue }));
      setData((prev) => ({ ...prev, size: "" }));
      setError((prev) => ({ ...prev, size: false }));
    } else setError((prev) => ({ ...prev, size: true }));
  };
  const handleRemoveSize = (value) => {
    setAttributes((prev) => ({
      ...prev,
      size: attributes.size.filter((item) => item !== value),
    }));
  };

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card size="small" title={<Text strong>Color</Text>}>
          <Row gutter={[24, 12]}>
            <Col span={24}>
              {attributes.color.map((item, index) => (
                <Tag
                  key={index.toString()}
                  color={item}
                  closable
                  onClose={(e) => {
                    e.preventDefault();
                    handleRemoveColor(item);
                  }}
                >
                  {item}
                </Tag>
              ))}
            </Col>
            <Col span={24}>
              <Space>
                <InputColor onChange={onhandleColor} />
                <Button type="primary" ghost size="large" onClick={handleAddColor}>
                  Add
                </Button>
              </Space>
              {error.color && <p style={{ color: "red" }}>Please enter color.</p>}
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card size="small" title={<Text strong>Size</Text>}>
          <Row gutter={[24, 12]}>
            <Col span={24}>
              {attributes.size.map((item, index) => (
                <Tag
                  key={index.toString()}
                  closable
                  onClose={(e) => {
                    e.preventDefault();
                    handleRemoveSize(item);
                  }}
                >
                  {item}
                </Tag>
              ))}
            </Col>
            <Col span={24}>
              <Space>
                <Input value={data.size} onChange={onHandleSize} />
                <Button type="primary" onClick={handleAddSize} ghost>
                  Add
                </Button>
              </Space>
              {error.size && <p style={{ color: "red" }}>Please enter size.</p>}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default AttributeTab;
