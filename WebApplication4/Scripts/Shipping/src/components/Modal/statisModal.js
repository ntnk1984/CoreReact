import { Col, Modal, Progress, Row, Tooltip } from "antd";
import React, { useContext } from "react";
import { contextValue } from "../../App";

function StatisModal({ handleModal }) {
  const context = useContext(contextValue);
  const { visibleModal, listOrder } = context.infoOrder;
  let mergeArray = [];
  const addColorList = listOrder.map((item, index, array) => {
    if (item.tinhTrangDonHang === "choXacNhan") {
      return { label: "Chờ Xác Nhận" };
      // return { ...item, color: "#FF8E00" };
    }
    if (item.tinhTrangDonHang === "daXacNhan") {
      return { label: "Đã Xác Nhận" };
      // return { ...item, color: "#3E8E7E" };
    }
    if (item.tinhTrangDonHang === "dangGiao") {
      return { label: "Đang Giao" };
      // return { ...item, color: "#548CFF" };
    }
    if (item.tinhTrangDonHang === "daGiao") {
      return { label: "Đã Giao" };
      // return { ...item, color: "#7900FF" };
    }
    if (item.tinhTrangDonHang === "daHuy") {
      return { label: "Đã Hủy" };
      // return { ...item, color: "#FF8080" };
    }
  });
  const mergetArr = () => {
    const array = addColorList;
    const size = addColorList.length;

    let choXacNhan = 0;
    let daXacNhan = 0;
    let dangGiao = 0;
    let daGiao = 0;
    let daHuy = 0;
    for (let i = 0; i < size; ++i) {
      if (array[i].label === "Chờ Xác Nhận") {
        choXacNhan++;
      }
      if (array[i].label === "Đã Xác Nhận") {
        daXacNhan++;
      }
      if (array[i].label === "Đang Giao") {
        dangGiao++;
      }
      if (array[i].label === "Đã Giao") {
        daGiao++;
      }
      if (array[i].label === "Đã Hủy") {
        daHuy++;
      }
    }
    mergeArray = [
      { y: choXacNhan, label: "Chờ Xác Nhận" },
      { y: daXacNhan, label: "Đã Xác Nhận" },
      { y: dangGiao, label: "Đang Giao" },
      { y: daGiao, label: "Đã Giao" },
      { y: daHuy, label: "Đã Hủy" },
    ];

    return mergeArray;
  };
  const arrRate = (index) => {
    return ((100 / (addColorList.length - 1)) * mergeArray[index].y).toFixed(2);
  };

  mergetArr();
  console.log(mergetArr());
  console.log(arrRate(4));
  return (
    <>
      <Modal
        className="statis-modal"
        title="Biểu Đồ Đơn Hàng Của Bạn"
        centered
        visible={visibleModal}
        onOk={handleModal}
        onCancel={handleModal}
        width={750}
        footer={null}
      >
        <div style={{ width: "90%", margin: "0 auto" }}>
          <Row>
            <Col span={4}>
              <span>Chờ Xác Nhận: </span>
            </Col>
            <Col span={20}>
              <Progress
                strokeColor={"#FF8E00"}
                percent={arrRate(0)}
                size="small"
              />
            </Col>
          </Row>

          <Row>
            <Col span={4}>
              <span>Đã Xác Nhận: </span>
            </Col>
            <Col span={20}>
              <Progress
                strokeColor={"#3E8E7E"}
                percent={arrRate(1)}
                size="small"
              />
            </Col>
          </Row>

          <Row>
            <Col span={4}>
              <span>Đang Giao: </span>
            </Col>
            <Col span={20}>
              <Progress
                strokeColor={"#548CFF"}
                percent={arrRate(2)}
                size="small"
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span>Đã Giao: </span>
            </Col>
            <Col span={20}>
              <Progress
                strokeColor={"#7900FF"}
                percent={arrRate(3)}
                size="small"
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span>Đã Hủy: </span>
            </Col>
            <Col span={20}>
              <Progress
                strokeColor={"#FF8080"}
                percent={arrRate(4)}
                size="small"
              />
            </Col>
          </Row>
        </div>
        ,
      </Modal>
    </>
  );
}

export default StatisModal;
