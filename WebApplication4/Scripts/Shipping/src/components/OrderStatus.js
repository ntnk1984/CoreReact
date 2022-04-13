import { Avatar, Button, List, Modal, Space, Table } from "antd";
import React, { useContext } from "react";
import { contextValue } from "../App";

function OrderStatus({ statusOrder }) {
  const context = useContext(contextValue);
  const { listOrder, orderShippingInfo } = context.infoOrder;

  const data = listOrder.filter((item, index) => {
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
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/10" />}
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
              <Button onClick={() => handleInfo(item)}>Xem Chi tiết</Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default OrderStatus;
