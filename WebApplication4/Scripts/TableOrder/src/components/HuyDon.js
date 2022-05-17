import React, { useState } from "react";
import { Form, Button, Row, Modal, Input } from "antd";
import { checkQuyen } from "../athor/Authoraziton.js";

export default function HuyDon(props) {
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
      <Button type="link" onClick={showModal} disabled={checkQuyen() != 1}>
        Hủy đơn hàng loạt
      </Button>
      <Modal
        title="Basic Modal"
        visible={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item>
            <p>Bạn đồng ý hủy đơn hàng loạt!</p>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
