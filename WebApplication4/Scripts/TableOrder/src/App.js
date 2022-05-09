import React, { useEffect, useRef, useState } from "react";
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
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getAllOrderApi, removeOrderByIdApi } from "./api/Order.js";
import GiaoHangLoat from "./components/GiaoHangLoat.js";
import GomHang from "./components/GomHang.js";
import PhatHang from "./components/PhatHang.js";
import XacNhanThanhToan from "./components/XacNhanThanhToan.js";
import HuyDon from "./components/HuyDon.js";
import XacNhanDaNhanHang from "./components/XacNhanDaNhanHang.js";
import XacNhanDaGomHang from "./components/XacNhanDaGomHang.js";
import XoaHangLoat from "./components/XoaHangLoat.js";
import { useReactToPrint } from "react-to-print";
import Printorder from "./components/PrintOrder.js";
import "./App.css";
import { ExportExcel } from "./components/ExportExcel.js";
import { checkQuyen } from "./athor/Authoraziton.js";
const { RangePicker } = DatePicker;
const { Text } = Typography;

const { Option } = Select;
const { TabPane } = Tabs;

const App = () => {

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

  const [data, setData] = useState([]);


  const dataTable = data.filter((item) => {
    return true;
  });

  const [dateFilter, setDateFilter] = useState([]);

  useEffect(async () => {
    //call api bảng đơn hàng
    const response = await getAllOrderApi();
    await setData(response.responses);
  }, []);


  //list checkbox / list dùng để thao tác
  const [list, setList] = useState([]);
  const handleSetList = (value) => {
    setList(value);
  };


  return (
    <div style={{ width: "1600px", margin: "0 auto" }}>
      <div>
        <div className="d-none">
          <div ref={componentRef}>
            <Printorder listPrint={list} />
          </div>
        </div>
      </div>
      <Row className="mb-3" style={{ zIndex: 0 }}>
        <Col span={9} offset={3}>
          <Select
            defaultValue="Chọn thao tác"
            style={{ width: 180 }}
            className="mx-2"
          >
            <Option value="0">
              <GiaoHangLoat disabled={checkQuyen()==2}/>
            </Option>
            <Option value="1">
              <XacNhanThanhToan />
            </Option>
            <Option value="2">
              <HuyDon />
            </Option>
            <Option value="3">
              <PhatHang  data={list} setData={setData}/>
            </Option>
            <Option value="4">
              <GomHang />
            </Option>
            <Option value="5">
              <XacNhanDaNhanHang />
            </Option>
            <Option value="6">
              <XacNhanDaGomHang />
            </Option>
            <Option value="9">
              <ExportExcel csvData={list} />
            </Option>
            <Option value="7">
              <Button
              disabled={checkQuyen()!==1}
                type="link"
                onClick={() => {
                  handlePrint();
                }}
              >
                In hàng loạt
              </Button>
            </Option>
            <Option value="8">
              <XoaHangLoat />
            </Option>
          </Select>

          <Text className="mx-2">Bộ lọc : </Text>
          <RangePicker
            onChange={(date, dateString) => {
              setDateFilter(dateString);
              if (dateString[0] == "") {
                setDateFilter([]);
              }
            }}
          />
        </Col>
      </Row>
      <Tabs tabPosition="left">
        <TabPane tab={`Tất cả (${dataTable.length})`} key="all">
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable}
            time={dateFilter}
          />
        </TabPane>
        <TabPane
          tab={`Mới tạo (${
            dataTable.filter((item) => item.deliverystatus == "1").length
          })`}
          key="1"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "1")}
            time={dateFilter}
          />
        </TabPane>
        <TabPane
          tab={`Chờ xử lý (${
            dataTable.filter((item) => item.deliverystatus == "2").length
          })`}
          key="2"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "2")}
          />
        </TabPane>
        <TabPane
          tab={`Chờ lấy (${
            dataTable.filter((item) => item.deliverystatus == "3").length
          })`}
          key="3"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "3")}
          />
        </TabPane>
        <TabPane
          tab={`Đã lấy (${
            dataTable.filter((item) => item.deliverystatus == "4").length
          })`}
          key="4"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "4")}
          />
        </TabPane>
        <TabPane
          tab={`Đang vận chuyển (${
            dataTable.filter((item) => item.deliverystatus == "5").length
          })`}
          key="5"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "5")}
          />
        </TabPane>
        <TabPane
          tab={`Đang giao (${
            dataTable.filter((item) => item.deliverystatus == "6").length
          })`}
          key="6"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "6")}
          />
        </TabPane>
        <TabPane
          tab={`Giao thành công (${
            dataTable.filter((item) => item.deliverystatus == "7").length
          })`}
          key="7"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "7")}
          />
        </TabPane>

        <TabPane
          tab={`Đã duyệt hoàn (${
            dataTable.filter((item) => item.deliverystatus == "8").length
          })`}
          key="8"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "8")}
          />
        </TabPane>
        <TabPane
          tab={`Đang hoàn chuyển (${
            dataTable.filter((item) => item.deliverystatus == "9").length
          })`}
          key="9"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "9")}
          />
        </TabPane>
        <TabPane
          tab={`Phát tiếp (${
            dataTable.filter((item) => item.deliverystatus == "10").length
          })`}
          key="10"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "10")}
          />
        </TabPane>
        <TabPane
          tab={`Đã trả (${
            dataTable.filter((item) => item.deliverystatus == "11").length
          })`}
          key="11"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "11")}
          />
        </TabPane>
        <TabPane
          tab={`Đã hủy (${
            dataTable.filter((item) => item.deliverystatus == "12").length
          })`}
          key="13"
        >
          <TableDonHang
            time={dateFilter}
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.deliverystatus == "12")}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
