import React, { useState } from "react";
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

export default function EditSender(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



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
        <Form initialValues={props.data} layout="vertical">
          <Row className="my-2">
            <Col span={12} >
              <Form.Item
            
                name="sendername"
                className="mx-2 "
                label="Tên người gửi"
                required
              >
                <Input
                  name="sendername"
                  size="large"
                  placeholder="Vui lòng nhập"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="senderphone"
                className="mx-2"
                label="Số điện thoại"
                required
              >
                <Input
                  name="senderphone"
                  size="large"
                  placeholder="Vui lòng nhập"
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
                required
              >
                <Input
                  name="senderemail"
                  size="large"
                  placeholder="Vui lòng nhập"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneregioncode"
                className="mx-2"
                label="Mã bưu chính"
              >
                <Input
                  name="phoneregioncode"
                  size="large"
                  placeholder="Vui lòng nhập"
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
