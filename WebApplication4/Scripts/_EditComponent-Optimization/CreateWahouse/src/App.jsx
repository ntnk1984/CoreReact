import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
import CreateWereHouse from "./components/CreateWereHouse";
import PushOrderIntoWH from "./components/PushOrderIntoWH";
import { getAllCity, getMerchandiseAttribute, getWarehouseAttribute } from "./Service";
const { TabPane } = Tabs;

function App(props) {
  const [allCity, setAllCity] = useState();
  const [warehouseAttribute, setWarehouseAttribute] = useState([]);
  const [merchandiseAttribute, setMerchandiseAttribute] = useState([]);
  async function getAllCityConvert() {
    let res = await getAllCity();
    setAllCity(res);
  }
  async function getWarehouseAttributeApi() {
    let res = await getWarehouseAttribute();
    if (res) {
      setWarehouseAttribute(res);
    }
  }
  async function getMerchandiseAttributeApi() {
    let res = await getMerchandiseAttribute();

    if (res) {
      setMerchandiseAttribute(res);
    }
  }

  useEffect(() => {
    getAllCityConvert();
    getWarehouseAttributeApi();
    getMerchandiseAttributeApi();
 
  }, []);
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#f1f1f1",
        minHeight: "100vh",
      }}
    >
      {/* <Tabs tabPosition="left" style={{padding:0}} defaultActiveKey="QuanLyKho" onChange={onChange}> */}
      <Tabs tabPosition="left" style={{ padding: 0, backgroundColor: "#FFFFFF" }} defaultActiveKey="QuanLyDonHang">
        <TabPane tab="QLý Kho" key="QuanLyKho">
          <CreateWereHouse
            merchandiseAttribute={merchandiseAttribute}
            warehouseAttribute={warehouseAttribute}
            allCity={allCity}
          />
        </TabPane>
        <TabPane tab="QLý Đơn Hàng" key="QuanLyDonHang">
          <div style={{ minHeight: "100vh" }}>
            <PushOrderIntoWH
              merchandiseAttribute={merchandiseAttribute}
              warehouseAttribute={warehouseAttribute}
              // allCity={allCity}
            />
          </div>
        </TabPane>
        {/* <TabPane tab="ĐH nội tỉnh" key="DonHangNoiTinh">
          <div style={{ minHeight: "100vh" }}>Đơn Hàng Nội Tỉnh</div>
        </TabPane>
        <TabPane tab="ĐH ngoại tỉnh" key="DonHangNgoaiTinh">
          <div style={{ minHeight: "100vh" }}>Đơn Hàng Ngoại Tỉnh</div>
        </TabPane> */}
      </Tabs>
    </div>
  );
}

export default App;
