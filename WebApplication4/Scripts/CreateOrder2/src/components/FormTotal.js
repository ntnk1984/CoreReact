import React,{useContext} from "react";
import { Typography, Space, Divider, Input, Row, Col, Button } from "antd";
import { ContextValue } from "../App.js";

const { Text, Link } = Typography;
export default function FormTotal() {
   const context = useContext(ContextValue);

    console.log(context.reducerOrder.get("MerchandiseItems"))
  return (
    <div className=" p-3 m-3 shadow-sm bg-white rounded-2">
      <Text strong>Đặt hàng</Text>
      <Divider />
      <Row>
        <Col span={12}>
          <Space direction="vertical">
            <Text strong>Tổng đơn hàng</Text>
            <Text>Số lượng đơn hàng: 5</Text>
            <Text>Tổng cân nặng: 1.4 kg</Text>
            <Text>Tổng tiền COD : 1.000.000 đ</Text>
          </Space>
        </Col>
        {/* <Col span={12}> */}
        {/* <Space className="w-100" direction="vertical">
          <Text strong>Ghi chú</Text>
          <Input.TextArea style={{height:75}} />
          </Space>
        </Col> */}
      </Row>
      <Divider />
      <div className="mt-3 d-flex justify-content-end">
        <Button>Hủy đơn</Button>
        <Button className="ms-2"  type="primary">Đặt hàng</Button>
      </div>
    </div>
  );
}
