import { Tabs, Row, Col, AutoComplete } from "antd";
import React, { Component } from "react";
import TablePackage from "./components/TablePackage.js";
import data from "../assets/datapackage.json.json";
import "./App.css"

const { TabPane } = Tabs;
class App extends Component {
  render() {
    return (
      <div className="m-auto" style={{ width: 1600 }}>
        <Row justify="end">
          <Col span={4} className="d-flex justify-content-end">
            <AutoComplete
              style={{ width: 200 }}
              placeholder="Nhập mã kiện hàng"
            />
          </Col>
        </Row>
        <Tabs tabPosition="left" className="mt-3">
          <TabPane tab={`Tất cả (${data.length})`} key="1">
            <TablePackage data={data} />
          </TabPane>
          <TabPane tab={`Chờ lấy hàng (${data.filter(item=>item.trangthai=="Chờ lấy hàng").length})`} key="2">
            <TablePackage data={data.filter(item=>item.trangthai=="Chờ lấy hàng")} />
          </TabPane>
          <TabPane tab={`Đang vận chuyển (${data.filter(item=>item.trangthai=="Đang vận chuyển").length})`} key="3">
            <TablePackage data={data.filter(item=>item.trangthai=="Đang vận chuyển")} />
          </TabPane>
          <TabPane tab={`Đã giao xong (${data.filter(item=>item.trangthai=="Đã giao xong").length})`} key="4">
            <TablePackage data={data.filter(item=>item.trangthai=="Đã giao xong")} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
