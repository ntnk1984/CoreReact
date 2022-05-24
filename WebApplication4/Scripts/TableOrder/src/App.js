import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
  useContext,
} from "react";
import {
  Tabs,
  Row,
  Col,
  Modal,
  Select,
  Button,
  Typography,
  DatePicker,
} from "antd";
import TableDonHang from "./components/TableDonHang.js";
import { ExclamationCircleOutlined, RedoOutlined } from "@ant-design/icons";
import { fetchAllOrderApi, removeOrderByIdApi } from "./api/Order.js";

import PhatHang from "./components/PhatHang.js";

import { useReactToPrint } from "react-to-print";
import Printorder from "./components/PrintOrder.js";
import "./App.css";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";

export const contextValue = React.createContext();

const { RangePicker } = DatePicker;
const { Text } = Typography;

const { Option } = Select;
const { TabPane } = Tabs;

const initialValue = {
  ordersTable: [],
  merChandiseList: [],
  packageList: [],
  shipmentDetail: {},
  startDate: new Date(Date.now() - 1296000000).toLocaleDateString().split("/"),
  endDate: new Date(Date.now()).toLocaleDateString().split("/"),
};

//ACTION
export const FETCH_ORDERS_TABLE_TIME = "FETCH_ORDERS_TABLE_TIME";
export const FETCH_PACKAGE_BY_ID_SHIPMENT = "FETCH_PACKAGE_BY_ID_SHIPMENT";
export const FETCH_MERCHANDISE_BY_ID_SHIPMENT =
  "FETCH_MERCHANDISE_BY_ID_SHIPMENT";
export const FETCH_SHIPMENT_BY_ID = "FETCH_SHIPMENT_BY_ID";

const actionReducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case FETCH_ORDERS_TABLE_TIME: {
      console.log(payload);
      return { ...state, ordersTable: payload };
    }
    case FETCH_PACKAGE_BY_ID_SHIPMENT: {
      return { ...state, packageList: payload };
    }
    case FETCH_MERCHANDISE_BY_ID_SHIPMENT: {
      return { ...state, merChandiseList: payload };
    }
    case FETCH_SHIPMENT_BY_ID: {
      return { ...state, shipmentDetail: payload };
    }
    default:
      return { ...state };
  }
};
const App = () => {
  console.log(process.env.NODE_ENV)
  const [tableReducer, dispatch] = useReducer(actionReducer, initialValue);

  //print đơn hàng
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //hiện modal xác nhận xóa nhiều hàng
  function confirmDeleteMulti(list) {
    Modal.confirm({
      title: "Xác nhận ",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn xóa đơn hàng",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: () => {
        //call api delete hang loat
        list.forEach(async (item) => {
          await removeOrderByIdApi(item);
          await getAllOrderApi();
        });
      },
    });
  }
  //hiện modal phân phát đơn hàng

  const dataTable = tableReducer?.ordersTable?.filter((item) => {
    return true;
  });

  const [dateFilter, setDateFilter] = useState([]);
  const [refesh, setRefest] = useState(true);
  useEffect(async () => {
    //call api bảng đơn hàng
    const res = await fetchAllOrderApi(
      `${tableReducer.startDate[0]}-${tableReducer.startDate[1]}-${tableReducer.startDate[2]}`,
      `${tableReducer.endDate[0]}-${tableReducer.endDate[1]}-${tableReducer.endDate[2]}`
    );

    dispatch({
      type: FETCH_ORDERS_TABLE_TIME,
      payload: await res.responses,
    });
  }, [refesh]);

  //list checkbox / list dùng để thao tác
  const [list, setList] = useState([]);
  const handleSetList = (value) => {
    setList(value);
  };

  //

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [temp, setTemp] = useState();

  return (
    <contextValue.Provider value={{ tableReducer, dispatch }}>
      <div style={{ marginTop: 20 }}>
        <div style={{ width: "1600px", margin: "0 auto" }}>
          <div>
            <div className="d-none">
              <div ref={componentRef}>
                <Printorder listPrint={list} />
              </div>
            </div>
          </div>
          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            {temp}
          </Modal>
          <Row className="mb-3" style={{ zIndex: 0 }}>
            <Col span={10} offset={3}>
              <Select
                defaultValue="Vui lòng chọn"
                style={{ width: 200 }}
                onChange={(e) => {
                  if (0 == e) {
                    setTemp(
                      <PhatHang
                        data={list}
                        // setData={setData}
                        close={handleCancel}
                      />
                    );
                    showModal();
                  }
                  if (1 == e) {
                    handlePrint();
                  }
                  if (2 == e) {
                    const fileType =
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                    const fileExtension = ".xlsx";

                    const exportToCSV = () => {
                      const ws = XLSX.utils.json_to_sheet(list);
                      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                      const excelBuffer = XLSX.write(wb, {
                        bookType: "xlsx",
                        type: "array",
                      });
                      const data = new Blob([excelBuffer], { type: fileType });
                      FileSaver.saveAs(data, Date.now() + fileExtension);
                    };
                    exportToCSV();
                  }
                  if (3 == e) {
                    showModal();
                  }
                  if (4 == e) {
                    setTemp();
                  }
                }}
              >
                <Option value="0">
                  <a>Chuyển tiếp </a>
                </Option>
                <Option value="1">
                  <a>In Hàng loạt</a>
                </Option>
                <Option value="2">
                  <a>Xuất Excel</a>
                </Option>
              </Select>

              <Text className="mx-2">Bộ lọc : </Text>
              <RangePicker
                defaultValue={[
                  moment(
                    `${tableReducer.startDate[2]}-${tableReducer.startDate[0]}-${tableReducer.startDate[1]}`,
                    "YYYY-MM-DD"
                  ),
                  moment(
                    `${tableReducer.endDate[2]}-${tableReducer.endDate[0]}-${tableReducer.endDate[1]}`,
                    "YYYY-MM-DD"
                  ),
                ]}
                onChange={(date, dateString) => {
                  setDateFilter(dateString);
                  if (dateString[0] == "") {
                    setDateFilter([]);
                  }
                }}
              />
              <Button
                onClick={() => {
                 
                  setRefest(!refesh);
                }}
                className="mx-2"
                icon={<RedoOutlined />}
                type="primary"
              ></Button>
            </Col>
          </Row>
          <Tabs tabPosition="left">
            <TabPane tab={`Tất cả (${dataTable?.length})`} key="all">
              <TableDonHang
                handleSetList={handleSetList}
                data={dataTable}
                time={dateFilter}
              />
            </TabPane>
            <TabPane
              tab={`Mới tạo (${
                dataTable?.filter((item) => item.deliverystatus == "1").length
              })`}
              key="1"
            >
              <TableDonHang
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "1")}
                time={dateFilter}
              />
            </TabPane>
            <TabPane
              tab={`Chờ xử lý (${
                dataTable?.filter((item) => item.deliverystatus == "2").length
              })`}
              key="2"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "2")}
              />
            </TabPane>
            <TabPane
              tab={`Chờ lấy (${
                dataTable?.filter((item) => item.deliverystatus == "3").length
              })`}
              key="3"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "3")}
              />
            </TabPane>
            <TabPane
              tab={`Đã lấy (${
                dataTable?.filter((item) => item.deliverystatus == "4").length
              })`}
              key="4"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "4")}
              />
            </TabPane>
            <TabPane
              tab={`Đang vận chuyển (${
                dataTable?.filter((item) => item.deliverystatus == "5").length
              })`}
              key="5"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "5")}
              />
            </TabPane>
            <TabPane
              tab={`Đang giao (${
                dataTable?.filter((item) => item.deliverystatus == "6").length
              })`}
              key="6"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "6")}
              />
            </TabPane>
            <TabPane
              tab={`Giao thành công (${
                dataTable?.filter((item) => item.deliverystatus == "7").length
              })`}
              key="7"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "7")}
              />
            </TabPane>

            <TabPane
              tab={`Đã duyệt hoàn (${
                dataTable?.filter((item) => item.deliverystatus == "8").length
              })`}
              key="8"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "8")}
              />
            </TabPane>
            <TabPane
              tab={`Đang hoàn chuyển (${
                dataTable?.filter((item) => item.deliverystatus == "9").length
              })`}
              key="9"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "9")}
              />
            </TabPane>
            <TabPane
              tab={`Phát tiếp (${
                dataTable?.filter((item) => item.deliverystatus == "10").length
              })`}
              key="10"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "10")}
              />
            </TabPane>
            <TabPane
              tab={`Đã trả (${
                dataTable?.filter((item) => item.deliverystatus == "11").length
              })`}
              key="11"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "11")}
              />
            </TabPane>
            <TabPane
              tab={`Đã hủy (${
                dataTable?.filter((item) => item.deliverystatus == "12").length
              })`}
              key="13"
            >
              <TableDonHang
                time={dateFilter}
                handleSetList={handleSetList}
                data={dataTable?.filter((item) => item.deliverystatus == "12")}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </contextValue.Provider>
  );
};

export default App;
