import React, { useEffect } from "react";
import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";

import "./Login.Style.less";
import { useDispatch, useSelector } from "react-redux";
import { login } from "Features/Auth/UserSlice";
import { useHistory, useLocation } from "react-router-dom";
import { ROUTER } from "Constants/CommonConstants";
import isEmpty from "lodash/isEmpty";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // redux
  const user = useSelector((state) => state.user.current);

  useEffect(() => {
    if (!isEmpty(user)) {
      history.push(ROUTER.Dashboard);
    }
  }, [history, location.state, user]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  };

  const onFinish = async (values) => {
    const value = {
      identifier: values.identifier,
      password: values.password,
    };
    const resultAction = await dispatch(login(value));
    if (resultAction.error) {
      message.error(resultAction.error.message);
    } else {
      message.success("Successfully");
      history.push(
        !isEmpty(location.state)
          ? `${location.state.pathname}${location.state?.search}`
          : ROUTER.Dashboard
      );
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
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="identifier"
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

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout} style={{ textAlign: "right" }}>
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
