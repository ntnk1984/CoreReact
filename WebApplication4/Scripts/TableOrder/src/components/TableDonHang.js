import React from "react";
import { Button, Checkbox, Table, Tag, Row, Col, Typography,Dropdown,Menu } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
      Phân chia
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
   Sửa đơn
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
      Hủy đơn
      </a>
    </Menu.Item>
  </Menu>
);


const { Text, Link } = Typography;
const columns = [
  {
    title: "#",
    render: (text, record, index) => <Checkbox value={text}></Checkbox>,
  },
  {
    title: "Mã đơn hàng ",
    dataIndex: "maDonHang",
  },
  {
    title: "Người gửi",
    render: (text, record, index) => {
      return (
        <Row>
          <Col span={24}>{text.nguoiGui}</Col>
          <Col span={24}>
            <Text disabled>{text.soDienThoaiNguoiGui}</Text>
          </Col>
        </Row>
      );
    },
  },
  {
    title: "Người nhận ",
    render: (text, record, index) => {
      return (
        <Row>
          <Col span={24}>{text.nguoiNhan}</Col>
          <Col span={24}>
            {" "}
            <Text disabled>{text.soDienThoaiNguoiNhan}</Text>
          </Col>
        </Row>
      );
    },
  },
  {
    title: "Thời gian lập",
    render: () => (
      <Row>
        <Col span={24}>{"10:19"}</Col>
        <Col span={24}>
          {" "}
          <Text disabled>{"20/10/2020"}</Text>
        </Col>
      </Row>
    ),
  },
  {
    title: "Loại hàng",
    dataIndex: "loaiHang",
  },

  {
    title: "Thu Hộ",
    render: (text, record, index) => record.thuHo.toLocaleString(),
  },
  {
    title: "Tổng cước",
    render: (text, record, index) => record.tongCuoc.toLocaleString(),
  },

  {
    title: "Trạng thái",
    render: (text, record, index) => {
      const trangThaiColor = (status) => {
        switch (status) {
          case "Mới tạo": {
            return "magenta";
          }
          case "Chờ lấy": {
            return "red";
          }
          case "Đã lấy": {
            return "volcano";
          }
          case "Đang vận chuyển": {
            return "orange";
          }
          case "Đang giao": {
            return "gold";
          }
          case "Giao thành công": {
            return "green";
          }
          case "Chờ xử lý": {
            return "cyan";
          }
          case "Đã duyệt hoàn": {
            return "geekblue";
          }
          case "Đã trả": {
            return "blue";
          }
          case "Đã hủy": {
            return "lime";
          }
        }
      };

      return (
        <Tag color={trangThaiColor(record.trangThai)}>{record.trangThai}</Tag>
      );
    },
  },
  {
    title: " Thao tác",
    render: (text, record, index) => {
      return<Dropdown overlay={menu} placement="bottomLeft">
        <Button type="link" icon={<UnorderedListOutlined />}>
      
        </Button>
      </Dropdown>;
    },
  },
];

export default function TableDonHang(props) {
  const dataTemp = props?.data?.map((item, index) => ({ ...item, key: index }));

  return (
    <>
      <Checkbox.Group style={{ width: "100%" }}>
        <Table
          style={{ margin: "0 auto" }}
          columns={columns}
          dataSource={dataTemp}
        />
      </Checkbox.Group>
    </>
  );
}
