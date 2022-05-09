import React, { useContext } from "react";
import { Table, Popover, Space, Typography, Divider, Button } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { ContextValue } from "../App.js";

const { Text } = Typography;

// const data = [
//   {
//     key: "1",
//     VietNameseName: "Sản phẩm 1",
//     Unit: "Hộp",
//     Quantity: 5,
//     Weight: 1.2,
//     COD: 120000,
//     Postage: "Name 1",
//   },
//   {
//     key: "2",
//     VietNameseName: "Sản phẩm 2",
//     Unit: "Hộp",
//     Quantity: 5,
//     Weight: 1.2,
//     COD: 120000,
//     Postage: "Name 2",
//   },
//   {
//     key: "3",
//     VietNameseName: "Sản phẩm 3",
//     Unit: "Hộp",
//     Quantity: 5,
//     Weight: 1.2,
//     COD: 120000,
//     Postage: "Name 3",
//   },
// ];

export default function FormOrder() {
  const { reducerOrder, dispatch } = useContext(ContextValue);
  const data = reducerOrder.get("MerchandiseItems").map((item, index) => ({
    key: index,
    VietNameseName: item.VietNameseName,

    Unit: item.Unit,
    Currency: item.Currency,
    Value: item.Value,
    Quantity: item.Quantity,
    Weight: item.Weight,

    nameSequence: item.nameSequence,
  }));
  const columns = [
    {
      title: "Tên",
      dataIndex: "VietNameseName",
      key: "VietNameseName",
    },
    {
      title: "Đơn vị",
      dataIndex: "Unit",
      key: "Unit",
    },
    {
      title: "Số lượng",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Cân nặng",
      key: "Weight",
      dataIndex: "Weight",
    },
    {
      title: "COD",
      key: "Value",
      dataIndex: "Value",
    },
    {
      title: "Bưu gửi",
      key: "nameSequence",
      dataIndex: "nameSequence",
    },
    {
      title: "Thao tác",

      render: (text, record) => (
        <Popover
          placement="right"
          content={
            <div style={{ width: 100 }}>
             
              <Button className="w-100" type="link">
                Edit
              </Button>
              <Button className="w-100" type="link">
                Delete
              </Button>
            </div>
          }
        >
          <Button ghost icon={<UnorderedListOutlined />} type="link" primary />
        </Popover>
      ),
    },
  ];

  return (
    <div className=" p-2 m-3 shadow-sm bg-white  rounded-2 ">
      <div className="d-flex bd-highlight ">
        <Text className="me-auto p-2 bd-highlight" strong>
          Đơn hàng
        </Text>
      </div>
      <Divider />
      <Table
        className="m-3"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
}
