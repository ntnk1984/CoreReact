import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Dropdown, Menu, InputNumber, Tooltip, Select } from "antd";
import { contextValue } from "../../App.js";

export default function InputOrderChild(props) {
  /* 4.5.2020 Tạo mã đơn hàng */
  let randString = (Math.random() + 1).toString(36).substring(7);
  const context = useContext(contextValue);
  const [inputOrder, setInputOrder] = useState({
    maSP: randString,
    nameSP: undefined,
    nameEngSP: undefined,
    maQuocGia: undefined,
    donViSP: undefined,
    donViTienTe: "usd",
    donGia: undefined,
    soLuong: undefined,
    canNang: undefined,
  });

  const { listOrder, visibility, sender, receiver } = context.createOrder;
  //lấy thông tin form
  const handleChange = (e) => {
    let { name, value } = e.target;
    setInputOrder({ ...inputOrder, [name]: value });
  };
  // console.log(inputOrder);
  console.log(props, "props");
  //dispatch

  return (
    <div style={{ backgroundColor: "#ffffff" }} className="p-3 border border-1 rounded-3 mb-3 mt-3 shadow-sm ">
      <Form
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // initialValues={{maSP:randString}}
        layout="vertical"
      >
        <h4 style={{ textAlign: "center" }} className="text-secondary "></h4>

        <Row>
          <Col span={24} className="text-secondary "></Col>
          <Col span={3}>
            <Tooltip title="Mã Sản Phẩm">
              <Form.Item name="maSP" className="mx-2" label="MSP" required>
                <Input
                  name="maSP"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  disabled
                />
              </Form.Item>
            </Tooltip>
          </Col>
          <Col span={7}>
            <Form.Item className="mx-2" label="Tên hàng" required>
              <Input
                name="nameSP"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder=""
              />
            </Form.Item>
          </Col>

          <Col span={7}>
            <Tooltip title="Mã Quốc Gia Sản Xuất">
              <Form.Item className="mx-2" label="Mã QGSX" required>
                <Input
                  name="maQuocGia"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=""
                />
              </Form.Item>
            </Tooltip>
          </Col>

          <Col span={7}>
            <Tooltip title="Đơn vị sản phẩm: mg, thùng, bao, lốc...">
              <Form.Item className="mx-2" label="DVSP" required>
                <Input
                  name="donViSP"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder=""
                />
              </Form.Item>
            </Tooltip>
          </Col>
          <Col span={3}>
            <Tooltip title="Đơn vị tiền tệ">
              <Form.Item name="donViTienTe" className="mx-2" label="ĐVTT" required>
                <Select
                  name="donViTienTe"
                  onChange={(e) => {
                    setInputOrder({ ...inputOrder, donViTienTe: e.value });
                  }}
                  labelInValue
                  defaultValue={{ value: "usd" }}
                >
                  <Option value="vnd">VNĐ</Option>
                  <Option value="usd">USD</Option>
                </Select>
              </Form.Item>
            </Tooltip>
          </Col>
          <Col span={7}>
            <Form.Item className="mx-2" label="Đơn giá  " required>
              <InputNumber
                className="w-100"
                name="donGia"
                onChange={(e) => {
                  setInputOrder({ ...inputOrder, donGia: e });
                }}
                placeholder=""
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item className="mx-2" label="Số lượng" required>
              <InputNumber
                className="w-100"
                name="soLuong"
                onChange={(e) => {
                  setInputOrder({ ...inputOrder, soLuong: e });
                }}
                placeholder=""
              />
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item className="mx-2" label="Cân nặng" required>
              <InputNumber
                className="w-100"
                name="canNang"
                onChange={(e) => {
                  setInputOrder({ ...inputOrder, canNang: e });
                }}
                placeholder=""
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Button
            className="me-2"
            type="primary"
            trigger="click"
            onClick={() => {
              console.log("Tạo Đơn");
              console.log(props.indexBuuGui);
              context.dispatch({
                type: "ADD_ORDER",
                payload: {
                  indexBuuGui: props.indexBuuGui,
                  inputOrder,
                },
              });
              context.dispatch({
                type: "SET_VISIBILITY",
              });
            }}
          >
            Tạo đơn
          </Button>
        </Row>
      </Form>
    </div>
  );
}
