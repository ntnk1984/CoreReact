import React, { useContext } from "react";
import { Table, Tag, Space, Typography, Divider, Button, Popover } from "antd";

import { UnorderedListOutlined } from "@ant-design/icons";
import { ContextValue } from "../App.js";
import ModalOrder from "./ModalOrder.js";
const { Text } = Typography;

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Chiều dài",
    dataIndex: "length",
    key: "length",
  },
  {
    title: "Chiều rộng",
    dataIndex: "width",
    key: "width",
  },
  {
    title: "Chiều cao",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "Cân nặng",
    key: "weight",
    dataIndex: "weight",
  },
  {
    title: "COD",
    key: "COD",
    dataIndex: "COD",
  },

  {
    title: "Thao tác",

    render: (text, record) => (
      <Popover
        placement="right"
        content={
          <div style={{ width: 100 }}>
            <div className="w-100" type="link">
              <ModalOrder value={record}/>
            </div>
            <Button className="w-100" type="link">
              Edit
            </Button>
            <Button className="w-100" type="link">
              Delete
            </Button>
          </div>
        }
        
      >
        <Button  icon={<UnorderedListOutlined />} type="link" primary />
      </Popover>
    ),
  },
];

// const data = [
//   {
//     key: "1",
//     name:"Name 1",
//     length: 1,
//     width: 1,
//     height: 5,
//     weight: 1.2,
//     COD: 120000,
//   },
//   {
//     key: "1",
//     name:"Name 2",
//     length: 1,
//     width: 1,
//     height: 5,
//     weight: 1.2,
//     COD: 120000,
//   },
//   {
//     key: "1",
//     name:"Name 3",
//     length: 1,
//     width: 1,
//     height: 5,
//     weight: 1.2,
//     COD: 120000,
//   },
// ];

export default function FormPostage() {

  const context = useContext(ContextValue);

  const data=context.reducerOrder.get("RequestedPackageLineItems").map((item,index)=>({
    key:index,
    name:item.name,
    sequenceNumber:item.SequenceNumber,
    length: item.dimension.length,
    width: item.dimension.width,
    height: item.dimension.height,
    weight: item.dimension.weight,
    COD: item.COD?item.COD:"null",
  }))


  return (
    <div className=" p-2 m-3 shadow-sm bg-white  rounded-2 ">
      <div className="d-flex bd-highlight ">
        <Text className="me-auto p-2 bd-highlight" strong>
          Bưu gửi
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
