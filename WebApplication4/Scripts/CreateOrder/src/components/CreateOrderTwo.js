import React, { useContext, useState } from "react";
import { Select, Steps } from "antd";
import { Form, Input, Button, Row, Col, message } from "antd";
import { contextValue } from "../App.js";
import { validate } from "../validate.js";

const { Option } = Select;

export default function CreateOrderTwo() {
  const context = useContext(contextValue);
  const temp = context?.createOrder.receiver;
  const [receiverInfo, setReceiverInfo] = useState({
    receivername: temp.receivername,
    receiverphone: temp.receiverphone,
    phoneregioncode: temp.phoneregioncode,
    receiveraddress: temp.receiveraddress,
    receiveremail: temp.receiveremail,
    receivercountry: temp.receivercountry,
    receivercity: temp.receivercity,
    receiverdistrict: temp.receiverdistrict,
    receiverward: temp.receiverward,
  });

  /*4.5.20 khởi tạo initialValues */
  const initForm = {
    receivername: receiverInfo.receivername,
    receiverphone: receiverInfo.receiverphone,
    phoneregioncode: receiverInfo.phoneregioncode,
    receiveraddress: receiverInfo.receiveraddress,
    receiveremail: receiverInfo.receiveremail,
    receivercountry: receiverInfo.receivercountry,
    receivercity: receiverInfo.receivercity,
    receiverdistrict: receiverInfo.receiverdistrict,
    receiverward: receiverInfo.receiverward,
  };

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setReceiverInfo({ ...receiverInfo, [name]: value });
  };

  /*4.5.20 xử lý submit form  */
  const onFinish = () => {
    context.dispatch({
      type: "ADD_INFO_RECEIVER",
      payload: receiverInfo,
    });
    context.dispatch({ type: "SET_PROGRESS" });
  };

  const onFinishFailed = () => {
    message.error("Vui lòng nhập đầy đủ thông tin");
  };

  return (
    <Form
      size="small"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initForm}
      layout="vertical"
      className=" rounded rounded-3 p-3 shadow-sm"
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
              placeholder="Vui lòng nhập"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="receivername"
              size="middle"
              value={receiverInfo.receivername}
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
              size="middle"
              placeholder="Vui lòng nhập"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              value={receiverInfo.receiverphone}
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
              size="middle"
              placeholder="Vui lòng nhập"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              value={receiverInfo.receiveremail}
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
              size="middle"
              placeholder="Vui lòng nhập"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              value={receiverInfo.phoneregioncode}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item rules={[validate.checkRequire()]} name="receiveraddress" className="mx-2" label="Địa chỉ" required>
            <Input
              name="receiveraddress"
              size="middle"
              placeholder="Vui lòng nhập"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              value={receiverInfo.receiveraddress}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col md={12} xl={12} xxl={6}>
          <Form.Item
            rules={[validate.checkRequire()]}
            name="receivercountry"
            className="mx-2"
            label="Quốc gia"
            required
          >
            <Select
              name="receivercountry"
              size="middle"
              style={{ width: "100%" }}
              onChange={(e) => {
                setReceiverInfo({ ...receiverInfo, receivercountry: e });
              }}
              placeholder="Chọn quốc gia"
              value={receiverInfo.receivercountry ? "Vui lòng chọn" : receiverInfo.receivercountry}
            >
              <Option value="VN">Việt Nam</Option>
              <Option value="CAM">Campuchia</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12} xl={12} xxl={6}>
          <Form.Item
            rules={[validate.checkRequire()]}
            name="receivercity"
            className="mx-2"
            label="Thành phố/Tỉnh"
            required
          >
            <Select
              name="receivercity"
              size="middle"
              placeholder="Chọn tỉnh / thành phố"
              value={receiverInfo.receivercity ? "Vui lòng chọn" : receiverInfo.receivercity}
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
        <Col md={12} xl={12} xxl={6}>
          <Form.Item
            rules={[validate.checkRequire()]}
            name="receiverdistrict"
            className="mx-2"
            label="Quận/Huyện"
            required
          >
            <Select
              placeholder="Chọn quận / huyện"
              name="receiverdistrict"
              size="middle"
              value={receiverInfo.receiverdistrict ? "Vui lòng chọn" : receiverInfo.receivercity}
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
        <Col md={12} xl={12} xxl={6}>
          <Form.Item rules={[validate.checkRequire()]} name="receiverward" className="mx-2" label="Phường/Xã" required>
            <Select
              placeholder="Chọn xã / phường"
              name="receiverward"
              size="middle"
              value={receiverInfo.receiverward ? "Vui lòng chọn" : receiverInfo.receivercity}
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
      <Row justify="end">
        <Button
          id="FormTwo"
          style={{ display: "none" }}
          trigger="click"
          className="mx-2"
          size="middle"
          type="primary"
          htmlType="submit"
        >
          Tiếp tục
        </Button>
      </Row>
    </Form>
  );
}
