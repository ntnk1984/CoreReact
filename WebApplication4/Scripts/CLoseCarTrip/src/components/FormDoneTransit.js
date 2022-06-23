import { Tabs, Input, Space, Table, Card } from "antd";
import React, { useEffect, useState } from "react";
import "./Style/FromDongChuyen.css";
const { TabPane } = Tabs;

const FormDoneTransit = ({ dataTable, onCancel, detailList }) => {

  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setData(detailList.filter(x => x.STATUS=="IMPORT_WAITING"));
  }, [detailList]);

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
  const defaultTitle = () => <h4>Danh sách phiếu đã xử lý</h4>;
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

  // const messageSuccess = () => message.success("Thành công!!");
  // const messageError = () => message.error("Error");
  // const confirm = (e) => {
  //   const dataPOST = {
  //     Id: dataTable.ID,
  //     ActionType: "IMEXPORTLIST_CONFIRM",
  //     Note: "",
  //     ActionData: {
  //       IDSuccess: [],
  //       IDFail: [],
  //     },
  //   };
  //   console.log(dataPOST);
  //   postConfirmUpdate(dataPOST, messageSuccess, messageError, onCancel);
  //   setVisible(false);
  // };
  const cancel = (e) => {
    setVisible(false);
    onCancel();
  };

  const driver = JSON.parse(dataTable.DRIVERINFO)

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
        <Table {...props} columns={column} dataSource={data} scroll={{ y: 700 }}></Table>
        <div style={{ width: "100%" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin chuyến" key="1">
              <Card style={{ width: "100%" }}>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input disabled value={dataTable.CODE} name="Code" addonBefore="Mã chuyến " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input disabled value={dataTable.VEHICLETYPE} name="VehicleType" addonBefore="Loại phương tiện " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input disabled value={dataTable.VEHICLENO} name="VehicleNo" addonBefore="Số hiệu phương tiện " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input disabled value={dataTable.TONNAGE} name="Tonnage" addonBefore="Trọng tải " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input disabled value={dataTable.ROUTE} name="Route" addonBefore="Lộ trình " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input disabled value={dataTable.CREATEDTIME} name="CreatedTime" addonBefore="Ngày tạo " />
                </div>
              </Card>
            </TabPane>
            <TabPane tab="Thông tin tài xế" key="2">
              <Card style={{ width: "100%" }}>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input disabled value={driver.Name} name="DriverName" addonBefore="Họ tên" />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input disabled value={driver.Phone} name="Phone" addonBefore="Số điện thoại " />
                </div>
                <div style={{ width: "100%", paddingBottom: "15px" }}>
                  <Input disabled value={driver.IdentifyCardNo} name="IdentifyCardNo" addonBefore="CMND/CCCD " />
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
      </Space>
    </>
  );
};

export default FormDoneTransit;
