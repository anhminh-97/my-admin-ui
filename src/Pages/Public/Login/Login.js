import React from "react";
import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";

import "./Login.Style.less";
import { useDispatch } from "react-redux";
import { login } from "Features/Auth/UserSlice";
import { useHistory } from "react-router-dom";
import { ROUTER } from "Constants/CommonConstants";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const value = {
        email: values.email,
        password: values.password,
      };
      await dispatch(login(value));
      history.push(ROUTER.Dashboard);
      message.success("Successfully");
    } catch (error) {
      message.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };
  return (
    <Row justify="center" align="middle" className="login-wrapper">
      <Col lg={8} className="login-form">
        <h1 className="title">LOG IN</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
