import React from "react";
import { Typography, Space, Button } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import Img1 from "../assets/image/1.png"
import Img2 from "../assets/image/2.png"
import Img3 from "../assets/image/3.png"
import Img4 from "../assets/image/4.png"
const { Text, Link, Title } = Typography;

export default function BangTongTien() {
  return (
    <div className="row p-4 pt-2  ">
      <h5 className="my-2">Chào! Username</h5>
    
      <div className="col-md-3 text-center  ">
        <div className="bg-white  rounded p-3 shadow  " style={{ margin: "0 auto" }}>
          <img src={Img1} alt="" />
          <Title  className="my-2" level={4} type="secondary">
            Đã trả tiền
          </Title>
          <Title className="my-1" level={4}>
            99.934.100{" "}
          </Title>
          <div className="text-end">
            <small>Đơn vị : VNĐ</small>
          </div>
        </div>
      </div>
      <div className="col-md-3 text-center  ">
        <div
          className="bg-white  rounded p-3 shadow  "
          style={{ margin: "0 auto" }}
        >
           <img src={Img2} alt="" style={{width:80}}/>
          <Title className="my-2" level={4} type="secondary">
            Chưa trả tiền
          </Title>
          <Title type="link" className="my-1" level={4}>
            23.912.000{" "}
          </Title>
          <div className="text-end">
            <small>Đơn vị : VNĐ</small>
          </div>
        </div>
      </div>
      <div className="col-md-3 text-center  ">
        <div
          className="bg-white  rounded p-3 shadow  "
          style={{ margin: "0 auto" }}
        >
           <img  src={Img3} alt="" />
          <Title  className="my-2" level={4} type="secondary">
            Đơn gôm
          </Title>
          <Title className="my-1" level={4}>
            1.453{" "}
          </Title>
          <div className="text-end">
            <small>Đơn vị : Đơn hàng</small>
          </div>
        </div>
      </div>
      <div className="col-md-3 text-center  ">
        <div
          className="bg-white  rounded p-3 shadow  "
          style={{ margin: "0 auto" }}
        >
           <img src={Img4} alt="" />
          <Title  className="my-2" level={4} type="secondary">
            Đơn phát
          </Title>
          <Title className="my-1" level={4}>
            3.293
          </Title>
          <div className="text-end">
            <small>Đơn vị : Đơn hàng</small>
          </div>
        </div>
      </div>
    </div>
  );
}
