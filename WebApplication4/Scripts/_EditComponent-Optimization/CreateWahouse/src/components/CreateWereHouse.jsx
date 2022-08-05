import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, Divider, Modal, Row, Spin, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import "../Style/CreateWH.css";
import CreateNewWareHouse from "./Modal/ModalWH";
import CreateNewArea from "./Modal/ModalArea";
import CreateNewBin from "./Modal/ModalBin";
import TabbleOrder from "./TableComp/TabbleOrder";
import CreateNewBox from "./Modal/ModalO";
import { getWarehouseApi } from "../Service";
import ModalEdit from "./Modal/ModalEdit";

const gridStyle = {
  width: "20%",
  textAlign: "center",
};
const FormatNumber = "en-US";
const onTop = () => {
  window.scroll({
    top: 0,
    left: 0,
  });
};
function CreateWereHouse({ allCity, warehouseAttribute, merchandiseAttribute }) {
  //Slider

  const sliderRef = useRef(null);
  const PrevBtn = () => {
    sliderRef.current.slickPrev();
    onTop();
  };
  const NextBtn = () => {
    sliderRef.current.slickNext();
    onTop();
  };
  // const homeBtn = () => {
  //   sliderRef.current.slickGoTo(0);
  // };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: false,
    adaptiveHeight: true,
  };
  //End lider
  const [loading, setLoading] = useState(false);
  const [visibleWH, setVisibleWH] = useState(false);
  const [visibleArea, setVisibleArea] = useState(false);
  const [visibleBin, setVisibleBin] = useState(false);
  const [visibleBox, setVisibleBox] = useState(false);

  const [visibleEdit, setVisibleEdit] = useState(false);
  const [propertiesWH, setPropertiesWH] = useState([]);
  const [propertiesArea, setPropertiesArea] = useState();
  const [listWH, setListWH] = useState([]);
  const [listWHByCity, setListWHByCity] = useState();

  const handleSwitchCaseByApi = (CODE) => {
    let Name = CODE;
    allCity?.filter((item) => {
      if (item?.CODE === CODE) {
        return (Name = item?.NAME);
      }
    });
    return Name;
  };

  useEffect(() => {
    setPropertiesWH(warehouseAttribute);
    setPropertiesArea(merchandiseAttribute);
  }, []);
  const mapPropertyCodeByName = (key, data) => {
    if (!data) return;
    let Name = [];
    data.forEach((item) => {
      propertiesArea[key].filter((x) => {
        if (x?.CODE === item) {
          return Name.push(x?.NAME);
        }
      });
    });
    return Name.map((x) => ` ${x},`);
  };
  // Get List WH

  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  const mapListByKey = (data) => {
    let temp = groupBy(data, "CITYCODE");
    let temp2 = Object.entries(temp)
      .sort(([, a], [, b]) => b.length - a.length)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    setListWHByCity(temp2);
  };
  const setStateWarehouses = (data) => {
    setListWH(data);
    mapListByKey(data);
  };
  async function getWarehouseList() {
    setLoading(true);
    let res = await getWarehouseApi();
    if (res) {
      setLoading(false);
      setStateWarehouses(res);
    }
  }
  async function reloadData() {
    // setLoading(true);
    let res = await getWarehouseApi();
    if (res) {
      setListWH(res);
      mapListByKey(res);
    }
  }
  useEffect(() => {
    getWarehouseList();
    console.log("Connect Data");
  }, []);
  // End Get List WH
  const [activeWHNewArea, setActiveWHNewArea] = useState();
  const [activeAreaNewBin, setActiveAreaNewBin] = useState();
  const [activeBinNewBox, setActiveBinNewBox] = useState();
  const [activeBox, setActiveBox] = useState();

  const [dataEdit, setDataEdit] = useState();

  useEffect(() => {
    if (activeWHNewArea) {
      const idx = listWH.findIndex((x) => x.WAREHOUSECODE === activeWHNewArea.WAREHOUSECODE);
      listWH.splice(idx, 1, activeWHNewArea);
      setStateWarehouses([...listWH]);
    }
  }, [activeWHNewArea]);

  const handleListArea = (data) => {
    const ind = listWH.findIndex((x) => x.WAREHOUSECODE === data.idWh);
    if (ind >= 0) {
      let temp = listWH[ind];
      let temp2 = {
        ...temp,
        LOADED: temp.LOADED + data.volume,
        LISTAREA: [...temp.LISTAREA, { ...data.areaInfo, LOADED: 0, LISTBIN: [] }],
      };
      listWH.splice(ind, 1, temp2);
      setActiveWHNewArea(temp2);
      setStateWarehouses([...listWH]);
    }
  };
  const handleListBin = (data) => {
    let temp;
    if (data.idArea === activeAreaNewBin.CODE) {
      let temp1 = { ...data.binInfo, LOADED: 0, LISTBOX: [] };
      activeAreaNewBin.LISTBIN.push(temp1);
      temp = { ...activeAreaNewBin, LOADED: activeAreaNewBin.LOADED + data.volume };
      setActiveAreaNewBin(temp);
      //set Area to WH
      const indx = activeWHNewArea.LISTAREA.findIndex((x) => x.CODE === activeAreaNewBin.CODE);
      activeWHNewArea.LISTAREA.splice(indx, 1, temp);
      setActiveWHNewArea({ ...activeWHNewArea });
    }
  };

  const handleListBox = (data) => {
    let temp;

    if (data.idBin === activeBinNewBox.CODE) {
      let temp1 = { ...data.boxInfo, LOADED: 0 };
      activeBinNewBox.LISTBOX.push(temp1);
      temp = { ...activeBinNewBox, LOADED: activeBinNewBox.LOADED + data.volume };
      setActiveBinNewBox(temp);

      /// PUSH AREA
      const indArea = activeAreaNewBin.LISTBIN.findIndex((x) => x.CODE === temp.CODE);
      activeAreaNewBin.LISTBIN.splice(indArea, 1, temp);
      setActiveAreaNewBin({ ...activeAreaNewBin });
    }
  };
  const updateRecord = (length, code, data) => {
    //Length = 1 => editWarehouse, length = 2 => editArea,
    //length = 3 => editBin, length = 4 => editBox
    let idxWH = null;
    let idxArea = null;
    let idxBin = null;
    let idxBox = null;
    switch (length) {
      case 1:
        idxWH = listWH.findIndex((x) => x.WAREHOUSECODE === code[0]);
        let LISTAREA = listWH[idxWH].LISTAREA;
        listWH.splice(idxWH, 1, { ...data, LISTAREA });
        setStateWarehouses(listWH);
        setDataEdit();
        break;
      case 2:
        idxWH = listWH.findIndex((x) => x.WAREHOUSECODE === code[0]);
        idxArea = listWH[idxWH].LISTAREA.findIndex((x) => x.CODE === data.CODE);
        let LISTBIN = listWH[idxWH].LISTAREA[idxArea].LISTBIN;
        listWH[idxWH].LISTAREA[idxArea] = { ...data, LISTBIN };
        setStateWarehouses(listWH);
        setActiveWHNewArea(listWH[idxWH]);
        setDataEdit();
        break;
      case 3:
        idxWH = listWH.findIndex((x) => x.WAREHOUSECODE === code[0]);
        idxArea = listWH[idxWH].LISTAREA.findIndex((x) => x.CODE === code[0] + "_" + code[1]);
        idxBin = listWH[idxWH].LISTAREA[idxArea].LISTBIN.findIndex(
          (x) => x.CODE === code[0] + "_" + code[1] + "_" + code[2]
        );
        let LISTBOX = listWH[idxWH].LISTAREA[idxArea].LISTBIN[idxBin].LISTBOX;
        listWH[idxWH].LISTAREA[idxArea].LISTBIN[idxBin] = { ...data, LISTBOX };
        setStateWarehouses(listWH);
        setActiveAreaNewBin(listWH[idxWH].LISTAREA[idxArea]);
        setDataEdit();
        break;
      case 4:
        idxWH = listWH.findIndex((x) => x.WAREHOUSECODE === code[0]);
        idxArea = listWH[idxWH].LISTAREA.findIndex((x) => x.CODE === code[0] + "_" + code[1]);
        idxBin = listWH[idxWH].LISTAREA[idxArea].LISTBIN.findIndex(
          (x) => x.CODE === code[0] + "_" + code[1] + "_" + code[2]
        );
        idxBox = listWH[idxWH].LISTAREA[idxArea].LISTBIN[idxBin].LISTBOX.findIndex(
          (x) => x.CODE === code[0] + "_" + code[1] + "_" + code[2] + "_" + code[3]
        );
        listWH[idxWH].LISTAREA[idxArea].LISTBIN[idxBin].LISTBOX[idxBox] = data;
        setStateWarehouses(listWH);
        setActiveBinNewBox(listWH[idxWH].LISTAREA[idxArea].LISTBIN[idxBin]);
        setDataEdit();
        break;
      default:
        break;
    }
  };

  //function  handle
  const volumetricFunc = (item) => {
    if (item) {
      return +(item.HEIGHT * item.WIDTH * item.LENGTH).toFixed();
    }
  };
  const retunNumber = (arr) => {
    let num = (arr.length + 1).toString();
    if (num.length === 1) {
      return 0 + num;
    } else {
      return num;
    }
  };
  function makeid(rootArr, childArr, keyWord) {
    if (rootArr.CODE) {
      let temp = rootArr.CODE;
      return temp + "_" + keyWord + retunNumber(childArr);
    }
    if (rootArr.WAREHOUSECODE) {
      let temp = rootArr.WAREHOUSECODE;
      return temp + "_" + keyWord + retunNumber(childArr);
    }

    // var result = "";
    // var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    // var charactersLength = characters.length;
    // for (var i = 0; i < length; i++) {
    //   result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // }
    // return result;
  }

  const handleDataCreateNewWH = (data) => {
    let temp = [{ ...data }];
    let temp2 = listWH.concat(temp);
    setListWH([...temp2]);
  };
  const createArea = (value) => {
    setActiveWHNewArea(value);
    NextBtn();
  };
  const createBin = (value) => {
    setActiveAreaNewBin(value);
    NextBtn();
  };
  const createBox = (value) => {
    setActiveBinNewBox(value);
    NextBtn();
  };
  const showOrderListBox = (value) => {
    setActiveBox(value);
    NextBtn();
  };
  //end function
  const defaultTitle = (item, text = "Mã: ", onClicks) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
      <span style={{ cursor: "pointer", color: "#17A2B8" }}>
        <Tooltip title="Chỉnh sửa" color={"#17A2B8"}>
          <EditOutlined
            onClick={() => {
              setDataEdit(item);
              setVisibleEdit(true);
            }}
          />
        </Tooltip>
      </span>
      <span
        onClick={() => {
          onClicks(item);
        }}
        style={{ cursor: "pointer" }}
      >
        {text + (item?.WAREHOUSECODE || item?.CODE)}
      </span>
      <span style={{ cursor: "pointer", color: "red" }}>
        <Tooltip title="Xóa" color={"red"}>
          <CloseOutlined />
        </Tooltip>
      </span>
    </div>
  );
  return (
    <div style={{ height: "fit-content" }}>
      <div className="slider" style={{ width: "100%", overflow: "hidden" }}>
        {loading ? (
          <div
            className="example"
            style={{
              width: "100%",
              textAlign: "center",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Spin />
          </div>
        ) : (
          <Slider ref={sliderRef} {...settings} style={{ textAlign: "center" }}>
            {/* Tạo Kho */}
            <div style={{ minHeight: "100vh" }}>
              <div style={{ backgroundColor: "#DFDFDE" }}>
                <Modal
                  style={{
                    top: 20,
                  }}
                  title="Chỉnh sửa"
                  footer={false}
                  visible={visibleEdit}
                  closable={false}
                  // onOk={() => setVisibleEdit(false)}
                  // onCancel={() => setVisibleEdit(false)}
                  width={"50vw"}
                >
                  <ModalEdit
                    onReLoad={reloadData}
                    updateRecord={updateRecord}
                    volumetricFunc={volumetricFunc}
                    onCancelModal={() => setVisibleEdit(false)}
                    propertiesArea={propertiesArea}
                    propertiesWH={propertiesWH}
                    dataEdit={dataEdit}
                  />
                </Modal>
                <Row>
                  <Col span={20}>
                    <Divider orientation="left" orientationMargin={50}>
                      <Breadcrumb>
                        <Breadcrumb.Item>Quản lí kho</Breadcrumb.Item>
                      </Breadcrumb>
                    </Divider>
                  </Col>
                  <Col span={4}>
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        height: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Button onClick={() => setVisibleWH(true)}>Tạo Kho</Button>
                      <Modal
                        style={{
                          top: 20,
                        }}
                        title="Tạo Kho"
                        // centered
                        footer={false}
                        visible={visibleWH}
                        onOk={() => setVisibleWH(false)}
                        onCancel={() => setVisibleWH(false)}
                        width={"50vw"}
                      >
                        <CreateNewWareHouse
                          handleDataCreateNewWH={handleDataCreateNewWH}
                          getWarehouseList={getWarehouseList}
                          onCancelModal={() => {
                            setVisibleWH(false);
                          }}
                          propertiesWH={propertiesWH}
                        />
                      </Modal>
                    </div>
                  </Col>
                </Row>

                {!!listWHByCity &&
                  Object.keys(listWHByCity).map((key, index1) => {
                    return (
                      <Card
                        bordered
                        style={{ textAlign: "left", margin: "20px 0" }}
                        key={index1}
                        title={
                          <Divider orientation="left">
                            {"Mã Tỉnh: " + key + " ( " + handleSwitchCaseByApi(key) + " ) "}
                          </Divider>
                        }
                      >
                        {listWHByCity[key].map((item, index2) => {
                          return (
                            <Card.Grid key={index2} style={gridStyle}>
                              <Tooltip
                                title={() => (
                                  <Row>
                                    <Col span={8}>Địa Chỉ:</Col>
                                    <Col span={16}>
                                      <p> {item.LOCATION}</p>
                                    </Col>
                                    <Col span={8}>Thể tích:</Col>
                                    <Col span={16}>
                                      <p>
                                        {item.CAPACITY?.toLocaleString(FormatNumber) ||
                                          volumetricFunc(item).toLocaleString(FormatNumber)}
                                        cm&sup3;
                                      </p>
                                    </Col>
                                  </Row>
                                )}
                              >
                                <Card
                                  className="create-new-WH"
                                  title={defaultTitle(item, "Mã Kho: ", createArea)}
                                  size="small"
                                >
                                  <div
                                    onClick={() => {
                                      createArea(item);
                                    }}
                                    style={{ fontSize: "14px", cursor: "pointer" }}
                                  >
                                    <Row gutter={[14, 12]} style={{ textAlign: "left", padding: "0 20px" }}>
                                      <Col span={8}>Kho:</Col>
                                      <Col span={16}> {item.NAME}</Col>
                                    </Row>
                                  </div>
                                </Card>
                              </Tooltip>

                              {/* {item.NAME} */}
                            </Card.Grid>
                          );
                        })}

                        {/* <Card.Grid style={gridStyle}>Content</Card.Grid> */}
                      </Card>
                    );
                  })}
              </div>
            </div>
            {/* End Tạo Kho */}

            {/* Khu */}
            <div style={{ minHeight: "100vh" }}>
              <div className="CustomCard" style={{ textAlign: "center" }}>
                {/* {active} */}
                <div style={{ textAlign: "center" }}>
                  <Divider orientation="left" orientationMargin={50}>
                    <Breadcrumb>
                      <Breadcrumb.Item style={{ cursor: "pointer" }} onClick={PrevBtn}>
                        Quản lí kho
                      </Breadcrumb.Item>

                      <Breadcrumb.Item>Quản lí khu </Breadcrumb.Item>
                    </Breadcrumb>
                  </Divider>

                  <Row
                    className="zone"
                    style={{
                      maxWidth: "100%",
                      padding: "20px 5px ",
                    }}
                    gutter={[14, 12]}
                  >
                    {activeWHNewArea?.LISTAREA?.map((item, index) => {
                      return (
                        <Col key={index} span={6}>
                          <Card
                            className="create-new-box"
                            style={{ height: "200px", overflow: " auto" }}
                            title={defaultTitle(item, "Mã Khu: ", createBin)}
                            size="small"
                          >
                            <div
                              onClick={() => {
                                createBin(item);
                              }}
                              style={{ fontSize: "14px" }}
                            >
                              <Row gutter={[14, 12]} style={{ textAlign: "left" }}>
                                <Col span={8}>Tên Khu:</Col>
                                <Col span={16}>
                                  <p> {item.NAME}</p>
                                </Col>
                                <Col span={8}>Vị trí :</Col>
                                <Col span={16}>
                                  <p> {item.LOCATION}</p>
                                </Col>
                                <Col span={10}>Thể tích khối:</Col>
                                <Col span={14}>
                                  <p>{item?.CAPACITY || 0} cm&sup3; </p>
                                </Col>
                                {item?.PROPERTY && Object.keys(item?.PROPERTY).length ? (
                                  <>
                                    <Col span={24}>
                                      <Divider style={{margin:0}} orientation="left">Thuộc tính</Divider>
                                      <Row style={{fontSize:"14px"}}>
                                        <Col span={10}>Tỉnh nhận:</Col>
                                        <Col span={14}>
                                          {mapPropertyCodeByName("RECEIVEPROVINCE", item.PROPERTY?.RECEIVEPROVINCE)}
                                        </Col>
                                        <Col span={10}>Dịch vụ:</Col>

                                        <Col span={14}>{mapPropertyCodeByName("SERVICE", item.PROPERTY?.SERVICE)}</Col>
                                        <Col span={10}>TT đơn hàng:</Col>
                                        <Col span={14}> {mapPropertyCodeByName("VULL", item.PROPERTY?.VULL)}</Col>
                                      </Row>
                                    </Col>
                                  </>
                                ) : (
                                  ""
                                )}
                              </Row>
                            </div>
                          </Card>
                        </Col>
                      );
                    })}

                    <Col span={6}>
                      <div className="map-box" style={{ minHeight: "200px" }}>
                        <div>
                          <div style={{ cursor: "pointer" }} onClick={() => setVisibleArea(true)}>
                            <PlusOutlined style={{ fontSize: "60px" }} />
                            <p style={{ fontSize: "25px" }}>Tạo Khu </p>
                          </div>

                          <Modal
                            title={
                              "Tạo Khu - (Thể tích đã chứa /  Tổng thể tích : " +
                              activeWHNewArea?.LOADED +
                              " / " +
                              activeWHNewArea?.CAPACITY +
                              ")"
                            }
                            // centered
                            footer={false}
                            visible={visibleArea}
                            onOk={() => setVisibleArea(false)}
                            onCancel={() => setVisibleArea(false)}
                            style={{ minWidth: "50vw", top: 20 }}
                          >
                            <CreateNewArea
                              volumetricFunc={volumetricFunc}
                              makeid={makeid}
                              handleListArea={handleListArea}
                              propertiesArea={propertiesArea}
                              onCancelModal={() => setVisibleArea(false)}
                              activeWHNewArea={activeWHNewArea}
                            />
                          </Modal>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            {/* End Tạo Khu */}
            <div style={{ minHeight: "100vh" }}>
              {/*  kệ */}
              <div className="CustomCard" style={{ textAlign: "center" }}>
                {activeAreaNewBin?.PROPERTY && Object.keys(activeAreaNewBin?.PROPERTY).length ? (
                  <div>
                    <TabbleOrder backToHome={PrevBtn} activeState={activeAreaNewBin} />
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <Divider orientation="left" orientationMargin={50}>
                      {/* Quản lí kho */}
                      <Breadcrumb>
                        <Breadcrumb.Item style={{ cursor: "pointer" }} onClick={PrevBtn}>
                          Quản lí khu
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>Quản lí kệ</Breadcrumb.Item>
                      </Breadcrumb>
                    </Divider>

                    <Row
                      className="zone"
                      style={{
                        maxWidth: "100%",
                        padding: "20px 5px ",
                      }}
                      gutter={[14, 12]}
                    >
                      {activeAreaNewBin?.LISTBIN?.map((item, index) => {
                        return (
                          <Col key={index} span={6}>
                            <Card
                              className="create-new-box"
                              style={{ height: "250px", overflow: " auto" }}
                              title={defaultTitle(item, "Mã Kệ: ", createBox)}
                              size="small"
                            >
                              <div
                                onClick={() => {
                                  createBox(item);
                                }}
                                style={{ fontSize: "16px" }}
                              >
                                <Row gutter={[14, 12]} style={{ textAlign: "left" }}>
                                  <Col span={8}>Tên Kệ:</Col>
                                  <Col span={16}>
                                    <p> {item.NAME}</p>
                                  </Col>
                                  <Col span={8}>Vị trí:</Col>
                                  <Col span={16}>
                                    <p> {item.LOCATION}</p>
                                  </Col>
                                  <Col span={10}>Thể tích khối :</Col>
                                  <Col span={14}>
                                    <p>
                                      {item.CAPACITY?.toLocaleString(FormatNumber) ||
                                        volumetricFunc(item).toLocaleString(FormatNumber)}
                                      cm&sup3;
                                    </p>
                                  </Col>
                                  {item?.PROPERTY && Object.keys(item?.PROPERTY).length ? (
                                    <>
                                      <Col span={24}>
                                        <Divider style={{margin:0}} orientation="left">Thuộc tính</Divider>
                                        <Row style={{fontSize:"14px"}}>
                                          <Col span={10}>Tỉnh nhận:</Col>
                                          <Col span={14}>
                                            {mapPropertyCodeByName("RECEIVEPROVINCE", item.PROPERTY?.RECEIVEPROVINCE)}
                                          </Col>
                                          <Col span={10}>Dịch vụ:</Col>

                                          <Col span={14}>
                                            {mapPropertyCodeByName("SERVICE", item.PROPERTY?.SERVICE)}
                                          </Col>
                                          <Col span={10}>TT đơn hàng:</Col>
                                          <Col span={14}> {mapPropertyCodeByName("VULL", item.PROPERTY?.VULL)}</Col>
                                        </Row>
                                      </Col>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </Row>
                              </div>
                            </Card>
                          </Col>
                        );
                      })}

                      <Col span={6}>
                        <div className="map-box" style={{ minHeight: "250px" }}>
                          <div>
                            <div style={{ cursor: "pointer" }} onClick={() => setVisibleBin(true)}>
                              <PlusOutlined style={{ fontSize: "60px" }} />
                              <p style={{ fontSize: "25px" }}>Tạo Kệ </p>
                            </div>

                            <Modal
                              title={
                                `Tạo Kệ - (Thể tích đã chứa  /  Tổng thể tích  : ` +
                                activeAreaNewBin?.LOADED?.toLocaleString(FormatNumber) +
                                " / " +
                                volumetricFunc(activeAreaNewBin)?.toLocaleString(FormatNumber) +
                                ")"
                              }
                              // centered
                              footer={false}
                              visible={visibleBin}
                              onOk={() => setVisibleBin(false)}
                              onCancel={() => setVisibleBin(false)}
                              width={"50vw"}
                              style={{
                                top: 20,
                              }}
                            >
                              <CreateNewBin
                                makeid={makeid}
                                volumetricFunc={volumetricFunc}
                                handleListBin={handleListBin}
                                propertiesArea={propertiesArea}
                                onCancelModal={() => setVisibleBin(false)}
                                activeAreaNewBin={activeAreaNewBin}
                              />
                            </Modal>
                          </div>
                        </div>

                        <div>
                          {loading ? (
                            <div className="example">
                              <Spin />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </div>

            <div style={{ minHeight: "100vh" }}>
              <div>
                {/* Ô  */}
                <div className="CustomCard" style={{ textAlign: "center" }}>
                  {activeBinNewBox?.PROPERTY && Object.keys(activeBinNewBox?.PROPERTY).length ? (
                    <div>
                      <TabbleOrder backToHome={PrevBtn} activeState={activeBinNewBox}/>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <Divider orientation="left" orientationMargin={50}>
                        {/* Quản lí kho */}
                        <Breadcrumb>
                          <Breadcrumb.Item style={{ cursor: "pointer" }} onClick={PrevBtn}>
                            Quản lí kệ
                          </Breadcrumb.Item>

                          <Breadcrumb.Item>Quản lí ô</Breadcrumb.Item>
                        </Breadcrumb>
                      </Divider>

                      <Row
                        className="zone"
                        style={{
                          maxWidth: "100%",
                          padding: "20px 5px ",
                        }}
                        gutter={[14, 12]}
                      >
                        {activeBinNewBox?.LISTBOX?.map((item, index) => {
                          return (
                            <Col key={index} span={6}>
                              <Card
                                className="create-new-box"
                                style={{ height: "250px", overflow: " auto" }}
                                title={defaultTitle(item, "Mã Ô: ", showOrderListBox)}
                                size="small"
                              >
                                <div
                                  onClick={() => {
                                    showOrderListBox(item);
                                  }}
                                  style={{ fontSize: "16px" }}
                                >
                                  <Row gutter={[14, 12]} style={{ textAlign: "left" }}>
                                    <Col span={8}>Tên Ô:</Col>
                                    <Col span={16}>
                                      <p> {item.NAME}</p>
                                    </Col>
                                    <Col span={8}>Vị trí:</Col>
                                    <Col span={16}>
                                      <p> {item.LOCATION}</p>
                                    </Col>
                                    <Col span={10}>Thể tích khối:</Col>
                                    <Col span={14}>
                                      <p>
                                        {item.CAPACITY?.toLocaleString(FormatNumber) ||
                                          volumetricFunc(item).toLocaleString(FormatNumber)}{" "}
                                        cm&sup3;
                                      </p>
                                    </Col>
                                    {item?.PROPERTY && Object.keys(item?.PROPERTY).length ? (
                                      <>
                                        <Col span={24}>
                                          <Divider style={{margin:0}} orientation="left">Thuộc tính</Divider>
                                          <Row style={{fontSize:"14px"}}>
                                            <Col span={10}>Tỉnh nhận:</Col>
                                            <Col span={14}>
                                              {mapPropertyCodeByName("RECEIVEPROVINCE", item.PROPERTY?.RECEIVEPROVINCE)}
                                            </Col>
                                            <Col span={10}>Dịch vụ:</Col>

                                            <Col span={14}>
                                              {mapPropertyCodeByName("SERVICE", item.PROPERTY?.SERVICE)}
                                            </Col>
                                            <Col span={10}>TT đơn hàng:</Col>
                                            <Col span={14}> {mapPropertyCodeByName("VULL", item.PROPERTY?.VULL)}</Col>
                                          </Row>
                                        </Col>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </Row>
                                </div>
                              </Card>
                            </Col>
                          );
                        })}

                        <Col span={6}>
                          <div className="map-box" style={{ minHeight: "250px" }}>
                            <div>
                              <div style={{ cursor: "pointer" }} onClick={() => setVisibleBox(true)}>
                                <PlusOutlined style={{ fontSize: "60px" }} />
                                <p style={{ fontSize: "25px" }}>Tạo ô </p>
                              </div>

                              <Modal
                                title={
                                  "Tạo ô - (Thể tích đã chứa /  Tổng thể tích : " +
                                  activeBinNewBox?.LOADED?.toLocaleString(FormatNumber) +
                                  " / " +
                                  (activeBinNewBox?.CAPACITY ||
                                    volumetricFunc(activeBinNewBox)?.toLocaleString(FormatNumber)) +
                                  " (cm3)" +
                                  "  )"
                                }
                                // centered
                                footer={false}
                                visible={visibleBox}
                                onOk={() => setVisibleBox(false)}
                                onCancel={() => setVisibleBox(false)}
                                width={"50vw"}
                                style={{
                                  top: 20,
                                }}
                              >
                                <CreateNewBox
                                  volumetricFunc={volumetricFunc}
                                  makeid={makeid}
                                  handleListBox={handleListBox}
                                  propertiesArea={propertiesArea}
                                  onCancelModal={() => setVisibleBox(false)}
                                  activeBinNewBox={activeBinNewBox}
                                />
                              </Modal>
                            </div>
                          </div>

                          <div>
                            {loading ? (
                              <div className="example">
                                <Spin />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ minHeight: "100vh" }}>
              {activeBox ? (
                <div style={{ textAlign: "center" }}>
                  <TabbleOrder backToHome={PrevBtn} activeState={activeBox} />
                </div>
              ) : (
                ""
              )}
            </div>
          </Slider>
        )}

        {/* </div> */}
      </div>
    </div>
  );
}

export default CreateWereHouse;
