import React from "react";
import { Typography, Space,Button } from 'antd';
import {
    FieldTimeOutlined,
  } from "@ant-design/icons";
const { Text, Link } = Typography;

export default function BangTongTien() {
  return (
    <div style={{width:310,height:330}} className=" bg-white p-3 rounded-2 shadow m-2">
     
      <div className=" mt-1">
          <Text className="text-center" strong>Tổng tiền</Text>
        <div className=" border border-1  rounded-2 text p-2 m-4">
          <Button type="link"  style={{borderRadius:100,backgroundColor:"#52c41a",color:"white"}}  icon={<FieldTimeOutlined />}></Button>
          &nbsp; <Text strong> Đã trả tiền :1.000.000</Text>
        </div>
        <div className=" border border-1 rounded-2  p-2 m-4">
        <Button type="link" style={{borderRadius:100,backgroundColor:"#52c41a",color:"white"}}  icon={<FieldTimeOutlined />}></Button>
          &nbsp; <Text strong> Chưa trả tiền :1.000.000</Text>
        </div>
        <div className=" border border-1 rounded-2  p-2 m-4">
        <Button type="link" style={{borderRadius:100,backgroundColor:"#52c41a",color:"white"}}  icon={<FieldTimeOutlined />}></Button>
          &nbsp; <Text strong> Chưa đối soát :1.000.000</Text>
        </div>
      </div>
    </div>
  );
}
