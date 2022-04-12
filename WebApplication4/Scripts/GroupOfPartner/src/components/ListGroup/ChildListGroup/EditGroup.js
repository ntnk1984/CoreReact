import React, { useState } from "react";
import { PlusOutlined,EditOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Button, Modal } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function EditGroup() {
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
      <Button icon={<EditOutlined />} type="primary" ghost onClick={showModal}>
       
      </Button>
      <Modal
        title="Sửa thông tin nhóm"
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
