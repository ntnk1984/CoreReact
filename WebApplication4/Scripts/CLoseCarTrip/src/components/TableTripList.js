import { Tabs, Table, Row, Col, Tag, Typography, DatePicker, Button, Modal, Tooltip, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import FormReady from "./FormReady";
import FormInTransit from "./FormInTransit";
import FormDoneTransit from "./FormDoneTransit";
import { getTransportList } from "../Service";
import { getDetailTransport } from "../Service";

import { LoadingOutlined, ReloadOutlined, CarOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;

const { Text } = Typography;
const { RangePicker } = DatePicker;
function TableTripList(props) {
  const [transportLists, setTransportLists] = useState([]);
  const [detailTransports, setDetailTransports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataRenderTable, setDataRenderTable] = useState();
  const [tabPaneStatus, setTabPaneStatus] = useState("ALL");

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
  //get transport
  const loadingStateFail = () => {
    setLoading(false);
  };
  const loadingStateTrue = () => {
    setLoading(true);
  };
  async function getTransportLists(loadingFail) {
    let res = await getTransportList(date, loadingFail);
    setTransportLists(res);
  }
  useEffect(() => {
    loadingStateTrue();
    getTransportLists(loadingStateFail);
  }, []);
  const load = () => {
    setIsLoading(false);
  };
  const fetchDataTable = async () => {
    setIsLoading(true);
    let res = await getTransportList(date, load);
    setTransportLists(res);
    return res
  };
  //get detail transport
  const getDetailTransports = async (record) => {
    let ID = record.ID;
    const res = await getDetailTransport({ ID : ID });
    if (res)
    setDetailTransports(res);
  };

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
      width: "10%",
    },
    {
      title: "Số hiệu phương tiện",
      dataIndex: "VEHICLENO",
      width: "15%",
    },
    {
        title: "Trọng tải",
        dataIndex: "TONNAGE",
        width: "10%",
    },
    {
        title: "Lộ trình",
        dataIndex: "ROUTE",
        width: "20%",
    },
    {
        title: "Trạng thái",
        dataIndex: "STATUS",
        width: "15%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "CREATEDTIME",
      width: "10%",
      render: (text, record) => (
        <Row>
          <Col span={24}>{record.CREATEDTIME.toString().split("T")[0]}</Col>
          <Col span={24}>
            <Text disabled>{record.CREATEDTIME.toString().split("T")[1]}</Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "Xem thêm",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Tag
          color={"green"}
          onClick={() => {
            setDataRenderTable(record);

            if (record.STATUS === "TRANSPORT_DRAFT") {
              ShowReadyForm();
              getDetailTransports(record);
            } else if (record.STATUS === "TRANSPORT_ONPROCESS") {
              ShowInTransitForm();
              getDetailTransports(record);
            } else {
              ShowDoneForm();
              getDetailTransports(record);
            }
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
          <Tooltip title="Tải lại">
            {isLoading ? 
            <Button
            type="primary"
            shape="circle"
            icon={<LoadingOutlined />}
          /> : 
          <Button
            type="primary"
            shape="circle"
            icon={<ReloadOutlined onClick={fetchDataTable}/>}
          />
            }
          </Tooltip>
      </Space>
    </div>
  );

  const tableColumns = columns.map((item) => ({ ...item, ellipsis: true, align: "center" }));
  const tableProps = {
    bordered: true,
    loading,
    size: "middle",
    title: defaultTitle,
    showHeader: true,
    tableLayout: "unset",
  };
  //Modal

  const [IsReadyFormShow, setIsReadyFormShow] = useState(false);
  const [IsInTransitFormShow, setIsInTransitFormShow] = useState(false);
  const [IsDoneTransitFormShow, setIsDoneTransitFormShow] = useState(false);

  //Type:READY_FOR_TRANSIT
  const ShowReadyForm = () => {
    setIsReadyFormShow(true);
  };
  //Type:IN_TRANSIT
  const ShowInTransitForm = () => {
    setIsInTransitFormShow(true);
  };
  //Type:DONE_TRANSIT
  const ShowDoneForm = () => {
    setIsDoneTransitFormShow(true);
  };
  const HandleClose = () => {
    setIsReadyFormShow(false);
    setIsInTransitFormShow(false);
    setIsDoneTransitFormShow(false);
  };
  
  return (
    <div>
      <Tabs onChange={(e) => setTabPaneStatus(e)}>
          <TabPane 
            tab={`Tất cả (${transportLists.length})`}
            key="ALL">
          </TabPane>
          <TabPane
            tab={`Mới tạo (${transportLists.filter(x => x.STATUS=="TRANSPORT_DRAFT").length})`}
            key="TRANSPORT_DRAFT">
          </TabPane>
          <TabPane
            tab={`Đang thực hiện (${transportLists.filter(x => x.STATUS=="TRANSPORT_ONPROCESS").length})`}
            key="TRANSPORT_ONPROCESS">
          </TabPane>
          <TabPane
            tab={`Kết thúc (${transportLists.filter(x => x.STATUS=="TRANSPORT_SUCCESS").length})`}
            key="TRANSPORT_SUCCESS">
          </TabPane>
        </Tabs>
      <Table
        {...tableProps}
        pagination={{
          position: ["bottomRight"],
        }}
        columns={tableColumns}
        dataSource={tabPaneStatus === "ALL" ? transportLists : transportLists.filter((x) => x.STATUS == tabPaneStatus)}
        scroll={{ y: 700 }}
      />
      <Modal 
        title="Xác nhận chuyến" 
        width="80%"
        height="auto" 
        visible={IsReadyFormShow} 
        onCancel={HandleClose} 
        footer={false}
      >
        <FormReady
          detailList={detailTransports}
          dataTable={dataRenderTable}
          onCancel={HandleClose}
        />
      </Modal>
      <Modal
        title="Chuyến đang thực hiện"
        width="80%"
        visible={IsInTransitFormShow}
        onCancel={HandleClose}
        footer={false}
      >
        <FormInTransit
          detailList={detailTransports}
          dataTable={dataRenderTable}
          onCancel={HandleClose}
        />
      </Modal>
      <Modal
        title="Chuyến đã hoàn thành"
        width="80%"
        height="auto" 
        visible={IsDoneTransitFormShow}
        onCancel={HandleClose}
        footer={false}
      >
        <FormDoneTransit
          detailList={detailTransports}
          dataTable={dataRenderTable}
          onCancel={HandleClose}
        />
      </Modal>
    </div>
  );
}

export default TableTripList;
