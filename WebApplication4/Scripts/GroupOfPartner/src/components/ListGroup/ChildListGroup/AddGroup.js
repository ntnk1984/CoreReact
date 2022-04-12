import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Button, Modal } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function AddGroup() {
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

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
        Tạo Group mới
      </Button>
      <Modal
        title="Thêm mới nhóm"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" name="nest-messages" onFinish={onFinish}>
          <Form.Item label="Tên nhóm">
            <Input />
          </Form.Item>

          <Form.Item name="moTa" label="Mô tả nhóm">
            <Input.TextArea style={{ height: "200px" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
