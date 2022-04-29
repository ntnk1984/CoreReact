import { Button, Form, Row, Select } from "antd";
import React from "react";
export default function XacNhanThanhToan(props) {

  return (
    <Form layout="vertical">
      
      <Form.Item >
        <p>Bạn đồng ý xác nhận đơn hàng đã thanh toán</p>
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
