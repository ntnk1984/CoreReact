import React, { useContext, useState } from "react";
import { InputNumber, Select, Steps } from "antd";
import { Form, Input, Button, Row, Col, Dropdown, Menu } from "antd";
import { contextValue } from "../../App.js";

const { Option } = Select;
export default function TotalOrder() {
  const context = useContext(contextValue);
  const tempInfoOrder = context?.createOrder.total;
  const [totalOrder, setTotalOrder] = useState({
    long: tempInfoOrder.long,
    width: tempInfoOrder.width,
    height: tempInfoOrder.height,
    weight: tempInfoOrder.weight,
    money: tempInfoOrder.money,
    unit: tempInfoOrder.unit,
    type: tempInfoOrder.type,
  });
  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setTotalOrder({ ...totalOrder, [name]: value });
  };
  console.log(totalOrder);
  return (
    <div style={{ backgroundColor: "#FEFBE7" }} className="totalOrder p-3 border border-1 rounded-3 mb-3 shadow-sm ">
      <h6 className=" text-secondary mx-2">TỔNG </h6>
      <Form>
        <Row>
          <Col span={6}>
            <Form.Item name="long" style={{ width: "100%" }} label="Chiều dài" required>
              <InputNumber
                name="long"
                onChange={(e) => {
                  setTotalOrder({ ...totalOrder, long: e });
                }}
                placeholder=""
                defaultValue={totalOrder.long}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="width" style={{ width: "100%" }} label="Chiều rộng" required>
              <InputNumber
                name="width"
                onChange={(e) => {
                  setTotalOrder({ ...totalOrder, width: e });
                }}
                placeholder=""
                defaultValue={totalOrder.width}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="height" style={{ width: "100%" }} label="Chiều cao" required>
              <InputNumber
                name="height"
                onChange={(e) => {
                  setTotalOrder({ ...totalOrder, height: e });
                }}
                placeholder=""
                defaultValue={totalOrder.height}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="weight" style={{ width: "100%" }} label="Cân nặng" required>
              <InputNumber
                name="weight"
                onChange={(e) => {
                  setTotalOrder({ ...totalOrder, weight: e });
                }}
                placeholder=""
                defaultValue={totalOrder.weight}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="unit" className="mx-2" label="Đơn vị tiền tệ" required>
              <Select
                name="unit"
                onChange={(e) => {
                  setTotalOrder({ ...totalOrder, unit: e.value });
                }}
                labelInValue
                defaultValue={{ value: "usd" }}
              >
                <Option value="vnd">VNĐ</Option>
                <Option value="usd">USD</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="money" className="mx-2" label="Thu tiền khi nhận hàng" required>
              <Select
                name="money"
                onChange={(e) => {
                  setTotalOrder({ ...totalOrder, money: e.value });
                }}
                labelInValue
                defaultValue={{ value: "notdone" }}
              >
                <Option value="notdone">Thu tiền khi nhận</Option>
                <Option value="done">Đã thanh toán</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item name="type" className="mx-2" label="Loại kiện hàng" required>
              <Input name="type" onChange={(e) => handleChangeVal(e)} placeholder="" defaultValue={totalOrder.type} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
