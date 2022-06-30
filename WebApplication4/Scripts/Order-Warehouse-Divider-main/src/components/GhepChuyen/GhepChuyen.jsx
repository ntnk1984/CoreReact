import React from "react";
import { Space, Tag, Input, Table, DatePicker, Card, Popconfirm, message, Button, Select } from "antd";
import { HomeOutlined, LoadingOutlined, ReloadOutlined, SelectOutlined } from "@ant-design/icons";
// import moment from "moment";
// const { RangePicker } = DatePicker;
import { useState } from "react";
import { useEffect } from "react";
import { getImportList, getOnprocessTransportList } from "./Service";

const { Option } = Select;
function GhepChuyen(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SelectedData, setSelectedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tripList, setTripList] = useState([]);
  const [trip, setTrip] = useState("");

  // let prev15now = new Date(Date.now() - 1296000000);
  // let now = new Date(Date.now());

  // const [date, setDate] = useState({
  //   startDate: prev15now.getFullYear() + "-" + (prev15now.getMonth() + 1) + "-" + prev15now.getDate(),
  //   endDate: now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
  // });
  // const OnSelectDateChange = (e) => {
  //   if (e)
  //     setDate((prevState) => ({
  //       ...prevState,
  //       startDate: e[0].format("YYYY-MM-DD"),
  //       endDate: e[1].format("YYYY-MM-DD"),
  //     }));
  // };
  const loadingStateTrue = () => {
    setLoading(true);
  };
  const loadingStateFail = () => {
    setLoading(false);
  };
  // useEffect
  async function getOnprocessTransports(loadingFail) {
    let res = await getOnprocessTransportList();
    // setImportLists(res);
    setTripList(res);
    console.log(res, " chuyến ");
  }
  useEffect(() => {
    // loadingStateTrue();
    getOnprocessTransports();
  }, []);

  const fetchDataTable = async () => {
    setIsLoading(true);
    // let res = await getImportList(date, load);
    // setImportLists(res);
  };

  //End UseEffect

  //FUnc
  async function getImports(e, loadingFail) {
    let res = await getImportList(e);
    // setImportLists(res);
    console.log(res, " ỏder");
  }
  const submitDataTrip = (e) => {
    console.log(e);
    setTrip(e);
    getImports(e);
  };
  //end Func
  const listOrderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ORDERCODE",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ gửi",
      dataIndex: "SENDERADDRESS",
      width: "20%",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "RECEIVERADDRESS",
      width: "20%",
    },
    {
      title: "Khối lượng",
      dataIndex: "WEIGHT",
      width: "20%",
    },
  ];
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, ellipsis: true }));
  const HandleSetSelectedData = (e) => {
    setSelectedData(e);
  };

  const defaultTitle = () => (
    <>
      <Space direction="horizonal" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Space>
          <div style={{ display: "flex", gap: "1.2rem", fontWeight: "bold", paddingRight: "30px" }}>
            <HomeOutlined style={{ fontSize: "2rem", color: "#8c8c8c" }} />
            <h3 style={{ lineHeight: 2.3, color: "#8c8c8c", fontWeight: "bold" }}>Kho</h3>
          </div>
          <div style={{ width: "100%" }}>
            <label style={{ paddingRight: "5px", fontWeight: "bold" }} htmlFor="selcetAll">
              Chọn chuyến:
            </label>
            <Select
              showSearch
              // name={name}
              style={{ width: "100%" }}
              placeholder="Chọn chuyến"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
              onChange={(e) => {
                submitDataTrip(e);
              }}
            >
              {tripList.map((item, index) => {
                let name = `Mã: ${item.CODE} -- BHPT: ${item.VEHICLENO} -- Tuyến: ${item.ROUTE}`;
                let value = `${item.CODE} `;
                return (
                  <Select.Option key={index} value={value}>
                    {name}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </Space>

        <Space>
          {/* <RangePicker
            defaultValue={[moment(`${date.startDate}`, "YYYY-MM-DD"), moment(`${date.endDate}`, "YYYY-MM-DD")]}
            onChange={OnSelectDateChange}
          /> */}
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
    rowSelection: {
      onChange: (e) => HandleSetSelectedData(e),
    },
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
  };

  return (
    <div>
      <Space
        direction="horizontal"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Card>
          <Table {...listOrderProps} columns={listOrderColumn} dataSource={data} scroll={{ y: 700 }}></Table>
        </Card>
      </Space>
    </div>
  );
}

export default GhepChuyen;
