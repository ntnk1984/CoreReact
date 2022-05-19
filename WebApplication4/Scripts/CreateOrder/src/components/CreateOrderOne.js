import React, { useContext, useState } from "react";

import { Form, Input, Button, Row, Col, Select, message } from "antd";
import { contextValue } from "../App.js";
import { RexName, validate } from "../validate.js";

// import { validate } from "../../utils/validate/validate";
// import provinceData from "../../assets/local.json";

const { Option } = Select;

export default function CreateOrderOne() {
  const context = useContext(contextValue);
  const temp = context?.createOrder.sender;
  const [senderInfo, setSenderInfo] = useState({
    sendername: temp.sendername,
    senderphone: temp.senderphone,
    phoneregioncode: temp.phoneregioncode,
    senderaddress: temp.senderaddress,
    senderemail: temp.senderemail,
    sendercountry: temp.sendercountry,
    sendercity: temp.sendercity,
    senderdistrict: temp.senderdistrict,
    senderward: temp.senderward,
  });
  // console.log(senderInfo, senderInfo.sendercountry);
  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setSenderInfo({ ...senderInfo, [name]: value });
  };
  // console.log(temp, "Log temp");
  /*4.5.20 khởi tạo initialValues */

  const initForm = {
    sendername: senderInfo.sendername,
    senderphone: senderInfo.senderphone,
    phoneregioncode: senderInfo.phoneregioncode,
    senderaddress: senderInfo.senderaddress,
    senderemail: senderInfo.senderemail,
    sendercountry: senderInfo.sendercountry,
    sendercity: senderInfo.sendercity,
    senderdistrict: senderInfo.senderdistrict,
    senderward: senderInfo.senderward,
  };

  /*4.5.20 xử lý submit form  */
  const onFinish = () => {
    context.dispatch({
      type: "ADD_INFO_SENDER",
      payload: senderInfo,
    });
    context.dispatch({
      type: "CHECKDATA_REQUEST",
      payload: true,
    });
    context.dispatch({ type: "SET_PROGRESS" });
  };

  const onFinishFailed = () => {
    message.error("Vui lòng nhập đầy đủ thông tin");
    context.dispatch({
      type: "CHECKDATA_REQUEST",
      payload: false,
    });
  };
  // console.log(senderInfo, " SenDer");
  return (
    <div className="CustomFormInput">
      <Form
        size="small"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initForm}
        layout="vertical"
        className=" rounded rounded-3 p-3 shadow-sm"
        style={{ background: "white" }}
      >
        <h4 id="onePage" className="text-secondary mx-2">
          THÔNG TIN NGƯỜI GỬI
        </h4>
        <Row>
          <Col span={12}>
            <Form.Item
              name="sendername"
              rules={[validate.checkRequire(), validate.checkName()]}
              className="mx-2"
              label="Tên người gửi"
              required
              onChange={(e) => {
                // console.log(e);
                handleChangeVal(e);
              }}
            >
              <Input name="sendername" size="middle" placeholder="Vui lòng nhập tên" value={senderInfo.sendername} />
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
                size="middle"
                placeholder="Vui lòng nhập SĐT"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={senderInfo.senderphone}
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
                size="middle"
                placeholder="Vui lòng nhập email"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={senderInfo.senderemail}
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
                size="middle"
                placeholder="Vui lòng nhập mã Bưu chính"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={senderInfo.phoneregioncode}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="senderaddress" rules={[validate.checkRequire()]} className="mx-2" label="Địa chỉ" required>
              <Input
                name="senderaddress"
                size="middle"
                placeholder="Vui lòng nhập địa chỉ"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={senderInfo.senderaddress}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12} xl={12} xxl={6}>
            <Form.Item
              name="sendercountry"
              rules={[validate.checkRequire()]}
              className="mx-2"
              label="Quốc gia"
              required
            >
              <Select
                name="sendercountry"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn quốc gia"
                onChange={(e) => {
                  setSenderInfo({ ...senderInfo, sendercountry: e });
                }}
                value={senderInfo.sendercountry ? "Vui lòng chọn" : senderInfo.sendercountry}
              >
                <Option value="VN">Việt Nam</Option>
                <Option value="CAM">Campuchia</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} lg={12} xl={12} xxl={6}>
            <Form.Item
              name="sendercity"
              rules={[validate.checkRequire()]}
              className="mx-2"
              label="Thành phố/Tỉnh"
              required
            >
              <Select
                name="sendercity"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn tỉnh / thành phố"
                onChange={(e) => {
                  setSenderInfo({ ...senderInfo, sendercity: e });
                }}
                value={senderInfo.sendercity ? "Vui lòng chọn" : senderInfo.sendercity}
              >
                <Option value="P3">Phường 3</Option>
                <Option value="P2">Phường 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} lg={12} xl={12} xxl={6}>
            <Form.Item
              rules={[validate.checkRequire()]}
              name="senderdistrict"
              className="mx-2"
              label="Quận/Huyện"
              required
            >
              <Select
                name="senderdistrict"
                size="middle"
                placeholder="Chọn quận / huyện"
                value={senderInfo.senderdistrict ? "Vui lòng chọn" : senderInfo.senderdistrict}
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
          <Col md={12} lg={12} xl={12} xxl={6}>
            <Form.Item rules={[validate.checkRequire()]} name="senderward" className="mx-2" label="Phường/Xã" required>
              <Select
                name="senderward"
                size="middle"
                placeholder="Chọn xã / phường"
                defaultValue={senderInfo.senderward ? "Vui lòng chọn" : senderInfo.senderward}
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
        <Row justify="end">
          <Button
            style={{ display: "none" }}
            id="FormOne"
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
    </div>
  );
}
