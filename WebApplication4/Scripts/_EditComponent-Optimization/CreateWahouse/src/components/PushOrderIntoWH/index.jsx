import {
  CloseOutlined,
  HomeOutlined,
  InfoCircleFilled,
  LoadingOutlined,
  PlusOutlined,
  QuestionCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Divider, List, message, Popconfirm, Row, Space, Table, Tooltip, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getDataListOrderApi, getSingleWarehouseApi, pushOrdersInTheWHApi } from "../../Service";
import dataOrder from "./Assets/order.json";
import dataWH from "./Assets/warehouse.json";
import "./index.css";

const { Text } = Typography;
const dataJson = dataWH;
function PushOrderIntoWH({ merchandiseAttribute, warehouseAttribute }) {
  // style
  const iconWaiting = {
    color: "red",
    textAlign: "center",
  };
  const iconInfo = {
    color: "#1F4690",
    textAlign: "center",
  };
  //en style

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataWHGetApi, setDataWHGetApi] = useState([]);
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const [activeItemWH, setActiveItemWH] = useState();

  const [propertiesWH, setPropertiesWH] = useState([]);
  const [propertiesArea, setPropertiesArea] = useState();

  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const [selectedRowValue, setSelectedRowValue] = useState([]);

  const ISDISABLEBUTON = selectedRowValue?.length && activeItemWH;

  async function getSingleDataWH() {
    let res = await getSingleWarehouseApi();
    if (res) {
      setDataWHGetApi(res);
    }
  }
  async function getListOrder() {
    let res = await getDataListOrderApi();
    if (res) {
      setData(res.map((x) => ({ ...x, key: x.ID })));
    }
  }
  useEffect(() => {
    getSingleDataWH();
    getListOrder();
  }, []);
  useEffect(() => {
    let temp = [];
    dataWHGetApi?.LISTAREA?.forEach((x) => {
      if (x?.PROPERTY && Object.keys(x.PROPERTY).length) {
        temp.push(x);
      } else {
        x?.LISTBIN?.forEach((bin) => {
          if (bin?.PROPERTY && Object.keys(bin?.PROPERTY).length) {
            temp.push(bin);
          } else {
            bin?.LISTBOX?.forEach((box) => temp.push(box));
          }
        });
      }
    });
    temp.sort((a, b) => a.CAPACITY - a.LOADED - (b.CAPACITY - b.LOADED));
    setDataWarehouse([...temp]);
  }, [dataWHGetApi]);
  useEffect(() => {
    setPropertiesWH(warehouseAttribute);
    setPropertiesArea(merchandiseAttribute);
  }, [merchandiseAttribute, warehouseAttribute]);

  const mapPropertyNameByCodeOrder = (key, data) => {
    if (!data) return;
    let Name = [];
    data?.forEach((item) => {
      if (propertiesArea?.length) {
        return;
      }
      propertiesArea[key]?.filter((x) => {
        if (x?.CODE === item) {
          return Name.push(x?.NAME);
        }
      });
    });
    return Name.map((x) => ` ${x},`);
  };
  //Table

  useEffect(() => {
    if (!activeItemWH) {
      setSelectedRowKeys();
      setSelectedRowValue();
    }
  }, [activeItemWH]);
  const HandleSetSelectedData = (key, obj) => {
    setSelectedRowValue(obj);
    setSelectedRowKeys(key);
  };
  const listOrderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ORDERCODE",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "RECEIVERADDRESS",
      width: "50%",
      render: (text, record) => (
        <Text style={{ fontSize: "14px", textAlign: "center" }}>
          <p>{text}</p>
          <Text style={{ fontSize: "12px" }} type="secondary">
            {record.RECEIVERPHONE}
          </Text>
        </Text>
      ),
    },
    {
      title: <Tooltip title="Thể Tích Khối">TTK</Tooltip>,
      width: "10%",
      dataIndex: "CONVERTEDWEIGHT",
      sorter: (a, b) => a.CONVERTEDWEIGHT - b.CONVERTEDWEIGHT,
      // render: (text) => <p>{text.LENGTH * text.WIDTH * text.HEIGHT}</p>,
    },
    {
      title: <Tooltip title="Khối lượng">KL</Tooltip>,
      dataIndex: "WEIGHT",
      width: "10%",
    },
  ];
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, align: "center" }));
  let locale = {
    emptyText: () => <p style={{ fontWeight: "600", fontSize: "18px" }}>Khu trống</p>,
  };
  const fetchDataTable = async () => {
    // fetchListOrder()
  };
  // the result of total capacity
  const calculateVolumeF = (item) => item?.LENGTH * item?.HEIGHT * item?.WIDTH;
  const resultOTC = (data = selectedRowValue) => {
    let total = 0;
    if (selectedRowValue?.length) {
      // data.map((x) => (total += calculateVolumeF(x)));
      data?.map((x) => (total += x?.CONVERTEDWEIGHT));

      return total;
    } else {
      return total;
    }
  };
  const defaultTitle = () => (
    <>
      <Space direction="horizonal" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Space>
          <div style={{ display: "flex", gap: "1.2rem", fontWeight: "bold", paddingRight: "30px" }}>
            <HomeOutlined style={{ fontSize: "1rem", color: "#8c8c8c" }} />
            <span style={{ color: "#8c8c8c", fontWeight: "bold" }}>
              Tổng thể tích đã chọn: {selectedRowValue?.length ? resultOTC() : 0}
            </span>
          </div>
        </Space>

        <Space>
          <Button
            icon={isLoading ? <LoadingOutlined /> : <ReloadOutlined onClick={fetchDataTable} />}
            onClick={fetchDataTable}
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
    showSorterTooltip: false,
    rowSelection: {
      selectedRowKeys,
      onChange: (key, obj) => HandleSetSelectedData(key, obj),
      getCheckboxProps: (record) => ({
        disabled: !activeItemWH,
      }),
    },
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
  };
  // End Table

  //List
  const handleActiveWH = (e) => {
    if (e?.ID === activeItemWH?.ID) {
      setActiveItemWH();
    } else {
      setActiveItemWH(e);
    }
  };
  const updateWH = () => {
    let indexWH = dataWarehouse?.findIndex((x) => x?.CODE === activeItemWH?.CODE);
    let totalLoaded = selectedRowValue?.reduce(
      (previousValue, currentValue) =>  previousValue+  parseFloat(currentValue?.CONVERTEDWEIGHT),0
    );
    dataWarehouse[indexWH].LOADED += totalLoaded
   setActiveItemWH( dataWarehouse[indexWH])
   setDataWarehouse([...dataWarehouse])
  };
  // console.log(activeItemWH, " activeWH");
  const remoreOrdersBelongToWH = () => {
    updateWH()
    let temp = [...data];
    selectedRowKeys.map((x) => (temp = temp.filter((y) => y?.ID !== x)));
    setData([...temp]);
    setSelectedRowKeys([]);
    setSelectedRowValue([]);
  };
  const confirm = (e) => {
    pushOrdersInTheWHApi(selectedRowKeys, activeItemWH.CODE, remoreOrdersBelongToWH);
  };

  const cancel = (e) => {
 
    message.error("Đã Hủy bỏ");
  };
  const onSubmitAddOrderToWH = () => {};
  //End List

  return (
    <div style={{ minHeight: "100vh", padding: "0 20px" }}>
      <Row gutter={[16, 16]} style={{ paddingTop: "16px" }}>
        <Col span={24}>
          <Divider
            orientation="left"
            style={{
              backgroundColor: "#FFFFFF",
              padding: "15px 10px",
              margin: "0",
              borderRadius: "5px",
              fontSize: "18px",
            }}
          >
            Quản lí đơn hàng
          </Divider>
        </Col>
        <Col span={24}>
          <Card style={{ borderRadius: "5px" }}>
            <Row gutter={[16, 16]} style={{ height: "fit-content" }}>
              <Col span={13} style={{ height: "fit-content" }}>
                <Table
                  locale={locale}
                  {...listOrderProps}
                  columns={listOrderColumn}
                  dataSource={data}
                  scroll={{ y: "65vh" }}
                ></Table>
              </Col>
              <Col span={1}>
                <Divider type="vertical" dashed style={{ height: "100%", borderColor: " #DFDFDE " }}></Divider>
              </Col>
              <Col span={10} style={{ height: "fit-content" }}>
                <List
                  header={
                    <div>
                      <Row style={{ overflow: "hidden" }}>
                        <Col span={18}>
                          <Divider orientation="left" style={{ margin: "0", width: "100%" }}>
                            Danh sách ô có thể chứa &ensp;
                            {!!activeItemWH ? (
                              <Tooltip title="Bỏ chọn khu">
                                <CloseOutlined onClick={() => setActiveItemWH()} style={{ color: "#EB4747" }} />
                              </Tooltip>
                            ) : (
                              <span>&emsp;</span>
                            )}
                          </Divider>
                        </Col>
                        <Col span={6} style={{ textAlign: "center" }}>
                          <Popconfirm
                            placement="bottomRight"
                            disabled={!ISDISABLEBUTON}
                            title={
                              resultOTC() > calculateVolumeF(activeItemWH) ? (
                                <p style={iconWaiting}>
                                  Thể tích của đơn hàng
                                  <br /> đã vượt quá thể tích của khu
                                </p>
                              ) : (
                                <p style={iconInfo}>Chắc chắn nhập kho</p>
                              )
                            }
                            icon={
                              resultOTC() > calculateVolumeF(activeItemWH) ? (
                                <QuestionCircleFilled style={iconWaiting} />
                              ) : (
                                <InfoCircleFilled style={iconInfo} />
                              )
                            }
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Nhập Kho"
                            cancelText="Hủy bỏ"
                          >
                            <Button
                              disabled={!ISDISABLEBUTON}
                              icon={<PlusOutlined />}
                              style={{ fontSize: "13px" }}
                              type="primary"
                            >
                              Nhập
                            </Button>
                          </Popconfirm>
                        </Col>
                      </Row>
                    </div>
                  }
                  style={{ maxHeight: " 80vh", overflowY: "auto" }}
                  dataSource={dataWarehouse}
                  renderItem={(item) => (
                    <List.Item
                      onClick={() => handleActiveWH(item)}
                      className={activeItemWH?.ID === item?.ID ? "activeItem" : "default"}

                      // style={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Row justify="center" style={{ minWidth: "100%", alignItems: "center" }}>
                        <Col span={17}>
                          <div style={{ minWidth: "100%" }}>
                            <Text>
                              <Text style={{ fontWeight: "600", fontSize: "18px" }}> {item?.NAME}</Text>

                              <Row style={{ fontSize: "13px", color: "#73777B" }}>
                                {!!item.PROPERTY?.RECEIVEPROVINCE?.length && (
                                  <>
                                    <Col style={{ display: "flex" }} span={8}>
                                      Tỉnh nhận:
                                    </Col>
                                    <Col span={16}>
                                      {mapPropertyNameByCodeOrder("RECEIVEPROVINCE", item.PROPERTY?.RECEIVEPROVINCE)}
                                    </Col>
                                  </>
                                )}
                                {!!item.PROPERTY?.SERVICE?.length && (
                                  <>
                                    <Col style={{ display: "flex" }} span={8}>
                                      <p style={{ width: "100%", margin: 0 }}>Dịch vụ:</p>
                                    </Col>
                                    <Col span={16}>{mapPropertyNameByCodeOrder("SERVICE", item.PROPERTY?.SERVICE)}</Col>
                                  </>
                                )}
                                {!!item.PROPERTY?.VULL?.length && (
                                  <>
                                    <Col span={8}>TT đơn hàng:</Col>
                                    <Col span={16}> {mapPropertyNameByCodeOrder("VULL", item.PROPERTY?.VULL)}</Col>
                                  </>
                                )}
                              </Row>
                            </Text>
                          </div>
                        </Col>

                        <Col span={7} style={{ textAlign: "end" }}>
                          <Tooltip title="Thể tích còn trống">
                            <Text>Còn trống: {item?.CAPACITY - item?.LOADED}&ensp;(cm&sup3;)</Text>
                          </Tooltip>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PushOrderIntoWH;
