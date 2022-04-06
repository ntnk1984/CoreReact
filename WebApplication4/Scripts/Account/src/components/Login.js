import React, { useState } from "react";

import { validate } from "../validate.js";

import { Form, Input, Button, Row } from "antd";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onFinish = () => {};
  const onFinishFailed = () => {};
  return (
    <Row justify="space-around" style={{ height: 800 }} align="middle">
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="mt-4 border  shadow-sm rounded rounded-3 p-3"
        style={{ width: "380px" }}
      >
        <Row style={{ justifyContent: "center" }}>
          <h4 className="text-secondary mx-2 my-4">ĐĂNG NHẬP HỆ THỐNG</h4>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Form.Item
            name="username"
            className="mx-2"
            label="Tên đăng nhập"
            required
            rules={[validate.checkRequire(), validate.checkUsername()]}
          >
            <Input
              onChange={(e) => {
                handleChangeVal(e);
              }}
              style={{ width: "320px" }}
              name="username"
              size="large"
              placeholder="Vui lòng nhập"
            />
          </Form.Item>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Form.Item
            name="password"
            className="mx-2"
            label="Mật khẩu"
            required
            rules={[validate.checkRequire(), validate.checkPassword()]}
          >
            <Input
              onChange={(e) => {
                handleChangeVal(e);
              }}
              style={{ width: "320px" }}
              name="password"
              size="large"
              placeholder="Vui lòng nhập"
            />
          </Form.Item>
        </Row>
        <Row style={{ justifyContent: "flex-end" }}>
          <Button className="mb-4" type="link" href="">
            Quên mật khẩu?
          </Button>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Button
            trigger="click"
            className="mx-2"
            size="large"
            style={{ width: "320px" }}
            type="primary"
            htmlType="submit"
          >
            Đăng nhập
          </Button>
        </Row>
        <Row
          className="mt-4"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          Chưa có tài khoản --
          <Button type="link" href="">
            Đăng ký
          </Button>
        </Row>
      </Form>
    </Row>
  );
}
