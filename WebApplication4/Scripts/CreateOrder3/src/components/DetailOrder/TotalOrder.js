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
    <div
      className="p-3 rounded-3 mb-3 shadow-sm "
      style={{ backgroundColor: "#feffe6" }}
    >
      <h6 className=" text-secondary mx-2">TỔNG </h6>
      <Row>
        <Col span={3}>
          <Row>
            <Form.Item className="mx-2" required>
              <Col span={24}>
                <label>Chiều dài</label>
              </Col>
              <Col span={24}>
                <InputNumber name="long" placeholder="" defaultValue={long} />
              </Col>{" "}
            </Form.Item>
          </Row>
        </Col>
        <Col span={3}>
          <Row>
            <Form.Item className="mx-2" required>
              <Col span={24}>
                <label>Chiều rộng</label>
              </Col>
              <Col span={24}>
                <InputNumber name="width" placeholder="" defaultValue={width} />
              </Col>{" "}
            </Form.Item>
          </Row>
        </Col>
        <Col span={3}>
          <Row>
            <Form.Item className="mx-2" required>
              <Col span={24}>
                <label>Chiều cao</label>
              </Col>
              <Col span={24}>
                <InputNumber
                  name="height"
                  placeholder=""
                  defaultValue={height}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={3}>
          <Row>
            <Form.Item name="weight" className="mx-2" required>
              <Col span={24}>
                <label>Cân nặng</label>
              </Col>
              <Col span={24}>
                <InputNumber
                  name="weight"
                  placeholder=""
                  defaultValue={weight}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={3}>
          <Row>
            <Form.Item name="money" className="mx-2" required>
              <Col span={24}>
                <label>Đơn vị tiền tệ</label>
              </Col>
              <Col span={24}>
                <Select
                  labelInValue
                  style={{ width: 90 }}
                  defaultValue={{ value: "usd" }}
                >
                  <Option value="vnd">VNĐ</Option>
                  <Option value="usd">USD</Option>
                </Select>
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={5}>
          <Row>
            <Form.Item name="unit" className="mx-2" required>
              <Col span={24}>
                <label>Thu tiền khi nhận hàng</label>
              </Col>
              <Col span={24}>
                <Select
                  labelInValue
                  style={{ width: 160 }}
                  defaultValue={{ value: "notdone" }}
                >
                  <Option value="notdone">Thu tiền khi nhận</Option>
                  <Option value="done">Đã thanh toán</Option>
                </Select>
              </Col>
            </Form.Item>
          </Row>
        </Col>

        <Col span={4}>
          <Row>
            <Form.Item name="type" className="mx-2" required>
              <Col span={24}>
                <label>Loại kiện hàng</label>
              </Col>
              <Col span={24}>
                <InputNumber name="type" placeholder="" defaultValue={type} />
              </Col>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
