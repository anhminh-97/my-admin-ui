import {
  CheckOutlined,
  CloseOutlined,
  MinusOutlined,
  ProfileOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Alert, Button, Col, Collapse, Row, Select, Space, Switch, Tabs } from "antd";
import { ProductContext } from "Context/SimpleProductContext";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import AttributeTab from "./AttributeTab.Component";
import PriceTab from "./PriceTab.Component";

const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;

const VariableProduct = () => {
  // Redux
  const productDetail = useSelector((state) => state.product.productDetail);

  // State
  const { setVariableProduct } = useContext(ProductContext);
  const [attributes, setAttributes] = useState({
    id: "",
    color: "",
    size: "",
    originalPrice: null,
    salePrice: null,
    status: true,
  });
  const [, setData] = useState({
    id: "",
    color: "",
    size: "",
    originalPrice: null,
    salePrice: null,
    status: true,
  });
  const [variations, setVariations] = useState([...productDetail.variations]);

  useEffect(() => {
    setVariableProduct(variations);
  }, [setVariableProduct, variations]);

  const handleColor = (value) => {
    setAttributes((prev) => ({ ...prev, color: value }));
  };
  const handleSize = (value) => {
    setAttributes((prev) => ({ ...prev, size: value }));
  };
  const onHandleAdd = () => {
    setVariations((prev) => [...prev, { ...attributes, id: uuidv4() }]);
  };
  const handleStatus = (id, e) => {
    setData((prev) => ({ ...prev, status: e }));
    setVariations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: e };
        } else {
          return item;
        }
      })
    );
  };
  const handleOriginalPrice = (value, id) => {
    setData((prev) => ({ ...prev, originalPrice: value }));
    setVariations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, originalPrice: value };
        } else {
          return item;
        }
      })
    );
  };
  const handleSalePrice = (value, id) => {
    setData((prev) => ({ ...prev, salePrice: value }));
    setVariations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, salePrice: value };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <Tabs tabPosition="left">
      <TabPane
        tab={
          <span>
            <ProfileOutlined />
            Attributes
          </span>
        }
        key="attributes"
      >
        <AttributeTab />
      </TabPane>
      <TabPane
        style={{ minHeight: "200px" }}
        tab={
          <span>
            <TableOutlined />
            Variations
          </span>
        }
        key="variations"
      >
        {productDetail.color.length || productDetail.size.length ? (
          <Row gutter={[24, 24]}>
            <Col>
              <Select placeholder="Choose color" style={{ width: "130px" }} onChange={handleColor}>
                {productDetail.color.map((item, index) => (
                  <Option key={index.toString()} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Select placeholder="Choose size" style={{ width: "130px" }} onChange={handleSize}>
                {productDetail.size.map((item, index) => (
                  <Option key={index.toString()} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Button type="primary" ghost onClick={onHandleAdd}>
                Add
              </Button>
            </Col>
            <Col span={24}>
              <Collapse>
                {variations.map((item, index) => (
                  <Panel
                    header={
                      <Space>
                        {item.color}
                        <MinusOutlined />
                        {item.size}
                      </Space>
                    }
                    key={index.toString()}
                  >
                    <Row gutter={[24, 24]}>
                      <Col span={24}>
                        <PriceTab
                          originalPrice={item.originalPrice || ""}
                          salePrice={item.salePrice || ""}
                          handleOriginalPrice={(value) => handleOriginalPrice(value, item.id)}
                          handleSalePrice={(value) => handleSalePrice(value, item.id)}
                        />
                      </Col>
                      <Col span={24}>
                        <p style={{ marginBottom: "8px" }}>Stock status</p>
                        <Switch
                          defaultChecked={attributes.status}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(e) => handleStatus(item.id, e)}
                        />
                      </Col>
                    </Row>
                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
        ) : (
          <Alert
            message="Before you can add a variation product, you must add some attributes of this product to the
        tag attribute."
            type="error"
            showIcon
          />
        )}
      </TabPane>
    </Tabs>
  );
};

export default VariableProduct;
