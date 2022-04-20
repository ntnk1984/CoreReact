import React, { useContext, useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Row,
  Col,
  Upload,
  Select,
} from "antd";
import dataUserTest from "../../../assets/dataTest/dataUser.json";
import { useAsync } from "react-async-hook";
import { getPhuongXa, getQuanHuyen, getTinhThanh } from "../../../services/Province.js";
import { contextValue } from "../../../App.js";
import { createUserOfPartner } from "../../../services/UserService.js";

const { Option } = Select;
export default function AddUser() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  //initValue create user
  const [createUser, setCreateUser] = useState({

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
    IDDoiTac: 1,
    CongNo:undefined,
    HangMuc:undefined //lấy từ token login partner
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setCreateUser({ ...createUser, [name]: value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk =async () => {
    //call api thêm user
    setIsModalVisible(false);
    await createUserOfPartner(createUser)
 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const {userPartner, dispatch} = useContext(contextValue);




  return (
    <>
      <Row>
        <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
          Tạo user mới
        </Button>
        <Form.Item name="upload" valuePropName="fileList">
          <Upload name="logo" listType="picture">
            <Button className="mx-2" icon={<UploadOutlined />} type="danger">
              Import nhiều user
            </Button>
          </Upload>
        </Form.Item>
      </Row>
      <Modal
        title="Tạo mới người dùng"
        visible={isModalVisible}
        width={900}
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
              <Select
                  defaultValue="Vui lòng chọn"
                  style={{ width: "100%" }}
                  
                  name="MaQuocGia"
                  onChange={async (id)=>{

                    setCreateUser({...createUser,MaQuocGia:id})

                    dispatch({
                      type:"GET_TINHTHANH_API",
                      payload:await getTinhThanh()
                    })
                  }}
                >
                 <Option value="VN">Việt Nam</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                className="mx-2"
                name="MaTinhThanh"
                label="Tỉnh/Thành Phố"
              >
                <Select
                  defaultValue="Vui lòng chọn"
                  name="MaTinhThanh"
                  style={{ width: "100%" }}
                  onChange={async (val)=>{
                    setCreateUser({...createUser,MaTinhThanh:val})
                    dispatch({
                      type:"GET_QUANHUYEN_API",
                      payload:await getQuanHuyen(val)
                    })
                  }}
               
                >
                  {userPartner?.tinhThanhData?.map(item=><Option value={item.code}>{item.name}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="mx-2" name="MaQuanHuyen" label="Quận/Huyện">
              <Select
                  defaultValue="Vui lòng chọn"
                  name="MaQuanHuyen"
                  style={{ width: "100%" }}
                  onChange={async (val)=>{
                    setCreateUser({...createUser,MaQuanHuyen:val})
                    dispatch({
                      type:"GET_PHUONGXA_API",
                      payload:await getPhuongXa(val)
                    })
                  }}
                 
                >
                  {userPartner?.quanHuyenData.map(item=><Option value={item.code}>{item.name}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="mx-2" name="MaPhuongXa" label="Phường/Xã">
              <Select
                  defaultValue="Vui lòng chọn"
                  style={{ width: "100%" }}
                  
                  name="MaPhuongXa"
                  onChange={(val)=>{
                    setCreateUser({...createUser,MaPhuongXa:val})
                  }}
                >
                  {userPartner?.phuongXaData.map(item=><Option value={item.code}>{item.name}</Option>)}
                </Select>
              </Form.Item>
            </Col>

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
