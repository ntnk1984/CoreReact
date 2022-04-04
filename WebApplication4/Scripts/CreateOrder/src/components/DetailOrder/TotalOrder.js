import React, { useContext } from "react";
import { Steps } from "antd";
import { Form, Input, Button, Row, Col, Dropdown, Menu } from "antd";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
// import { contextValue } from "../../../pages/CreateOrder";

export default function TotalOrder() {
  //   const context = useContext(contextValue);
  const {
    long,
    width,
    height,
    weight,
    money,
    unit,
    type,
  } = context.createOrder.total;
  return (
    <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: "#e6f7ff" }}>
      <h5 className=" text-secondary mx-2">TỔNG </h5>
      <Row>
        <Col span={6}>
          <Form.Item className="mx-2" label="Chiều dài" required>
            <Input disabled placeholder="" value={long} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Chiều rộng" required>
            <Input disabled placeholder="" value={width} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Chiều cao" required>
            <Input disabled placeholder="" value={height} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Cân nặng" required>
            <Input disabled placeholder="" value={weight} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Thu tiền khi nhận hàng" required>
            <Input disabled placeholder="" value={money} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Đơn vị tiền tệ" required>
            <Input disabled placeholder="" value={unit} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Loại kiện hàng" required>
            <Input disabled placeholder="" value={type} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
