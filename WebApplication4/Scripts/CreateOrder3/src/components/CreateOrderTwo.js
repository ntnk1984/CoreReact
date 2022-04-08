import React, { useContext, useState } from "react";
import { Select, Steps } from "antd";
import { Form, Input, Button, Row, Col } from "antd";
import { contextValue } from "../App.js";
import { validate } from "../validate.js";
import "./styleCss/CreatOrder.css";
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
    <div
      // layout="vertical"
      className="creatOderForm mt-4 rounded rounded-3 p-3 shadow-sm"
      style={{ background: "white" }}
    >
      <h4
        style={{ textAlign: "center" }}
        className="text-secondary align-center mx-2"
      >
        THÔNG TIN NGƯỜI NHẬN
      </h4>
      <Row justify="space-between">
        <Col span={11}>
          <Row>
            <Form.Item
              hasFeedback
              name="receivername"
              rules={[validate.checkRequire(), validate.checkName()]}
              required
            >
              <Col span={24}>
                <label>Tên người nhận</label>
              </Col>
              <Col span={24}>
                <Input
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                  name="receivername"
                  placeholder="Vui lòng nhập tên người nhận"
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              hasFeedback
              name="receiverphone"
              rules={[validate.checkRequire(), validate.checkPhone()]}
              required
            >
              <Col span={24}>
                <label>Số điện thoại</label>
              </Col>
              <Col span={24}>
                <Input
                  name="receiverphone"
                  placeholder="Vui lòng nhập SĐT"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>

        <Col span={11}>
          <Row>
            <Form.Item
              hasFeedback
              name="receiveremail"
              rules={[validate.checkRequire(), validate.checkMail()]}
              required
            >
              <Col span={24}>
                <label>Email</label>
              </Col>
              <Col span={24}>
                <Input
                  name="receiveremail"
                  placeholder="Vui lòng nhập Email"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              hasFeedback
              rules={[validate.checkRequire(), validate.checkCodePost()]}
              name="phoneregioncode"
              required
            >
              <Col span={24}>
                <label>Mã bưu chính</label>
              </Col>
              <Col span={24}>
                <Input
                  name="phoneregioncode"
                  placeholder="Vui lòng nhập mã bưu chính"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>

        <Col span={24}>
          <Row>
            <Form.Item
              name="receiveraddress"
              rules={[validate.checkRequire()]}
              hasFeedback
              required
            >
              <Col span={24}>
                <label>Địa chỉ</label>
              </Col>
              <Col span={24}>
                <Input
                  name="receiveraddress"
                  placeholder="Vui lòng nhập địa chỉ"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>

        <Col span={11}>
          <Row>
            <Form.Item
              name="receivercountry"
              rules={[validate.checkRequire()]}
              hasFeedback
              required
            >
              <Col span={24}>
                <label>Quốc Gia</label>
              </Col>
              <Col span={24}>
                <Select
                  name="receivercountry"
                  defaultValue="Vui lòng chọn Quốc Gia"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setReceiverInfo({ ...receiverInfo, receivercountry: e });
                  }}
                >
                  <Option value="VN">Việt Nam</Option>
                  <Option value="CAM">Campuchia</Option>
                </Select>
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              name="receivercity"
              rules={[validate.checkRequire()]}
              hasFeedback
              required
            >
              <Col span={24}>
                <label>Thành phố/Tỉnh</label>
              </Col>
              <Col span={24}>
                <Select
                  name="receivercity"
                  defaultValue="Vui lòng chọn TP / Tỉnh"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setReceiverInfo({ ...receiverInfo, receivercity: e });
                  }}
                >
                  <Option value="HCM">Hồ Chí Minh</Option>
                  <Option value="HN">Hà Nội</Option>
                </Select>
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              name="receiverdistrict"
              rules={[validate.checkRequire()]}
              hasFeedback
              required
            >
              <Col span={24}>
                <label>Quận/Huyện</label>
              </Col>
              <Col span={24}>
                <Select
                  name="receiverdistrict"
                  defaultValue="Vui lòng chọn Quận / Huyện"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setReceiverInfo({ ...receiverInfo, receiverdistrict: e });
                  }}
                >
                  <Option value="Q9">Quận 9</Option>
                  <Option value="Q7">Quận 7</Option>
                </Select>
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              name="receiverward"
              rules={[validate.checkRequire()]}
              hasFeedback
              required
            >
              <Col span={24}>
                <label>Phường/Xã</label>
              </Col>
              <Col span={24}>
                <Select
                  name="receiverward"
                  defaultValue="Vui lòng chọn Phường / Xã"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setReceiverInfo({ ...receiverInfo, receiverward: e });
                  }}
                >
                  <Option value="P3">Phường 3</Option>
                  <Option value="P2">Phường 2</Option>
                </Select>
              </Col>
            </Form.Item>
          </Row>
        </Col>

        {/* <Col span={24}>
          <Form.Item hasFeedback className="my-2  ">
            <Button
              style={{ display: "inline-block", width: "100%" }}
              trigger="click"
              type="primary"
              onClick={() => {
                context.dispatch({
                  type: "ADD_INFO_RECEIVER",
                  payload: receiverInfo,
                });
                context.dispatch({ type: "SET_PROGRESS" });
              }}
            >
              Xác Nhận
            </Button>
          </Form.Item>
        </Col> */}
      </Row>
    </div>
  );
}
