import { Badge, Button, Card, Checkbox, Col, Divider, Input, InputNumber, Radio, Row, Space, Popconfirm } from "antd";
import React, { useContext, useState } from "react";

import { RobotOutlined, PlusOutlined, CloseOutlined, CloseCircleFilled } from "@ant-design/icons";
import { contextValue } from "../../App";
import "../Style/Domestic.css";
import ZoneItems from "../ZoneItem";
function Domestic(props) {
  const context = useContext(contextValue);
  //WareHouse Type state
  const [valueWareHouseType, setValueWareHouseType] = useState(1);
  const onChangeWarehouseType = (e) => {
    setValueWareHouseType(e.target.value);
  };
  // End WHT

  //Product Type state
  const [valueProductType, setValueProductType] = useState([]);
  const onChange = (checkedValues) => {
    setValueProductType(checkedValues);
  };
  // console.log(valueProductType, "Value product");
  // console.log(valueProductType.includes("DV"));
  // End Prod type

  //area manager

  const [listZone, setListZone] = useState([]);
  const [idZone, setIdZone] = useState(1);
  const [itemZoneChecked, setItemZoneChecked] = useState();

  const classNameActive = itemZoneChecked?.idZone;
  console.log(classNameActive, " active");

  const addZone = () => {
    const tempData = { accepTable: [], zoneName: undefined, description: undefined };
    // const idZone = listZone.length + 1 || 1;
    setListZone([...listZone, { ...tempData, idZone }]);
    setIdZone(idZone + 1);
  };
  console.log(listZone, "line 39");
  const closeZone = (val) => {
    const id = val.idZone;
    let indx = listZone.findIndex((item) => item.idZone === id);
    const cloneListZone = [...listZone];
    cloneListZone.splice(indx, 1);
    const temp = cloneListZone.map((item, index) => ({ ...item, idZone: index + 1 }));
    console.log(temp, " temp");
    setListZone(temp);
    setIdZone(idZone - 1);
  };

  const editZoneItem = (val) => {
    console.log(val);
  };
  //end area manager
  return (
    <div style={{ height: "fit-content" }}>
      <Row gutter={[32, 32]}>
        <Col span={8}>
          <div
            className="option-warehouse"
            style={{ backgroundColor: "#FFFFFF", height: "fit-content", minHeight: "100%" }}
          >
            <div className="general-information" style={{ paddingTop: "10px" }}>
              <Divider style={{ marginTop: 0 }} orientation="left" orientationMargin={50}>
                Thông Tin chung
              </Divider>
              <div style={{ padding: "10px 20px 20px" }}>
                <InputNumber addonBefore="Diện Tích" addonAfter="m2" defaultValue={100} />
                <InputNumber addonBefore="Thể Tích" addonAfter="m3" defaultValue={100} />
                {/* <InputNumber addonBefore="Diện Tích" addonAfter="m2" defaultValue={100} /> */}
                <Input addonBefore="Vị Trí" />
              </div>
            </div>

            <div className="warehouse-type" style={{ paddingTop: "10px" }}>
              <Divider style={{ marginTop: 0 }} orientation="left" orientationMargin={50}>
                Loại kho
              </Divider>
              <div style={{ padding: "0px 20px 10px" }}>
                <Radio.Group onChange={onChangeWarehouseType} value={valueWareHouseType}>
                  <Space direction="vertical">
                    <Radio value={1}>Liên Tỉnh</Radio>

                    <Radio value={2}>
                      Nội Tỉnh
                      {valueWareHouseType === 2 ? (
                        <Input
                          size="small"
                          style={{
                            width: 100,
                            marginLeft: 10,
                          }}
                        />
                      ) : null}
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
            </div>

            <div className="product-type" style={{ paddingTop: "10px" }}>
              <Divider style={{ marginTop: 0 }} orientation="left" orientationMargin={50}>
                Loại hàng hóa
              </Divider>
              <div style={{ padding: "0px 20px 10px" }}>
                <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                  <Row>
                    <Col span={24} style={{ marginBottom: "5px" }}>
                      <Row>
                        <Col span={12}>
                          <Checkbox value="DV">Dễ vỡ</Checkbox>
                        </Col>
                        <Col span={12}>
                          {valueProductType.includes("DV") ? (
                            <Input
                              placeholder="Kích thước kho"
                              size="small"
                              style={{
                                width: "80%",
                                // marginLeft: 10,
                              }}
                              name="sizeDV"
                            />
                          ) : null}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} style={{ marginBottom: "5px" }}>
                      <Row>
                        <Col span={12}>
                          <Checkbox value="NH"> Nguy hiểm</Checkbox>
                        </Col>
                        <Col span={12}>
                          {valueProductType.includes("NH") ? (
                            <Input
                              placeholder="Kích thước kho"
                              size="small"
                              style={{
                                width: "80%",
                                // marginLeft: 10,
                              }}
                              name="sizeNH"
                            />
                          ) : null}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} style={{ marginBottom: "5px" }}>
                      <Row>
                        <Col span={12}>
                          <Checkbox value="BT"> Bình thường</Checkbox>
                        </Col>
                        <Col span={12}>
                          {valueProductType.includes("BT") ? (
                            <Input
                              placeholder="Kích thước kho"
                              size="small"
                              style={{
                                width: "80%",
                                // marginLeft: 10,
                              }}
                              name="sizeBT"
                            />
                          ) : null}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div style={{ backgroundColor: "#FFFFFF" }}>
            <div style={{ padding: "10px 20px 20px" }}>
              <Divider style={{ marginTop: 0 }} orientation="left" orientationMargin={50}>
                Quản lí khu
              </Divider>
              <div
                className="zone"
                style={{
                  display: "flex",
                  maxWidth: "100%",
                  overflowX: "auto",
                  padding: "20px 5px ",
                }}
              >
                <Space
                  // direction="vertical"
                  size="middle"
                >
                  {listZone.map((item, index) => {
                    return (
                      <Badge
                        key={index}
                        count={
                          <Popconfirm title="Bạn muốn xóa khu này?" onConfirm={() => closeZone(item)}>
                            <CloseCircleFilled style={{ color: "#FF6464", cursor: "pointer", fontSize: 32 }} />
                          </Popconfirm>
                        }
                      >
                        <Card
                          className={classNameActive === item.idZone ? "active" : ""}
                          style={{
                            textAlign: "center",
                            minWidth: "100%",
                            overflow: "initial",
                            width: "200px",
                            minHeight: "150px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setItemZoneChecked(item);
                          }}
                          title={`Kho số: ${item.idZone}`}
                          size="small"
                        >
                          <p>{item.zoneName || " kho tạm"}</p>
                        </Card>
                      </Badge>
                    );
                  })}
                  <div
                    onClick={addZone}
                    // className={a}
                    style={{
                      textAlign: "center",
                      width: "200px",
                      minHeight: "150px",
                      cursor: "pointer",
                      border: " 1px solid ",
                      color: "#7F8487",
                    }}
                  >
                    <div style={{ fontSize: "50px" }}>
                      <PlusOutlined />
                    </div>
                    <div>Thêm khu</div>
                  </div>
                </Space>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", marginTop: "20px", padding: "10px 20px 20px" }}>
            <ZoneItems itemZoneChecked={itemZoneChecked} editZoneItem={editZoneItem} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Domestic;
