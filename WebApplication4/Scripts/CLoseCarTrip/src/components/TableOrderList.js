import { Card, message, Space, Table } from "antd";

import React, { useState, useEffect } from "react";

const TableOrderList = ({ detailList }) => {
  const [orders, setOrders] = useState();
  const [data, setData] = useState(orders);

  // table
  const addKeyDataTable = () => {
    const dataKey = detailList?.map((x) => ({ ...x, key: x.ID }));
    setOrders(dataKey);
    setData(dataKey);
  };
  useEffect(() => {
    addKeyDataTable();
  }, [detailList]);

  const listOrderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ORDERCODE",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ gửi",
      dataIndex: "SENDERADDRESS",
      width: "20%",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "RECEIVERADDRESS",
      width: "20%",
    },
    {
      title: "Khối lượng",
      dataIndex: "WEIGHT",
      width: "20%",
    },
  ];
  // end table
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, ellipsis: true }));
  const listOrderProps = {
    bordered: true,
    pagination: false,
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
  };

  return (
    <>
      <Space
        direction="horizontal"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Card>
          Danh sách đơn hàng trong phiếu
          <Table {...listOrderProps} columns={listOrderColumn} dataSource={data} scroll={{ y: 200 }}></Table>
        </Card>
      </Space>
    </>
  );
};

export default TableOrderList;
