import { Avatar, Button, List, Modal, Space, Table } from "antd";
import React, { useContext, useState } from "react";
import { contextValue } from "../App";
import InputSearch from "./Modal/InputSearch";
import "./Style/OrderStatus.css";

function OrderStatus({ statusOrder }) {
  const context = useContext(contextValue);
  const [searchTerm, setSearchTerm] = useState("");
  const { listOrder, orderShippingInfo } = context.infoOrder;

  const updateState = (value) => {
    console.log(value);
    setSearchTerm(value);
  };

  const dataTemp = listOrder.filter((item, index) => {
    return item.tinhTrangDonHang === statusOrder;
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
  const data = dataTemp.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (
      val.vietnameseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.countryCode.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
  });

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
        title: "Trạng Thái",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a>Invite</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    Modal.info({
      style: { top: 20 },

      className: "abc ",
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
    <div className="orderStatus-main">
      <InputSearch updateState={updateState} />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/10" />}
              title={
                <div className="style-text">
                  <h1>
                    {item.vietnameseName} - {item.englishName}
                  </h1>
                  <p>
                    Số Lượng: {item.quantity}
                    <br />
                    Đơn vị tính: {item.donviTinh} <br />
                  </p>
                </div>
              }
              description={item.countryCode}
            />
            <div className="btn-handleInfo">
              <Button onClick={() => handleInfo(item)}>Xem Chi tiết</Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default OrderStatus;
