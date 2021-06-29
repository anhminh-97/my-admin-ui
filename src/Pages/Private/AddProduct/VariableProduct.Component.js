import { ProfileOutlined, TableOutlined } from "@ant-design/icons";
import { Alert, Tabs } from "antd";
import React from "react";
import AttributeTab from "./AttributeTab.Component";

const { TabPane } = Tabs;

const VariableProduct = () => {
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
        <Alert
          message="Error"
          description="Before you can add a variation product, you must add some attributes of this product to the
        tag attribute."
          type="error"
          showIcon
        />
      </TabPane>
    </Tabs>
  );
};

export default VariableProduct;
