import React, { useContext } from "react";
import { InputNumber, Select, Steps } from "antd";
import { Form, Input, Button, Row, Col, Dropdown, Menu } from "antd";
import { contextValue } from "../../App.js";


const { Option } = Select;
export default function TotalOrder() {
  const context = useContext(contextValue);
  const { long, width, height, weight, money, unit, type } =
    context.createOrder.total;
  return (
    <div className="p-3 rounded-3 mb-3 shadow-sm " style={{ backgroundColor: "#feffe6" }}>
      <h6 className=" text-secondary mx-2">TỔNG </h6>
      <Row>
        <Col span={3}>
          <Form.Item className="mx-2" label="Chiều dài" required>
            <InputNumber placeholder="" value={long} />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item className="mx-2" label="Chiều rộng" required>
            <InputNumber placeholder="" value={width} />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item className="mx-2" label="Chiều cao" required>
            <InputNumber placeholder="" value={height} />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item className="mx-2" label="Cân nặng" required>
            <InputNumber placeholder="" value={weight} />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item className="mx-2" label="Đơn vị tiền tệ" required>
            <Select
              labelInValue
              style={{ width: 90 }}
              defaultValue={{ value: "usd" }}
            >
              <Option value="vnd">VNĐ</Option>
              <Option value="usd">USD</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item className="mx-2" label="Thu tiền khi nhận hàng" required>
          <Select
              labelInValue
              style={{ width: 160 }}
              defaultValue={{ value: "notdone" }}
            >
              <Option value="notdone">Thu tiền khi nhận</Option>
              <Option value="done">Đã thanh toán</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item className="mx-2" label="Loại kiện hàng" required>
            <Input placeholder="" value={type} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
