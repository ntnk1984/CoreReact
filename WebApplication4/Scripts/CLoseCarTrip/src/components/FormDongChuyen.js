import { AuditOutlined, CarOutlined, ContainerFilled } from "@ant-design/icons";
import { Avatar, Col, Divider, List, Row, Tabs, Select, Button, Form, DatePicker, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import dataJson from "../assets/Mau.json";
import "./Style/FromDongChuyen.css";
import TableOrderList from "./TableOrderList";
import { getDetailImExport } from "../Service";
const { TabPane } = Tabs;

function FormDongChuyen({ selectedData }) {
  const [data, setData] = useState(selectedData);
  const [routeCar, setRouteCar] = useState(dataJson);
  const [routeID, setRouteID] = useState();
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [valueTrip, setValueTrip] = useState();
  const [valueTripValidate, setValueTripValidate] = useState();

  const [listOrder, setListOrder] = useState([]);
  const [size, setSize] = useState({ WEIGHT: "", COD: "", QUANTITY: "" });

  const getListOrderByID = async () => {
    setListOrder([]);
    selectedData.map(async (item) => {
      let ID = item.ID;
      const res = await getDetailImExport({ ID });
      setListOrder((prev) => [...prev, ...res]);
    });
  };

  useEffect(() => {
    setData(selectedData);
    getListOrderByID();
    console.log("12");
    // totalSize();
  }, [selectedData]);

  const chonChuyenXe = () => {
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Chuyến xe đã có"
        defaultValue={routeID}
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
        onChange={(e) => {
          setRouteID(e);
        }}
      >
        {routeCar.map((item, index) => {
          let name = `Tài xế: ${item.PRIVERINFO.NAME} - BSX: ${item.VEHICLENO} - Trọng tải:  ${item.TONNAGE} - Tuyến: ${item.ROUTE} `;
          let value = `${item.ROUTE}  `;
          return (
            <Select.Option key={index} value={value}>
              {name}
            </Select.Option>
          );
        })}
      </Select>
    );
  };
  const createNewTrip = () => {
    return (
      <div>
        <Form
          labelWrap
          labelAlign="left"
          colon={false}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
        >
          <Row gutter={[16]}>
            <Col span={11}>
              <Form.Item name="VEHICLENO" label="Biển số ">
                <Input placeholder="Biển số xe" />
              </Form.Item>

              <Form.Item name="VEHICLETYPE" label="Loại xe">
                <Input placeholder="Loại xe" />
              </Form.Item>

              <Form.Item name="TONNAGE" label="Trọng tải">
                <InputNumber min={0} placeholder="Trọng tải" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name="TIMESTART" label="Phát hành">
                <DatePicker showTime showToday style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name="STATUS" label="Trạng thái">
                <Select placeholder="Chọn trạng thái">
                  <Select.Option value="SanSang">Sẳn Sàng</Select.Option>
                  <Select.Option value="TroVe">Đang trờ về</Select.Option>
                  <Select.Option value="Trong">Trống</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="FIRSTPOINT" label="Điểm đầu">
                <Select placeholder="Điểm đầu">
                  <Select.Option value="HCM">HCM</Select.Option>
                  <Select.Option value="HN">HN</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <Divider type="vertical" style={{ height: "100%" }} />
            </Col>
            <Col span={11}>
              <Form.Item name="ENDPOINT" label="Điểm cuối">
                <Select placeholder="Điểm cuối">
                  <Select.Option value="HN">HN</Select.Option>
                  <Select.Option value="HCM">HCM</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="ROUTE" label="Tuyến">
                <Input placeholder="Tuyến đường đi" />
              </Form.Item>

              <Form.Item name="ID" label="Id tài xế">
                <Input placeholder="Tài xế" />
              </Form.Item>
              <Form.Item name="CODE" label="CMND">
                <Input placeholder="Cmnd / cccd" />
              </Form.Item>
              <Form.Item name="NAME" label="Tài xế">
                <Input placeholder="Tên tài xế" />
              </Form.Item>
              <Form.Item name="NAME" style={{ textAlign: "end", alignItems: "end" }}>
                <Button type="primary">Tạo Chuyến</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
  return (
    <div className="FormCLoseCarTripModal">
      <Row gutter={[16, 24]}>
        <Col span={8}>
          <Divider orientation="left">Danh sách phiếu</Divider>
          <List
            itemLayout="horizontal"
            style={{ height: "400px", overflow: "auto" }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#f7ce4d",
                        verticalAlign: "middle",
                      }}
                      icon={<ContainerFilled />}
                    />
                  }
                  title={<span>{item.CODE}</span>}
                  description={
                    <span style={{ fontSize: "12px" }}>
                      KHO: {item.IMPORT_TO} &nbsp; &nbsp; Tên Phiếu: {item.NAME}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={1}>
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col span={15}>
          <Tabs defaultActiveKey="2">
            <TabPane
              tab={
                <span>
                  <AuditOutlined />
                  Chi tiết
                </span>
              }
              key="1"
            >
              <div>
                <Divider orientation="left">Thông tin tất cả đơn hàng trong phiếu</Divider>
                <div className="infoOrder">
                  <Row gutter={[16]}>
                    <Col span={8}>
                      <Input addonBefore="Số lượng" value={listOrder.length} />
                    </Col>
                    <Col span={8}>
                      <Input addonBefore="Khối lượng" value={listOrder.reduce((a, { WEIGHT }) => a + WEIGHT, 0)} />
                    </Col>
                    <Col span={8}>
                      <Input addonBefore="COD" value={listOrder.reduce((a, { COD }) => a + COD, 0)} />
                    </Col>
                    <Col span={24}>
                      <TableOrderList detailList={listOrder} />
                    </Col>
                  </Row>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CarOutlined />
                  Chuyến xe
                </span>
              }
              key="2"
            >
              {showNewTrip ? (
                <div>
                  <Row style={{ alignItems: "center" }}>
                    <Col span={18}>
                      <Divider orientation="left">Tạo chuyến xe mới</Divider>
                    </Col>
                    <Col span={6}>
                      <Button type="link" onClick={() => setShowNewTrip(false)}>
                        Chuyến xe đã có
                      </Button>
                    </Col>
                  </Row>
                  <div className="TaoChuyenMoi">{createNewTrip()}</div>
                </div>
              ) : (
                <div>
                  <Row style={{ alignItems: "center" }}>
                    <Col span={18}>
                      <Divider orientation="left">Chuyến xe có sẳn</Divider>
                    </Col>
                    <Col span={6}>
                      <Button type="link" onClick={() => setShowNewTrip(true)}>
                        Tạo chuyến mới
                      </Button>
                    </Col>
                  </Row>

                  {chonChuyenXe()}
                </div>
              )}
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default FormDongChuyen;
