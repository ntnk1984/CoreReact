import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Select,
  Popover,
  Row,
  Col,
  AutoComplete,
  Modal,
  Checkbox,
} from "antd";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddUser from "./ChildListUser/AddUser.js";
import dataUserTestJSON from "../../assets/dataTest/dataUser.json";
import EditUser from "./ChildListUser/EditUser.js";
import { contextValue } from "../../App.js";

// 4.12.2020-tin tuong - confirm change active
function confirmActive() {
  Modal.confirm({
    title: "Xác nhận thay đổi",
    icon: <ExclamationCircleOutlined />,
    content: "Bạn có muốn thay đổi active",
    okText: "Đồng ý",
    cancelText: "Trở lại",
    onOk: () => {
      /*call API thay đổi status cho user của partner*/
    },
  });
}

// 4.12.2020-tin tuong - confirm remove user
function confirmRemoveUser(ID) {
  Modal.confirm({
    title: "Xác nhận xóa người dùng",
    icon: <ExclamationCircleOutlined />,
    content: "Bạn có muốn xóa người dùng",
    okText: "Đồng ý",
    cancelText: "Trở lại",
    onOk: () => {
      /*call API tạo user cho partner*/
    },
  });
}

const { Option } = Select;
const columns = [
  {
    title: "#",
    width: "40px",
    render: (text, record, index) => <Checkbox value={text}></Checkbox>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "180px",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Username",
    dataIndex: "username",
    width: "120px",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: "250px",
  },
  {
    title: "Nhóm",
    key: "group",
    width: "190px",

    render: (text, record, index) => {
      return <Tag color="green">{record.group}</Tag>;
    },
  },
  {
    title: "Hạn mức",
    key: "hanMuc",
    width: "190px",

    render: (text, record, index) => (
      <Tag style={{ cursor: "pointer" }} color="cyan">
        {/* HAN MUC CÁ NHÂN */}
        {parseInt(text.hangmuc).toLocaleString()}
      </Tag>
    ),
  },
  {
    title: "Công nợ",
    key: "congNo",
    width: "190px",

    render: (text, record, index) => (
      <Tag style={{ cursor: "pointer" }} color="gold">
        {/* HAN MUC CÁ NHÂN */}
        {parseInt(text.congno).toLocaleString()}
      </Tag>
    ),
  },
  {
    title: "Active",
    width: "220px",
    render: (text, record, index) => (
      <Space size="middle">
        <Select
          onChange={() => {
            confirmActive();
          }}
          defaultValue={record.active ? "Active" : "De-active"}
          style={{ width: 120, backgroundColor: "#0000 !important" }}
          allowClear
        >
          <Option value={0}>Active</Option>
          <Option value={1}>De-active</Option>
        </Select>
      </Space>
    ),
  },
  {
    title: "Sửa",
    width: "90px",
    render: () => (
      <Space size="middle">
        <EditUser />
      </Space>
    ),
  },
  {
    title: "Xóa",
    width: "90px",
    render: (text, record, index) => (
      <Space size="middle">
        <Button
          onClick={() => {
            confirmRemoveUser(record.ID);
          }}
          danger
          icon={<DeleteOutlined />}
        ></Button>
      </Space>
    ),
  },
];

export default function ListUser() {
  const [options, setOptions] = useState([]);
  const { userPartner, dispatch } = useContext(contextValue);
  console.log("userPartner.userData", userPartner.userData);
  const data = userPartner?.userData?.map((item, index) => {
    return {
      key: index,
      name: `${item.HoTen}+${item.Ten}`,
      username: item.TaiKhoan,
      address: item.DiaChi,
      group: item.Nhom,
      active: item.KichHoat,
      hangmuc: item.HangMuc,
      congno: item.CongNo,
    };
  });

  //call api search gán vào state
  const onSearch = (searchText) => {
    var data = dataUserTest.data.filter((item) => {
      return item.TaiKhoan.indexOf(searchText) > -1;
    });
    setDataUserTest({ data });
  };

  return (
    <>
      <h3 className="text-center mt-3">DANH SÁCH THÀNH VIÊN</h3>
      <Row>
        <Col span={16}>
          <AddUser />
        </Col>
        <Col span={8}  className="d-flex justify-content-end">
          <AutoComplete
          
            options={options}
            style={{ width: 200 }}
            onSearch={onSearch}
            placeholder="Nhập tên cần tìm..."
          />
        </Col>
      </Row>
      <div>
        <Checkbox.Group style={{ width: "100%" }}>
          <Table className="mt-3" columns={columns} dataSource={data} />
        </Checkbox.Group>
      </div>
    </>
  );
}
