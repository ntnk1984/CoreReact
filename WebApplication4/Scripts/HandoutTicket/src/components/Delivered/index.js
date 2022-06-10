import { Table } from "antd";
import React, { useContext, useState } from "react";
import { contextValue } from "../../App";

function Delivered(props) {
  const context = useContext(contextValue);

  const [listOrder, setListOrder] = useState([]);

  const columns = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "ordercode",
      // width: "10px",
      align: "center",
    },
    {
      title: "Địa chỉ gửi",
      // width: "12%",
      align: "center",
      render: (text, record) => (
        <>
          <p style={{ margin: 0, fontSize: "15px" }}>{record.senderaddress}</p>
          {/* <Text style={{ fontSize: "12px" }} disabled>
            {record.senderphone}
          </Text> */}
        </>
      ),
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "receiveraddress",
      // width: "10%",
      align: "center",
    },
    {
      title: "Khối lượng",
      align: "center",
      dataIndex: "weight",
      // width: "12%",
    },

    {
      title: "C.O.D",
      dataIndex: "cod",
      // width: "10%",
      align: "center",
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setListOrder(selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      setListOrder(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setListOrder(selectedRows);
    },
  };
  const data1 = [
    {
      ordercode: "ABC123",
      senderaddress: "Hà Nội",
      receiveraddress: "Hồ Chí Minh",
      weight: 3900,
      cod: 570000,
    },
    {
      ordercode: "CCV123",
      senderaddress: "HCM",
      receiveraddress: "Đà Nẵng",
      weight: 4000,
      cod: 190000,
    },
  ];

  const data = data1.map((item, index) => {
    return { ...item, key: index };
  });
  return (
    <div>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
                textAlign: "center",
              }}
            >
              {record.ordercode} {record.receiveraddress}
            </p>
          ),
        }}
      />
    </div>
  );
}

export default Delivered;
