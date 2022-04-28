import React from "react";
import { Form, Input, Select, Row, Button } from "antd";
const { Option } = Select;
export default function XoaHangLoat(props) {

  return (
    <Form layout="vertical">
      
      <Form.Item >
        <p>Bạn đồng ý xóa hàng loạt đơn hàng!</p>
        <Row justify="end" className="my-0">
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
