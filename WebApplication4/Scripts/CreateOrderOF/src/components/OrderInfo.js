import { PlusOutlined, SettingFilled } from "@ant-design/icons";
import { Button, Checkbox, Col, Collapse, Form, Input, InputNumber, Modal, Row, Select, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { contextValue } from "../App.js";
import { getDataLocationPost, getExtraService, getMerchandiseType } from "../Service.js";
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
  const [totalSize, setTotalSize] = useState({
    lengthTotal: 0,
    widthTotal: 0,
    heightTotal: 0,
    weightTotal: 0,
  });
  const [obj, setObj] = useState({
    currency: "USD",
    COD: 0,
    packagetype: "",
    service: "",
  });
  const [dropoffType, setDropoffType] = useState({
    type: "1",
    detail: {
      location: "",
    },
  });
  useEffect(() => {
    cloneListOrder();
  }, [arrData]);
  useEffect(() => {
    updateData();
  }, [obj]);
  useEffect(() => {
    context.dispatch({ type: "ADD_DROPOFFTYPE", payload: dropoffType });
  }, [dropoffType]);

  const [merchanDiseTypeID, setMerchanDiseTypeID] = useState([])
  const [extraServiceID, setExtraServiceID] = useState([])

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

  useEffect(async()=>{
    const res= await getMerchandiseType();
    setMerchanDiseTypeID(res.responses)
  },[])
  useEffect(async()=>{
    const res= await getExtraService();
    
    setExtraServiceID(res)
  },[])

  const updateData = () => {
    const cloneData = arrData;
    let termData = [];
    cloneData.map((item) => {
      termData.push({ ...item, ...obj });
    });
    context.dispatch({ type: "ADD_PACKAGE_LINE_ITEMS", payload: termData });
  };

  const [receive, setReceive] = useState("1");
  const [getLocationApi, setGetLocationApi] = useState([]);

  const showSelect = () => {
    setReceive("0");
  };
  const handleShowSelectLocation = async (e) => {
    if (e === "0") {
      setDropoffType({ ...dropoffType, type: "0" });
      const dataLocation = await getDataLocationPost(showSelect);
      setGetLocationApi(dataLocation);
    } else {
      setReceive("1");
    }
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
            Thông tin đơn hàng
          </h4>
          <Row>
            <Col span={20}>
              <Form.Item name="weight" label="Khối Lượng" className="pt-3 mb-2 ">
                <Input disabled placeholder={totalSize.weightTotal + " g"} />
              </Form.Item>
            </Col>
            <Col span={4}></Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={20}>
              <Form.Item name="service" label="Dịch vụ" className="pt-3 mb-2 ">
                <Select
                  placeholder="Chọn loại dịch vụ"
                  onChange={(e) => {
                    setObj({ ...obj, service: e });         
                  }}
                >
                 {extraServiceID?.map((item, index) => {
                  return (
                    <Select.Option key={item.ID}>
                      {item.NAME}
                    </Select.Option>
                  );
                })} 
                </Select>
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item
                style={{ textAlign: "center", alignItems: "center" }}
                name="settingIcon"
                className="pt-3 mb-2 "
              >
                <SettingFilled style={{ fontSize: "16px", cursor: "pointer" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={20}>
              <Form.Item name="packagetype" label="Loại" className="pt-3 mb-2 ">
                <Select
                  placeholder="Chọn loại hàng hóa"
                  onChange={(e) => {
                    setObj({ ...obj, packagetype: e });
                  }}
                >
                  {merchanDiseTypeID?.map((item, index) => {
                  return (
                    <Select.Option key={item.id}>
                      {item.description}
                    </Select.Option>
                  );
                })} 

                </Select>
              </Form.Item>
            </Col>

            <Col span={4} style={{ textAlign: "center", alignItems: "center" }}>
              <Form.Item name="package" className="pt-3 mb-2 ">
                <PlusOutlined onClick={() => setVisibleThree(true)} style={{ fontSize: "16px", cursor: "pointer" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="customs-font" style={{ textAlign: "center" }} gutter={[4]}>
            <Col span={20}>
              <Form.Item className=" pt-3 mb-2 " name="size" label="Size Tổng (Mg)">
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
              <Form.Item name="insurance" label="Bảo Hiểm" className="pt-3 mb-2 ">
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
              <Form.Item name="COD" label="C.O.D" className="pt-3 mb-2  w-100">
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
          <Row gutter={[16]}>
            <Col span={20}>
              <Form.Item name="confirmation" label="Thu gom" className="pt-3 mb-2 ">
                <Select
                  onChange={(e) => {
                    handleShowSelectLocation(e);
                  }}
                  defaultValue="1"
                >
                  <Select.Option value="1">Tại Nhà</Select.Option>
                  <Select.Option value="0">Tại bưu cục</Select.Option>
                </Select>
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
