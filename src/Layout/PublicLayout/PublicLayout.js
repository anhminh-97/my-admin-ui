import React from "react";
import { Layout } from "antd";
// import "./index.less";

const { Content } = Layout;

const PublicLayout = ({ children }) => {
  return (
    <Layout className="pp_layout">
      <Content className="pp_container">{children}</Content>
    </Layout>
  );
};

export default PublicLayout;
