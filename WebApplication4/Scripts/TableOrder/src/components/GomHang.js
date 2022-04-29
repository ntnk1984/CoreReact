import React from "react";
import { Form, Input, Select, Button, Row } from "antd";
const { Option } = Select;
export default function GomHang(props) {
  console.log("d2")
  return (
    <Form layout="vertical">
      <Form.Item label="Chọn đối tác gôm hàng">
        <Select defaultValue="Chọn đối tác gôm hàng" style={{ width: "100%" }}>
          <Option value="1">Nguyễn Văn A</Option>
          <Option value="2">Nguyễn Văn B</Option>
          <Option value="3">Nguyễn Văn C</Option>
          
        </Select>
      </Form.Item>
      <Row justify="end" className="mt-3">
            <div>
              <Button
                onClick={() => {
                  props.setVisible(false);
                }}
                className="mx-2"
              >
                Hủy
              </Button>
              <Button type="primary">Đồng ý</Button>
            </div>
          </Row>
    </Form>
  );
}
