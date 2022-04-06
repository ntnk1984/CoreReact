import React, { useContext, useState } from "react";

import { validate } from "../validate.js";

import { Form, Input, Button, Row } from "antd";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    username: undefined,
    password: undefined,
    confirmpassword: undefined,
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
          <h4 className="text-secondary  mx-2 mb-4">ĐĂNG KÝ TÀI KHOẢN</h4>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Form.Item
            hasFeedback
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
            hasFeedback
            name="password"
            className="mx-2"
            label="Mật khẩu"
            required
            rules={[validate.checkRequire(), validate.checkPassword()]}
          >
            <Input.Password
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
        <Row style={{ justifyContent: "center" }}>
          <Form.Item
            hasFeedback
            name="confirmpassword"
            className="mx-2"
            label="Xác nhận mật khẩu"
            required
            rules={[
              validate.checkRequire(),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
            dependencies={["password"]}
          >
            <Input.Password
              onChange={(e) => {
                handleChangeVal(e);
              }}
              style={{ width: "320px" }}
              name="confirmpassword"
              size="large"
              placeholder="Vui lòng nhập"
            />
          </Form.Item>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Button
            trigger="click"
            className="mx-2 my-4"
            size="large"
            style={{ width: "320px" }}
            type="primary"
          >
            Đăng ký
          </Button>
        </Row>
        <Row
          className=""
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          Đã có tài khoản? --
          <Button type="link" href="">
            Đăng nhập
          </Button>
        </Row>
      </Form>
    </Row>
  );
}
