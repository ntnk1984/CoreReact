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

export default function EditRevicer(props) {
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

  console.log(props.data)

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
        <Form initialValues={props.data} layout="vertical">
          <Row className="my-2">
            <Col span={12} >
              <Form.Item
            
                name="receivername"
                className="mx-2 "
                label="Tên người nhận"
                required
              >
                <Input
                  name="receivername"
                  size="large"
                  placeholder="Vui lòng nhập"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="receiverphone"
                className="mx-2"
                label="Số điện thoại"
                required
              >
                <Input
                  name="receiverphone"
                  size="large"
                  placeholder="Vui lòng nhập"
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
                required
              >
                <Input
                  name="receiveremail"
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
              <Form.Item name="receiveraddress" className="mx-2" label="Địa chỉ">
                <Input
                  name="receiveraddress"
                  size="large"
                  placeholder="Vui lòng nhập"
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
