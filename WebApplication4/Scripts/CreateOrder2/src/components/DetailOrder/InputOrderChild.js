import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Dropdown, Menu, InputNumber } from "antd";
import { contextValue } from "../../App.js";

export default function InputOrderChild(props) {
  /* 4.5.2020 Tạo mã đơn hàng */
  let randString = (Math.random() + 1).toString(36).substring(7);
 
  const [inputOrder, setInputOrder] = useState({
    maSP:randString ,
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
    <div style={{backgroundColor:"#ffffb8"}}  className="p-3 border border-1 rounded-3 mb-3 mt-3 shadow-sm ">
      <Form
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // initialValues={{maSP:randString}}
        layout="vertical"
      
       
      
      >
        <Row>
          <Col span={4}>
            <Form.Item  name="maSP" className="mx-2" label="Mã sản phẩm" required>
              <Input
                name="maSP"
                onChange={(e) => {
                  handleChange(e);
                }}
                disabled
               
              />
            </Form.Item>
          </Col>
          <Col span={5}>
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
            <Form.Item
              className="mx-2"
              label="Tên tiếng anh sản phẩm "
              required
            >
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
              className="w-100"
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
              <InputNumber
              className="w-100"
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
              <InputNumber
              className="w-100"
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
              <InputNumber
               className="w-100"
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
      </Form>
    </div>
  );
}
