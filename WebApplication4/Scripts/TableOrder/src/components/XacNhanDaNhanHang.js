import { Button, Form, Row,Modal } from "antd";
import React, { useState } from "react";
import { checkQuyen } from "../athor/Authoraziton.js";
export default function XacNhanDaNhanHang(props) {
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
      Xác nhận đã nhận
    </Button>
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
     <Form layout="vertical">
     
     <Form.Item label="Đơn vị giao hàng">
       <p>Bạn đồng ý xác nhận đơn hàng đã nhận thành công!</p>
     
     </Form.Item>
   </Form>
    </Modal>
  </>
   
  );
}
