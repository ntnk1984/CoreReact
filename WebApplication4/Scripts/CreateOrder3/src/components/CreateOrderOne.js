import React, { useContext, useEffect, useState } from "react";

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
import "./styleCss/CreatOrder.css";

const { Option } = Select;

export default function CreateOrderOne({ isT }) {
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

  // const [isDisplayOne, setDisplayOne] = useState(false);

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setSenderInfo({ ...senderInfo, [name]: value });
  };

  useEffect(() => {
    if (isT) {
      context.dispatch({ type: "HANDLE_SUBMIT_SENDER", payload: senderInfo });
      console.log(senderInfo, "Page One");
      // console.log("SUbmit One Page");
    }
  }, [isT]);

  useEffect(() => {
    context.dispatch({
      type: "ADD_INFO_SENDER",
      payload: senderInfo,
    });
  }, [senderInfo]);

  console.log("log1", senderInfo);

  return (
    <div
      layout="vertical"
      className="creatOderForm mt-4 rounded rounded-3 p-3 shadow-sm"
      style={{ background: "white" }}
    >
      <h4
        style={{ textAlign: "center" }}
        className="css-color text-secondary mx-2"
      >
        THÔNG TIN NGƯỜI GỬI
      </h4>
      <Row justify="space-between">
        <Col flex="auto" span={11}>
          <Form.Item
            hasFeedback
            name="sendername"
            rules={[validate.checkRequire(), validate.checkName()]}
            required
          >
            <Row
              justify="between"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <Col span={24}>
                <label>Tên Người Gửi</label>
              </Col>
              <Col flex="auto" span={24}>
                <Input
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                  name="sendername"
                  placeholder="Vui lòng nhập tên người gửi"
                  defaultValue={sendername}
                />
              </Col>{" "}
            </Row>
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item
            hasFeedback
            name="senderphone"
            rules={[validate.checkRequire(), validate.checkPhone()]}
            required
          >
            <Row>
              <Col span={24}>
                <label>Số điện thoại</label>
              </Col>
              <Col span={24}>
                <Input
                  name="senderphone"
                  placeholder="Vui lòng nhập SĐT"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                  defaultValue={senderphone}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>
        {/* fill 2 */}

        <Col span={11}>
          <Form.Item
            hasFeedback
            name="senderemail"
            rules={[validate.checkRequire(), validate.checkMail()]}
            required
          >
            <Row>
              <Col span={24}>
                <label>Email</label>
              </Col>
              <Col span={24}>
                <Input
                  name="senderemail"
                  placeholder="Vui lòng nhập Email"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                  defaultValue={senderemail}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            hasFeedback
            name="phoneregioncode"
            rules={[validate.checkRequire(), validate.checkCodePost()]}
            required
          >
            <Row>
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
                  defaultValue={phoneregioncode}
                />
              </Col>{" "}
            </Row>
          </Form.Item>
        </Col>
        {/* fill 3 */}
        <Col span={24}>
          <Form.Item
            rules={[validate.checkRequire()]}
            hasFeedback
            name="senderaddress"
            required
          >
            <Row>
              <Col span={24}>
                <label>Địa chỉ</label>
              </Col>
              <Col span={24}>
                <Input
                  name="senderaddress"
                  placeholder="Vui lòng nhập địa chỉ"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                  defaultValue={senderaddress}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>
        {/* fill 4 */}
        <Col span={11}>
          <Form.Item name="sendercountry" hasFeedback required>
            <Row>
              <Col span={24}>
                <label>Quốc gia</label>
              </Col>
              <Col span={24}>
                <Select
                  name="sendercountry"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setSenderInfo({ ...senderInfo, sendercountry: e });
                  }}
                  defaultValue={
                    sendercountry === ""
                      ? "Vui lòng chọn Quốc Gia"
                      : sendercountry
                  }
                >
                  <Option value="VN">Việt Nam</Option>
                  <Option value="CAM">Campuchia</Option>
                </Select>
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item name="sendercity" hasFeedback required>
            <Row>
              <Col span={24}>
                <label>Thành phố/Tỉnh</label>
              </Col>
              <Col span={24}>
                <Select
                  name="sendercity"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setSenderInfo({ ...senderInfo, sendercity: e });
                  }}
                  defaultValue={
                    sendercity === "" ? "Vui lòng chọn TP / Tỉnh" : sendercity
                  }
                >
                  <Option value="P3">Phường 3</Option>
                  <Option value="P2">Phường 2</Option>
                </Select>
              </Col>{" "}
            </Row>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item name="senderdistrict" hasFeedback required>
            {" "}
            <Row>
              <Col span={24}>
                <label>Quận/Huyện</label>
              </Col>
              <Col span={24}>
                <Select
                  name="senderdistrict"
                  defaultValue={
                    senderdistrict === ""
                      ? "Vui lòng chọn Quận Huyện"
                      : senderdistrict
                  }
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setSenderInfo({ ...senderInfo, senderdistrict: e });
                  }}
                >
                  <Option value="P3">Phường 3</Option>
                  <Option value="P2">Phường 2</Option>
                </Select>
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item name="senderward" hasFeedback required>
            {" "}
            <Row>
              <Col span={24}>
                <label>Phường/Xã</label>
              </Col>
              <Col span={24}>
                <Select
                  name="senderward"
                  defaultValue={
                    senderward === "" ? "Vui lòng chọn Phường / Xã" : senderward
                  }
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setSenderInfo({ ...senderInfo, senderward: e });
                  }}
                >
                  <Option value="P3">Phường 3</Option>
                  <Option value="P2">Phường 2</Option>
                </Select>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
