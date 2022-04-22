import { Typography } from "antd";
import React from "react";
import BangThongKeGiaoHang from "./components/BangThongKeGiaoHang.js";
import BangThongKeSanLuong from "./components/BangThongKeSanLuong.js";
import BangThongKeTien from "./components/BangThongKeTien.js";
import BangTongTien from "./components/BangTongTien.js";
const { Title } = Typography;
const App = () => {
  return (
    <>
      <div className="d-flex justify-content-center w-75 mt-1" style={{ margin: "0 auto"}}>
        <BangTongTien />
        <BangThongKeTien  />
      </div>
      <div className="d-flex justify-content-center w-75 mt-1" style={{ margin: "0 auto" }}>
        <BangThongKeSanLuong />

        <BangThongKeGiaoHang />
      </div>
    </>
  );
};

export default App;
