import React, { useContext, useState } from "react";
import { Select } from "antd";
import { Form, Input, Button, Row, Col, message } from "antd";
import { contextValue } from "../App.js";
import { validate } from "../validate.js";
import { SendOutlined } from "@ant-design/icons";
import { getCity, getDistrict, getWard } from "../Service.js";

const { Option } = Select;

export default function CreateOrderTwo() {
  const context = useContext(contextValue);
  const temp = context?.createOrder.receiver;

  const countryCode = context?.createOrder.countryCode;

  //GET API Location
  const [cityCode, setCityCode] = useState([]);
  const [districtCode, setDistrictCode] = useState([]);
  const [wardCode, setWardCode] = useState([]);

  // /GET API Location

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
        <div className="d-flex" style={{ paddingLeft: "10px" }}>
          <h4 className="text-secondary px-1">
            <ion-icon className="text-secondary" style={{ fontSize: "20px" }} name="mail-unread-outline"></ion-icon>
            &nbsp;NGƯỜI NHẬN
          </h4>
        </div>

        <Row>
          <Col span={12}>
            <Form.Item
              name="receivername"
              rules={[validate.checkRequire(), validate.checkName()]}
              className="mx-2"
              label="Tên người nhận"
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
                onChange={async (e) => {
                  setReceiverInfo({ ...receiverInfo, receivercountry: e });
                  const city = await getCity(e);
                  setCityCode(city);
                }}
                placeholder="Chọn quốc gia"
                value={receiverInfo.receivercountry ? "Vui lòng chọn" : receiverInfo.receivercountry}
              >
                {countryCode?.map((item, index) => {
                  return (
                    <Option key={item.id} value={item.code}>
                      {item.name}
                    </Option>
                  );
                })}
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
                onChange={async (e) => {
                  setReceiverInfo({ ...receiverInfo, receivercity: e });
                  const District = await getDistrict(receiverInfo.receivercountry, e);
                  setDistrictCode(District);
                }}
              >
                {cityCode?.map((item, index) => {
                  return (
                    <Option key={item.id} value={item.code}>
                      {item.name}
                    </Option>
                  );
                })}
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
                onChange={async (e) => {
                  setReceiverInfo({ ...receiverInfo, receiverdistrict: e });
                  const ward = await getWard(receiverInfo.receivercountry, receiverInfo.receivercity, e);
                  setWardCode(ward);
                }}
              >
                {districtCode?.map((item, index) => {
                  return (
                    <Option key={item.id} value={item.code}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} xl={12} xxl={6}>
            <Form.Item
              rules={[validate.checkRequire()]}
              name="receiverward"
              className="mx-2"
              label="Phường/Xã"
              required
            >
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
                {wardCode?.map((item, index) => {
                  return (
                    <Option key={item.id} value={item.code}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              rules={[validate.checkRequire()]}
              name="receiveraddress"
              className="mx-2"
              label="Địa chỉ"
              required
            >
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
    </div>
  );
}
