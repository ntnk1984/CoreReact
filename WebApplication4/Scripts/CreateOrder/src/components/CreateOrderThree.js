import React, { useContext,useEffect, useReducer, useState } from "react";
import { Card, message, Spin, Steps } from "antd";
import { Form, Input, Button, Row, Col, Dropdown, Menu, Collapse } from "antd";
import TotalOrder from "./DetailOrder/TotalOrder";
import InputOrderChild from "./DetailOrder/InputOrderChild";
import OrderChild from "./DetailOrder/OrderChild";

import Text from "antd/lib/typography/Text";
import { contextValue } from "../App.js";
import { postOrder } from "../Service.js";

const { Panel } = Collapse;

export default function CreateOrderThree() {
  const context = useContext(contextValue);
  const { createOrder, dispatch } = context;
  
  //createOrder.spi

  const { listOrder, visibility, sender, receiver } = context.createOrder;
  const { sendername, senderphone, senderaddress } = sender;
  const { receivername, receiverphone, receiveraddress } = receiver;
 
  const [OpenSpin, setOpenSpin] = useState(false);
  
  return (
    <Spin  spinning={OpenSpin}>
      <Form
        layout="vertical"
        className="mt-4 rounded rounded-3 p-3 shadow-sm"
        style={{ background: "white" }}
      >
        <Row justify="center" className="mb-3 px-2">
          <Col span={11} className="border p-2 mx-2">
            <Text strong>Thông tin người gửi</Text>
            <br></br>
            <Text>Họ tên: {sendername}</Text> &nbsp;&nbsp;
            <Text>Số điện thoại: {senderphone}</Text>
            <br></br>
            <Text>Địa chỉ: {senderaddress}</Text>
          </Col>
          <Col span={11} className="border p-2 mx-2">
            <Text strong>Thông tin người gửi</Text>
            <br></br>
            <Text>Họ tên: {receivername}</Text> &nbsp;&nbsp;
            <Text>Số điện thoại: {receiverphone}</Text>
            <br></br>
            <Text>Địa chỉ: {receiveraddress}</Text>
          </Col>
        </Row>
        <Row>
          <h4 className="text-secondary mx-2">THÔNG TIN BƯU GỬI</h4>
        </Row>

        {/* render card collpase */}
        <Collapse>
          {listOrder?.map((item, index) => {
            return (
              <Panel header={`THÔNG TIN BƯU GỬI ${index + 1}`} key={index + 1}>
                <TotalOrder />
                {
                  /* render don hang */
                  item?.map((val, ind) => {
                    return <OrderChild key={ind} value={{ val, ind, index }} />;
                  })
                }
                <div className="text-center">
                  <Button
                     type="link"
                    onClick={() => {
                      dispatch({ type: "SET_VISIBILITY" });
                    }}
                  >
                    Thêm mặt hàng
                  </Button>
                </div>
                {visibility ? "" : <InputOrderChild indexBuuGui={index} />}
              </Panel>
            );
          })}
        </Collapse>
        {/* render card collpase */}

        <Form.Item className="mt-4 mb-2 ">
          <Button
            size="large"
            type=""
            onClick={() => {
              context.dispatch({ type: "SET_PROGRESS_BACK" });
            }}
          >
            Trở lại
          </Button>
          <Button
            size="large"
            className="mx-2"
            onClick={() => {
              dispatch({ type: "ADD_BUU_GUI" });
            }}
          
          >
            Tạo đơn bưu gửi
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setOpenSpin(true)

              postOrder(createOrder).then(data => {
                message.success("Thành công!")
                setOpenSpin(false)
              }).catch(err=>{
                message.error("Thất bại!")
                setOpenSpin(false)
              })

              
            }}
          >
            Hoàn tất
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
