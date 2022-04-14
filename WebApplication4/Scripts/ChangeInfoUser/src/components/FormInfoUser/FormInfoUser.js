import React, { useState } from "react";
import {
  PlusOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Row,
  Col,
  Select,
  Upload,
  Image,
  DatePicker,
} from "antd";
import { validate } from "../../validate.js";
const { Option } = Select;

function confirm() {
  Modal.confirm({
    title: "Thay đổi thông tin",
    icon: <ExclamationCircleOutlined />,
    content: "Bạn muốn cập nhật thông tin",
    okText: "Đồng ý",
    cancelText: "Trở lại",
  });
}

export default function FormInfoUser() {
  //initValue create user
  const [createUser, setCreateUser] = useState({
    ID: undefined, // db tự tạo
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

  return (
    <>
      <Form layout="vertical">
        <h4 className="text-center"> THÔNG TIN NGƯỜI DÙNG</h4>

        <Row>
          <Col className="mx-2 mt-2">
            <Image
              width={200}
              height={200}
              src="error"
              fallback="https://i.pravatar.cc/200"
            />
            <Form.Item name="upload"  valuePropName="fileList">
              <Upload name="avatar"  listType="picture">
                <Button style={{ width: 200 }} icon={<UploadOutlined />}>
                  Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              rules={[validate.checkRequire()]}
              className="mx-2"
              name="Ten"
              label="Tên"
            >
              <Input size="large" name="Ten" onChange={handleChangeValue} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[validate.checkRequire()]}
              className="mx-2"
              name="HoTen"
              label="Họ Tên"
            >
              <Input size="large" name="HoTen" onChange={handleChangeValue} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              rules={[validate.checkRequire()]}
              className="mx-2"
              name="NgaySinh"
              label="Ngày sinh"
            >
                 <DatePicker size="large" style={{width:"100%"}}  />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="mx-2"
              name="SoDienThoai"
              label="Số điện thoại"
              rules={[validate.checkRequire(), validate.checkPhone()]}
            >
              <Input
                size="large"
                name="SoDienThoai"
                onChange={handleChangeValue}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[validate.checkRequire(), validate.checkMail()]}
              className="mx-2"
              name="Email"
              label="Email"
            >
              <Input size="large" name="Email" onChange={handleChangeValue} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[validate.checkRequire()]}
              className="mx-2"
              name="DiaChi"
              label="Địa chỉ"
            >
              <Input size="large" name="DiaChi" onChange={handleChangeValue} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[validate.checkRequire(), validate.checkCodePost()]}
              className="mx-2"
              name="MaBuuChinh"
              label="Mã bưu chính"
            >
              <Input
                size="large"
                name="MaBuuChinh"
                onChange={handleChangeValue}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item className="mx-2" name="MaQuocGia" label="Quốc gia">
              <Select name="MaQuocGia" size="large" style={{ width: "100%" }}>
                <Option value="P3">Phường 3</Option>
                <Option value="P2">Phường 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className="mx-2" name="MaQuanHuyen" label="Quận/Huyện">
              <Select name="MaQuanHuyen" size="large" style={{ width: "100%" }}>
                <Option value="P3">Phường 3</Option>
                <Option value="P2">Phường 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className="mx-2" name="MaPhuongXa" label="Phường/Xã">
              <Select name="MaPhuongXa" size="large" style={{ width: "100%" }}>
                <Option value="P3">Phường 3</Option>
                <Option value="P2">Phường 2</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="mx-2"
              name="NguoiLienHe"
              label="Người liên hệ"
              rules={[validate.checkRequire(), validate.checkName()]}
            >
              <Input
                size="large"
                name="NguoiLienHe"
                onChange={handleChangeValue}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="mx-2"
              name="SoDienThoaiNguoiLienHe"
              label="Số điện thoại người liên hệ"
              rules={[validate.checkRequire(), validate.checkPhone()]}
            >
              <Input
                size="large"
                name="SoDienThoaiNguoiLienHe"
                onChange={handleChangeValue}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button size="large" type="">
            Trở lại
          </Button>
          <Button
            onClick={confirm}
            className="mx-2"
            size="large"
            type="primary"
          >
            Xác nhận
          </Button>
        </Row>
      </Form>
    </>
  );
}
