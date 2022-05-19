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
import {
  fetchChangeSenderShipmentId,
  fetchShipmentId,
} from "../../api/Order.js";
import { contextValue, FETCH_SHIPMENT_BY_ID } from "../../App.js";
import { openNotificationWithIcon } from "../../Notification.js";
import { validate } from "../../validate/validate.js";

export default function EditSender({ idShipment, orderCodeShipment, data }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formSender, setFormSender] = useState({ ...data });

  const showModal = () => {
    setIsModalVisible(true);
  };
  const { dispatch } = useContext(contextValue);
  const handleOk = async () => {
    const result = await fetchChangeSenderShipmentId(formSender);
    setIsModalVisible(false);
    const res = await fetchShipmentId(idShipment, orderCodeShipment);
    dispatch({
      type: FETCH_SHIPMENT_BY_ID,
      payload: res?.responses,
    });
    openNotificationWithIcon("success");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    setFormSender({ ...data });
  }, [isModalVisible]);

  return (
    <>
      <Button
        onClick={showModal}
        type="link"
        icon={<EditOutlined style={{ color: "#40a9ff" }} />}
      ></Button>
      <Modal
        title="Thay đổi thông tin người gửi"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form initialValues={data} layout="vertical">
          <Row className="my-2">
            <Col span={12}>
              <Form.Item
                name="sendername"
                className="mx-2 "
                label="Tên người gửi"
                rules={[
                  validate.checkName(),
                  validate.checkRequire()
                ]}
              >
                <Input
                  name="sendername"
                  size="large"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setFormSender({
                      ...formSender,
                      sendername: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="senderphone"
                className="mx-2"
                label="Số điện thoại"
                rules={[
                  validate.checkPhone(),
                  validate.checkRequire()
                ]}
              >
                <Input
                  name="senderphone"
                  size="large"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setFormSender({
                      ...formSender,
                      senderphone: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="my-2">
            <Col span={12}>
              <Form.Item
                name="senderemail"
                className="mx-2"
                label="Email"
                rules={[
                  validate.checkMail(),
                  validate.checkRequire()
                ]}
              >
                <Input
                  name="senderemail"
                  size="large"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setFormSender({
                      ...formSender,
                      senderemail: e.target.value,
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
                    setFormSender({
                      ...formSender,
                      phoneregioncode: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="my-2">
            <Col span={24}>
              <Form.Item name="senderaddress" className="mx-2" label="Địa chỉ">
                <Input
                  name="senderaddress"
                  size="large"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setFormSender({
                      ...formSender,
                      senderaddress: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="my-2">
            <Col span={12}>
              <Form.Item name="sendercountry" className="mx-2" label="Quốc gia">
                <Select
                  name="sendercountry"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setFormSender({ ...formSender, sendercountry: e });
                  }}
                >
                  <Option value="VN">Việt Nam</Option>
                  <Option value="CAM">Campuchia</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sendercity"
                className="mx-2"
                label="Thành phố/Tỉnh"
              >
                <Select
                  name="sendercity"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setFormSender({ ...formSender, sendercity: e });
                  }}
                >
                  <Option value="P3">Phường 3</Option>
                  <Option value="P2">Phường 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="senderdistrict"
                className="mx-2"
                label="Quận/Huyện"
              >
                <Select
                  name="senderdistrict"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setFormSender({ ...formSender, senderdistrict: e });
                  }}
                >
                  <Option value="P3">Phường 3</Option>
                  <Option value="P2">Phường 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="senderward"
                className="mx-2"
                label="Phường/Xã"
                required
              >
                <Select
                  name="senderward"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setFormSender({ ...formSender, senderward: e });
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
