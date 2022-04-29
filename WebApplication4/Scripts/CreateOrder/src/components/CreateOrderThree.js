import { PlusOutlined, SettingFilled } from "@ant-design/icons";
import { Button, Col, Collapse, Form, Input, InputNumber, Modal, Row, Select, Spin } from "antd";
import React, { useContext, useState } from "react";
import { contextValue } from "../App.js";
import TotalOrder from "./DetailOrder/TotalOrder.js";

const { Panel } = Collapse;

export default function CreateOrderThree({ handelSubmit }) {
  const context = useContext(contextValue);
  const { createOrder, dispatch } = context;

  //createOrder.spi

  const { listOrder, visibility, sender, receiver, total } = context.createOrder;
  // const { sendername, senderphone, senderaddress } = sender;
  // const { receivername, receiverphone, receiveraddress } = receiver;
  // const { long, width, height, weight, money, unit, type } = total;

  const [OpenSpin, setOpenSpin] = useState(false);
  const [visibleThree, setVisibleThree] = useState(false);
  return (
    <Spin spinning={OpenSpin}>
      <Form
        labelWrap
        colon={false}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        className=" rounded rounded-3 shadow-sm p-3"
        style={{ background: "white" }}
      >
        <h4 style={{ textAlign: "center" }} className="text-secondary ">
          THÔNG TIN BƯU GỬI
        </h4>
        <Row>
          <Col span={20}>
            <Form.Item name="weight" label="Khối Lượng" className="mt-4 mb-2 ">
              <Input disabled defaultValue={1} />
            </Form.Item>
          </Col>
          <Col span={4}></Col>
        </Row>

        <Row gutter={[16]}>
          <Col span={20}>
            <Form.Item name="service" label="Dịch vụ" className="mt-4 mb-2 ">
              <Select defaultValue="MD">
                <Select.Option value="CPN">Chuyển Phát Nhanh</Select.Option>
                <Select.Option value="MD">Mặc Định</Select.Option>
                <Select.Option value="BD">Bưu Điện</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item style={{ textAlign: "center", alignItems: "center" }} name="package" className="mt-4 mb-2 ">
              <SettingFilled style={{ fontSize: "16px", cursor: "pointer" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16]}>
          <Col span={20}>
            <Form.Item name="package" label="Bưu Kiện" className="mt-4 mb-2 ">
              <Select defaultValue="MD">
                <Select.Option value="CPN">Chuyển Phát Nhanh</Select.Option>
                <Select.Option value="MD">Mặc Định</Select.Option>
                <Select.Option value="BD">Bưu Điện</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={4} style={{ textAlign: "center", alignItems: "center" }}>
            <Form.Item name="package" className="mt-4 mb-2 ">
              <PlusOutlined onClick={() => setVisibleThree(true)} style={{ fontSize: "16px", cursor: "pointer" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ textAlign: "center" }} gutter={[4]}>
          <Col span={20}>
            <Form.Item name="size" label="Size" className="mt-4 mb-2 ">
              <Row gutter={[4]}>
                <Col span={8}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <InputNumber defaultValue={0} style={{ width: "50px" }} />
                    <label style={{ padding: "0 2px" }}>Dài</label>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <InputNumber defaultValue={0} style={{ width: "50px" }} />
                    <label style={{ padding: "0 2px" }}>Rộng</label>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <InputNumber defaultValue={0} style={{ width: "50px" }} />
                    <label style={{ padding: "0 2px" }}>Cao</label>
                  </div>
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col span={3}></Col>
        </Row>

        <Row gutter={[16]}>
          <Col span={20}>
            <Form.Item name="confirmation" label="Xác Nhận" className="mt-4 mb-2 ">
              <Select defaultValue="online">
                <Select.Option value="online">Trực Tuyến</Select.Option>
                <Select.Option value="offline">Tại bưu cục</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={4}></Col>
        </Row>
        <Row gutter={[16]}>
          <Col span={20}>
            <Form.Item name="insurance" label="Bảo Hiểm" className="mt-4 mb-2 ">
              <Select defaultValue="none">
                <Select.Option value="none">Không Có</Select.Option>
                <Select.Option value="every">Rơi vỡ - Thất Lạc</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={4}></Col>
        </Row>
        {/* <Form.Item className="mt-4 mb-2 ">
          <Button
            size="middle"
            className="mx-2"
            onClick={() => {
              dispatch({ type: "ADD_BUU_GUI" });
            }}
          >
            Tạo đơn bưu gửi
          </Button>
        </Form.Item> */}
      </Form>
      <div className="modal-orderFour">
        <Modal
          title="Biểu mẫu mặt hàng"
          style={{ top: 20 }}
          visible={visibleThree}
          // onOk={() => setVisibleThree(false)}
          // onCancel={() => setVisibleThree(false)}
          width={800}
          footer={[
            <Button
              onClick={() => {
                setVisibleThree(false);
              }}
              type="default"
            >
              Thoát
            </Button>,
            <Button
              onClick={() => {
                setVisibleThree(false);
              }}
              type="primary"
            >
              Xác Nhận
            </Button>,
          ]}
        >
          <div className="totalOrderModal">
            <TotalOrder />
          </div>
        </Modal>
      </div>
    </Spin>
  );
}
{
  /* <>
  //Submit Form
  <Button size="middle" type="primary" onClick={handelSubmit}>
    Hoàn tất
  </Button>

  <Button
    style={{ display: "none" }}
    id="FormThree"
    size="middle"
    type="primary"
    onClick={() => {
      setOpenSpin(true);

      postOrder(createOrder)
        .then((data) => {
          message.success("Thành công!");
          setOpenSpin(false);
        })
        .catch((err) => {
          message.error("Thất bại!");
          setOpenSpin(false);
        });
    }}
  >
    Hoàn tất
  </Button>
</>; */
}
