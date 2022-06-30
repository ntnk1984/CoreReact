import { Badge, Card, Carousel, Col, Divider, message, Popconfirm, Row, Space, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";

import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { contextValue } from "../../App";
import "../Style/Domestic.css";
import ZoneItems from "../ZoneItem";
import { getAreaList, getOrderShippingListApi, updateAreaList } from "../../utils/Service";

function Domestic(props) {
  const [listZone, setListZone] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [idZone, setIdZone] = useState(1);
  const [itemZoneChecked, setItemZoneChecked] = useState();
  const [orderMapKey, setOrderMapKey] = useState([]);
  const [loading, setLoading] = useState(false);

  const CLASSNAMEACTIVE = itemZoneChecked?.ID || itemZoneChecked;
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
  async function getArea() {
    setLoading(true);
    const res = await getAreaList();
    if (res) {
      setListZone(res);
      setLoading(false);
    }

    console.log(res, "lisszone");
  }
  async function getListOrderShipping() {
    const res = await getOrderShippingListApi();
    setListOrder(res);
  }
  useEffect(() => {
    getArea();
    getListOrderShipping();
  }, []);

  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  const mapKeyGroup = () => {
    const order = groupBy(listOrder, "WAREHOUSEAREA");
    const area = groupBy(listZone, "CODE");

    Object.keys(area).forEach((k) => (area[k] = []));
    Object.keys(order).forEach((k) => (area[k] ? (area[k] = order[k]) : (area[k] = order[k])));
    setOrderMapKey(area);
  };
  useEffect(() => {
    mapKeyGroup();
  }, [listOrder, listZone]);
  //area manager

  const addZone = () => {
    const tempData = { accepTable: [], zoneName: undefined, description: undefined };
    // const idZone = listZone.length + 1 || 1;
    setListZone([...listZone, { ...tempData, idZone }]);
    setIdZone(idZone + 1);
  };

  // const closeZone = (val) => {
  //   const id = val.idZone;
  //   let indx = listZone.findIndex((item) => item.idZone === id);
  //   const cloneListZone = [...listZone];
  //   cloneListZone.splice(indx, 1);
  //   const temp = cloneListZone.map((item, index) => ({ ...item, idZone: index + 1 }));
  //   console.log(temp, " temp");
  //   setListZone(temp);
  //   setIdZone(idZone - 1);
  // };

  const closeDetail = (val) => {
    setItemZoneChecked();
  };
  const succF = () => message.success("Cập nhật thành công");
  const failF = () => message.error("Cập nhật thất bại");
  const editZoneItem = (val) => {
    updateAreaList(val, succF, failF);
  };
  //end area manager
  return (
    <div style={{ height: "fit-content" }}>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px" }}>
            <div style={{ padding: "10px 20px 20px" }}>
              <Divider style={{ marginTop: 0, fontSize: "24px" }} orientation="left" orientationMargin={50}>
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
                      // <Badge
                      //   key={index}
                      //   count={
                      //     <Popconfirm title="Bạn muốn xóa khu này?" onConfirm={() => closeZone(item)}>
                      //       <CloseCircleFilled style={{ color: "#FF6464", cursor: "pointer", fontSize: 32 }} />
                      //     </Popconfirm>
                      //   }
                      // >
                      <Card
                        key={index}
                        className={CLASSNAMEACTIVE === item.ID ? "active" : "un-active"}
                        style={{
                          borderRadius: "5px",
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
                        title={`Mã : ${item.CODE}`}
                        size="small"
                      >
                        <p>{item.NAME || " kho tạm"}</p>
                        <p>Số lượng: {orderMapKey[item.CODE]?.length || 0}</p>
                      </Card>
                      // </Badge>
                    );
                  })}

                  <Card
                    className={CLASSNAMEACTIVE === "null" ? "active" : "un-active"}
                    style={{
                      borderRadius: "5px",
                      textAlign: "center",
                      minWidth: "100%",
                      overflow: "initial",
                      width: "200px",

                      minHeight: "150px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setItemZoneChecked("null");
                    }}
                    title={`Mã : WH01A00`}
                    size="small"
                  >
                    <p> Chưa chia khu</p>
                    <p>Số lượng: {orderMapKey["null"]?.length || 0}</p>
                  </Card>

                  <div>
                    {loading ? (
                      <div className="example">
                        <Spin />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* <div
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
                  </div> */}
                </Space>
              </div>
            </div>
          </div>
          <div className="un-active">
            {itemZoneChecked ? (
              <div style={{ backgroundColor: "#FFFFFF", marginTop: "20px", padding: "10px 20px 20px" }}>
                <ZoneItems
                  closeDetail={closeDetail}
                  orderMapKey={orderMapKey}
                  itemZoneChecked={itemZoneChecked}
                  editZoneItem={editZoneItem}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Domestic;
