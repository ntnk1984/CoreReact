import React, { useContext, useState } from "react";

import { validate } from "../validate.js";

import {
  Form,
  Input,
  Button,
  Row,
} from "antd";


export default function ForgotPassword() {

  const [userInfo, setUserInfo] = useState({
    username:undefined,
    phone: undefined,
  });

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onFinish =() => {

  }
  const onFinishFailed = () => {

  }

  return (
    <Row justify="space-around" style={{ height: 800 }} align="middle">
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      className="mt-4 border  shadow-sm rounded rounded-3 p-3"
      style={{ width: "380px" }}
    >
    <Row style={{justifyContent: "center"}}>
    <h4 className="text-secondary mx-2 my-4">LẤY LẠI MẬT KHẨU</h4>
    </Row>
    <Row style={{justifyContent: "center"}}>
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
              style={{width: "320px"}}
              name="username"
              size="large"
              placeholder="Vui lòng nhập"
            />
          </Form.Item>
    </Row>
    <Row style={{justifyContent: "center"}}>
          <Form.Item
            name="phone"
            className="mx-2"
            label="Số điện thoại"
            required
            rules={[validate.checkRequire(), validate.checkPhone()]}
          >
            <Input
              onChange={(e) => {
                handleChangeVal(e);
              }}
              style={{width: "320px"}}
              name="phone"
              size="large"
              placeholder="Vui lòng nhập"
            />
          </Form.Item>
    </Row>
    <Row style={{justifyContent: "center"}}>
      <Button
          trigger="click"
          className="mx-2 my-1"
          size="large"
          style={{width: "320px"}}
          type="primary">
          Lấy lại mật khẩu
      </Button>
    </Row>
    <Row className="mt-2"style={{justifyContent: "center", alignItems: "center"}}>
      <Button type="link" href="">Về trang đăng nhập</Button>
    </Row>
    </Form>
    </Row>
  );
}