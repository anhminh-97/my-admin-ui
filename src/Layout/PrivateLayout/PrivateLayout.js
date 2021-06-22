import {
  CopyOutlined,
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  PushpinOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Col, Dropdown, Layout, Menu, Row } from "antd";
import { ROUTER } from "Constants/CommonConstants";
import { logout } from "Features/Auth/UserSlice";
import isEmpty from "lodash/isEmpty";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./PrivateLayout.Style.less";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((item) => item);
  const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // Redux
  const user = useSelector((state) => state.user.current);

  // State
  const [collapsed, setCollapsed] = useState(false);

  // Function
  const onToggle = () => {
    setCollapsed(!collapsed);
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push(ROUTER.Login);
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
          <SubMenu key="production" icon={<ShoppingCartOutlined />} title="Products">
            <Menu.Item key="products">
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
                    <Menu.Item icon={<ProfileOutlined />}>My Profile</Menu.Item>
                    <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
                      Log Out
                    </Menu.Item>
                  </Menu>
                }
              >
                <Link to="" className="ant-dropdown-link login" onClick={(e) => e.preventDefault()}>
                  <Avatar size="small" className="avatar" icon={<UserOutlined />} />
                  &ensp; {!isEmpty(user) && user.email}
                </Link>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Row className="breadcrumb">
          <Col>
            <Breadcrumb>
              {pathnames.length ? (
                <Breadcrumb.Item>
                  <Link to={ROUTER.Dashboard}>
                    <DashboardOutlined />
                    &ensp;Dashboard
                  </Link>
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item>
                  <DashboardOutlined />
                  &ensp;Dashboard
                </Breadcrumb.Item>
              )}
              {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                  <Breadcrumb.Item key={index.toString()}>{capatilize(name)}</Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item key={index.toString()}>
                    <Link to={`${routeTo}`}>{capatilize(name)}</Link>
                  </Breadcrumb.Item>
                );
              })}
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
