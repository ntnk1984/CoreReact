import React from "react";
import { Modal } from "antd";
export default function ModalTableOrder(props) {
  return (
    <Modal
      title={props.title}
      centered
      visible={props.visible}
      onOk={() => props.setVisible(false)}
      onCancel={() => props.setVisible(false)}
      width={props.width}
      footer={null}
    >
      {props.content}
    </Modal>
  );
}
