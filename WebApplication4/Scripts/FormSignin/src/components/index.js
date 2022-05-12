import { Button, Checkbox, Col, Form, Input, message, Row, Select, Tabs } from "antd";
import React, { useContext, useRef, useState } from "react";
import { contextValue } from "../App";
import { validate } from "../validate";
import "./Style/index.css";

function CreateAccount(props) {
  const context = useContext(contextValue);
  const { account } = context.createAccount;
  const typingTimesOutRef = useRef(null);
  // console.log(account, "context");
  const [dataSuccess, setDataSuccess] = useState({
    userName: "",
    numberPhone: "",
    password: "",
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

  const onFinish = () => {
    console.log("THành Công");
    context.dispatch({ type: "ADD_ACCOUNT", payload: dataSuccess });
    // console.log(dataSuccess, "dataSS");
    message.success("Thêm tài khoản thành công!");
  };

  const onFinishFailed = (e) => {
    message.error("Vui lòng nhập đầy đủ thông tin!");
    console.log("THất Bại", e);
  };
  // console.log(account, "acc");
  return (
    <div className="DeliveryResults">
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} layout="vertical">
        <Form.Item
          name="userName"
          label="Tên đăng nhập"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập!",
            },
          ]}
        >
          <Input onChange={handData} name="userName" placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="numberPhone"
          label="Số điện thoại"
          tooltip="Dùng để đặt lại mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input onChange={handData} name="numberPhone" placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật Khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password name="password" onChange={handData} placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          label="Xác nhận mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
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
              // console.log(e.target.checked);
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
