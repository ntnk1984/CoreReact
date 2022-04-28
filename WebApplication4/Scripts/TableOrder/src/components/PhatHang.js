import React from "react";
import { Form, Input, Select,Button,Row,Col } from "antd";
const { Option } = Select;
export default function PhatHang(props) {
  return (
    <Form layout="vertical">
      
      <Form.Item label="Chọn đối tác phát hàng">
        <Select defaultValue="Chọn đối tác phát hàng" style={{ width: "100%" }}>
          <Option value="1">Nguyễn Văn A</Option>
          <Option value="2">Nguyễn Văn B</Option>
          <Option value="3">Nguyễn Văn C</Option>
        </Select>
        
      </Form.Item>
      <Row justify="end" className="mt-3">
      <div ><Button onClick={()=>{props.setVisible(false)}} className="mx-2">Hủy</Button><Button type="primary">Đồng ý</Button></div>
      
    </Row>
    </Form>
  );
}
