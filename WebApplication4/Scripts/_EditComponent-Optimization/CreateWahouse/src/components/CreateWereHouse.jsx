import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, Divider, Modal, Row, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ThuocTinh from "../../assets/ThuocTinhKho.json";
import ThuocTinhDonHang from "../../assets/ThuocTinhDonHang.json";
import Slider from "react-slick";

import "../Style/CreateWH.css";
import CreateNewWareHouse from "./Modal/ModalWH";
import CreateNewArea from "./Modal/ModalArea";
import CreateNewBin from "./Modal/ModalBin";
import TabbleOrder from "./TableComp/TabbleOrder";
import CreateNewBox from "./Modal/ModalO";
import { getWarehouseApi } from "../Service";
function CreateWereHouse(props) {
  const FormatNumber = "en-US";

  //Slider
  const onTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });
  };
  const sliderRef = useRef(null);
  const PrevBtn = () => {
    sliderRef.current.slickPrev();
    onTop();
  };
  const NextBtn = (props) => {
    sliderRef.current.slickNext();
    onTop();
    // console.log(sliderRef.current);
  };
  const homeBtn = () => {
    sliderRef.current.slickGoTo(0);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: false,
  };
  //End lider
  const [loading, setLoading] = useState(false);
  const [visibleWH, setVisibleWH] = useState(false);
  const [visibleArea, setVisibleArea] = useState(false);
  const [visibleBin, setVisibleBin] = useState(false);
  const [visibleBox, setVisibleBox] = useState(false);
  const [propertiesWH, setPropertiesWH] = useState([]);
  const [propertiesArea, setPropertiesArea] = useState([]);
  const [listWH, setListWH] = useState([]);
  // Get List WH
  async function getWarehouseList() {
    let res = await getWarehouseApi();
    if (res) {
      setListWH(res);
    }
  }
  useEffect(() => {
    getWarehouseList();
  }, []);
  // End Get List WH
  const [activeWHNewArea, setActiveWHNewArea] = useState();
  const [activeAreaNewBin, setActiveAreaNewBin] = useState();
  const [activeBinNewBox, setActiveBinNewBox] = useState();
  const [activeBox, setActiveBox] = useState();
  console.log(activeWHNewArea, " actie WH");
  // console.log(activeAreaNewBin, " actie AR");

  // console.log(activeBinNewBox, " 11111 line 63");
  useEffect(() => {
    if (activeWHNewArea) {
      const idx = listWH.findIndex((x) => x.CODE === activeWHNewArea.CODE);
      listWH.splice(idx, 1, activeWHNewArea);
      setListWH([...listWH]);
    }
  }, [activeWHNewArea]);

  const handleListArea = (data) => {
    const ind = listWH.findIndex((x) => x.CODE === data.idWh);
    if (ind >= 0) {
      let temp = listWH[ind];
      let temp2 = {
        ...temp,
        LOADED: temp.LOADED + data.volume,
        LISTAREA: [...temp.LISTAREA, { ...data.areaInfo, LOADED: 0, LISTBIN: [] }],
      };
      // console.log(temp2, " temp 2 line 55");
      listWH.splice(ind, 1, temp2);
      setActiveWHNewArea(temp2);
      setListWH([...listWH]);
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
    // console.log("Chạy box");

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
  useEffect(() => {
    setPropertiesWH(ThuocTinh);
    setPropertiesArea(ThuocTinhDonHang);
  }, []);

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
  // console.log(listWH, "list WH");
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

  return (
    <div style={{ height: "fit-content" }}>
      <div className="slider" style={{ width: "100%", overflow: "hidden" }}>
        <Slider ref={sliderRef} {...settings} style={{ textAlign: "center" }}>
          {/* Tạo Kho */}
          <div>
            <div>
              <Divider orientation="left" orientationMargin={50}>
                <Breadcrumb>
                  <Breadcrumb.Item>Quản lí kho</Breadcrumb.Item>
                </Breadcrumb>
              </Divider>

              <Row
                className="zone"
                style={{
                  maxWidth: "100%",
                  padding: "20px 5px ",
                }}
                gutter={[32, 32]}
              >
                {listWH?.map((item, index) => {
                  return (
                    <Col key={index} span={8}>
                      <Card
                        className="create-new-box"
                        style={{ minHeight: "300px" }}
                        onClick={() => {
                          createArea(item);
                          // console.log(item);
                        }}
                        title={`Mã Kho : ${item.WAREHOUSECODE}`}
                        size="small"
                      >
                        <div style={{ fontSize: "20px" }}>
                          <Row gutter={[16, 20]} style={{ textAlign: "left" }}>
                            <Col span={8}>Tên Kho:</Col>
                            <Col span={16}>
                              <p> {item.NAME}</p>
                            </Col>
                            <Col span={8}>Địa Chỉ:</Col>
                            <Col span={16}>
                              <p> {item.LOCATION}</p>
                            </Col>
                            <Col span={8}>Thể tích khối:</Col>
                            <Col span={16}>
                              <p>
                                {item.CAPACITY?.toLocaleString(FormatNumber) ||
                                  volumetricFunc(item).toLocaleString(FormatNumber)}
                                cm&sup3;
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    </Col>
                  );
                })}

                <Col span={8}>
                  <div className="map-box" style={{ minHeight: "300px" }}>
                    <div>
                      <div style={{ cursor: "pointer" }} onClick={() => setVisibleWH(true)}>
                        <PlusOutlined style={{ fontSize: "80px" }} />
                        <p style={{ fontSize: "30px" }}>Tạo Kho</p>
                      </div>

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
                          onCancelModal={() => {
                            setVisibleWH(false);
                          }}
                          propertiesWH={propertiesWH}
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
          </div>
          {/* End Tạo Kho */}

          {/* Khu */}
          <div>
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
                gutter={[32, 32]}
              >
                {activeWHNewArea?.LISTAREA?.map((item, index) => {
                  return (
                    <Col key={index} span={6}>
                      <Card
                        className="create-new-box"
                        style={{ height: "250px", overflow: " auto" }}
                        onClick={() => {
                          createBin(item);
                        }}
                        title={`Mã Khu : ${item.CODE}`}
                        size="small"
                      >
                        <div style={{ fontSize: "16px" }}>
                          <Row gutter={[16, 20]} style={{ textAlign: "left" }}>
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
                            {item?.PROPERTY ? (
                              <>
                                <Col span={24}>
                                  <Divider orientation="left">Thuộc tính</Divider>
                                  <Row>
                                    <Col span={10}>Tỉnh nhận:</Col>
                                    <Col span={14}>{item.PROPERTY?.RECEIVEPROVINCE?.map((x) => ` ${x}`)}</Col>
                                    <Col span={10}>Dịch vụ:</Col>
                                    <Col span={14}>{item.PROPERTY?.SERVICE?.map((x) => ` ${x}`)}</Col>
                                    <Col span={10}>TT đơn hàng:</Col>
                                    <Col span={14}>{item.PROPERTY?.VULL?.map((x) => ` ${x}`)}</Col>
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
          </div>

          {/* End Tạo Khu */}
          <div>
            {/*  kệ */}
            <div style={{ textAlign: "center" }}>
              {activeAreaNewBin?.PROPERTY ? (
                <div>
                  <TabbleOrder backToHome={PrevBtn} />
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
                    gutter={[32, 32]}
                  >
                    {activeAreaNewBin?.LISTBIN?.map((item, index) => {
                      return (
                        <Col key={index} span={6}>
                          <Card
                            className="create-new-box"
                            style={{ height: "250px", overflow: " auto" }}
                            onClick={() => {
                              createBox(item);
                              // console.log(item);
                            }}
                            title={`Mã Kệ : ${item.CODE}`}
                            size="small"
                          >
                            <div style={{ fontSize: "16px" }}>
                              <Row gutter={[16, 20]} style={{ textAlign: "left" }}>
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
                                  <p>{item.CAPACITY?.toLocaleString(FormatNumber) || volumetricFunc(item).toLocaleString(FormatNumber)} cm&sup3; </p>
                                </Col>
                                {item?.PROPERTY ? (
                                  <>
                                    <Col span={24}>
                                      <Divider orientation="left">Thuộc tính</Divider>
                                      <Row>
                                        <Col span={10}>Tỉnh nhận:</Col>
                                        <Col span={14}>{item.PROPERTY?.RECEIVEPROVINCE?.map((x) => ` ${x}`)}</Col>
                                        <Col span={10}>Dịch vụ:</Col>
                                        <Col span={14}>{item.PROPERTY?.SERVICE?.map((x) => ` ${x}`)}</Col>
                                        <Col span={10}>TT đơn hàng:</Col>
                                        <Col span={14}>{item.PROPERTY?.VULL?.map((x) => ` ${x}`)}</Col>
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

          <div>
            <div>
              {/* Ô  */}
              <div style={{ textAlign: "center" }}>
                {activeBinNewBox?.PROPERTY ? (
                  <div>
                    <TabbleOrder backToHome={PrevBtn} />
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
                      gutter={[32, 32]}
                    >
                      {activeBinNewBox?.LISTBOX?.map((item, index) => {
                        return (
                          <Col key={index} span={6}>
                            <Card
                              className="create-new-box"
                              style={{ height: "250px", overflow: " auto" }}
                              onClick={() => {
                                showOrderListBox(item);
                              }}
                              title={`Mã Ô : ${item.CODE}`}
                              size="small"
                            >
                              <div style={{ fontSize: "16px" }}>
                                <Row gutter={[16, 20]} style={{ textAlign: "left" }}>
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
                                    <p>{item.CAPACITY?.toLocaleString(FormatNumber) || volumetricFunc(item).toLocaleString(FormatNumber)} cm&sup3;</p>
                                  </Col>
                                  {item?.PROPERTY ? (
                                    <>
                                      <Col span={24}>
                                        <Divider orientation="left">Thuộc tính</Divider>
                                        <Row>
                                          <Col span={10}>Tỉnh nhận:</Col>
                                          <Col span={14}>{item.PROPERTY?.RECEIVEPROVINCE?.map((x) => ` ${x}`)}</Col>
                                          <Col span={10}>Dịch vụ:</Col>
                                          <Col span={14}>{item.PROPERTY?.SERVICE?.map((x) => ` ${x}`)}</Col>
                                          <Col span={10}>TT đơn hàng:</Col>
                                          <Col span={14}>{item.PROPERTY?.VULL?.map((x) => ` ${x}`)}</Col>
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
                                volumetricFunc(activeBinNewBox)?.toLocaleString(FormatNumber) + " (cm3)"+
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
          <div>
            {activeBox ? (
              <div style={{ textAlign: "center" }}>
                <TabbleOrder backToHome={PrevBtn} />
              </div>
            ) : (
              ""
            )}
          </div>
        </Slider>
        {/* </div> */}
      </div>
    </div>
  );
}

export default CreateWereHouse;
