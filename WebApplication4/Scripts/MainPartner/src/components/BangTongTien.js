import React from "react";
import { Typography, Space, Button } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
const { Text, Link, Title } = Typography;

export default function BangTongTien() {
  return (
  
    <div className="row px-2">
      <div className="col-md-3 text-center  ">
        <div
          className="bg-white  rounded p-3 shadow  "
          style={{ margin: "0 auto" }}
        >
          <Title level={4} type="secondary"  >Đã trả tiền</Title>
          <Title className="my-1" level={3}>99.934.100 </Title>
          <div className="text-end"><small>Đơn vị : VNĐ</small></div>
        </div>
      </div>
      <div className="col-md-3 text-center  ">
        <div
          className="bg-white  rounded p-3 shadow  "
          style={{ margin: "0 auto" }}
        >
          <Title level={4} type="secondary">Chưa trả tiền</Title>
          <Title type="link" className="my-1" level={3}>23.912.000 </Title>
          <div className="text-end"><small>Đơn vị : VNĐ</small></div>
        </div>
      </div>
      <div className="col-md-3 text-center  ">
        <div
          className="bg-white  rounded p-3 shadow  "
          style={{ margin: "0 auto" }}
        >
          <Title level={4} type="secondary">Đơn gôm</Title>
          <Title className="my-1" level={3}>1.453 </Title>
          <div className="text-end"><small>Đơn vị : Đơn hàng</small></div>
        </div>
      </div>
      <div className="col-md-3 text-center  ">
        <div
          className="bg-white  rounded p-3 shadow  "
          style={{ margin: "0 auto" }}
        >
          <Title level={4} type="secondary">Đơn phát</Title>
          <Title className="my-1" level={3}>3.293</Title>
          <div className="text-end"><small>Đơn vị : Đơn hàng</small></div>
        </div>
      </div>
    </div>
  );
}
