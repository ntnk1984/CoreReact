import React, { useContext, useEffect, useState } from "react";
import { Select, Steps } from "antd";
import { Form, Input, Button, Row, Col } from "antd";
import { contextValue } from "../App.js";
import { validate } from "../validate.js";
import "./styleCss/CreatOrder.css";
const { Option } = Select;

export default function CreateOrderTwo({ isT }) {
  const context = useContext(contextValue);
  const {
    receivername,
    receiverphone,
    phoneregioncode,
    receiveraddress,
    receiveremail,
    receivercountry,
    receivercity,
    receiverdistrict,
    receiverward,
  } = context.createOrder.receiver;

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

  useEffect(() => {
    if (isT) {
      context.dispatch({ type: "ADD_INFO_RECEIVER", payload: receiverInfo });
      console.log(receiverInfo, "Page Two");
    }
  }, [isT]);

  useEffect(() => {
    context.dispatch({
      type: "ADD_INFO_SENDER",
      payload: receiverInfo,
    });
  }, [receiverInfo]);
  //
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
          <Form.Item
            hasFeedback
            name="receivername"
            rules={[validate.checkRequire(), validate.checkName()]}
            required
          >
            <Row
              justify="between"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <Col span={24}>
                <label>Tên người nhận</label>
              </Col>
              <Col flex="auto" span={24}>
                <Input
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                  name="receivername"
                  placeholder="Vui lòng nhập tên người nhận"
                  defaultValue={receivername}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item
            hasFeedback
            name="receiverphone"
            rules={[validate.checkRequire(), validate.checkPhone()]}
            required
          >
            <Row>
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
                  defaultValue={receiverphone}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item
            hasFeedback
            name="receiveremail"
            rules={[validate.checkRequire(), validate.checkMail()]}
            required
          >
            <Row>
              <Col span={24}>
                <label>Email</label>
              </Col>
              <Col span={24}>
                <Input
                  name="receiveremail"
                  defaultValue={receiveremail}
                  placeholder="Vui lòng nhập Email"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            hasFeedback
            rules={[validate.checkRequire(), validate.checkCodePost()]}
            name="phoneregioncode"
            required
          >
            <Row>
              <Col span={24}>
                <label>Mã bưu chính</label>
              </Col>
              <Col span={24}>
                <Input
                  defaultValue={phoneregioncode}
                  name="phoneregioncode"
                  placeholder="Vui lòng nhập mã bưu chính"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="receiveraddress"
            rules={[validate.checkRequire()]}
            hasFeedback
            required
          >
            <Row>
              <Col span={24}>
                <label>Địa chỉ</label>
              </Col>
              <Col span={24}>
                <Input
                  defaultValue={receiveraddress}
                  name="receiveraddress"
                  placeholder="Vui lòng nhập địa chỉ"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item name="receivercountry" hasFeedback required>
            <Row>
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
              </Col>{" "}
            </Row>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item name="receivercity" hasFeedback required>
            <Row>
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
              </Col>{" "}
            </Row>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item name="receiverdistrict" hasFeedback required>
            {" "}
            <Row>
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
            </Row>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item name="receiverward" hasFeedback required>
            <Row>
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
            </Row>
          </Form.Item>
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
