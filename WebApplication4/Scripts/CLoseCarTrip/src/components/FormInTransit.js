import { Space, Tag, Input, Table, Row, Col, Button, message, Popconfirm, 
Typography, Tabs, Divider, Tooltip, Badge, Avatar, List } from "antd";
import React, { useEffect, useState } from "react";
import { ContainerOutlined, UngroupOutlined, CloseOutlined } from "@ant-design/icons";
const {Text, Title} = Typography;
const {TabPane} = Tabs
const FormInTransit = ({ dataTable, onCancel, detailList }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [completeVisible, setCompleteVisible] = useState(false);
  const [listDrop, setListDrop] = useState([]);
  const [listUp, setListUp] = useState([]);

  useEffect (() => {
    setData(detailList);
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
      title: "Xem thêm",
      key: "action",
      width: "auto",
      render: (_, record) => (
        <Tag
          color={"green"}
          onClick={() => dropList(record)}
        >
          Drop
        </Tag>
      ),
    },
  ];
  
  // end table
  const column = columns.map((item) => ({ ...item, ellipsis: true }));
  const defaultTitle = () => <p style={{fontWeight: 'bold'}}>Danh sách phiếu</p>;

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
  // const confirm = (e) => {
  //   let IDSuccess = chosenData.map((item) => item.ID) || [];
  //   let IDFail = dropData?.map((item) => item.ID) || [];
  //   const dataPOST = {
  //     Id: dataTableConfirm.ID,
  //     ActionType: "IMEXPORTLIST_FINISHED",
  //     Note: "",
  //     ActionData: {
  //       IDSuccess,
  //       IDFail,
  //     },
  //   };
  //   console.log(dataPOST);
  //   postConfirmUpdate(dataPOST, messageSuccess, messageFail, onCancel);
  //   setVisible(false);
  // };
  
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
              <Input name="Code" addonBefore="Mã chuyến " />
              <Input name="VehicleType" addonBefore="Loại phương tiện " />
              <Input name="VehicleNo" addonBefore="Số hiệu phương tiện " />
            </Space>
            <Space 
              direction="horizontal"
              size="middle"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Input name="Tonnage" addonBefore="Trọng tải " />
              <Input name="Route" addonBefore="Lộ trình " />        
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
            <Table {...prop} columns={column} dataSource={data} scroll={{ y: 700 }}></Table>
          </Space>
          <Tabs>
          <TabPane tab={`Hàng xuống (${listDrop.length})`} key="0">
              <Space direction="vertical" style={{ width: "100%" }}>
                
                <List
                  dataSource={listDrop}
                  renderItem={(item) => (
                    <List.Item key={item.CODE}>
                      <List.Item.Meta
                        avatar={<Avatar size={48} icon={<UngroupOutlined />} />}
                        title={<a>{item.CODE}</a>}
                        description={
                          <p>
                            <b>Nơi xuống:&nbsp;</b>
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
            <TabPane tab={`Từ chối nhận`} key="1">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Divider orientation="left">
                  <Space>
                    <Title level={5} style={{ marginTop: ".3rem" }}>
                      Từ chối nhận
                    </Title>
                    <Badge count={0}>
                      <Avatar
                        size={24}
                        shape="square"
                        icon={<ContainerOutlined />}
                      />
                    </Badge>
                  </Space>
                </Divider>
                <List
                  dataSource={listUp}
                  renderItem={(item) => (
                    <List.Item key={item.CODE}>
                      <List.Item.Meta
                        avatar={<Avatar size={48} icon={<UngroupOutlined />} />}
                        title={<a>{item.CODE}</a>}
                        description={
                          <p>
                            <b>Người gửi:&nbsp;</b>
                            {item.NAME} - {item.NAME}
                          </p>
                        }
                      />
                      <Tooltip title="Gỡ bỏ">
                        <Button
                          shape="circle"
                          icon={<CloseOutlined />}
                          onClick={() => {
                           
                          }}
                        />
                      </Tooltip>
                    </List.Item>
                  )}
                />
              </Space>
            </TabPane>
          </Tabs>
        </Space>

        <div style={{ position: "absolute", bottom: "-10px", right: "15%" }}>
          <Popconfirm
            title="Drop phiếu hihi"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Xác nhận"
            cancelText="Hủy"
            visible={visible}
          >
            {/* <Button onClick={showPopconfirm} disabled={data?.length === 0 ? false : true} type="primary"> */}
            <Button onClick={showPopconfirm} type="primary">
              Xác nhận drop
            </Button>
          </Popconfirm>
        </div>
        <div style={{ position: "absolute", bottom: "-10px", right: "0%" }}>
          <Popconfirm
            title="Hoàn thành chuyến"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Xác nhận"
            cancelText="Hủy"
            visible={completeVisible}
          >
            {/* <Button onClick={showPopconfirm} disabled={data?.length === 0 ? false : true} type="primary"> */}
            <Button onClick={showCompletePopconfirm} type="primary">
              Hoàn thành chuyến
            </Button>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default FormInTransit;
