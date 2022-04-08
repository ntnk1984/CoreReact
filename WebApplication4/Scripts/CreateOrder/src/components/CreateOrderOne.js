import React, { useContext, useState } from "react";

import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Dropdown,
  Menu,
  Select,
  Alert,
  InputNumber,
} from "antd";

// import { contextValue } from "../../pages/CreateOrder";
// import { validate } from "../../utils/validate/validate";
// const { Option } = Select;

export default function CreateOrderOne() {
  //   const context = useContext(contextValue);

  const [senderInfo, setSenderInfo] = useState({
    sendername: undefined,
    senderphone: undefined,
    phoneregioncode: undefined,
    senderaddress: undefined,
    senderemail: undefined,
    sendercountry: undefined,
    sendercity: undefined,
    senderdistrict: undefined,
    senderward: undefined,
  });

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setSenderInfo({ ...senderInfo, [name]: value });
  };

  return (
    <div className="main  " style={{ margin: "0 auto", width: "820px" }}>
      <Form
        layout="vertical"
        className="mt-4 rounded rounded-3 p-3 shadow-sm"
        style={{ background: "white" }}
      >
        <h4 className="text-secondary mx-2">THÔNG TIN NGƯỜI GỬI</h4>
        <Row>
          <Col span={12}>
            <Form.Item
              name="sendername"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              className="mx-2"
              label="Tên người gửi"
              required
            >
              <Input
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                name="sendername"
                size="large"
                placeholder="Vui lòng nhập"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className="mx-2" label="Số điện thoại" required>
              <Input
                name="senderphone"
                size="large"
                placeholder="Vui lòng nhập"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item className="mx-2" label="Email" required>
              <Input
                name="senderemail"
                size="large"
                placeholder="Vui lòng nhập"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className="mx-2" label="Mã bưu chính" required>
              <Input
                name="phoneregioncode"
                size="large"
                placeholder="Vui lòng nhập"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item className="mx-2" label="Địa chỉ" required>
              <Input
                name="senderaddress"
                size="large"
                placeholder="Vui lòng nhập"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item className="mx-2" label="Quốc gia" required>
              <Select
                name="sendercountry"
                size="large"
                defaultValue="Vui lòng chọn"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setSenderInfo({ ...senderInfo, sendercountry: e });
                }}
              >
                <Option value="VN">Việt Nam</Option>
                <Option value="CAM">Campuchia</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item className="mx-2" label="Thành phố/Tỉnh" required>
              <Select
                name="sendercity"
                size="large"
                defaultValue="Vui lòng chọn"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setSenderInfo({ ...senderInfo, sendercity: e });
                }}
              >
                <Option value="HCM">Hồ Chí Minh</Option>
                <Option value="HN">Hà Nội</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item className="mx-2" label="Quận/Huyện" required>
              <Select
                name="senderdistrict"
                size="large"
                defaultValue="Vui lòng chọn"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setSenderInfo({ ...senderInfo, senderdistrict: e });
                }}
              >
                <Option value="Q9">Quận 9</Option>
                <Option value="Q7">Quận 7</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item className="mx-2" label="Phường/Xã" required>
              <Select
                name="senderward"
                size="large"
                defaultValue="Vui lòng chọn"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setSenderInfo({ ...senderInfo, senderward: e });
                }}
              >
                <Option value="P3">Phường 3</Option>
                <Option value="P2">Phường 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="my-2 ">
          <Button
            trigger="click"
            className="mx-2"
            size="large"
            type="primary"
            onClick={() => {
              context.dispatch({
                type: "ADD_INFO_SENDER",
                payload: senderInfo,
              });
              context.dispatch({ type: "SET_PROGRESS" });
            }}
          >
            Tiếp tục
          </Button>
          <Button size="large" type="">
            Trở lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
