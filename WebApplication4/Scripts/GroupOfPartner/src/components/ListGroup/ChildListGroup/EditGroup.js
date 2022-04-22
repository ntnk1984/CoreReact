import React, { useState, memo, useEffect } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Button, Modal, Select, Tag } from "antd";
import { getGroupById } from "../../../services/Groups.js";

//CALL API NHOM QUYEN
const options = [
  { value: "#fff0f6", label: "Cấp 1" },
  { value: "#ffd6e7", label: "Cấp 2" },
  { value: "#ffadd2", label: "Cấp 3" },
  { value: "#ff85c0", label: "Cấp 4" },
  { value: "#f759ab", label: "Cấp 5" },
  { value: "#eb2f96", label: "Cấp 6" },
  { value: "#c41d7f", label: "Cấp 7" },
  { value: "#9e1068", label: "Cấp 8" },
  { value: "#780650", label: "Cấp 9" },
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

function EditGroup(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initValue, setInitValue] = useState({});
  const initForm = {
    name: initValue.name,
    description: initValue.description,
    jurisdiction: initValue.jurisdiction,
  };
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
  useEffect(async () => {
    const response = await getGroupById(props.id);
    await setInitValue(response);
  }, [props]);
  console.log(initForm);
  return (
    <>
      <Button
        icon={props.icon}
        type={props.type}
        ghost
        onClick={showModal}
        style={props.style}
      ></Button>
      <Modal
        title="Sửa thông tin nhóm"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
        
          layout="vertical"
          name="nest-messages"
          initialValue={initForm}
          onFinish={onFinish}
        >
          <Form.Item name="name" label="Tên nhóm">
            <Input name="name" value="ded" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả nhóm">
            <Input.TextArea name="description" style={{ height: "200px" }} />
          </Form.Item>
          <Form.Item>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              name="jurisdiction"
              style={{ width: "100%" }}
              options={options}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default EditGroup;
