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
} from "antd";
import { contextValue } from "../App.js";
import { validate } from "../validate.js";

// import { validate } from "../../utils/validate/validate";
// import provinceData from "../../assets/local.json";

const { Option } = Select;

export default function CreateOrderOne() {
  const context = useContext(contextValue);
  const {
    sendername,
    senderphone,
    phoneregioncode,
    senderaddress,
    senderemail,
    sendercountry,
    sendercity,
    senderdistrict,
    senderward,
  } = context.createOrder.sender;

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

  // const [idProvince, setIdProvince] = useState({});

  return (
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
            rules={[validate.checkRequire(), validate.checkName()]}
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
              value={sendername}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="senderphone"
            rules={[validate.checkRequire(), validate.checkPhone()]}
            className="mx-2"
            label="Số điện thoại"
            required
          >
            <Input
              name="senderphone"
              size="large"
              placeholder="Vui lòng nhập"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              defaultValue={senderphone}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="senderemail"
            rules={[validate.checkRequire(), validate.checkMail()]}
            className="mx-2"
            label="Email"
            required
          >
            <Input
              name="senderemail"
              size="large"
              placeholder="Vui lòng nhập"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              defaultValue={senderemail}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phoneregioncode"
            rules={[validate.checkRequire(), validate.checkCodePost()]}
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
              defaultValue={phoneregioncode}
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
              defaultValue={senderaddress}
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
              style={{ width: "100%" }}
              onChange={(e) => {
                setSenderInfo({ ...senderInfo, sendercountry: e });
              }}
              defaultValue={
                sendercountry === "" ? "Vui lòng chọn" : sendercountry
              }
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
              style={{ width: "100%" }}
              onChange={(e) => {
                setSenderInfo({ ...senderInfo, sendercity: e });
              }}
              defaultValue={sendercity === "" ? "Vui lòng chọn" : sendercity}
            >
              <Option value="P3">Phường 3</Option>
              <Option value="P2">Phường 2</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Quận/Huyện" required>
            <Select
              name="senderdistrict"
              size="large"
              defaultValue={
                senderdistrict === "" ? "Vui lòng chọn" : senderdistrict
              }
              style={{ width: "100%" }}
              onChange={(e) => {
                setSenderInfo({ ...senderInfo, senderdistrict: e });
              }}
            >
              <Option value="P3">Phường 3</Option>
              <Option value="P2">Phường 2</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Phường/Xã" required>
            <Select
              name="senderward"
              size="large"
              defaultValue={senderward === "" ? "Vui lòng chọn" : senderward}
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
            console.log("senderInfo", senderInfo);
            context.dispatch({
              type: "ADD_INFO_SENDER",
              payload: senderInfo,
            });
            context.dispatch({ type: "SET_PROGRESS" });
          }}
        >
          Tiếp tục
        </Button>
        <Button
          size="large"
          type=""
          onClick={() => {
            context.dispatch({ type: "SET_PROGRESS_BACK" });
          }}
        >
          Trở lại
        </Button>
      </Form.Item>
    </Form>
  );
}
