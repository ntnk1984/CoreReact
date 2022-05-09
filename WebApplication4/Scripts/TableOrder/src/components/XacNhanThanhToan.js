import { Button, Form, Row, Select,Modal } from "antd";
import React, { useState } from "react";
import { checkQuyen } from "../athor/Authoraziton.js";
export default function XacNhanThanhToan(props) {
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
       Xác nhận thanh toán
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
      
      <Form.Item >
        <p>Bạn đồng ý xác nhận đơn hàng đã thanh toán</p>
       
      </Form.Item>
    </Form>
      </Modal>
    </>
   
  );
}
