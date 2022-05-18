import { Button, Checkbox, Col, Form, Input, message, Row, Select, Tabs } from "antd";
import React, { useContext, useRef, useState } from "react";
import { contextValue } from "../App";
import { CreateAccountApi } from "../Service";
import { validate } from "../validate";
import "./Style/index.css";

function CreateAccount(props) {
  const context = useContext(contextValue);
  const { account } = context.createAccount;
  const typingTimesOutRef = useRef(null);

  const [dataSuccess, setDataSuccess] = useState({
    Account: "",
    Phone: "",
    Password: "",
    confirmPassword: "",
    partner: undefined,
  });
  const [showFormPartner, setShowFormPartner] = useState(false);

  //showFormErors false
  const handData = (e) => {
    const { name, value } = e.target;
    if (typingTimesOutRef.current) clearTimeout(typingTimesOutRef.current);

    typingTimesOutRef.current = setTimeout(() => {
      setDataSuccess({ ...dataSuccess, [name]: value });
    }, 300);
  };

  // antDesign custom
  const [form] = Form.useForm();
  const successFuc = () => {
    message.success("Tạo tài khoản thành công!");
  };
  const errorFuc = (err) => {
    message.error(`Tạo tài khoản thất bại! ${err}`);
  };
  const onFinish = () => {
    context.dispatch({ type: "ADD_ACCOUNT", payload: dataSuccess });
    CreateAccountApi([dataSuccess], successFuc, errorFuc);
  };

  const onFinishFailed = (e) => {
    message.error("Vui lòng nhập đầy đủ thông tin!");
  };
  return (
    <div className="DeliveryResults">
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} layout="vertical">
        <Form.Item
          name="Account"
          label="Tên đăng nhập"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập!",
            },
          ]}
        >
          <Input onChange={handData} name="Account" placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="Phone"
          label="Số điện thoại"
          tooltip="Dùng để đặt lại mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input onChange={handData} name="Phone" placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name="Password"
          label="Mật Khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password name="Password" onChange={handData} placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["Password"]}
          label="Xác nhận mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("Password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu không khớp!");
              },
            }),
          ]}
        >
          <Input.Password name="confirmPassword" onChange={handData} placeholder="Xác nhận mật khẩu" />
        </Form.Item>
        <Form.Item name="partner" valuePropName="checked">
          <Checkbox
            name="partner"
            onClick={(e) => {
              setShowFormPartner(!!e.target.checked);
            }}
          >
            Đối Tác
          </Checkbox>
        </Form.Item>
        {showFormPartner ? (
          <div className="showForm">
            <Form.Item
              name="partner"
              label="Chọn Đối Tác"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đối tác!",
                },
              ]}
            >
              <Select
                placeholder="Chọn Đối Tác"
                onChange={(e) => {
                  setDataSuccess({ ...dataSuccess, partner: e });
                }}
                allowClear
              >
                <Select.Option value="male"> Đối tác nam</Select.Option>
                <Select.Option value="female">Đối tác nữ</Select.Option>
                <Select.Option value="other">Đối tác chưa rõ giới tính</Select.Option>
              </Select>
            </Form.Item>
          </div>
        ) : (
          ""
        )}
        <Form.Item style={{ textAlign: "end", marginTop: "15px" }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateAccount;
