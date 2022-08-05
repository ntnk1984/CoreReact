import { PlusOutlined, SettingFilled } from "@ant-design/icons";
import { Button, Col, Collapse, Form, Input, InputNumber, Modal, Row, Select, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { contextValue } from "../App.js";
import LPackageLineItems from "./DetailOrder/LPackageLineItems.js";

import "./Style/CreatOrderThree.css";
const { Panel } = Collapse;
export default function CreateOrderThree({ handelSubmit }) {
  const context = useContext(contextValue);
  const { createOrder, dispatch } = context;
  //createOrder.spi
  const { listOrder } = context.createOrder;
  const arrData = listOrder?.RequestedPackageLineItems;
  const [OpenSpin, setOpenSpin] = useState(false);
  const [visibleThree, setVisibleThree] = useState(false);
  const addPackageLine = () => {
    document.getElementById("LPackageLineId").click();
  };
  //Tổng size
  // console.log(arrData);
  const [totalSize, setTotalSize] = useState({
    lengthTotal: 0,
    widthTotal: 0,
    heightTotal: 0,
    weightTotal: 0,
  });
  const [obj, setObj] = useState({
    currency: "USD",
    COD: 0,
    packagetype: 3,
    service: "Đ-D-V",
  });
  useEffect(() => {
    cloneListOrder();
    // console.log("1 lần");
  }, [arrData]);
  useEffect(() => {
    updateData();
  }, [obj]);
  const cloneListOrder = () => {
    let lengthTotal = 0;
    let widthTotal = 0;
    let heightTotal = 0;
    let weightTotal = 0;
    arrData.map((item, index) => {
      lengthTotal += item.dimension.length;
      widthTotal += item.dimension.width;
      heightTotal += item.dimension.height;
      weightTotal += item.dimension.weight;
    });
    setTotalSize({
      lengthTotal: lengthTotal,
      widthTotal: weightTotal,
      heightTotal: heightTotal,
      weightTotal: weightTotal,
    });
  };

  const updateData = () => {
    const cloneData = arrData;
    let termData = [];
    cloneData.map((item) => {
      termData.push({ ...item, ...obj });
    });
    context.dispatch({ type: "ADD_PACKAGE_LINE_ITEMS", payload: termData });

    console.log(termData);
  };

  return (
    <Spin spinning={OpenSpin}>
      <div className="creatOrderThree-Main">
        <Form
          labelWrap
          colon={false}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          className=" form-orderThree rounded rounded-3  p-3"
          style={{ background: "white" }}
        >
          <h4 style={{ textAlign: "center" }} className="text-secondary ">
            THÔNG TIN BƯU GỬI
          </h4>
          <Row>
            <Col span={20}>
              <Form.Item name="weight" label="Khối Lượng" className="mt-4 mb-2 ">
                <Input disabled placeholder={totalSize.weightTotal + " g"} />
              </Form.Item>
            </Col>
            <Col span={4}></Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={20}>
              <Form.Item name="service" label="Dịch vụ" className="mt-4 mb-2 ">
                <Select
                  defaultValue="MD"
                  onChange={(e) => {
                    setObj({ ...obj, service: e });
                  }}
                >
                  <Select.Option value="CPN">Chuyển Phát Nhanh</Select.Option>
                  <Select.Option value="MD">Mặc Định</Select.Option>
                  <Select.Option value="BĐ">Bưu Điện</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item
                style={{ textAlign: "center", alignItems: "center" }}
                name="settingIcon"
                className="mt-4 mb-2 "
              >
                <SettingFilled style={{ fontSize: "16px", cursor: "pointer" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={20}>
              <Form.Item name="packagetype" label="Loại" className="mt-4 mb-2 ">
                <Select
                  defaultValue="Đ-D-V"
                  onChange={(e) => {
                    setObj({ ...obj, packagetype: e });
                  }}
                >
                  <Select.Option value="Đ-T">Điện Tử</Select.Option>
                  <Select.Option value="Đ-D-V">Đồ Dễ Vỡ</Select.Option>
                  <Select.Option value="Đ-A">Đồ Ăn</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={4} style={{ textAlign: "center", alignItems: "center" }}>
              <Form.Item name="package" className="mt-4 mb-2 ">
                <PlusOutlined onClick={() => setVisibleThree(true)} style={{ fontSize: "16px", cursor: "pointer" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="customs-font" style={{ textAlign: "center" }} gutter={[4]}>
            <Col span={20}>
              <Form.Item className=" mt-4 mb-2 " name="size" label="Size Tổng (Mg)">
                <Row gutter={[4]}>
                  <Col span={7}>
                    <div className="sizeForm-div">
                      <Input disabled className="input-size" value={totalSize.lengthTotal} />
                      <label style={{ padding: "0 2px", fontSize: "12px" }}>Dài</label>
                    </div>
                  </Col>
                  <Col span={9}>
                    <div className="sizeForm-div">
                      <Input disabled className="input-size" value={totalSize.widthTotal} />
                      <label style={{ padding: "0 2px", fontSize: "13px" }}>Rộng</label>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="sizeForm-div">
                      <Input disabled className="input-size" value={totalSize.heightTotal} />
                      <label style={{ padding: "0 2px", fontSize: "12px" }}>Cao</label>
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
          <Row gutter={[16]}>
            <Col span={20}>
              <Form.Item name="COD" label="C.O.D" className="mt-4 mb-2  w-100">
                <InputNumber
                  onChange={(e) => {
                    setObj({ ...obj, COD: e });
                  }}
                  min="0"
                  className="w-100"
                  name="COD"
                  defaultValue={obj.COD}
                />
              </Form.Item>
            </Col>

            <Col span={4}></Col>
          </Row>
        </Form>
        <div className="btn-Submit"></div>
        <div className="modal-orderFour">
          <Modal
            // title="Biểu mẫu mặt hàng"
            style={{ top: 20 }}
            visible={visibleThree}
            onOk={() => {
              addPackageLine();
              setVisibleThree(false);
            }}
            onCancel={() => {
              addPackageLine();
              setVisibleThree(false);
            }}
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
                  addPackageLine();
                  setVisibleThree(false);
                }}
                type="primary"
              >
                Xác Nhận
              </Button>,
            ]}
          >
            <div className="totalOrderModal" style={{ minHeight: "200px" }}>
              <LPackageLineItems />
            </div>
          </Modal>
        </div>
      </div>
    </Spin>
  );
}