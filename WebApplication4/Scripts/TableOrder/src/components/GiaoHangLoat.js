import React from "react";
import { Form, Select, Row, Button } from "antd";
const { Option } = Select;
export default function GiaoHangLoat(props) {

  return (
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
      <Row justify="end" className="mt-3">
          <div>
            <Button
              onClick={() => {
                props.setVisible(false)
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
