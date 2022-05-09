import { Typography } from "antd";
import React from "react";
import BangThongKeGiaoHang from "./components/BangThongKeGiaoHang.js";
import BangThongKeSanLuong from "./components/BangThongKeSanLuong.js";
import BangThongKeTien from "./components/BangThongKeTien.js";
import BangTongTien from "./components/BangTongTien.js";
import ThongBao from "./components/ThongBao.js";
const { Title } = Typography;
const App = () => {
  return (
    <div style={{ width: 1600, margin: "0 auto" }}>
      <BangTongTien />
      <div className="row">
        <div className="col-9">
     
          <BangThongKeTien />
        </div>
        <div className="col-3">
     
          <ThongBao/>
        </div>
      </div>

   
    </div>
  );
};

export default App;
