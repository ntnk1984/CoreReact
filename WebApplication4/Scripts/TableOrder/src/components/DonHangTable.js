import React from "react";
import { Table, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import dataJSON from "../data.json";
const columns = [
  {
    title: "#",
    dataIndex: "stt",
    render: (text, record, index) => ++index,
  },
  {
    title: "Mã sản phẩm",
    dataIndex: "HSCode",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "VietNameseName",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },

  {
    title: "Tên sản phẩm tiếng Anh",
    dataIndex: "EnglishName",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Mã quốc gia sản xuất",
    dataIndex: "CountryManufacturedCode",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Đơn vị sản phẩm",
    dataIndex: "Unit",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Đơn vị tiền tệ",
    dataIndex: "Currency",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Đơn giá",
    dataIndex: "Value",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Số lượng ",
    dataIndex: "Quantity",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
  {
    title: "Cân nặng",
    dataIndex: "Weight",
    sorter: (a, b) => console.log(a, b),
    sortDirections: ["descend"],
  },
];
export default function Temp2() {
  const { id } = useParams();
  return (
    <div className="my-3">
      <h4 className="text-center">CHI TIẾT BƯU GỬI</h4>

      <Table
        style={{ margin: "0 auto" }}
        className="w-75"
        columns={columns}
        dataSource={dataJSON?.data[id - 1]?.MerchandiseInfomation}
      />
    </div>
  );
}
