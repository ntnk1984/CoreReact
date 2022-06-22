import { Tabs, Table, Row, Col, Tag, Typography, DatePicker, Button, Modal } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import FormReady from "./FormReady";
import FormInTransit from "./FormInTransit";
import FormDoneTransit from "./FormDoneTransit";
import { getTransportList } from "../Service";
import { getDetailTransport } from "../Service";

import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
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

  // const transports = [
  // {
  //   "ID": "84e1295c-7225-4b4f-9d46-8be8b0fe2706",
  //   "key": "84e1295c-7225-4b4f-9d46-8be8b0fe2706",
  //   "CODE": "VCFEHBEIEF",
  //   "VEHICLENO": "51B-00723",
  //   "VEHICLETYPE": "TRUCK",
  //   "TONNAGE": 20,
  //   "TIMESTART": "2022-06-25T14:00:00",
  //   "STATUS": "TRANSPORT_SUCCESS",
  //   "FIRSTPOINT": "HCM",
  //   "ENDPOINT": "HN",
  //   "ROUTE": "HCM-HN",
  //   "DRIVERINFO": "",
  //   "CREATEDUSER": "0200aa2f-15d5-4c31-96d4-54e5ebac7261",
  //   "CREATEDTIME": "2022-06-20T14:33:27.885662"
  // },
  // {
  //   "ID": "84e1295c-7225-4b4f-9d46-8be8b0fe2705",
  //   "key": "84e1295c-7225-4b4f-9d46-8be8b0fe2705",
  //   "CODE": "VCFEHBEIEE",
  //   "VEHICLENO": "51B-00723",
  //   "VEHICLETYPE": "TRUCK",
  //   "TONNAGE": 20,
  //   "TIMESTART": "2022-06-25T14:00:00",
  //   "STATUS": "TRANSPORT_ONPROCESS",
  //   "FIRSTPOINT": "HCM",
  //   "ENDPOINT": "HN",
  //   "ROUTE": "HCM-HN",
  //   "DRIVERINFO": "",
  //   "CREATEDUSER": "0200aa2f-15d5-4c31-96d4-54e5ebac7261",
  //   "CREATEDTIME": "2022-06-20T14:33:27.885662"
  // },
  // {
  //   "ID": "b2db042d-127e-4c85-b5aa-edb0578c12da",
  //   "key": "b2db042d-127e-4c85-b5aa-edb0578c12da",
  //   "CODE": "VCRDIRCBEW",
  //   "VEHICLENO": "51B-99999",
  //   "VEHICLETYPE": "TRUCK",
  //   "TONNAGE": 30,
  //   "TIMESTART": "2022-06-30T16:46:29",
  //   "STATUS": "TRANSPORT_DRAFT",
  //   "FIRSTPOINT": "HCM",
  //   "ENDPOINT": "HN",
  //   "ROUTE": "HCM-HN",
  //   "DRIVERINFO": "",
  //   "CREATEDUSER": "0200aa2f-15d5-4c31-96d4-54e5ebac7261",
  //   "CREATEDTIME": "2022-06-20T16:46:32.438094"
  // },
  // ];

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
      width: "auto",
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
      <div>
        <Tabs onChange={(e) => setTabPaneStatus(e)}>
          <TabPane 
            tab="Tất cả" 
            key="ALL">
          </TabPane>
          <TabPane
            tab="Mới tạo" 
            key="TRANSPORT_DRAFT">
          </TabPane>
          <TabPane
            tab="Đang thực hiện" 
            key="TRANSPORT_ONPROCESS">
          </TabPane>
          <TabPane
            tab="Kết thúc" 
            key="TRANSPORT_SUCCESS">
          </TabPane>
        </Tabs>
      </div>
      {
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
      }
      <div style={{ position: "absolute", top: "50%", right: "5%", transform: "translateY(-50%)" }}>
        {isLoading ? <LoadingOutlined /> : <ReloadOutlined onClick={fetchDataTable} />}
      </div>
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
        height="auto" 
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
