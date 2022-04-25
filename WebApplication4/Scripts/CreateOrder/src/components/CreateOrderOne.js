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
  message,
} from "antd";
import { contextValue } from "../App.js";
import { validate } from "../validate.js";

// import { validate } from "../../utils/validate/validate";
// import provinceData from "../../assets/local.json";

const { Option } = Select;

export default function CreateOrderOne() {
  const context = useContext(contextValue);

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    console.log("dispatch",context)

  };

  return (
    <>
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
           
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="senderaddress"
            rules={[validate.checkRequire()]}
            className="mx-2"
            label="Địa chỉ"
            required
          >
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
        <Col span={12}>
          <Form.Item
            name="sendercountry"
            rules={[validate.checkRequire()]}
            className="mx-2"
            label="Quốc gia"
            required
          >
            <Select
              name="sendercountry"
              size="large"
              style={{ width: "100%" }}
              onChange={(e) => {
               
              }}
            
            >
              <Option value="VN">Việt Nam</Option>
              <Option value="CAM">Campuchia</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="sendercity"
            rules={[validate.checkRequire()]}
            className="mx-2"
            label="Thành phố/Tỉnh"
            required
          >
            <Select
              name="sendercity"
              size="large"
              style={{ width: "100%" }}
              onChange={(e) => {
              
              }}
              
            >
              <Option value="P3">Phường 3</Option>
              <Option value="P2">Phường 2</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[validate.checkRequire()]}
            name="senderdistrict"
            className="mx-2"
            label="Quận/Huyện"
            required
          >
            <Select
              name="senderdistrict"
              size="large"
             
              style={{ width: "100%" }}
              onChange={(e) => {
                
              }}
            >
              <Option value="P3">Phường 3</Option>
              <Option value="P2">Phường 2</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[validate.checkRequire()]}
            name="senderward"
            className="mx-2"
            label="Phường/Xã"
            required
          >
            <Select
              name="senderward"
              size="large"
             
              style={{ width: "100%" }}
              onChange={(e) => {
               
              }}
            >
              <Option value="P3">Phường 3</Option>
              <Option value="P2">Phường 2</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
