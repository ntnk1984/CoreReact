import React from "react";
import { Table, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import dataJSON from "../data.json";
import { SearchOutlined } from '@ant-design/icons';
// const data = [
//   {
//     key: 1,

//     length: 32,
//     width: 32,
//     height: 32,
//     weight: 32,
//     COD: 1000000,
//     currency: "VND",
//     packagetype: 32,
//   },
//   {
//     key: 2,

//     length: 32,
//     width: 32,
//     height: 32,
//     weight: 32,
//     COD: 1000000,
//     currency: "VND",
//     packagetype: 32,
//   },
//   {
//     key: 3,

//     length: 32,
//     width: 32,
//     height: 32,
//     weight: 32,
//     COD: 1000000,
//     currency: "VND",
//     packagetype: 32,
//   },
//   {
//     key: 4,

//     length: 32,
//     width: 32,
//     height: 32,
//     weight: 32,
//     COD: 1000000,
//     currency: "VND",
//     packagetype: 32,
//   },
// ];

const columns = [
  {
    title: "#",
    dataIndex: "stt",
    render: (text, record, index) => ++index,
  },
  {
    title: "Tên bưu gửi",
    dataIndex: "nameBuuGui",
    render: (text, record, index) => `Bưu gửi ${++index}`,
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  },

  {
    title: "Chiều dài",
    dataIndex: "length",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Câng nặng",
    dataIndex: "weight",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Chiều rộng",
    dataIndex: "width",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Đơn vị tiền tệ",
    render: (text, record, index) => {
      return record.currency.toLocaleString();
    },
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Tiền thu hộ",
    dataIndex: "COD",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Loại kiện hàng",
    dataIndex: "packagetype",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Xem chi tiết ",
    render: (text, record, index) => {
      return (
        <Button type="link">
          <NavLink to={`/${record.key}`}>Chi tiết</NavLink>
        </Button>
      );
    },
  },
];

const { data } = dataJSON;

console.log(gId);

export default function buuGuiTable() {
  return (
    <div className="container w-75 my-3">
      <h4 className="text-center">DANH SÁCH BƯU GỬI</h4>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
