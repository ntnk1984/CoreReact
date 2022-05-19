import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { contextValue } from "../App";
import { validate } from "../validate.js";
import "./Style/Sender.css";

function Sender(props) {
  const context = useContext(contextValue);
  const [visible, setVisible] = useState(false);
  const { onErrorSender, Sender } = context?.createOrderList;
  console.log(onErrorSender, " store");
  console.log(Sender, " sender store");

  const [namButton, setNameButton] = useState("Nhập thông tin người gửi");
  const [senderInfo, setSenderInfo] = useState({
    Name: undefined,
    Phone: undefined,
    Email: undefined,
    Address: undefined,
    CountryCode: undefined,
    CityCode: undefined,
    DistrictCode: undefined,
    WardCode: undefined,
    PostalCode: undefined,
  });

  useEffect(() => {
    console.log("Loadingg");
  }, []);

  const onFinish = () => {
    context.dispatch({
      type: "ADD_INFO_SENDER",
      payload: senderInfo,
    });

    setNameButton(senderInfo.Name);
    message.success("Thêm thông tin người gửi thành công!");
    context.dispatch({
      type: "SET_ONERROR_SENDER",
      payload: false,
    });
  };

  const [onError, setOnError] = useState(false);
  const onFinishFailed = () => {
    message.error("Vui lòng nhập đầy đủ thông tin");

    setNameButton("Vui Lòng Nhập Đầy đủ thông  tin");

    context.dispatch({
      type: "SET_ONERROR_SENDER",
      payload: true,
    });
  };

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setSenderInfo({ ...senderInfo, [name]: value });
  };
  const handleSubmitSender = () => {
    document.getElementById("SenderForm").click();
    if (!onErrorSender) {
      return;
    } else {
      setVisible(false);
    }
  };

  return (
    <div className="senderForm">
      <div>
        <div onClick={() => setVisible(true)} className={!!onErrorSender ? "btnName--error" : "btnName"}>
          <span>{namButton}</span>
        </div>
      </div>

      <Modal
        title="Người Gửi "
        centered
        visible={visible}
        // onOk={() => setVisible(false)}
        // onCancel={() => setVisible(false)}
        closable={false}
        width={700}
        footer={[
          <Button
            onClick={() => {
              setVisible(false);
              setNameButton("Vui lòng nhập đầy đủ thông tin");
              context.dispatch({
                type: "SET_ONERROR_SENDER",
                payload: true,
              });
            }}
            key="back"
          >
            Trở về
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitSender}>
            Hoàn Thành
          </Button>,
        ]}
      >
        <Form
          size="small"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className=" rounded rounded-3 p-3 shadow-sm"
          style={{ background: "white" }}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="Name"
                rules={[validate.checkRequire(), validate.checkName()]}
                className="mx-2"
                label="Tên người gửi"
                required
                onChange={(e) => {
                  // console.log(e);
                  handleChangeVal(e);
                }}
              >
                <Input name="Name" size="middle" placeholder="Vui lòng nhập tên" value={senderInfo.Name} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Phone"
                rules={[validate.checkRequire(), validate.checkPhone()]}
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
                  value={senderInfo.Phone}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="Email"
                rules={[validate.checkRequire(), validate.checkMail()]}
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
                  value={senderInfo.Email}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="PostalCode"
                rules={[validate.checkRequire(), validate.checkCodePost()]}
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
                  value={senderInfo.PostalCode}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="Address" rules={[validate.checkRequire()]} className="mx-2" label="Địa chỉ" required>
                <Input
                  name="Address"
                  size="middle"
                  placeholder="Vui lòng nhập địa chỉ"
                  onChange={(e) => {
                    handleChangeVal(e);
                  }}
                  value={senderInfo.Address}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} xxl={6}>
              <Form.Item
                name="CountryCode"
                rules={[validate.checkRequire()]}
                className="mx-2"
                label="Quốc gia"
                required
              >
                <Select
                  name="CountryCode"
                  size="middle"
                  style={{ width: "100%" }}
                  placeholder="Chọn quốc gia"
                  onChange={(e) => {
                    setSenderInfo({ ...senderInfo, CountryCode: e });
                  }}
                  value={senderInfo.CountryCode ? "Vui lòng chọn" : senderInfo.CountryCode}
                >
                  <Select.Option value="VN">Việt Nam</Select.Option>
                  <Select.Option value="CAM">Campuchia</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xl={12} xxl={6}>
              <Form.Item
                name="CityCode"
                rules={[validate.checkRequire()]}
                className="mx-2"
                label="Thành phố/Tỉnh"
                required
              >
                <Select
                  name="CityCode"
                  size="middle"
                  style={{ width: "100%" }}
                  placeholder="Chọn tỉnh / thành phố"
                  onChange={(e) => {
                    setSenderInfo({ ...senderInfo, CityCode: e });
                  }}
                  value={senderInfo.CityCode ? "Vui lòng chọn" : senderInfo.CityCode}
                >
                  <Select.Option value="P3">Phường 3</Select.Option>
                  <Select.Option value="P2">Phường 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xl={12} xxl={6}>
              <Form.Item
                rules={[validate.checkRequire()]}
                name="DistrictCode"
                className="mx-2"
                label="Quận/Huyện"
                required
              >
                <Select
                  name="DistrictCode"
                  size="middle"
                  placeholder="Chọn quận / huyện"
                  value={senderInfo.DistrictCode ? "Vui lòng chọn" : senderInfo.DistrictCode}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setSenderInfo({ ...senderInfo, DistrictCode: e });
                  }}
                >
                  <Select.Option value="P3">Phường 3</Select.Option>
                  <Select.Option value="P2">Phường 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xl={12} xxl={6}>
              <Form.Item rules={[validate.checkRequire()]} name="WardCode" className="mx-2" label="Phường/Xã" required>
                <Select
                  name="WardCode"
                  size="middle"
                  placeholder="Chọn xã / phường"
                  value={senderInfo.WardCode ? "Vui lòng chọn" : senderInfo.WardCode}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setSenderInfo({ ...senderInfo, WardCode: e });
                  }}
                >
                  <Select.Option value="P3">Phường 3</Select.Option>
                  <Select.Option value="P2">Phường 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Button
              style={{ display: "none" }}
              id="SenderForm"
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
      </Modal>
    </div>
  );
}

export default Sender;
