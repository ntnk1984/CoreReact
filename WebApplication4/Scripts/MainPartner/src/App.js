import { Typography } from "antd";
import React from "react";
import BangThongKeGiaoHang from "./components/BangThongKeGiaoHang.js";
import BangThongKeSanLuong from "./components/BangThongKeSanLuong.js";
import BangThongKeTien from "./components/BangThongKeTien.js";
import BangTongTien from "./components/BangTongTien.js";
const { Title } = Typography;
const App = () => {
  return (
    <div style={{width:1600,margin:"0 auto"}}>
      
        <BangTongTien />
        <div className="row">
          <div className="col-6">   <BangThongKeTien  /></div>
          <div className="col-6">  <BangThongKeGiaoHang /> </div>
        </div>
    
     
    
        {/* <BangThongKeSanLuong /> */}

      
      
    </div>
  );
};

export default App;
