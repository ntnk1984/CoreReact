import React from "react";
import { Button, Table, Tag } from "antd";

const columns = [
  {
    title: "#",
    render: (text, record, index) => ++index,
  },
  {
    title: "Mã đơn hàng ",
    dataIndex: "MaDonHang",
  },
  {
    title: "Tổng cước",
    render: (text, record, index) => record.TongCuoc.toLocaleString(),
  },
  {
    title: "Tổng cước sau VAT",
    render: (text, record, index) => record.TongCuocSauVAT.toLocaleString(),
  },
  {
    title: "Tổng VAT",
    render: (text, record, index) => record.TongVAT.toLocaleString(),
  },
  {
    title: "Xác nhận",
    dataIndex:"Done",
    
    sorter: (a, b) => {return JSON.stringify(a.Done).length-JSON.stringify(b.Done).length},
    
  },
  {
    title: "Sửa",
    render: (text, record, index) => {
      
      return record.Done.props.children==="Đã xác nhận" ? (
        <Button type="link" disabled>Sửa</Button>
      ) : (
        <Button type="link" >Sửa</Button>
      );
    },
  },
  {
    title: "Xóa",
    render: (text, record, index) => {
      return record.Done.props.children==="Đã xác nhận" ? (
        <Button type="link" disabled >Xóa</Button>
      ) : (
        <Button type="link"danger >Xóa</Button>
      );
    },
  },
];

const data = [
  {
    key: "1",
    MaDonHang: "JK-10924",
    TongCuoc: 9800000,
    TongCuocSauVAT: 6000000,
    TongVAT: 7000000,
    Done: <Tag color="#87d068">Đã xác nhận</Tag> ,
  },
  {
    key: "2",
    MaDonHang: "JK-10924",
    TongCuoc: 9800000,
    TongCuocSauVAT: 6000000,
    TongVAT: 7000000,
    Done:  <Tag color="#87d068">Đã xác nhận</Tag>,
  },
  {
    key: "3",
    MaDonHang: "JK-10924",
    TongCuoc: 9800000,
    TongCuocSauVAT: 6000000,
    TongVAT: 7000000,
    Done: <Tag color="#f50">Chưa xác nhận</Tag>,
  },
  {
    key: "4",
    MaDonHang: "JK-10924",
    TongCuoc: 9800000,
    TongCuocSauVAT: 6000000,
    TongVAT: 7000000,
    Done: <Tag color="#f50">Chưa xác nhận</Tag>,
  },
  {
    key: "5",
    MaDonHang: "JK-10924",
    TongCuoc: 9800000,
    TongCuocSauVAT: 6000000,
    TongVAT: 7000000,
    Done: <Tag color="#87d068">Đã xác nhận</Tag>,
  }
];

export default function DonHangTable() {
  return (
    <>
      <h3 className="text-center my-3">ĐƠN HÀNG</h3>
      <Table
        style={{ margin: "0 auto" }}
        className="w-75 "
        columns={columns}
        dataSource={data}
        
      />
    </>
  );
}
