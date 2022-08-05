import { HomeOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getOrderByLocationStored } from "../../Service";
const { Text } = Typography;
function TabbleOrder({ backToHome, activeState }) {
  const [selectedData, setSelectedData] = useState([]);
  const [data, setData] = useState([]);
  console.log(activeState, " activeState");
  async function getOrders() {
    let res = await getOrderByLocationStored(activeState?.CODE);
    console.log(res, " res");
    if (res) {
      setData(res.map((x) => ({ ...x, key: x.ID })));
    }
  }
  useEffect(() => {
    getOrders();
    console.log("run 11");
  }, [activeState.ID]);
  const listOrderColumns = [
    {
      title: "Mã đơn hàng ",
      width: "10%",

      dataIndex: "ORDERCODE",
      render: (text, record, index) => {
        return <a style={{ color: "cornflowerblue" }}>{text}</a>;
      },
    },
    {
      title: "Người gửi",
      width: "10%",
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>{text.SENDERNAME}</Col>
            <Col span={24}>
              <Text disabled style={{fontSize:".8rem"}}>{text.SENDERPHONE}</Text>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Người nhận",
      width: "10%",

      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>{text.RECEIVERNAME}</Col>
            <Col span={24}>
              <Text style={{fontSize:".8rem"}} disabled>{text.RECEIVERPHONE}</Text>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Địa chỉ nhận",
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>
              <Text>{text.RECEIVERADDRESS}</Text>
            </Col>
          </Row>
        );
      },
    },
    {
      width: "10%",
      title: "Cân nặng (kg)",
      dataIndex: "WEIGHT",
    },
    {
      width: "10%",
      title: "KL quy đổi",
      dataIndex: "CONVERTEDWEIGHT",
    },
    {
      width: "10%",
      title: "Thu Hộ",
      render: (text, record, index) => record.COD.toLocaleString(),
    },
    {
      title: "Tổng cước",
      width: "10%",
      render: (text, record, index) => record.TOTALPOSTAGE.toLocaleString(),
    },
  ];
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, align: "center" }));
  const defaultTitle = () => (
    <>
      <Space direction="horizonal" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Space>
          <div style={{ display: "flex", gap: "1.2rem", fontWeight: "bold", paddingRight: "30px" }}>
            <HomeOutlined onClick={backToHome} style={{ fontSize: "2rem", color: "#8c8c8c" }} />
            <span onClick={backToHome} style={{ color: "#8c8c8c", fontWeight: "bold" }}>
              Quay về
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

  const listOrderProps = {
    bordered: true,
    pagination: false,
    title: defaultTitle,
    // rowSelection: {
    //   onChange: (e) => HandleSetSelectedData(e),
    // },
    size: "small",
    showHeader: true,
    tableLayout: "unset",
  };
  let locale = {
    emptyText: () => <p style={{ fontWeight: "600", fontSize: "18px" }}>Không có đơn hàng nào</p>,
  };
  return (
    <div style={{width:"100%"}}>
      <Table
        locale={locale}
        {...listOrderProps}
        columns={listOrderColumn}
        dataSource={data}
        style={{maxWidth:"100%"}}
      ></Table>
    </div>
  );
}

export default TabbleOrder;
