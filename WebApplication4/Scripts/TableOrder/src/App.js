import React from "react";


import { Tabs, Radio, Space, Badge,Row,AutoComplete } from "antd";
import TableDonHang from "./components/TableDonHang.js";
import data from "../assets/data/dataJSON.json"

const { TabPane } = Tabs;
const App = () => {

  return (
    <div style={{ width: "1700px", margin: "0 auto" }}>
      <h3 className="text-center my-3">QUẢN LÝ ĐƠN HÀNG</h3>
      <Row justify="end" className="mb-3">
      <AutoComplete
     
        style={{ width: 200 }}
      
        placeholder="Nhập mã đơn hàng"
      />
      </Row>
      <Tabs tabPosition="left">
      <TabPane tab={ `Tất cả (${data.length})`} key="0">
          <TableDonHang data={data}/>
        </TabPane>
        <TabPane tab={ `Mới tạo (${data.filter(item=>item.trangThai=="Mới tạo").length})`} key="1">
        <TableDonHang data={data.filter(item=>item.trangThai=="Mới tạo")}/>
        </TabPane>
        <TabPane tab={ `Chờ xử lý (${data.filter(item=>item.trangThai=="Chờ xử lý").length})`} key="7">
        <TableDonHang data={data.filter(item=>item.trangThai=="Chờ xử lý")}/>
        </TabPane>
        <TabPane tab={ `Chờ lấy (${data.filter(item=>item.trangThai=="Mới tạo").length})`} key="2">
        <TableDonHang data={data.filter(item=>item.trangThai=="Mới tạo")}/>
        </TabPane>
        <TabPane tab={ `Đã lấy (${data.filter(item=>item.trangThai=="Đã lấy").length})`} key="3">
        <TableDonHang data={data.filter(item=>item.trangThai=="Đã lấy")}/>
        </TabPane>
        <TabPane tab={ `Đang vận chuyển (${data.filter(item=>item.trangThai=="Đang vận chuyển").length})`} key="4">
        <TableDonHang data={data.filter(item=>item.trangThai=="Đang vận chuyển")}/>
        </TabPane>
        <TabPane tab={ `Đang giao (${data.filter(item=>item.trangThai=="Đang giao").length})`} key="5">
        <TableDonHang data={data.filter(item=>item.trangThai=="Đang giao")}/>
        </TabPane>
        <TabPane tab={ `Giao thành công (${data.filter(item=>item.trangThai=="Giao thành công").length})`} key="6">
        <TableDonHang data={data.filter(item=>item.trangThai=="Giao thành công")}/>
        </TabPane>
        
        <TabPane tab={ `Đã duyệt hoàn (${data.filter(item=>item.trangThai=="Đã duyệt hoàn").length})`} key="8">
        <TableDonHang data={data.filter(item=>item.trangThai=="Đã duyệt hoàn")}/>
        </TabPane>
        <TabPane tab={ `Đang hoàn chuyển (${data.filter(item=>item.trangThai=="Đang hoàn chuyển").length})`} key="9">
        <TableDonHang data={data.filter(item=>item.trangThai=="Đang hoàn chuyển")} />
        </TabPane>
        <TabPane tab={ `Phát tiếp (${data.filter(item=>item.trangThai=="Phát tiếp").length})`} key="10">
        <TableDonHang data={data.filter(item=>item.trangThai=="Phát tiếp")}/>
        </TabPane>
        <TabPane tab={ `Đã trả (${data.filter(item=>item.trangThai=="Đã trả").length})`} key="11">
        <TableDonHang data={data.filter(item=>item.trangThai=="Đã trả")}/>
        </TabPane>
        <TabPane tab={ `Đã hủy (${data.filter(item=>item.trangThai=="Đã hủy").length})`} key="12">
        <TableDonHang data={data.filter(item=>item.trangThai=="Đã hủy")}/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
