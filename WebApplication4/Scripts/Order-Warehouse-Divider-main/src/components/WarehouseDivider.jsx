import { Badge, Button, Card, Col, Divider, Row, Skeleton, Space, Table, Typography } from "antd";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./WarehouseD.css";
const { Text } = Typography;

const orders = [
  {
    key: "4fbe3948-d943-45b9-a95b-580c52e54d00",
    id: "4fbe3948-d943-45b9-a95b-580c52e54d00",
    ticketID: "4fbe3948-d943-45b9-a95b-580c52e54d00",
    shipno: "IUTTGVET1",
    dropofftype: "1",
    servicetype: "1",
    ORDERCODE: "IUTTGVET",
    shippingchargespayment: "Sender",
    deliverystatus: "PICKUP_WAITING",
    timeregister: "5/19/2022 3:45:51 PM",
    sendername: "Thành vip pro",
    senderphone: "0123456789",
    senderaddress: "thu duc, vn",
    sendercountrycode: "VN",
    sendercitycode: "VN-SG",
    senderdistrictcode: "71010",
    senderwardcode: "71020",
    senderpostalcode: "71000",
    receivername: "test3",
    receiverphone: "0987654321",
    receiveraddress: "hanoi, vn",
    receivercountrycode: "VN",
    receivercitycode: "VN-HN",
    receiverdistrictcode: "Cầu Giấy",
    receiverwardcode: "1",
    receiverpostalcode: "100000",
    totalpackages: 2,
    servicepostage: 1,
    addedpostage: 1,
    codpostage: 1,
    surcharge: 1,
    totalpostage: 1,
    vat: 1,
    weight: 12,
    cod: 300,
    currency: "VND",
    content: null,
    note: null,
    warehouse: "WH01",
  },
  {
    key: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    id: "47fb9e2a-840f-4444-b730-24ddb31cddca",
    ticketID: "4fbe3948-d943-45b9-a95b-580c52e54d00",
    shipno: "EGDUIEEH1",
    dropofftype: "1",
    servicetype: "1",
    ORDERCODE: "EGDUIEEH",
    shippingchargespayment: "Sender",
    deliverystatus: "PICKUP_WAITING",
    timeregister: "5/19/2022 4:15:14 PM",
    sendername: "Thắng ",
    senderphone: "0747852369",
    senderaddress: "01/01",
    sendercountrycode: "VN",
    sendercitycode: "VN-SG",
    senderdistrictcode: "71010",
    senderwardcode: "P3",
    senderpostalcode: "700000",
    receivername: "Thành ",
    receiverphone: "0926985147",
    receiveraddress: "02/01",
    receivercountrycode: "VN",
    receivercitycode: "VN-HN",
    receiverdistrictcode: "Cầu Giấy",
    receiverwardcode: "P3",
    receiverpostalcode: "100000",
    totalpackages: 1,
    servicepostage: 1,
    addedpostage: 1,
    codpostage: 1,
    surcharge: 1,
    totalpostage: 1,
    vat: 1,
    weight: 65,
    cod: 10,
    currency: "VND",
    content: null,
    note: null,
    warehouse: "WH01",
  },
  {
    key: "47fb9e2a-840f-4444-b730-24ddb31cddcx",
    id: "47fb9e2a-840f-4444-b730-24ddb31cddcx",
    ticketID: "4fbe3948-d943-45b9-a95b-580c52e54d01",
    shipno: "EGDUIEEH2",
    dropofftype: "1",
    servicetype: "1",
    ORDERCODE: "EGDUBGEH",
    shippingchargespayment: "Sender",
    deliverystatus: "PICKUP_WAITING",
    timeregister: "5/19/2022 4:15:14 PM",
    sendername: "Công đẹp trai ",
    senderphone: "0747852369",
    senderaddress: "Heaven",
    sendercountrycode: "VN",
    sendercitycode: "VN-SG",
    senderdistrictcode: "71010",
    senderwardcode: "P3",
    senderpostalcode: "700000",
    receivername: "Phúc Boiz ",
    receiverphone: "0926985147",
    receiveraddress: "Hell",
    receivercountrycode: "VN",
    receivercitycode: "VN-HN",
    receiverdistrictcode: "Cầu Giấy",
    receiverwardcode: "P3",
    receiverpostalcode: "100000",
    totalpackages: 1,
    servicepostage: 1,
    addedpostage: 1,
    codpostage: 1,
    surcharge: 1,
    totalpostage: 1,
    vat: 1,
    weight: 65,
    cod: 10,
    currency: "VND",
    content: null,
    note: null,
    warehouse: "WH01",
  },
];

const WarehouseDivider = () => {
  const [data, setData] = useState(orders);
  const [selectedData, setSelectedData] = useState([]);
  const [detailZone, setDetailZone] = useState();
  const [classNameActive, setClassNameActive] = useState();

  const [zoneList, setZoneList] = useState([
    { accepTable: [], idZone: "KV01", zoneName: "Khu Lạnh", description: undefined },
    { accepTable: [], idZone: "KV02", zoneName: "Khu Bình Thường", description: undefined },
    { accepTable: [], idZone: "KV03", zoneName: "Khu Đồ Dễ Vỡ", description: undefined },
    { accepTable: [], idZone: "KV04", zoneName: "Khu Đồ Nặng", description: undefined },
  ]);

  const listOrderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ORDERCODE",
      width: "100%",
      render: (text, record) => {
        return (
          <>
            <Typography style={{ fontWeight: 500 }}>{text}</Typography>
            <Text disabled>{record.sendername + " - " + record.senderphone}</Text>
          </>
        );
      },
    },
  ];
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, ellipsis: true }));
  const HandleSetSelectedData = (key, obj) => {
    setSelectedData(obj);
  };
  console.log(selectedData, " selectedData");
  const listOrderProps = {
    bordered: true,
    pagination: false,
    rowSelection: {
      selectedRowKeys: selectedData.map((x) => x.key),
      onChange: (key, obj) => {
        HandleSetSelectedData(key, obj);
      },
    },
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
  };

  const loadDataZone = (idZone) => {
    const idx = zoneList.findIndex((item) => item.idZone === idZone);
    const tempZone = zoneList[idx];
    selectedData?.map((item) => tempZone.accepTable.push({ ...item }));
    zoneList.slice(idx, 1, tempZone);
    setZoneList([...zoneList]);
    const diff = data.filter((x) => !selectedData.includes(x));

    setData([...diff]);
    setSelectedData([]);
  };
  const loadInfoZone = (value) => {
    setClassNameActive(value.idZone);
    setDetailZone(value);
  };
  const closeDetail = () => {
    setClassNameActive();
    setDetailZone();
  };
  const handleSubmit = () => {
    const temp = [];
    zoneList.map((item) => {
      if (item.accepTable.length) {
        temp.push(item);
      } else {
        return temp;
      }
      return temp;
    });
    // Call Api Gửi temp
    // postData(temp)
    console.log(temp, "temp");
  };
  return (
    <div>
      <Row gutter={[16]} style={{ margin: 0 }}>
        <Col xs={24} sm={24} md={10} lg={8}>
          <Card style={{ height: "100%" }}>
            <Divider orientation="left">Danh sách đơn</Divider>
            <Table {...listOrderProps} columns={listOrderColumn} dataSource={data} scroll={{ y: "75vh" }}></Table>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={14} lg={16}>
          <Card style={{ height: "100%", border: "true" }}>
            <Row gutter={[16]}>
              <Col span={24}>
                <div>
                  <Row style={{ alignItems: "center" }}>
                    <Col span={18}>
                      <Divider orientation="left">Kho PayNet</Divider>
                    </Col>
                    <Col span={6}>
                      <Divider orientation="center">
                        <Button
                          type="primary"
                          style={{ transition: "linear 0.3s" }}
                          disabled={!zoneList.find((item) => item.accepTable.length !== 0)}
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Xác Nhận
                        </Button>
                      </Divider>
                    </Col>
                  </Row>
                </div>

                <div className="customSpace" style={{ overflow: "auto", maxWidth: "100%", padding: "20px 5px " }}>
                  <Space style={{ width: "100%" }}>
                    {zoneList.map((item, index) => {
                      return (
                        <Badge key={index} count={item.accepTable?.length}>
                          <Card
                            className={classNameActive === item.idZone ? "active" : "unActive"}
                            style={{
                              textAlign: "center",
                              minWidth: "100%",
                              overflow: "initial",
                              width: "200px",
                              minHeight: "150px",
                              padding: "5px, 15px",
                              // cursor: "pointer",
                            }}
                            title={`Khu số: ${item.idZone}`}
                            size="small"
                          >
                            <p>{item.zoneName || " kho tạm"}</p>
                            <div
                              className="btn-footer"
                              style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
                            >
                              <Button
                                type="link"
                                style={{ marginTop: "10px" }}
                                onClick={() => {
                                  // console.log(item);
                                  loadInfoZone(item);
                                }}
                              >
                                Chi tiết
                              </Button>
                              {selectedData.length ? (
                                <Button
                                  type="dashed"
                                  style={{ marginTop: "10px" }}
                                  onClick={() => {
                                    loadDataZone(item.idZone);
                                  }}
                                >
                                  Load
                                </Button>
                              ) : (
                                ""
                              )}
                            </div>
                          </Card>
                        </Badge>
                      );
                    })}
                  </Space>
                </div>
              </Col>
              <Col span={24}>
                {detailZone ? (
                  <>
                    <div className="detail-zone">
                      <Row style={{ alignItems: "center", textAlign: "center" }}>
                        <Col span={20}>
                          {" "}
                          <Divider orientation="left">Chi tiết khu {detailZone?.zoneName}</Divider>
                        </Col>
                        <Col span={4}>
                          <CloseOutlined className="close-detail-zone" onClick={closeDetail} />
                        </Col>
                      </Row>
                    </div>
                    <Skeleton />
                  </>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default WarehouseDivider;
