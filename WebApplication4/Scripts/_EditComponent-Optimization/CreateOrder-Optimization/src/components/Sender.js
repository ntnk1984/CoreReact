import React, { useContext, useEffect, useState } from "react";

import { Form, Input, Button, Row, Col, Select, message } from "antd";
import { contextValue } from "../App.js";
import { RexName, validate } from "../validate.js";
import { SendOutlined } from "@ant-design/icons";
import { getCity, getDistrict, getWard } from "../Service.js";

const { Option } = Select;

export default function CreateOrderOne(props) {

  const {countryCode} =props
  const [sender, setSender] = useState({
    Name: "",
    Phone: "",
    Email:"",
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
  };
  const onFinish = () => {
  //   context.dispatch({
  //     type: "ADD_INFO_SENDER",
  //     payload: sender,
  //   });
  //   context.dispatch({
  //     type: "CHECKDATA_REQUEST",
  //     payload: true,
  //   });
  //   context.dispatch({ type: "SET_PROGRESS" });
  };
  const onFinishFailed = () => {
    message.error("Vui lòng nhập đầy đủ thông tin");
    context.dispatch({
      type: "CHECKDATA_REQUEST",
      payload: false,
    });
  console.log("Submit Data");
  };


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
            >
              <Input name="Name" size="middle" placeholder="Vui lòng nhập tên" value={sender.Name} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Phone"
              className="mx-2"
              label="Số điện thoại"
              required
            >
              <Input
                name="Phone"
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
              name="Email"
              className="mx-2"
              label="Email"
              required
            >
              <Input
                name="Email"
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
              name="PostalCode"
              className="mx-2"
              label="Mã bưu chính"
              required
            >
              <Input
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
              name="CountryCode"
              className="mx-2"
              label="Quốc gia"
              required
            >
              <Select
                name="CountryCode"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn quốc gia"
                onChange={async (e) => {
                  setSender({ ...sender, CountryCode: e });
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
              name="CityCode"
             
              className="mx-2"
              label="Thành phố/Tỉnh"
              required
            >
              <Select
                name="CityCode"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn tỉnh / thành phố"
                onChange={async (e) => {
                  setSender({ ...sender, CityCode: e });
                  const District = await getDistrict(sender.sendercountry, e);
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
              name="DistrictCode"
              className="mx-2"
              label="Quận/Huyện"
              required
            >
              <Select
                name="DistrictCode"
                size="middle"
                placeholder="Chọn quận / huyện"
                value={sender.DistrictCode ? "Vui lòng chọn" : sender.DistrictCode}
                style={{ width: "100%" }}
                onChange={async (e) => {
                  setSender({ ...sender, DistrictCode: e });
                  const ward = await getWard(sender.sendercountry, sender.sendercity, e);
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
            <Form.Item  name="WardCode" className="mx-2" label="Phường/Xã" required>
              <Select
                name="WardCode"
                size="middle"
                placeholder="Chọn xã / phường"
                defaultValue={sender.WardCode ? "Vui lòng chọn" : sender.WardCode}
                style={{ width: "100%" }}
                onChange={(e) => {
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
            <Form.Item name="Address"  className="mx-2" label="Địa chỉ" required>
              <Input
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
