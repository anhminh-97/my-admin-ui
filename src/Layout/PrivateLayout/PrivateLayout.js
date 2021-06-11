import { Avatar, Breadcrumb, Col, Dropdown, Layout, Menu, Row } from "antd";
import {
  CopyOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  PushpinOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { ROUTER } from "Constants/CommonConstants";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./PrivateLayout.Style.less";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const PrivateLayout = ({ children, icon, label }) => {
  const history = useHistory();
  // Redux

  // State
  const [collapsed, setCollapsed] = useState(false);

  // Function
  const onToggle = () => {
    setCollapsed(!collapsed);
  };
  const handleLogout = () => {
    // removeUser();
  };
  return (
    <Layout className="private-layout-wrapper">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link className="logo" to={ROUTER.Home}>
          {collapsed ? <HomeOutlined className="home-icon" /> : "MY ADMIN"}
        </Link>

        <Menu theme="dark" mode="inline">
          <Menu.Item key="all-orders" icon={<DashboardOutlined />}>
            <Link to={ROUTER.Dashboard}>Dashboard</Link>
          </Menu.Item>
          <SubMenu key="pages" title="Pages" icon={<CopyOutlined />}>
            <Menu.Item key="allPages">All pages</Menu.Item>
            <Menu.Item key="add-page">Add new</Menu.Item>
          </SubMenu>
          <SubMenu key="users" title="Users" icon={<UserOutlined />}>
            <Menu.Item key="5">All users</Menu.Item>
            <Menu.Item key="6">Edit user</Menu.Item>
          </SubMenu>
          <SubMenu key="posts" title="Posts" icon={<PushpinOutlined />}>
            <Menu.Item key="9">All posts</Menu.Item>
            <Menu.Item key="10">Add new</Menu.Item>
            <Menu.Item key="11">Category</Menu.Item>
          </SubMenu>
          <SubMenu key="products" icon={<ShoppingCartOutlined />} title="Products">
            <Menu.Item key="allProducts">
              <Link to={ROUTER.ProductAdmin}>All Products</Link>
            </Menu.Item>
            <Menu.Item key="category">
              <Link to={ROUTER.CategoryAdmin}>Category</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <Row justify="space-between">
            <Col>
              {collapsed ? (
                <MenuUnfoldOutlined onClick={onToggle} />
              ) : (
                <MenuFoldOutlined onClick={onToggle} />
              )}
            </Col>
            <Col>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Link to="">
                        <ProfileOutlined /> My Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item onClick={handleLogout}>
                      <LogoutOutlined /> Log Out
                    </Menu.Item>
                  </Menu>
                }
              >
                <Link to="" className="ant-dropdown-link login" onClick={(e) => e.preventDefault()}>
                  <Avatar size="small" className="avatar" icon={<UserOutlined />} />
                  &ensp;
                </Link>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Row className="breadcrumb">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item onClick={() => history.push(ROUTER.Dashboard)}>
                <DashboardOutlined /> <span>Dashboard</span>
              </Breadcrumb.Item>
              {icon && label ? (
                <Breadcrumb.Item>
                  <Link to="">
                    {icon} <span>{label}</span>
                  </Link>
                </Breadcrumb.Item>
              ) : (
                ""
              )}
            </Breadcrumb>
          </Col>
        </Row>
        <Content
          className="pp_container site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
