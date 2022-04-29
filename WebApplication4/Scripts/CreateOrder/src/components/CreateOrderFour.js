import { Button, Collapse, Spin } from "antd";
import React, { useContext, useState } from "react";
import { contextValue } from "../App.js";
import EditableTableFuc from "./DetailOrder/EditableTableFuc";

const { Panel } = Collapse;

function CreateOrderFour({ handelSubmit }) {
  const context = useContext(contextValue);
  const { createOrder, dispatch } = context;

  //createOrder.spi
  const { listOrder, visibility, sender, receiver } = context.createOrder;
  const { sendername, senderphone, senderaddress } = sender;
  const { receivername, receiverphone, receiveraddress } = receiver;

  const [OpenSpin, setOpenSpin] = useState(false);
  const [visible, setVisible] = useState(false);
  const columns = [
    {
      title: "MSP",
      dataIndex: "key",
      width: "50px",
    },
    {
      title: "Tên Mặt Hàng",
      dataIndex: "name",
    },
    {
      title: "MQGSX",
      dataIndex: "address",
    },
    {
      title: "Cân Nặng",
      dataIndex: "age",
      width: "70px",
    },
    {
      title: "Số Lượng",
      dataIndex: "age",
      width: "70px",
    },
    {
      title: "Đơn Vị SP",
      dataIndex: "age",
      width: "100px",
    },

    {
      title: "MQGSX",
      dataIndex: "address",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      textAlign: "right",
      width: 150,
      render: () => (
        <div>
          <Button type="link">Sửa</Button>
          <Button type="link">Xóa</Button>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York  Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London  Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney Lake Park",
    },
  ];
  console.log(listOrder);
  return (
    <Spin spinning={OpenSpin}>
      <div className=" rounded rounded-3 shadow-sm" style={{ background: "white", padding: "10px 20px" }}>
        <div style={{ paddingBottom: "20px", textAlign: "end" }}>
          <EditableTableFuc />
        </div>
      </div>
    </Spin>
  );
}
export default CreateOrderFour;
