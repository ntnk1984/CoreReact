import { Tabs, Button, Input, Space, Table, Card, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import { updateTransportState } from "../Service";

const { TabPane } = Tabs;

const FormReady = ({ detailList, dataTable, onCancel }) => {
  const [visible, setVisible] = useState(false);

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
      width: "20%",
    },
    {
      title: "Địa chỉ xuất",
      dataIndex: "EXPORT_FROM",
      width: "20%",
    },
    {
      title: "Địa chỉ tới",
      dataIndex: "IMPORT_TO",
      width: "20%",
    },
    {
      title: "Ngày xuất",
      dataIndex: "EXPORT_DATE",
      width: "20%",
    },
  ];
  const defaultTitle = () => (
    <div
      direction="horizonal"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: ".8rem 10% .8rem .8rem",
        position: "relative",
      }}
    >
      {
        <h4>Danh sách phiếu</h4>
      }
    </div>
  );
  // end table
  const column = columns.map((item) => ({ ...item, ellipsis: true }));
  const props = {
    bordered: true,
    title: defaultTitle,
    pagination: false,
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
  };

  const showPopconfirm = () => {
    setVisible(true);
  };

  const messageSuccess = () => message.success("Thành công!!");
  const messageError = () => message.error("Error");
  const cancel = (e) => {
    setVisible(false);
    onCancel();
  };
  const confirm = (e) => {
    const dataPOST = {
      Id: dataTable.ID,
      ActionType: "TRANSPORT_CONFIRM",
    };
    updateTransportState(dataPOST, messageSuccess, messageError, onCancel);
    setVisible(false);
  };

  return (
    <>
      <Space
        direction="horizontal"
        size="middle"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          alignItems: "flex-start",
        }}
      >
        <Table 
          {...props} 
          columns={column} 
          scroll={{ y: 700 }}
          dataSource={detailList}
        >
        </Table>
        <div style={{ width: "100%" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin chuyến" key="1">
              <Card style={{ width: "100%" }}>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input value={dataTable.CODE} name="Code" addonBefore="Mã chuyến " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input value={dataTable.VEHICLETYPE} name="VehicleType" addonBefore="Loại phương tiện " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input value={dataTable.VEHICLENO} name="VehicleNo" addonBefore="Số hiệu phương tiện " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input value={dataTable.TONNAGE} name="Tonnage" addonBefore="Trọng tải " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input value={dataTable.ROUTE} name="Route" addonBefore="Lộ trình " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input value={dataTable.CREATEDTIME} name="CreatedTime" addonBefore="Ngày tạo " />
                </div>
              </Card>
            </TabPane>
            <TabPane tab="Thông tin tài xế" key="2">
              <Card style={{ width: "100%" }}>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input name="DriverName" addonBefore="Họ tên" />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input name="Phone" addonBefore="Số điện thoại " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input name="IdentifyCardNo" addonBefore="CMND/CCCD " />
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </Space>
      <Space
        direction="horizontal"
        size="middle"
        style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "flex-end",
        }}
      >
        <Popconfirm
          title="Xác nhận danh sách phiếu của chuyến?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Xác nhận"
          cancelText="Hủy"
          visible={visible}
        >
          <Button onClick={showPopconfirm} type="primary">
            Xác nhận
          </Button>
        </Popconfirm>
      </Space>
    </>
  );
};

export default FormReady;
