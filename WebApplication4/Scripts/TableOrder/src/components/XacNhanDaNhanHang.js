import { Button, Form, Row } from "antd";
import React from "react";
export default function XacNhanDaNhanHang(props) {

  return (
    <Form layout="vertical">
     
      <Form.Item label="Đơn vị giao hàng">
        <p>Bạn đồng ý xác nhận đơn hàng đã nhận thành công!</p>
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
