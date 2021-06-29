import {
  CheckOutlined,
  CloseOutlined,
  DollarOutlined,
  ProfileOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Col, InputNumber, Row, Switch, Tabs } from "antd";
import { ProductContext } from "Context/SimpleProductContext";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AttributeTab from "./AttributeTab.Component";
import PriceTab from "./PriceTab.Component";

const { TabPane } = Tabs;

const SimpleProduct = () => {
  // Redux
  const productDetail = useSelector((state) => state.product.productDetail);

  // State
  const [data, setData] = useState({
    originalPrice: productDetail.originalPrice ? productDetail.originalPrice : "",
    salePrice: productDetail.salePrice ? productDetail.salePrice : "",
    quantity: productDetail.quantity ? productDetail.quantity : "",
    status: productDetail.status,
  });
  const { setSimpleProduct } = useContext(ProductContext);

  useEffect(() => {
    setSimpleProduct((prev) => ({ ...prev, ...productDetail }));
  }, [productDetail, setSimpleProduct]);

  useEffect(() => {
    setSimpleProduct((prev) => ({ ...prev, ...data }));
  }, [data, setSimpleProduct]);

  // Handle price
  const handleOriginalPrice = (value) => {
    setData((prev) => ({ ...prev, originalPrice: value }));
  };
  const handleSalePrice = (value) => {
    setData((prev) => ({ ...prev, salePrice: value }));
  };
  const handleQuantity = (value) => {
    setData((prev) => ({ ...prev, quantity: value }));
  };
  const handleStatus = (e) => {
    setData((prev) => ({ ...prev, status: e }));
  };

  return (
    <Tabs tabPosition="left">
      <TabPane
        tab={
          <span>
            <DollarOutlined />
            Price
          </span>
        }
        key="price"
      >
        <PriceTab
          vertical
          originalPrice={data.originalPrice}
          salePrice={data.salePrice}
          handleOriginalPrice={handleOriginalPrice}
          handleSalePrice={handleSalePrice}
        />
      </TabPane>
      <TabPane
        tab={
          <span>
            <ShopOutlined />
            Inventory
          </span>
        }
        key="inventory"
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <p style={{ marginBottom: "8px" }}>Quantity</p>
            <InputNumber min={0} value={data.quantity} onChange={handleQuantity} />
          </Col>
          <Col span={24}>
            <p style={{ marginBottom: "8px" }}>Stock status</p>
            <Switch
              checked={data.status}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={handleStatus}
            />
          </Col>
        </Row>
      </TabPane>
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
    </Tabs>
  );
};

export default SimpleProduct;
