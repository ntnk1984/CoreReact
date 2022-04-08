import React, { useContext, useReducer, useState } from "react";
import { Card, Steps } from "antd";
import { Form, Input, Button, Row, Col, Dropdown, Menu, Collapse } from "antd";
import TotalOrder from "./DetailOrder/TotalOrder";
import InputOrderChild from "./DetailOrder/InputOrderChild";
import OrderChild from "./DetailOrder/OrderChild";

import Text from "antd/lib/typography/Text";
import { contextValue } from "../App.js";
import "./styleCss/CreatOrder3.css";

const { Panel } = Collapse;

export default function CreateOrderThree({ onSubmit }) {
  const context = useContext(contextValue);
  const { createOrder, dispatch } = context;

  const { listOrder, visibility, sender, receiver } = context.createOrder;
  const { sendername, senderphone, senderaddress } = sender;
  const { receivername, receiverphone, receiveraddress } = receiver;

  return (
    <div
      className="creatOder3"
      style={{ background: "white", margin: " 0 auto", padding: "30px 20px" }}
    >
      <Row justify="space-between" style={{ margin: "0 auto" }}>
        <Col span={24}>
          <h4 style={{ textAlign: "center" }} className="text-secondary mx-2">
            THÔNG TIN BƯU GỬI
          </h4>
        </Col>
        {/* <Col style={{ borderRadius: "5px" }} span={11} className="border p-2 ">
          <Row>
            <Col span={24}>
              <Text strong>Thông tin người gửi</Text>
            </Col>

            <Col span={12}>
              <Text>Họ tên: {sendername}</Text> &nbsp;&nbsp;
            </Col>

            <Col span={12}>
              <Text>Số điện thoại: {senderphone}</Text>
            </Col>

            <Col span={24}>
              <Text>Địa chỉ: {senderaddress}</Text>
            </Col>
          </Row>
        </Col>
        <Col style={{ borderRadius: "5px" }} span={11} className="border p-2 ">
          <Row>
            <Col span={24}>
              <Text strong>Thông tin người nhận</Text>
            </Col>

            <Col span={12}>
              <Text>Họ tên: {receivername}</Text>
            </Col>

            <Col span={12}>
              <Text>Số điện thoại: {receiverphone}</Text>
            </Col>

            <Col span={24}>
              <Text>Địa chỉ: {receiveraddress}</Text>
            </Col>
          </Row>
        </Col> */}
      </Row>

      <div className="">
        {/* render card collpase */}
        <Collapse>
          {listOrder?.map((item, index) => {
            return (
              <Panel header={`THÔNG TIN BƯU GỬI ${index + 1}`} key={index + 1}>
                <TotalOrder />
                {
                  /* render don hang */
                  item?.map((val, ind) => {
                    return <OrderChild key={ind} value={{ val, ind }} />;
                  })
                }
                <div className="text-center">
                  <Button
                    style={{ fontWeight: 700 }}
                    type="text"
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

        {/* <Form.Item className="mt-4 mb-2 ">
          <Button
            className="mx-2"
            onClick={() => {
              dispatch({ type: "ADD_BUU_GUI" });
            }}
          >
            Tạo đơn bưu gửi
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch({ type: "POST_ORDER_API" });
            
            }}
          >
            Hoàn tất
          </Button>
        </Form.Item> */}
      </div>
    </div>
  );
}
