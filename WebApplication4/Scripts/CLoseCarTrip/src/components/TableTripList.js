import { Col, Row, Space, Table, Tag, Typography, DatePicker, Button, Modal } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getImportList } from "../Service";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import FormXacNhanChuyen from "./FormXacNhanChuyen";

const { Text } = Typography;
const { RangePicker } = DatePicker;
function TableImportList(props) {
  const [selectedData, setSelectedData] = useState([]);
  const [importLists, setImportLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleShowModal, setIsVisibleShowModal] = useState(false); //modal

  // day time
  let prev15now = new Date(Date.now() - 1296000000);
  let now = new Date(Date.now());

  const [date, setDate] = useState({
    startDate: prev15now.getFullYear() + "-" + (prev15now.getMonth() + 1) + "-" + prev15now.getDate(),
    endDate: now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
  });
  const OnSelectDateChange = (e) => {
    if (e)
      setDate((prevState) => ({
        ...prevState,
        startDate: e[0].format("YYYY-MM-DD"),
        endDate: e[1].format("YYYY-MM-DD"),
      }));
  };
  // / end
//   const loadingStateFail = () => {
//     setLoading(false);
//   };
//   const loadingStateTrue = () => {
//     setLoading(true);
//   };
//   async function getImportLists(loadingFail) {
//     let res = await getImportList(date, loadingFail);
//     setImportLists(res);
//   }
//   useEffect(() => {
//     loadingStateTrue();
//     getImportLists(loadingStateFail);
//   }, []);
//   const load = () => {
//     setIsLoading(false);
//   };
//   const fetchDataTable = async () => {
//     setIsLoading(true);
//     let res = await getImportList(date, load);
//     setImportLists(res);
//   };
  const columns = [
    {
      title: "Mã chuyến",
      dataIndex: "CODE",
      width: "10%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Loại phương tiện",
      dataIndex: "VEHICLETYPE",
      width: "auto",
    },
    {
      title: "Số hiệu phương tiện",
      dataIndex: "VEHICLENO",
      width: "auto",
    },
    {
        title: "Trọng tải",
        dataIndex: "TONNAGE",
        width: "auto",
    },
    {
        title: "Lộ trình",
        dataIndex: "ROUTE",
        width: "auto",
    },
    {
        title: "Trạng thái",
        dataIndex: "STATUS",
        width: "auto",
    },
    {
      title: "Ngày tạo",
      dataIndex: "CREATEDTIME",
      width: "auto",
      render: (text, record) => (
        <Row>
          <Col span={24}>{record.CREATEDDATE.toString().split("T")[0]}</Col>
          <Col span={24}>
            <Text disabled>{record.CREATEDDATE.toString().split("T")[1]}</Text>
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
          onClick={() => {
            console.log(record);
          }}
        >
          Chi tiết
        </Tag>
      ),
    },
  ];
  const defaultTitle = () => (
    <div
      direction="horizonal"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: ".8rem 10% .8rem .8rem",
        fontWeight: "bold",
        position: "relative",
      }}
    >
      <div>
        <label style={{ color: "", fontWeight: "600", paddingRight: "20px" }} htmlFor="dateTime">
          Khoảng thời gian:
        </label>
        <RangePicker
          id="dateTime"
          defaultValue={[moment(`${date.startDate}`, "YYYY-MM-DD"), moment(`${date.endDate}`, "YYYY-MM-DD")]}
          onChange={OnSelectDateChange}
        />
      </div>
      {
        <div>
          <Button
            onClick={() => setIsVisibleShowModal(true)}
            type="primary"
            disabled={selectedData.length === 0 ? true : false}
          >
            Xác nhận
          </Button>
        </div>
      }
      {/* <div style={{ position: "absolute", top: "50%", right: "5%", transform: "translateY(-50%)" }}>
        {isLoading ? <LoadingOutlined /> : <ReloadOutlined onClick={fetchDataTable} />}
      </div> */}
    </div>
  );
  const HandleSetSelectedData = (key, obj) => {
    setSelectedData(obj);
  };
  ///
  // console.log(selectedData);
  const tableColumns = columns.map((item) => ({ ...item, ellipsis: true, align: "center" }));
  const tableProps = {
    bordered: true,
    loading,
    size: "middle",
    title: defaultTitle,
    showHeader: true,
    rowSelection: {
      selectedRowKeys: selectedData.map((x) => x.key),
      onChange: (key, obj) => {
        HandleSetSelectedData(key, obj);
      },
    },
    tableLayout: "unset",
  };
  //Modal
  const HandleClose = () => {
    setIsVisibleShowModal(false);
    setSelectedData([]);
    console.log("close");
  };
  const deleteData = (item) => {
    let newData = [...selectedData];
    let index = selectedData.indexOf(item.ID);
    if (index !== -1) {
      newData.splice(index, 1);
      setSelectedData(newData);
    }
  };
  //End Modal
  return (
    <div>
      <Table
        {...tableProps}
        pagination={{
          position: ["bottomRight"],
        }}
        columns={tableColumns}
        dataSource={importLists}
        scroll={{ y: 700 }}
      />
      <Modal title="Danh sách phiếu" width="80%" visible={isVisibleShowModal} onCancel={HandleClose} footer={null}>
        <FormXacNhanChuyen selectedData={selectedData} />
      </Modal>
    </div>
  );
}

export default TableImportList;
