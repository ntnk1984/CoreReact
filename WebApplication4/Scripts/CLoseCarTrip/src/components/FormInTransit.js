import { Space, Tag, Input, Table, DatePicker, Dropdown, Menu, Tabs, Button, message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
const { TabPane } = Tabs;

const FormInTransit = ({ dataTableConfirm, onCancel, detailList }) => {
  const [orders, setOrders] = useState();
  const dateFormat = "DD/MM/YYYY";
  const { TabPane } = Tabs;
  const [SelectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(orders);
  const [chosenData, setChosenData] = useState([]);
  const [dropData, setDropData] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [visible, setVisible] = useState(false);
  const [completeVisible, setCompleteVisible] = useState(false);

  console.log(data, "dataTable");
  // useEffect(() => {
  //   setOrders(detailList);
  //   setData(detailList);
  //   console.log("1");
  // }, [detailList]);
  const dropList = (e) => {
    setActiveTab("2");
    const temp = [...data];
    const dropItem = temp.find((item) => item.ID === e.ID);
    setDropData([...dropData, dropItem]);
    const idx = temp.findIndex((item) => item.ID === e.ID);
    const temp1 = [...data];
    temp1.splice(idx, 1);
    setData(temp1);
  };
  const unDropList = (e) => {
    const temp = [...dropData];
    const dropItem = temp.find((item) => item.ID === e.ID);
    setData([...data, dropItem]);
    const idx = temp.findIndex((item) => item.ID === e.ID);
    const temp1 = [...dropData];
    temp1.splice(idx, 1);
    setDropData(temp1);
  };

  const messageSuccess = () => message.success("Thêm thành công");
  const messageFail = () => message.error("Thất bại");

  const HandleSetSelectedData = (e) => {
    setSelectedData(e);
  };
  // table
  const menu = (record) => (
    <Menu
      items={[
        {
          key: "one",
          label: <a onClick={() => dropList(record)}>Drop phiếu hihi</a>,
        },
        // {
        //   key: "two",
        //   label: <a onClick={() => dropOrder(record)}>Chênh lệch</a>,
        // },
      ]}
    />
  );

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
    {
      key: "action",
      width: "auto",
      render: (text, record) => (
        <Dropdown overlay={menu(record)}>
          <MenuOutlined style={{ color: "blue" }}></MenuOutlined>
        </Dropdown>
      ),
    },
  ];
  
  const dropColumns = [
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
    {
      key: "action",
      width: "auto",
      render: (_, record) => (
        <Tag color={"red"} onClick={() => unDropList(record)}>
          Xóa
        </Tag>
      ),
    },
  ];
  // end table
  const column = columns.map((item) => ({ ...item, ellipsis: true }));
  const dropColumn = dropColumns.map((item) => ({ ...item, ellipsis: true }));
  const defaultTitle = () => <p style={{fontWeight: 'bold'}}>Danh sách phiếu</p>;
  const defaultDropTitle = () => <p style={{fontWeight: 'bold'}}>Danh sách phiếu drop</p>;

  const prop = {
    title: defaultTitle,
    bordered: true,
    pagination: false,
    loading,
    size: "middle",
    showHeader: true,
    rowSelection: {
      onChange: (e) => HandleSetSelectedData(e),
    },
    tableLayout: "unset",
  };
  const dropProp = {
    title: defaultDropTitle,
    bordered: true,
    pagination: false,
    loading,
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
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
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
            >
              <Input name="Tonnage" addonBefore="Trọng tải " />
              <Input name="Route" addonBefore="Lộ trình " />   
              <Input name="StartPoint" addonBefore="Nơi xuất " />         
            </Space>
          </Space>
        </Space>
        <Space
          direction="horizontal"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <Space>
            <Table {...prop} columns={column} dataSource={data} scroll={{ y: 700 }}></Table>
          </Space>
          <Space>
            <Table {...dropProp} columns={dropColumn} dataSource={data} scroll={{ y: 700 }}></Table>
          </Space>    
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
