import { Space, Tag, Input, Table, Row, Col, Button, message, Popconfirm, 
Typography, Tabs, Divider, Tooltip, Badge, Avatar, List } from "antd";
import React, { useEffect, useState } from "react";
import { ContainerOutlined, UngroupOutlined, CloseOutlined, DownSquareOutlined } from "@ant-design/icons";
import { updateTransportState } from "../Service";

const {Text, Title} = Typography;
const {TabPane} = Tabs
const FormInTransit = ({ dataTable, onCancel, detailList }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [completeVisible, setCompleteVisible] = useState(false);
  const [listDrop, setListDrop] = useState([]);
  const [listUp, setListUp] = useState([]);
  const [handledData, setHandledData] = useState([]);

  useEffect (() => {
    setData(detailList.filter(x => x.STATUS==dataTable.STATUS));
    setHandledData(detailList.filter(x => x.STATUS!=dataTable.STATUS));
    setListDrop([]);
    setListUp([]);
  }, [detailList]);
  const dropList = (record) => {
    setData(data.filter(x => x != record));
    setListDrop(prev => ([...prev, record]))
  };
  const unDropList = (record) => {
    setListDrop(listDrop.filter(x => x != record));
    setData(prev => ([...prev, record]))
  };

  const messageSuccess = () => message.success("Thêm thành công");
  const messageFail = () => message.error("Thất bại");

  // table

  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "CODE",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên phiếu",
      dataIndex: "NAME",
      width: "15%",
    },
    // {
    //   title: "Địa chỉ xuất",
    //   dataIndex: "EXPORT_FROM",
    //   width: "20%",
    // },
    {
      title: "Địa chỉ tới",
      dataIndex: "IMPORT_TO",
      width: "20%",
    },
    {
      title: "Ngày xuất",
      dataIndex: "EXPORT_DATE",
      width: "20%",
      render: (text, record) => (
        <Row>
          <Col span={24}>{record.EXPORT_DATE.toString().split("T")[0]}</Col>
          <Col span={24}>
            <Text disabled>{record.EXPORT_DATE.toString().split("T")[1]}</Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: "auto",
      render: (_, record) => (
        // <Tag
        //   color={"green"}
        //   onClick={() => dropList(record)}
        // >
        //   Drop
        // </Tag>
        <Tooltip title="Xuống hàng">
          {/* <Button shape="circle" icon={<DownSquareOutlined />} onClick={() => dropList(record)} /> */}
          <DownSquareOutlined  onClick={() => dropList(record)} style={{fontSize: "1.5rem"}} />
        </Tooltip>
      ),
    },
  ];
  
  // end table
  const column = columns.map((item) => ({ ...item, ellipsis: true }));
  const defaultTitle = () =>
  <Divider orientation="left">
  <Space>
    <Title level={5} style={{ marginTop: ".3rem" }}>
      Danh sách phiếu
    </Title>
  </Space>
</Divider>
  

  const prop = {
    title: defaultTitle,
    bordered: true,
    pagination: false,
    loading,
    size: "middle",
    showHeader: true,
  };
  const showPopconfirm = () => {
    setVisible(true);
    setCompleteVisible(false);
  };
  const showCompletePopconfirm = () => {
    setCompleteVisible(true);
    setVisible(false);
  };
  const confirmDrop = (e) => {
    
    const dataPOST = {
      Id: dataTable.ID,
      ActionType: "TRANSPORT_DROP",
      ActionData: {
        IDDrop: listDrop.map(x=> x.ID)
      },
    };
    updateTransportState(dataPOST, messageSuccess, messageFail, onCancel);
    setVisible(false);
  };
  const completeTransport = (e) => {
    const dataPOST = {
      Id: dataTable.ID,
      ActionType: "TRANSPORT_FINISHED",
    };
    updateTransportState(dataPOST, messageSuccess, messageFail, onCancel);
    setCompleteVisible(false);
  };
  
  const cancel = (e) => {
    setVisible(false);
    setCompleteVisible(false);
    onCancel();
  };

  return (
    <>
      <div style={{ position: "relative", paddingBottom: "40px " }}>
        <Space
          direction="horizontal"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <Space direction="vertical">
            <Space 
              direction="horizontal"
              size="middle"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
            >
              <Input disabled value={dataTable.CODE} name="Code" addonBefore="Mã chuyến " />
              <Input disabled value={dataTable.VEHICLETYPE} name="VehicleType" addonBefore="Loại phương tiện " />
              <Input disabled value={dataTable.VEHICLENO} name="VehicleNo" addonBefore="Số hiệu phương tiện " />
            </Space>
            <Space 
              direction="horizontal"
              size="middle"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Input disabled value={dataTable.TONNAGE} name="Tonnage" addonBefore="Trọng tải " />
              <Input disabled value={dataTable.ROUTE} name="Route" addonBefore="Lộ trình " />        
            </Space>
          </Space>
        </Space>
        
        <Space
          direction="horizontal"
          size="middle"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr"
          }}
        >
          <Space>
            <Table 
              {...prop} 
              columns={column} 
              dataSource={data} 
              scroll={{ y: 700 }}
            ></Table>
          </Space>
          <Tabs>
          <TabPane tab={`Hàng xuống (${listDrop.length})`} key="0">
              <Space direction="vertical" style={{ width: "100%" }}>
                <List
                style={{maxHeight: "100%"}}
                  dataSource={listDrop}
                  renderItem={(item) => (
                    <List.Item key={item.CODE}>
                      <List.Item.Meta
                        avatar={<Avatar size={48} icon={<UngroupOutlined />} />}
                        title={<a>{item.CODE}</a>}
                        description={
                          <p>
                            <b>Nơi xuống hàng:&nbsp;</b>
                            {item.IMPORT_TO}
                          </p>
                        }
                      />
                      <Tooltip title="Gỡ bỏ">
                        <Button
                          shape="circle"
                          icon={<CloseOutlined />}
                          onClick={() => unDropList(item)}
                        />
                      </Tooltip>
                    </List.Item>
                  )}
                />
              </Space>
            </TabPane>
            <TabPane tab={`Hàng lên (${listUp.length})`} key="1">
              <Space direction="vertical" style={{ width: "100%" }}>
                <List
                  dataSource={listUp}
                  renderItem={(item) => (
                    <List.Item key={item.CODE}>
                      <List.Item.Meta
                        avatar={<Avatar size={48} icon={<UngroupOutlined />} />}
                        title={<a>{item.CODE}</a>}
                        description={
                          <p>
                            <b>Nơi lên hàng:&nbsp;</b>
                            {/* {item.IMPORT_TO} */}
                          </p>
                        }
                      />
                      <Tooltip title="Gỡ bỏ">
                        <Button
                          shape="circle"
                          icon={<CloseOutlined />}
                          // onClick={() => unDropList(item)}
                        />
                      </Tooltip>
                    </List.Item>
                  )}
                />
              </Space>
            </TabPane>
            <TabPane tab={`Đã xử lý (${handledData.length})`} key="2">
              <Space direction="vertical" style={{ width: "100%" }}>
                <List
                  dataSource={handledData}
                  renderItem={(item) => (
                    <List.Item key={item.CODE}>
                      <List.Item.Meta
                        avatar={<Avatar size={48} icon={<UngroupOutlined />} />}
                        title={<a>{item.CODE}</a>}
                        description={
                          <p>
                            <b>Nơi xuống hàng:&nbsp;</b>
                            {item.IMPORT_TO}
                          </p>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Space>
            </TabPane>
          </Tabs>
        </Space>

        <div style={{ position: "absolute", bottom: "-10px", right: "15%" }}>
          <Popconfirm
            title="Xác nhận xuống/lên hàng?"
            onConfirm={confirmDrop}
            onCancel={cancel}
            okText="Xác nhận"
            cancelText="Hủy"
            visible={visible}
          >
            <Button onClick={showPopconfirm} hidden={listDrop?.length != 0 ? false : true} type="primary">
              Xác nhận xuống hàng
            </Button>
          </Popconfirm>
        </div>
        <div style={{ position: "absolute", bottom: "-10px", right: "0%" }}>
          <Popconfirm
            title="Xác nhận hoàn thành chuyến?"
            onConfirm={completeTransport}
            onCancel={cancel}
            okText="Xác nhận"
            cancelText="Hủy"
            visible={completeVisible}
          >
            <Button onClick={showCompletePopconfirm} disabled={(data?.length === 0 && listDrop?.length === 0 && listUp?.length === 0)? false : true} type="primary">
              Hoàn thành chuyến
            </Button>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default FormInTransit;
