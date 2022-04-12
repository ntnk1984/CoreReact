import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Dropdown, Menu } from "antd";
import { contextValue } from "../../App.js";

export default function InputOrderChild(props) {
  console.log("props", props);
  const [inputOrder, setInputOrder] = useState({
    maSP: undefined,
    nameSP: undefined,
    nameEngSP: undefined,
    maQuocGia: undefined,
    donViSP: undefined,
    donViTienTe: undefined,
    donGia: undefined,
    soLuong: undefined,
    canNang: undefined,
  });

  //lấy thông tin form
  const handleChange = (e) => {
    let { name, value } = e.target;
    setInputOrder({ ...inputOrder, [name]: value });
  };
  //dispatch
  const context = useContext(contextValue);

  return (
    <div
      className="p-3 rounded-3 mb-3 mt-3 shadow-sm "
      
    >
      <Row>
        <Col span={3}>
          <Form.Item className="mx-2" label="Mã sản phẩm" required>
            <Input
              name="maSP"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Tên sản phẩm" required>
            <Input
              name="nameSP"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Tên tiếng anh sản phẩm " required>
            <Input
              name="nameEngSP"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item className="mx-2" label="Mã quốc gia sản xuất" required>
            <Input
              name="maQuocGia"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item className="mx-2" label="Đơn vị sản phẩm" required>
            <Input
              name="donViSP"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Đơn vị tiền tệ" required>
            <Input
              name="donViTienTe"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Đơn giá  " required>
            <Input
              name="donGia"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Số lượng" required>
            <Input
              name="soLuong"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item className="mx-2" label="Cân nặng" required>
            <Input
              name="canNang"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Button
          className="mx-2"
          trigger="click"
          onClick={() => {
            context.dispatch({
              type: "SET_VISIBILITY",
            });
          }}
        >
          Hủy
        </Button>
        <Button
          className="me-2"
          type="primary"
          trigger="click"
          onClick={() => {
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
    </div>
  );
}
