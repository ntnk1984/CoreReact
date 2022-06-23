import { Col, Row, Space, Table, Tag, Typography, DatePicker, Button, Modal, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getImportList } from "../Service";
import { LoadingOutlined, ReloadOutlined, CarOutlined } from "@ant-design/icons";
import FormDongChuyen from "./FormDongChuyen";

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
  const loadingStateFail = () => {
    setLoading(false);
  };
  const loadingStateTrue = () => {
    setLoading(true);
  };
  async function getImportLists(loadingFail) {
    let res = await getImportList(date, loadingFail);
    setImportLists(res);
  }
  useEffect(() => {
    loadingStateTrue();
    getImportLists(loadingStateFail);
  }, []);
  const load = () => {
    setIsLoading(false);
  };
  const fetchDataTable = async () => {
    setIsLoading(true);
    let res = await getImportList(date, load);
    setImportLists(res);
  };

  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "CODE",
      width: "10%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên phiếu",
      dataIndex: "NAME",
      width: "10%",
    },
    {
      title: "Mô tả",
      dataIndex: "DESCRIPTION",
      width: "auto",
    },
    {
      title: "Ngày tạo",
      dataIndex: "CREATEDDATE",
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
      title: "Kho",
      dataIndex: "EXPORT_FROM",
      width: "auto",
    },
    {
      title: "Trạng thái",
      dataIndex: "STATUS",
      width: "auto",
    },
    {
      title: "Xem thêm",
      key: "action",
      width: "auto",
      render: (_, record) => (
        <Tag
          color={"green"}
          onClick={() => {
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
        position: "relative",
      }}
    >
      <div style={{ display: "flex", gap: "1.2rem" }}>
        <CarOutlined style={{ fontSize: "2rem", color: "#8c8c8c" }} />
        <h4 style={{ lineHeight: 1.5, color: "#8c8c8c" }}>
        Danh sách chuyến xe
        </h4>
      </div>
      <Space>
          <label style={{ color: "", fontWeight: "600", paddingRight: "20px" }} htmlFor="dateTime">
            Khoảng thời gian:
          </label>
          <RangePicker
            id="dateTime"
            defaultValue={[moment(`${date.startDate}`, "YYYY-MM-DD"), moment(`${date.endDate}`, "YYYY-MM-DD")]}
            onChange={OnSelectDateChange}
          />
          <Button
            onClick={() => setIsVisibleShowModal(true)}
            type="primary"
            disabled={selectedData.length === 0 ? true : false}
          >
            Đóng chuyến
          </Button>
          <Tooltip title="Tải lại">
            {isLoading ? 
            <Button
            //onClick={ReloadData}
            type="primary"
            shape="circle"
            icon={<LoadingOutlined />}
          /> : 
          <Button
            //onClick={ReloadData}
            type="primary"
            shape="circle"
            icon={<ReloadOutlined onClick={fetchDataTable}/>}
          />
            }
          </Tooltip>
      </Space>
    </div> 
  );
  const HandleSetSelectedData = (key, obj) => {
    setSelectedData(obj);
  };

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
      <Modal title="Phiếu xuất kho" width="80%" visible={isVisibleShowModal} onCancel={HandleClose} footer={null}>
        <FormDongChuyen selectedData={selectedData} />
      </Modal>
    </div>
  );
}

export default TableImportList;
