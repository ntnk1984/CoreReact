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

  const [isDisplayOne, setDisplayOne] = useState(false);

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setSenderInfo({ ...senderInfo, [name]: value });
  };

  useEffect(() => {
    if (isT) {
      context.dispatch({ type: "HANDLE_SUBMIT_SENDER", payload: senderInfo });
      console.log(senderInfo, "Page One");
    }
  }, [isT]);

  // const handleSubmit = (e) => {
  //   // console.log("senderInfo", senderInfo);
  //   console.log(e, "Log event");
  //   setDisplayOne(true);
  //   context.dispatch({
  //     type: "ADD_INFO_SENDER",
  //     payload: senderInfo,
  //   });
  //   context.dispatch({ type: "SET_PROGRESS" });
  // };
  const onFinish = (e) => {};
  const onFinishFailed = (e) => {};

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
          <Row
            justify="between"
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            <Form.Item
              hasFeedback
              name="sendername"
              rules={[validate.checkRequire(), validate.checkName()]}
              // label="Tên người gửi"
              required
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
                  placeholder="Vui lòng nhập tên "
                  value={sendername}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexFlow: "nowrap",
              }}
              hasFeedback
              name="senderphone"
              rules={[validate.checkRequire(), validate.checkPhone()]}
              // label="Số điện thoại"
              required
            >
              <Col span={24}>
                <label>Số điện thoại</label>
              </Col>
              <Col span={24}>
                {" "}
                <Input
                  style={{ flex: "1 0" }}
                  name="senderphone"
                  placeholder="Vui lòng nhập SĐT"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                  defaultValue={senderphone}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        {/* fill 2 */}

        <Col span={11}>
          <Row>
            <Form.Item
              hasFeedback
              name="senderemail"
              rules={[validate.checkRequire(), validate.checkMail()]}
              // label="Email"
              required
            >
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
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              hasFeedback
              name="phoneregioncode"
              rules={[validate.checkRequire(), validate.checkCodePost()]}
              // label="Mã bưu chính"
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
                  defaultValue={phoneregioncode}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        {/* fill 3 */}
        <Col span={24}>
          <Row>
            <Form.Item
              rules={[validate.checkRequire()]}
              hasFeedback
              name="senderaddress"
              // label="Địa chỉ"
              required
            >
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
            </Form.Item>
          </Row>
        </Col>
        {/* fill 4 */}
        <Col span={11}>
          <Row>
            <Form.Item
              name="sendercountry"
              rules={[validate.checkRequire()]}
              hasFeedback
              required
            >
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
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              name="sendercity"
              rules={[validate.checkRequire()]}
              hasFeedback
              required
            >
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
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              name="senderdistrict"
              rules={[validate.checkRequire()]}
              hasFeedback
              required
            >
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
            </Form.Item>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Form.Item
              name="senderward"
              rules={[validate.checkRequire()]}
              hasFeedback
              required
            >
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
            </Form.Item>
          </Row>
        </Col>
        {/* <Col span={24}>
          <Form.Item hasFeedback className="my-2 ">
            <Button
              style={{ display: "inline-block", width: "100%" }}
              trigger="click"
              htmlType="submit"
              type="primary"
            >
              Xác Nhận
            </Button>
          </Form.Item>
        </Col> */}
      </Row>
    </div>
  );
}
