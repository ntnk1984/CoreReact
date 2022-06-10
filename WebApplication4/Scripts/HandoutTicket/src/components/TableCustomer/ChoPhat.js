import React, { useContext, useEffect, useState } from "react";
import "./style.css";
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
  Tabs,
  Badge,
  Card,
  Skeleton,
  Input,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { contextValue } from "../../App";
import TextArea from "antd/lib/input/TextArea";

const { Text } = Typography;
const { TabPane } = Tabs;

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
  const [shipper, setShipper] = useState();
  const [shipmentDetails, setShipmentDetails] = useState({ delivNoteName: undefined, describe: "" });

  // select row item order
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
      level: 1,
      selfIntroduction:
        "Lorem ipsum dolor sit amet consec tetur adipisic ing elit. Consequ atur eos dolo remque perspic iatis vitae numquam ",
    },
    {
      name: "Phúc Nguyễn",
      avatar: "https://joeschmoe.io/api/v1/random",
      phone: "0911199911",
      level: 2,
      selfIntroduction:
        "Lorem ipsum dolor sit amet consec tetur adipisic ing elit. Consequ atur eos dolo remque perspic iatis vitae numquam ",
    },
    {
      name: "Nguyễn Văn A",
      avatar: "https://joeschmoe.io/api/v1/random",
      phone: "03239996789",
      level: 3,
      selfIntroduction:
        "Lorem ipsum dolor sit amet consec tetur adipisic ing elit. Consequ atur eos dolo remque perspic iatis vitae numquam ",
    },
    {
      name: "Lê Lai",
      avatar: "https://joeschmoe.io/api/v1/random",
      phone: "09876543980",
      level: 4,
      selfIntroduction:
        "Lorem ipsum dolor sit amet consec tetur adipisic ing elit. Consequ atur eos dolo remque perspic iatis vitae numquam ",
    },
  ];
  const listPostMan = () => {
    return (
      <>
        <List
          itemLayout="horizontal"
          bordered
          dataSource={dataPostMan}
          style={{ textAlign: "left", height: "220px", overflow: "auto" }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                onClick={() => {
                  console.log(item);
                  setShipper(item);
                }}
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
  //Shipper Infomantion
  const handleShowInfoShipper = () => {
    return (
      <Row gutter={[24, 16]}>
        <Col span={8}>
          <Card>
            {shipper ? (
              <div style={{ textAlign: "center", color: "#7F8487" }}>
                <Avatar bordered size={64} src={shipper?.avatar}></Avatar>
                <p className="py-2" style={{ borderBottom: " 1px solid " }}>
                  <span style={{ paddingRight: "5px" }}>Cấp độ: </span>
                  <Tag style={{ padding: "0 20px" }} color="cyan">
                    {shipper?.level}
                  </Tag>
                </p>
                <p className="py-2" style={{ borderBottom: " 1px solid " }}>
                  <span style={{ paddingRight: "5px" }}>Số Hiệu:</span>
                  <Tag style={{ padding: "0 20px" }} color="purple">
                    SP030790
                  </Tag>
                </p>
              </div>
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}
          </Card>
        </Col>
        <Col span={16} style={{ color: "#7F8487" }}>
          {shipper ? (
            <div style={{ width: "80%" }}>
              <Row gutter={[8, 16]}>
                <Col span={8}>
                  <p>Người phát:</p>
                </Col>
                <Col span={16}>
                  <p>{shipper?.name}</p>
                </Col>

                <Col span={8}>
                  <p>Số điện thoại:</p>
                </Col>
                <Col span={16}>
                  <p>{shipper?.phone}</p>
                </Col>

                <Col span={8}>
                  <p>Mô tả :</p>
                </Col>
                <Col span={16}>
                  <p>{shipper?.selfIntroduction}</p>
                </Col>
              </Row>
            </div>
          ) : (
            <Skeleton
              active
              paragraph={{
                rows: 4,
              }}
            />
          )}
        </Col>
      </Row>
    );
  };
  // end ShipInF

  // Tab information of collection ticket
  const handleValue = (e) => {
    const { name, value } = e.target;
    setShipmentDetails({ ...shipmentDetails, [name]: value });
  };

  const tabCollectionTicket = () => {
    return (
      <div className="tab-custom">
        <Tabs tabPosition="top">
          <TabPane tab="Thông tin phiếu giao" key="1">
            <div style={{ padding: "5px 30px" }}>
              <Input
                name="delivNoteName"
                style={{ width: "100%" }}
                onChange={(e) => handleValue(e)}
                addonBefore="Tên Phiếu"
                defaultValue={shipper?.name}
                placeholder="Nhập tên phiếu"
              />
            </div>
            <div style={{ textAlign: "left" }}>
              <Divider style={{ margin: "0" }} orientation="left">
                Mô tả :
              </Divider>
              <div style={{ padding: "5px 30px", fontWeight: "600", fontSize: "#7F8487", display: "flex" }}>
                <p style={{ width: "25%", padding: "5px 0" }}>Đơn hàng đã chọn:</p>
                <p>
                  {listOrder?.map((item, index) => {
                    return (
                      <Tag color="cyan" key={index}>
                        {item.ordercode}
                      </Tag>
                    );
                  })}
                </p>
              </div>
              <div style={{ padding: "5px 30px" }}>
                <TextArea
                  placeholder="Mô tả Phiếu hàng"
                  name="describe"
                  onChange={(e) => handleValue(e)}
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </div>
            </div>
          </TabPane>
          <TabPane
            tab={
              shipper ? (
                <Badge.Ribbon size="small" text={shipper.name}>
                  Thông tin người thực hiện
                </Badge.Ribbon>
              ) : (
                "Thông tin người thực hiện"
              )
            }
            key="2"
          >
            {handleShowInfoShipper()}
          </TabPane>
        </Tabs>
      </div>
    );
  };
  // End Tab

  //Modal state
  const handleSubmitData = () => {
    // context.dispatch({ type: "ADD_SHIPMENT_DETAILS", payload: shipmentDetails });
    // context.dispatch({ type: "ADD_LISTORDER_CHECKED", payload: listOrder });
    // context.dispatch({ type: "ADD_SHIPER", payload: shipper });
  };
  const [visible, setVisible] = useState(false);
  const modal_antd = () => {
    return (
      <>
        <Modal
          style={{ textAlign: "center", backgroundColor: "#FAFAFA" }}
          title="Tạo phiếu phát"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width="70%"
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                handleSubmitData();
                setVisible(false);
              }}
            >
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
              <Col span={16}>{tabCollectionTicket()}</Col>
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
