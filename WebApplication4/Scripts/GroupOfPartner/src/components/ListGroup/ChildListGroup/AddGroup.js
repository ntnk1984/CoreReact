import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Button, Modal, Select, Tag } from "antd";
import { createGroupPartner } from "../../../services/Groups.js";

//CALL API NHOM QUYEN
const options = [
  { label: "Cấp 1", value: "1" },
  { label: "Cấp 2", value: "2" },
  { label: "Cấp 3", value: "3" },
  { label: "Cấp 4", value: "4" },
  { label: "Cấp 5", value: "5" },
  { label: "Cấp 6", value: "6" },
  { label: "Cấp 7", value: "7" },
  { label: "Cấp 8", value: "8" },
  { label: "Cấp 9", value: "9" },
];

function tagRender(props) {
  const { label, value, closable, onClose, color } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={"#f759ab"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

export default function AddGroup(props) {
  const [infoGroup, setInfoGroup] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const response = await createGroupPartner(infoGroup);
    await props.handle()
    await setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
        <Form layout="vertical" name="nest-messages">
          <Form.Item name="name" label="Tên nhóm">
            <Input
              name="name"
              onChange={(e) => {
                const { name, value } = e.target;
                setInfoGroup({ ...infoGroup, [name]: value });
              }}
            />
          </Form.Item>

          <Form.Item name="description" label="Mô tả nhóm">
            <Input.TextArea
              onChange={(e) => {
                const { name, value } = e.target;
                setInfoGroup({ ...infoGroup, [name]: value });
              }}
              name="description"
              style={{ height: "200px" }}
            />
          </Form.Item>
          <Form.Item>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              name="jurisdiction"
              onChange={(e) => {
                setInfoGroup({ ...infoGroup, jurisdiction: e });
              }}
              style={{ width: "100%" }}
              options={options}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
