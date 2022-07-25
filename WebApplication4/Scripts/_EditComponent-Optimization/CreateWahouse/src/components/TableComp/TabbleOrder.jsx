import { HomeOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';


function TabbleOrder({backToHome,Property}) {
  const [selectedData, setSelectedData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(()=>{
    

  },[])
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
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, ellipsis: true, align: "center" }));
  const defaultTitle = () => (
    <>
      <Space direction="horizonal" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Space>
          <div style={{ display: "flex", gap: "1.2rem", fontWeight: "bold", paddingRight: "30px" }}>
            <HomeOutlined onClick={backToHome} style={{ fontSize: "2rem", color: "#8c8c8c" }} />
            <span style={{ color: "#8c8c8c", fontWeight: "bold" }}>Quay về 
            </span>
          </div>
        </Space>

        <Space>

          <Button
            // icon={isLoading ? <LoadingOutlined /> : <ReloadOutlined onClick={fetchDataTable} />}
            // onClick={fetchDataTable}
            type="primary"
          >
            Tải lại
          </Button>
        </Space>
      </Space>
    </>
  );
  const HandleSetSelectedData = (e) => {
    setSelectedData(e);
  };
  const listOrderProps = {
    bordered: true,
    pagination: false,
    title: defaultTitle,
    rowSelection: {
      onChange: (e) => HandleSetSelectedData(e),
    },
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
  };
  let locale = {
    emptyText: () => <p style={{ fontWeight: "600", fontSize: "18px" }}>Không có đơn hàng nào</p>,
  };
  return (
    <div>
       <Table
              locale={locale}
              {...listOrderProps}
              columns={listOrderColumn}
              dataSource={data}
              scroll={{ y: 200 }}
            ></Table>
    </div>
  );
}

export default TabbleOrder;