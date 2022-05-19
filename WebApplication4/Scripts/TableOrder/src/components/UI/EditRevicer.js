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
  message,
  Modal,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { contextValue, FETCH_SHIPMENT_BY_ID } from "../../App.js";
import { fetchChangeRecieverShipmentId, fetchShipmentId } from "../../api/Order.js";
import { openNotificationWithIcon } from "../../Notification.js";
import { validate } from "../../validate/validate.js";

export default function EditRevicer({ idShipment, orderCodeShipment, data }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formReciever, setFormReciever] = useState({ ...data });
  const { dispatch } = useContext(contextValue);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async() => {
    const result = await fetchChangeRecieverShipmentId(formReciever);
    setIsModalVisible(false);
    const res = await fetchShipmentId(idShipment, orderCodeShipment);
    dispatch({
      type: FETCH_SHIPMENT_BY_ID,
      payload: res?.responses,
    });
    openNotificationWithIcon("success")
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  useEffect(() => {
    setFormReciever({ ...data });
  }, [isModalVisible]);
  return (
    <>
      <Button
        onClick={showModal}
        type="link"
        icon={<EditOutlined style={{ color: "#40a9ff" }} />}
      ></Button>
      <Modal
        title="Thay đổi thông tin người nhận"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form initialValues={data} layout="vertical">
          <Row className="my-2">
            <Col span={12} >
              <Form.Item
            
                name="receivername"
                className="mx-2 "
                label="Tên người nhận"
                rules={[
                  validate.checkCodePost(),
                  validate.checkRequire()
                ]}
              >
                <Input
                  name="receivername"
                  size="large"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setFormReciever({
                      ...formReciever,
                      receivername: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="receiverphone"
                className="mx-2"
                label="Số điện thoại"
                rules={[
                  validate.checkPhone(),
                  validate.checkRequire()
                ]}
              >
                <Input
                  name="receiverphone"
                  size="large"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setFormReciever({
                      ...formReciever,
                      receiverphone: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="my-2">
            <Col span={12}>
              <Form.Item
                name="receiveremail"
                className="mx-2"
                label="Email"
                rules={[
                  validate.checkMail(),
                  validate.checkRequire()
                ]}
              >
                <Input
                  name="receiveremail"
                  size="large"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setFormReciever({
                      ...formReciever,
                      receiveremail: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneregioncode"
                className="mx-2"
                label="Mã bưu chính"
                rules={[
                  validate.checkCodePost(),
                  validate.checkRequire()
                ]}
              >
                <Input
                  name="phoneregioncode"
                  size="large"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setFormReciever({
                      ...formReciever,
                      phoneregioncode: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="my-2">
            <Col span={24}>
              <Form.Item  name="receiveraddress" className="mx-2" label="Địa chỉ">
                <Input
                  name="receiveraddress"
                  size="large"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setFormReciever({
                      ...formReciever,
                      receiveraddress: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="my-2">
            <Col span={12}>
              <Form.Item name="receivercountrycode" className="mx-2" label="Quốc gia">
                <Select
                  name="receivercountrycode"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setFormReciever({
                      ...formReciever,
                      receiveraddress: e,
                    });
                  }}
                >
                  <Option value="VN">Việt Nam</Option>
                  <Option value="CAM">Campuchia</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="receivercitycode"
                className="mx-2"
                label="Thành phố/Tỉnh"
              >
                <Select
                  name="receivercitycode"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setFormReciever({
                      ...formReciever,
                      receivercitycode: e,
                    });
                  }}
                >
                  <Option value="P3">Phường 3</Option>
                  <Option value="P2">Phường 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="receiverdistrictcode"
                className="mx-2"
                label="Quận/Huyện"
              >
                <Select
                  name="receiverdistrictcode"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setFormReciever({
                      ...formReciever,
                      receiverdistrictcode: e,
                    });
                  }}
                >
                  <Option value="P3">Phường 3</Option>
                  <Option value="P2">Phường 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="receiverwardcode"
                className="mx-2"
                label="Phường/Xã"
                required
              >
                <Select
                  name="receiverwardcode"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setFormReciever({
                      ...formReciever,
                      receiverwardcode: e,
                    });
                  }}
                >
                  <Option value="P3">Phường 3</Option>
                  <Option value="P2">Phường 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
