import React, { useEffect, useRef, useState } from "react";
import { Tabs, Row, Col, Modal, Select } from "antd";
import TableDonHang from "./components/TableDonHang.js";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getAllOrderApi, removeOrderByIdApi } from "./Services/Order.js";
import ModalTableOrder from "../HOC/ModalTableOrder.js";
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
import { useDebouncedCallback } from "use-debounce";
import "./App.css";

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
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState([]);

  const dataTable = data.filter((item) => {
    return true;
  });

  useEffect(async () => {
    //call api bảng đơn hàng
    const response = await getAllOrderApi();

    await setData(response);
  }, []);

  //modal chọn thao tác
  const [optionModal, setOptionModal] = useState({
    title: undefined,
    width: undefined,
    content: undefined,
  });
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
            <Printorder listPrint={list}/>
          </div>
        </div>
      </div>
      <Row className="mb-3" style={{ zIndex: 0 }}>
        <Col span={9} offset={3}>
          <Select
            defaultValue="Chọn thao tác"
            style={{ width: 180 }}
            className="mx-2"
            onChange={(value) => {
              switch (value) {
                case "0": {
                  setOptionModal({
                    title: "Giao hàng loạt",
                    width: 500,
                    content: <GiaoHangLoat list={list}  setVisible={setVisible} />,
                  });
                  break;
                }
                case "1": {
                  setOptionModal({
                    title: "Xác nhận thanh toán",
                    width: 500,
                    content: <XacNhanThanhToan list={list} setVisible={setVisible} />,
                  });
                  break;
                }
                case "2": {
                  setOptionModal({
                    title: "Hủy đơn hàng loạt",
                    width: 500,
                    content: <HuyDon list={list} setVisible={setVisible} />,
                  });
                  break;
                }
                case "3": {
                  setOptionModal({
                    title: "Phân đơn hàng giao",
                    width: 500,
                    content: <PhatHang list={list} setVisible={setVisible} />,
                  });
                  break;
                }
                case "4": {
                  setOptionModal({
                    title: "Phân đơn hàng gôm",
                    width: 500,
                    content: <GomHang list={list} setVisible={setVisible} />,
                  });
                  break;
                }
                case "5": {
                  setOptionModal({
                    title: "Xác nhận đã nhận hàng",
                    width: 500,
                    content: <XacNhanDaNhanHang list={list} setVisible={setVisible} />,
                  });
                  break;
                }
                case "6": {
                  setOptionModal({
                    title: "Xác nhận đã gom hàng",
                    width: 500,
                    content: <XacNhanDaGomHang list={list} setVisible={setVisible} />,
                  });
                  break;
                }
                case "7": {
                  handlePrint();
                  break;
                }
                case "8": {
                  setOptionModal({
                    title: "Xác nhận xóa hàng loạt đơn hàng!",
                    width: 500,
                    content: <XoaHangLoat list={list} setVisible={setVisible} />,
                  });
                  break;
                }
                default:
                  "";
              }

              setVisible(true);
            }}
          >
            <Option value="0">Giao hàng loạt</Option>
            <Option value="1">Xác nhận thanh toán</Option>
            <Option value="2">Hủy đơn hàng loạt</Option>
            <Option value="3">Phân đơn hàng giao</Option>
            <Option value="4">Phân đơn hàng gôm</Option>
            <Option value="5">Xác nhận đã nhận hàng</Option>
            <Option value="6">Xác nhận đã gom hàng</Option>
            <Option value="7">In hàng loạt</Option>
            <Option value="8">Xóa hàng loạt</Option>
          </Select>
          {/* Modal table */}
          <ModalTableOrder
            visible={visible}
            setVisible={setVisible}
            title={optionModal.title}
            width={optionModal.width}
            content={optionModal.content}
          />
        </Col>
      </Row>
      <Tabs
        tabPosition="left"
      >
        <TabPane tab={`Tất cả (${dataTable.length})`} key="all">
          <TableDonHang handleSetList={handleSetList} data={dataTable} />
        </TabPane>
        <TabPane
          tab={`Mới tạo (${
            dataTable.filter((item) => item.trangThai == "1").length
          })`}
          key="1"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "1")}
          />
        </TabPane>
        <TabPane
          tab={`Chờ xử lý (${
            dataTable.filter((item) => item.trangThai == "2").length
          })`}
          key="2"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "2")}
          />
        </TabPane>
        <TabPane
          tab={`Chờ lấy (${
            dataTable.filter((item) => item.trangThai == "3").length
          })`}
          key="3"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "3")}
          />
        </TabPane>
        <TabPane
          tab={`Đã lấy (${
            dataTable.filter((item) => item.trangThai == "4").length
          })`}
          key="4"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "4")}
          />
        </TabPane>
        <TabPane
          tab={`Đang vận chuyển (${
            dataTable.filter((item) => item.trangThai == "5").length
          })`}
          key="5"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "5")}
          />
        </TabPane>
        <TabPane
          tab={`Đang giao (${
            dataTable.filter((item) => item.trangThai == "6").length
          })`}
          key="6"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "6")}
          />
        </TabPane>
        <TabPane
          tab={`Giao thành công (${
            dataTable.filter((item) => item.trangThai == "7").length
          })`}
          key="7"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "7")}
          />
        </TabPane>

        <TabPane
          tab={`Đã duyệt hoàn (${
            dataTable.filter((item) => item.trangThai == "8").length
          })`}
          key="8"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "8")}
          />
        </TabPane>
        <TabPane
          tab={`Đang hoàn chuyển (${
            dataTable.filter((item) => item.trangThai == "9").length
          })`}
          key="9"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "9")}
          />
        </TabPane>
        <TabPane
          tab={`Phát tiếp (${
            dataTable.filter((item) => item.trangThai == "10").length
          })`}
          key="10"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "10")}
          />
        </TabPane>
        <TabPane
          tab={`Đã trả (${
            dataTable.filter((item) => item.trangThai == "11").length
          })`}
          key="11"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "11")}
          />
        </TabPane>
        <TabPane
          tab={`Đã hủy (${
            dataTable.filter((item) => item.trangThai == "13").length
          })`}
          key="13"
        >
          <TableDonHang
            handleSetList={handleSetList}
            data={dataTable.filter((item) => item.trangThai == "13")}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
