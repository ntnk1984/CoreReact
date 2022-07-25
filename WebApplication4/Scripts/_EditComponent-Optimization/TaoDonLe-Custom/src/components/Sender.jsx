import React, { useState } from "react";

import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { getCity, getDistrict, getWard } from "../Service.js";

const { Option } = Select;

export default function Sender(props) {
  const { countryCode,handleDatas } = props;
  const [sender, setSender] = useState({
    Name: "",
    Phone: "",
    Email: "",
    CountryCode: "",
    CityCode: "",
    DistrictCode: "",
    WardCode: "",
    PostalCode: "",
    Address: "",
  });
  const [senderValidate, setSenderValidate] = useState({
    Name: "",
    Phone: "",
    Email: "",
    CountryCode: "",
    CityCode: "",
    DistrictCode: "",
    WardCode: "",
    PostalCode: "",
    Address: "",
  });
  //GET API Location
  const [cityCode, setCityCode] = useState([]);
  const [districtCode, setDistrictCode] = useState([]);
  const [wardCode, setWardCode] = useState([]);

  // /GET API Location

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setSender({ ...sender, [name]: value });
    if (value) {
      setSenderValidate({ ...senderValidate, [name]: "" });
    } else {
      setSender({ ...sender, [name]: "" });
      setSenderValidate({ ...senderValidate, [name]: "Vui lòng Nhập" });
    }
  };
  const handleSubmitForm = () => {
    console.log(sender, " sender");
    let valid = true;
    Object.keys(sender).forEach((key) => {
      // console.log(senderValidate[key]," validate key");
      if (sender[key] === "") {
        console.log(key, " key");
        setSenderValidate((pre) => ({
          ...pre,
          [key]: "Vui Lòng Nhập",
        }));
        valid = false;
      }
    });
    if (valid) {
      console.log("sender", sender);
     handleDatas("SENDER", sender)
    }
  };
  const onFinish = () => {
    console.log(sender, " sender info");
  };
  const onFinishFailed = () => {
    message.error("Vui lòng nhập đầy đủ thông tin");
    console.log("Submit Data");
  };
  // console.log(sender,"sender info");
  return (
    <div className="CustomFormInput">
      <Form
        size="small"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className=" rounded rounded-3 p-3 shadow-sm"
        style={{ background: "white" }}
      >
        <div className="d-flex" style={{ paddingLeft: "10px" }}>
          <h4 id="onePage" className="text-secondary mx-1">
            <ion-icon className="text-secondary " style={{ fontSize: "20px" }} name="send-outline"></ion-icon>
            &nbsp;NGƯỜI GỬI
          </h4>
        </div>
        <Row>
          <Col span={12}>
            <Form.Item
              name="Name"
              className="mx-2"
              label="Tên người gửi"
              required
              onChange={(e) => {
                handleChangeVal(e);
              }}
              help={
                senderValidate.Name && <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập người gửi!</span>
              }
            >
              <Input
                status={senderValidate.Name ? "error" : "default"}
                name="Name"
                size="middle"
                placeholder="Vui lòng nhập tên"
                value={sender.Name}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={
                senderValidate.Phone && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập số điện thoại!</span>
                )
              }
              name="Phone"
              className="mx-2"
              label="Số điện thoại"
              required
            >
              <Input
                name="Phone"
                status={senderValidate.Phone ? "error" : "default"}
                size="middle"
                placeholder="Vui lòng nhập SĐT"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={sender.Phone}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              help={
                senderValidate.Phone && <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập Email!</span>
              }
              name="Email"
              className="mx-2"
              label="Email"
              required
            >
              <Input
                name="Email"
                status={senderValidate.Email ? "error" : "default"}
                size="middle"
                placeholder="Vui lòng nhập email"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={sender.Email}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={
                senderValidate.PostalCode && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập số mã bưu chính</span>
                )
              }
              name="PostalCode"
              className="mx-2"
              label="Mã bưu chính"
              required
            >
              <Input
                status={senderValidate.PostalCode ? "error" : "default"}
                name="PostalCode"
                size="middle"
                placeholder="Vui lòng nhập mã Bưu chính"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={sender.PostalCode}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col md={12} lg={12} xl={12} xxl={6}>
            <Form.Item
              help={
                senderValidate.CountryCode && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng chọn quốc gia !</span>
                )
              }
              name="CountryCode"
              className="mx-2"
              label="Quốc gia"
              required
            >
              <Select
                status={senderValidate.CountryCode ? "error" : "default"}
                name="CountryCode"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn quốc gia"
                onChange={async (e) => {
                  setSender({ ...sender, CountryCode: e });
                  setSenderValidate({ ...senderValidate, CountryCode: "" });
                  const city = await getCity(e);
                  setCityCode(city);
                }}
                value={sender.CountryCode ? "Vui lòng chọn" : sender.CountryCode}
              >
                {countryCode?.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} lg={12} xl={12} xxl={6}>
            <Form.Item
              help={
                senderValidate.CityCode && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng chọn Tỉnh / TP !</span>
                )
              }
              name="CityCode"
              className="mx-2"
              label="Thành phố/Tỉnh"
              required
            >
              <Select
                status={senderValidate.CityCode ? "error" : "default"}
                name="CityCode"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn tỉnh / thành phố"
                onChange={async (e) => {
                  setSender({ ...sender, CityCode: e });
                  setSenderValidate({ ...senderValidate, CityCode: "" });
                  const District = await getDistrict(sender.CountryCode, e);
                  setDistrictCode(District);
                }}
                value={sender.CityCode ? "Vui lòng chọn" : sender.CityCode}
              >
                {cityCode?.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} lg={12} xl={12} xxl={6}>
            <Form.Item
              help={
                senderValidate.DistrictCode && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng chọn Quận / Huyện !</span>
                )
              }
              name="DistrictCode"
              className="mx-2"
              label="Quận/Huyện"
              required
            >
              <Select
                status={senderValidate.DistrictCode ? "error" : "default"}
                name="DistrictCode"
                size="middle"
                placeholder="Chọn quận / huyện"
                value={sender.DistrictCode ? "Vui lòng chọn" : sender.DistrictCode}
                style={{ width: "100%" }}
                onChange={async (e) => {
                  setSender({ ...sender, DistrictCode: e });
                  setSenderValidate({ ...senderValidate, DistrictCode: "" });

                  const ward = await getWard(sender.CountryCode, sender.CityCode, e);
                  setWardCode(ward);
                }}
              >
                {districtCode?.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} lg={12} xl={12} xxl={6}>
            <Form.Item
              help={
                senderValidate.WardCode && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng chọn Xã/ Phường !</span>
                )
              }
              name="WardCode"
              className="mx-2"
              label="Phường/Xã"
              required
            >
              <Select
                status={senderValidate.WardCode ? "error" : "default"}
                name="WardCode"
                size="middle"
                placeholder="Chọn xã / phường"
                value={sender.WardCode ? "Vui lòng chọn" : sender.WardCode}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setSenderValidate({ ...senderValidate, WardCode: "" });

                  setSender({ ...sender, WardCode: e });
                }}
              >
                {wardCode?.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={
                senderValidate.Address && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập địa chỉ !</span>
                )
              }
              name="Address"
              className="mx-2"
              label="Địa chỉ"
              required
            >
              <Input
                status={senderValidate.Address ? "error" : "default"}
                name="Address"
                size="middle"
                placeholder="Vui lòng nhập địa chỉ"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={sender.Address}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button
            // style={{ display: "none" }}
            id="FormOne"
            trigger="click"
            className="mx-2"
            size="middle"
            // type="primary"
            // htmlType="submit"
            onClick={handleSubmitForm}
          >
            Tiếp tục
          </Button>
        </Row>
      </Form>
    </div>
  );
}
