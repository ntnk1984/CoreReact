import React, { useState } from "react";
import { Form, Input, Select, Button, Row ,Modal} from "antd";
import { checkQuyen } from "../athor/Authoraziton.js";
const { Option } = Select;
export default function GomHang(props) {
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
    <Button type="link" onClick={showModal} disabled={checkQuyen()!=1}>
      Gôm đơn hàng loạt
    </Button>
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
      <Form.Item label="Chọn đối tác gôm hàng">
        <Select defaultValue="Chọn đối tác gôm hàng" style={{ width: "100%" }}>
          <Option value="1">Nguyễn Văn A</Option>
          <Option value="2">Nguyễn Văn B</Option>
          <Option value="3">Nguyễn Văn C</Option>
          
        </Select>
      </Form.Item>
     
    </Form>
    </Modal>
  </>
    
  );
}
