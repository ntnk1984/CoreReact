import React, { useContext, useState } from "react";
import { Modal, Button, Row, Col, Form, Input } from "antd";
import { ADD_ITEM_ORDER, ContextValue } from "../App.js";

export default function ModalOrder(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [order, setOrder] = useState({
    HSCode: Date.now(),
    VietNameseName: undefined,
    EnglishName: undefined,
    CountryManufacturedCode: undefined,
    Unit: undefined,
    Currency: undefined,
    Value: undefined,
    Quantity: undefined,
    Weight: undefined,
    SequenceNumber:undefined,
    nameSequence:undefined,
    
  });

  const {reducerOrder,dispatch} = useContext(ContextValue);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch({
        type:ADD_ITEM_ORDER,
        payload:{...order,SequenceNumber:props.value.sequenceNumber,nameSequence:props.value.name}
    })
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button className="w-100" type="link" onClick={showModal}>
        Tạo đơn hàng
      </Button>
      <Modal
        title="Tạo đơn hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Row>
            <Col span={12} className="p-2">
              <Form.Item name="VietNameseName" label="Tên đơn hàng">
                <Input
                  name="VietNameseName"
                  placeholder="input placeholder"
                  onChange={(e) => {
                 
                      setOrder({...order,VietNameseName:e.target.value})
              
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="p-2">
              <Form.Item name="Unit" label="Loại">
                <Input
                  name="Unit"
                  placeholder="input placeholder"
                  onChange={(e) => {
                    setOrder({...order,Unit:e.target.value})
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="p-2">
              <Form.Item name="Currency" label="Tiền tệ">
                <Input  name="Currency" placeholder="input placeholder"  onChange={(e) => {
                    setOrder({ ...order, Currency: e.target.value });
                  }}/>
              </Form.Item>
            </Col>
            <Col span={12} className="p-2">
              <Form.Item name="Value" label="COD">
                <Input name="Value" placeholder="input placeholder" onChange={(e) => {
                    setOrder({ ...order, Value: e.target.value });
                  }}/>
              </Form.Item>
            </Col>
            <Col span={12} className="p-2">
              <Form.Item name="Quantity" label="Số lượng">
                <Input name="Quantity" placeholder="input placeholder" onChange={(e)=>{
                    setOrder({ ...order, Quantity: e.target.value });
                }}/>
              </Form.Item>
            </Col>
            <Col span={12} className="p-2">
              <Form.Item name="Weight" label="Cân nặng">
                <Input name="Weight"  placeholder="input placeholder" onChange={(e)=>{
                    setOrder({ ...order, Weight: e.target.value });
                }}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
