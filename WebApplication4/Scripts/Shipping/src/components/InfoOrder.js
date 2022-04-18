import { Avatar, Button, Input, List, Modal, Space, Table, Tag } from "antd";
import React, { useContext, useState } from "react";
import { contextValue } from "../App";
import InputSearch from "./Modal/InputSearch";

function InfoOrder(props) {
  const context = useContext(contextValue);
  const [searchTerm, setSearchTerm] = useState("");
  const { listOrder, orderShippingInfo } = context.infoOrder;
  const renderStatus = (val) => {
    if (val.tinhTrangDonHang === "choXacNhan") {
      return (
        <div>
          <span style={{ color: "#FF8E00" }}> Chờ Xác Nhận</span>
        </div>
      );
    }
    if (val.tinhTrangDonHang === "daXacNhan") {
      return (
        <div>
          <span style={{ color: "#3E8E7E" }}> Đã Xác Nhận</span>
        </div>
      );
    }
    if (val.tinhTrangDonHang === "dangGiao") {
      return (
        <div>
          <span style={{ color: "#548CFF" }}> Đang Giao</span>
        </div>
      );
    }
    if (val.tinhTrangDonHang === "daGiao") {
      return (
        <div>
          <span style={{ color: "#7900FF" }}> Đã Giao</span>
        </div>
      );
    }
    if (val.tinhTrangDonHang === "daHuy") {
      return (
        <div>
          <span style={{ color: "#FF8080" }}> Đã Hủy</span>
        </div>
      );
    }
  };
  // console.log(orderShippingInfo, "shipping");
  const updateState = (value) => {
    console.log(value);
    setSearchTerm(value);
  };
  //FilterData search
  const data = listOrder.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (
      val.vietnameseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.countryCode.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
  }) || [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  // console.log("jhjh", data);

  const handleInfo = (val) => {
    const data = orderShippingInfo.filter((item, index) => {
      return item.id === val.idPackage;
    });
    const columns = [
      {
        title: "Mã Đơn Hàng",
        // dataIndex: "idOrderShipping",
        key: "idOrderShipping",
        render: (text) => {
          return <a>#{text.idOrderShipping}</a>;
        },
      },
      {
        title: "Chiều dài",
        key: "length",
        render: (text) => {
          return <span>{text.length} mm</span>;
        },
      },
      {
        title: "Chiều rộng",
        render: (text) => {
          return <span>{text.width} mm</span>;
        },
        key: "width",
      },
      {
        title: "Chiều cao",
        render: (text) => {
          return <span>{text.height} mm</span>;
        },
        key: "height",
      },
      {
        title: "Trọng lượng",
        render: (text) => {
          return <span>{text.weight} gam</span>;
        },
        key: "weight",
      },
      {
        title: "Tiền vận chuyển",
        render: (text) => {
          return (
            <span>
              {text.cod} {text.currebcy}
            </span>
          );
        },
        key: "cod",
      },

      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a>Invite</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
    // console.log(data);
    // console.log(val);
    Modal.info({
      style: { top: 20 },
      footer: null,
      width: "1000px",
      title: "Thông tin Bưu Kiện",
      content: (
        <div>
          <Table size="small" columns={columns} dataSource={data} />
        </div>
      ),
      onOk() {},
    });
  };
  return (
    <div>
      <InputSearch updateState={updateState} />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ position: "relative" }}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={
                <>
                  <h1 style={{ fontSize: "16px", fontWeight: 600 }}>
                    {item.vietnameseName} - {item.englishName}
                  </h1>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#343a40",
                    }}
                  >
                    Số Lượng: {item.quantity}
                    <br />
                    Đơn vị tính: {item.donviTinh} <br />
                  </p>
                </>
              }
              description={item.countryCode}
            />
            <div>
              <span style={{ position: "absolute", top: 10, right: 5 }}>
                {renderStatus(item)}
              </span>
            </div>
            <div>
              <Button onClick={() => handleInfo(item)}>Xem Chi tiết</Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default InfoOrder;
