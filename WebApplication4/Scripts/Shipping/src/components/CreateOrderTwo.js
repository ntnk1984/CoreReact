import React, { useContext, useState } from "react";
import { Select, Steps } from "antd";
import { Form, Input, Button, Row, Col } from "antd";
import { contextValue } from "../App.js";
import { validate } from "../validate.js";

const { Option } = Select;

export default function CreateOrderTwo() {
  const context = useContext(contextValue);

  const [receiverInfo, setReceiverInfo] = useState({
    receivername: undefined,
    receiverphone: undefined,
    phoneregioncode: undefined,
    receiveraddress: undefined,
    receiveremail: undefined,
    receivercountry: undefined,
    receivercity: undefined,
    receiverdistrict: undefined,
    receiverward: undefined,
  });

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setReceiverInfo({ ...receiverInfo, [name]: value });
  };
  return (
    <Form
      layout="vertical"
      className="mt-4 rounded rounded-3 p-3 shadow-sm"
      style={{ background: "white" }}
    >
      <h4 className="text-secondary mx-2">THÔNG TIN NGƯỜI NHẬN</h4>
      <Row>
        <Col span={12}>
          <Form.Item
            name="receivername"
            rules={[validate.checkRequire(), validate.checkName()]}
            className="mx-2"
            label="Tên người gửi"
            required
          >
            <Input
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="receivername"
              size="large"
              placeholder="Vui lòng nhập"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="receiverphone"
            rules={[validate.checkRequire(), validate.checkPhone()]}
            className="mx-2"
            label="Số điện thoại"
            required
          >
            <Input
              name="receiverphone"
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
          <Form.Item
            name="receiveremail"
            rules={[validate.checkRequire(), validate.checkMail()]}
            className="mx-2"
            label="Email"
            required
          >
            <Input
              name="receiveremail"
              size="large"
              placeholder="Vui lòng nhập"
              onChange={(e) => {
                handleChangeVal(e);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[validate.checkRequire(), validate.checkCodePost()]}
            name="phoneregioncode"
            className="mx-2"
            label="Mã bưu chính"
            required
          >
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
              name="receiveraddress"
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
              name="receivercountry"
              size="large"
              defaultValue="Vui lòng chọn"
              style={{ width: "100%" }}
              onChange={(e) => {
                setReceiverInfo({ ...receiverInfo, receivercountry: e });
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
              name="receivercity"
              size="large"
              defaultValue="Vui lòng chọn"
              style={{ width: "100%" }}
              onChange={(e) => {
                setReceiverInfo({ ...receiverInfo, receivercity: e });
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
              name="receiverdistrict"
              size="large"
              defaultValue="Vui lòng chọn"
              style={{ width: "100%" }}
              onChange={(e) => {
                setReceiverInfo({ ...receiverInfo, receiverdistrict: e });
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
              name="receiverward"
              size="large"
              defaultValue="Vui lòng chọn"
              style={{ width: "100%" }}
              onChange={(e) => {
                setReceiverInfo({ ...receiverInfo, receiverward: e });
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
              type: "ADD_INFO_RECEIVER",
              payload: receiverInfo,
            });
            context.dispatch({ type: "SET_PROGRESS" });
          }}
        >
          Tiếp tục
        </Button>
        <Button size="large" type=""  onClick={() => {
          
          context.dispatch({ type: "SET_PROGRESS_BACK" });
        }}>
        Trở lại
      </Button>
      </Form.Item>
    </Form>
  );
}
