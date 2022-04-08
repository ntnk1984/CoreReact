import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Dropdown, Menu } from "antd";
import { contextValue } from "../../App.js";
import "./styleDetail/inputOder.css";

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
    <div className="inputOrderChild">
      <Row className="setInputCenter" justify="space-around">
        <Col className="set-border-form" span={3}>
          <Row>
            <Form.Item name="maSP" required>
              <Col span={24}>
                <label>Mã sản phẩm</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="MSP"
                  name="maSP"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col className="set-border-form" span={6}>
          <Row>
            <Form.Item name="nameSP" required>
              <Col span={24}>
                <label>Tên Sản Phẩm</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Tên Sản Phẩm"
                  name="nameSP"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col className="set-border-form" span={6}>
          <Row>
            <Form.Item name="nameEngSP" required>
              <Col span={24}>
                <label>Tên tiếng anh sản phẩm</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Tên tiếng anh sản phẩm "
                  name="nameEngSP"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col className="set-border-form" span={6}>
          <Row justify="space-between">
            <Form.Item name="maQuocGia" required>
              <Col span={24}>
                <label>Mã quốc gia sản xuất</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Mã quốc gia sản xuất"
                  name="maQuocGia"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>

        <Col className="set-border-form" span={3}>
          <Row>
            <Form.Item name="donViSP" required>
              <Col span={24}>
                <label>Đơn vị sản phẩm</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Đơn vị sản phẩm"
                  name="donViSP"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>

        <Col className="set-border-form" span={6}>
          <Row>
            <Form.Item name="donViTienTe" required>
              <Col span={24}>
                <label>Đơn vị tiền tệ</label>
              </Col>
              <Col span={24}>
                <Input
                  name="donViTienTe"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Đơn vị tiền tệ"
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col className="set-border-form" span={6}>
          <Row>
            <Form.Item name="donGia" required>
              <Col span={24}>
                <label>Đơn giá </label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Đơn giá"
                  name="donGia"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col className="set-border-form" span={6}>
          <Row>
            <Form.Item name="soLuong" required>
              <Col span={24}>
                <label>Số lượng</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Số Lượng"
                  name="soLuong"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>

        <Col className="set-border-form" span={6}>
          <Row>
            <Form.Item name="defaultName" required>
              <Col span={24}>
                <label>Cân nặng</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Cân Nặng"
                  name="canNang"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
      </Row>

      <Row justify="end">
        <Button
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
            console.log(props);
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
