import React, { useState } from "react";
import { Form, Select, Row, Button ,Modal} from "antd";
import { checkQuyen } from "../athor/Authoraziton.js";
const { Option } = Select;
export default function GiaoHangLoat(props) {

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
      Giao đơn hàng loạt
    </Button>
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
     <Form layout="vertical">
      <Form.Item label="Kho xuất hàng">
        <Select
          defaultValue="Địa điểm mặc định"
          style={{ width: "100%" }}
          disabled
        >
          <Option value="lucy">Lucy</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Phương thức giao">
        <Select defaultValue="Chọn phương thức giao hàng" style={{ width: "100%" }}>
          <Option value="1">Đường bộ</Option>
          <Option value="2">Đường hàng không</Option>
        </Select>
        
      </Form.Item>
      <Form.Item label="Đơn vị giao hàng">
        <Select defaultValue="Chọn đơn vị giao hàng" style={{ width: "100%" }}>
          <Option value="1">Giao hàng tiết kiệm</Option>
          <Option value="2">Giao hàng nhanh</Option>
          <Option value="3">Viettel post</Option>
        </Select>
        
      </Form.Item>
     
    </Form>
    </Modal>
  </>
    
  );
}
