import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Button, Modal, Select, Tag } from "antd";


//CALL API NHOM QUYEN
const options = [
  { value: "#fff0f6",label:"Cấp 1" },
  { value: "#ffd6e7",label:"Cấp 2" },
  { value: "#ffadd2",label:"Cấp 3" },
  { value: "#ff85c0",label:"Cấp 4" },
  { value: "#f759ab",label:"Cấp 5" },
  { value: "#eb2f96",label:"Cấp 6" },
  { value: "#c41d7f",label:"Cấp 7" },
  { value: "#9e1068",label:"Cấp 8" },
  { value: "#780650",label:"Cấp 9" },
];

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

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
          <Form.Item>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
            
              style={{ width: "100%" }}
              options={options}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
