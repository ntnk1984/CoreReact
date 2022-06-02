import React, { useContext, useEffect, useState } from "react";

import {
  Table,
  Switch,
  Space,
  Select,
  Button,
  DatePicker,
  Typography,
  Tag,
  message,
  Modal,
  Grid,
  Row,
  Col,
  List,
  Avatar,
} from "antd";
import { contextValue } from "../../App";

const { Text } = Typography;

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

// rowSelection objects indicates the need for row selection

function TableCustom(props) {
  const context = useContext(contextValue);
  const [listOrder, setListOrder] = useState([]);
  // const { listOrder } = context?.handoutTicket;

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
  //List PostMan
  const dataPostMan = [
    {
      name: "Nguyễn Đại Phúc",
      phone: "0999001101",
      avatar: "https://joeschmoe.io/api/v1/random",
    },
    {
      name: "Phúc Nguyễn",
      avatar: "https://joeschmoe.io/api/v1/random",
      phone: "0911199911",
    },
    {
      name: "Nguyễn Văn A",
      avatar: "https://joeschmoe.io/api/v1/random",
      phone: "03239996789",
    },
    {
      name: "Lê Lai",
      avatar: "https://joeschmoe.io/api/v1/random",
      phone: "09876543980",
    },
  ];
  const listPostMan = () => {
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={dataPostMan}
          style={{ textAlign: "left", height: "220px", overflow: "auto" }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<span>{item.name}</span>}
                description={<span>{item.phone}</span>}
              />
            </List.Item>
          )}
        />
      </>
    );
  };
  // end list
  //Modal state
  const [visible, setVisible] = useState(false);
  const modal_antd = () => {
    return (
      <>
        <Modal
          style={{ textAlign: "center" }}
          title="Tạo phiếu phát"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width="70%"
          footer={[
            <Button key="submit" type="primary" onClick={() => setVisible(false)}>
              Tạo phiếu
            </Button>,
            <Button key="back" onClick={() => setVisible(false)}>
              Thoát
            </Button>,
          ]}
        >
          <div className="modal-container m-auto">
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <div style={{ background: "ryan" }}>{listPostMan()}</div>
              </Col>
              <Col span={16}>2</Col>
            </Row>
          </div>
        </Modal>
      </>
    );
  };
  // End Modal state

  return (
    <div className="tableCustom">
      <div className="oparation pb-3 text-end">
        <Button className="px-2" type="primary" onClick={() => setVisible(true)}>
          Tạo phiếu giao
        </Button>
        {modal_antd()}
      </div>
      <div className="table-antd-custom">
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
    </div>
  );
}

export default TableCustom;
