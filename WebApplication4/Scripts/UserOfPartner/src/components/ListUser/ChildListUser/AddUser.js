import React, { useContext, useState, memo } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal, Row, Col, Select } from "antd";

import {
  getPhuongXa,
  getQuanHuyen,
  getTinhThanh,
} from "../../../services/Province.js";
import { contextValue } from "../../../App.js";
import {
  createUserOfPartner,
  getAllUserOfPartner,
} from "../../../services/UserService.js";
import * as XLSX from "xlsx";


const { Option } = Select;

function AddUser() {
  //ẩn hiện modal
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
    KichHoat: 0,
    IDNguoiTao: 1, 
    IDNguoiCapNhat: 1, 
    NgayTao: "21/02/2022", 
    NgayCapNhat: "17/04/2022", 
    NgayHeThong: "24/04/2022", 
    Group: undefined,
    IDDoiTac: 1,
    CongNo: undefined,
    HangMuc: undefined, 
  });
  //set dữ liệu từ form d
  const handleChangeValue =(e)=>{
    const { name, value } = e.target;
    setCreateUser({ ...createUser, [name]: value });
  }
  //hiện modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log(createUser)
    //call api thêm user

    await createUserOfPartner(createUser);
    //reset data table
    dispatch({
      type: "GET_ALL_USER_API",
      payload: await getAllUserOfPartner(),
    });
    //hide
    await setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const { userPartner, dispatch } = useContext(contextValue);
  //file mẫu excel import ở thư mục assets
  const handleImport = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    console.log(file,"file");

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      //xử lý file và call api thêm user
      data.split("\n").forEach((item, index) => {
        // if (index != 0) {
        //   //  let arr=item.split(",")
        //   //  let obj={
        //   //    TaiKhoan:arr[0],
        //   //    MatKhau:arr[1],
        //   //    Ten:arr[2],
        //   //    HoTen:arr[3],
        //   //    SoDienThoai:arr[4],
        //   //    Email:arr[5]
        //   //  }
        //   //call api add từng user
        // }
      
      });
 
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <Row>
        <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
          Tạo user mới
        </Button>
        <Form.Item name="upload" valuePropName="fileList" className="mx-2 my-0">
          <Button className="upload-wrap">
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleImport}
              className="inputfile"
            />
            <label className="labelfile" for="file">
              Import nhiều user
            </label>
          </Button>
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
          <Row className="my-4">
            <Col span={8}>
              <Form.Item className="mx-2" name="TaiKhoan" label="Tài khoản">
                <Input name="TaiKhoan" onChange={handleChangeValue} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item className="mx-2" name="MatKhau" label="Mật khẩu">
                <Input name="MatKhau" onChange={handleChangeValue} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                className="mx-2"
                name="ReMatKhau"
                label="Nhập lại mật khẩu"
              >
                <Input name="ReMatKhau" onChange={handleChangeValue} />
              </Form.Item>
            </Col>
          </Row>

          <Row className="my-4">
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

          <Row className="my-4">
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

          <Row className="my-4">
            <Col span={8}>
              <Form.Item className="mx-2" name="MaQuocGia" label="Quốc gia">
                <Select
                  defaultValue="Vui lòng chọn"
                  style={{ width: "100%" }}
                  name="MaQuocGia"
                  onChange={async (id) => {
                    setCreateUser({ ...createUser, MaQuocGia: id });

                    dispatch({
                      type: "GET_TINHTHANH_API",
                      payload: await getTinhThanh(),
                    });
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
                  onChange={async (val) => {
                    setCreateUser({ ...createUser, MaTinhThanh: val });
                    dispatch({
                      type: "GET_QUANHUYEN_API",
                      payload: await getQuanHuyen(val),
                    });
                  }}
                >
                  {userPartner?.tinhThanhData?.map((item) => (
                    <Option value={item.code}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="mx-2" name="MaQuanHuyen" label="Quận/Huyện">
                <Select
                  defaultValue="Vui lòng chọn"
                  name="MaQuanHuyen"
                  style={{ width: "100%" }}
                  onChange={async (val) => {
                    setCreateUser({ ...createUser, MaQuanHuyen: val });
                    dispatch({
                      type: "GET_PHUONGXA_API",
                      payload: await getPhuongXa(val),
                    });
                  }}
                >
                  {userPartner?.quanHuyenData.map((item) => (
                    <Option value={item.code}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className="my-4">
            <Col span={8}>
              <Form.Item className="mx-2" name="MaPhuongXa" label="Phường/Xã">
                <Select
                  defaultValue="Vui lòng chọn"
                  style={{ width: "100%" }}
                  name="MaPhuongXa"
                  onChange={(val) => {
                    setCreateUser({ ...createUser, MaPhuongXa: val });
                  }}
                >
                  {userPartner?.phuongXaData.map((item) => (
                    <Option value={item.code}>{item.name}</Option>
                  ))}
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

export default memo(AddUser);
