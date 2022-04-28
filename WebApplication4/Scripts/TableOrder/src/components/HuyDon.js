import React from "react";
import { Form, Input, Select,Button,Row,Col } from "antd";
const { Option } = Select;
export default function HuyDon(props) {
  return (
    <Form layout="vertical">
      
      <Form.Item >
        <p>Bạn đồng ý hủy đơn hàng loạt!</p>
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
      </Form.Item>
    </Form>
  );
}
