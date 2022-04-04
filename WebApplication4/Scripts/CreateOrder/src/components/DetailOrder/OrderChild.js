import React from "react";

import { Form, Input, Button, Row, Col, Dropdown, Menu } from "antd";
// import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";

export default function OrderChild(props) {
  let { val, ind } = props.value;

  return (
    <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: "#f6ffed" }}>
      <h5 className=" text-secondary mx-2">#{++ind} </h5>

      <Row>
        <Col span={6}>
          <Form.Item className="mx-2" label="Mã sản phẩm" required>
            <Input placeholder="" disabled value={val?.maSP} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Tên sản phẩm" required>
            <Input placeholder="" disabled value={val?.nameSP} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Tên tiếng anh sản phẩm " required>
            <Input placeholder="" disabled value={val?.nameEngSP} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Mã quốc gia sản xuất" required>
            <Input placeholder="" disabled value={val?.maQuocGia} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Đơn vị sản phẩm" required>
            <Input placeholder="" disabled value={val?.donViSP} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Đơn vị tiền tệ" required>
            <Input placeholder="" disabled value={val?.donViTienTe} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Đơn giá  " required>
            <Input placeholder="" disabled value={val?.donGia} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Số lượng" required>
            <Input placeholder="" disabled value={val?.soLuong} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Cân nặng" required>
            <Input placeholder="" disabled value={val?.canNang} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Button className="mx-2">Sửa</Button>
        <Button type="danger">Xóa</Button>
      </Row>
    </div>
  );
}
