import React, { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Button, Modal, Row, Col } from "antd";
import dataUserTest from "../../../assets/dataTest/dataUser.json";

export default function EditUser(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  //initValue create user
  const [createUser, setCreateUser] = useState({
    ID: ++dataUserTest.length, // db tự tạo
    TaiKhoan: undefined,
    MatKhau: undefined,
    MaGoiNho: undefined,
    Ten: undefined,
    HoTen: undefined,
    SoDienThoai: undefined,
    Email: undefined,
    DiaChi: undefined,
    MaQuocGia: undefined,
    MaQuanHuyen: undefined,
    MaPhuongXa: undefined,
    MaBuuChinh: undefined,
    NguoiLienHe: undefined,
    SoDienThoaiNguoiLienHe: undefined,
    KichHoat: 0, //auto 0
    IDNguoiTao: 1, //lấy từ token login partner
    IDNguoiCapNhat: 1, //lấy từ token login partner
    NgayTao: "21/02/2022", // db tạo
    NgayCapNhat: "17/04/2022", // db tạo
    NgayHeThong: "24/04/2022", // db tạo
    Group: undefined,
    IDDoiTac: 1, //lấy từ token login partner
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setCreateUser({ ...createUser, [name]: value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    //call api thêm user
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };


  console.log(props)
  return (
    <>

      <Button type="link" onClick={showModal}>Sửa</Button>
      <Modal
        title="Sửa thông tin người dùng"
        visible={isModalVisible}
        width={1000}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Row>
            <Col span={8}>
              <Form.Item className="mx-2" name="TaiKhoan" label="Tài khoản">
                <Input name="TaiKhoan" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="mx-2" name="MatKhau" label="Mật khẩu">
                <Input.Password name="MatKhau" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                className="mx-2"
                name="ReMatKhau"
                label="Nhập lại mật khẩu"
              >
                <Input.Password name="ReMatKhau" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item className="mx-2" name="Ten" label="Tên">
                <Input name="Ten" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="mx-2" name="HoTen" label="Họ Tên">
                <Input name="HoTen" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                className="mx-2"
                name="SoDienThoai"
                label="Số điện thoại"
              >
                <Input name="SoDienThoai" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item className="mx-2" name="Email" label="Email">
                <Input name="Email" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="mx-2" name="DiaChi" label="Địa chỉ">
                <Input name="DiaChi" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                className="mx-2"
                name="MaBuuChinh"
                label="Mã bưu chính"
              >
                <Input name="MaBuuChinh" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item className="mx-2" name="MaQuocGia" label="Quốc gia">
                <Input name="MaQuocGia" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="mx-2" name="MaQuanHuyen" label="Quận/Huyện">
                <Input name="MaQuanHuyen" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="mx-2" name="MaPhuongXa" label="Phường/Xã">
                <Input name="MaPhuongXa" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item
                className="mx-2"
                name="NguoiLienHe"
                label="Người liên hệ"
              >
                <Input name="NguoiLienHe" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                className="mx-2"
                name="SoDienThoaiNguoiLienHe"
                label="Số điện thoại người liên hệ"
              >
                <Input
                  name="SoDienThoaiNguoiLienHe"
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
