import { Typography } from "antd";
import React from "react";
import BangThongKeGiaoHang from "./components/BangThongKeGiaoHang.js";
import BangThongKeTien from "./components/BangThongKeTien.js";
const { Title } = Typography;
const App = () => {
  return (
    <>
      <div className="row w-75 mt-5" style={{ margin: "0 auto" }}>
        <h5>Tổng tiền </h5>
        <div className="d-flex mt-3">
          <div className=" border border-1 rounded-2  p-2 mx-4">
            Đã trả tiền :1.000.000
          </div>
          <div className=" border border-1 rounded-2  p-2 mx-4">
            Chưa trả tiền:1.000.000
          </div>
          <div className=" border border-1 rounded-2  p-2 mx-4">
            Chưa đối soát :1.000.000
          </div>
        </div>
      </div>
      <div className="row w-75 mt-5" style={{ margin: "0 auto" }}>
        <div className="col-6">
<BangThongKeTien/>
        </div>
         <div className="col-6">
          <BangThongKeGiaoHang/>
        </div>
      </div>
    </>
  );
};

export default App;
