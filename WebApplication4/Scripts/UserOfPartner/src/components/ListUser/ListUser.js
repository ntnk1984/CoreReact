import React, { useEffect, useState } from "react";
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
} from "antd";
import { ExclamationCircleOutlined,EditOutlined,DeleteOutlined } from "@ant-design/icons";
import AddUser from "./ChildListUser/AddUser.js";
import dataUserTestJSON from "../../assets/dataTest/dataUser.json";
import EditUser from "./ChildListUser/EditUser.js";

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
    width:"40px",
    render: (text, record, index) => <a>{++index}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width:"180px",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Username",
    dataIndex: "username",
    width:"120px",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width:"250px",
  },
  {
    title: "Nhóm",
    key: "group",
    width:"290px",
    dataIndex: "group",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Popover
              placement="bottom"
              content={
                <Button style={{ width: "100%" }} type="danger">
                  Xóa
                </Button>
              }
              trigger="click"
            >
              <Tag style={{cursor: "pointer"}} color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            </Popover>
          );
        })}

        <Popover 
          placement="top"
          content={
            <AutoComplete
              // options={options} call aip danh sách nhóm
              style={{ width: 150 }}
              // onSearch={onSearch} call API thêm user vào nhóm
              placeholder="Tên nhóm"
            />
          }
          trigger="click"
        >
         
        </Popover>
      </>
    ),
  },
  {
    title: "Active",
    width:"220px",
    render: (text, record, index) => (
      <Space size="middle">
        <Select
          onChange={() => {
            confirmActive();
          }}
          defaultValue={record.active}
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
    width:"90px",
    render: () => (
      <Space size="middle">
        <EditUser/>
      </Space>
    ),
  },
  {
    title: "Xóa",
    width:"90px",
    render: (text, record, index) => (
      <Space size="middle">
        <Button
          onClick={() => {
            confirmRemoveUser(record.ID);
          }}
          danger
         icon={<DeleteOutlined />}
        >
          
        </Button>
      </Space>
    ),
  },
];

export default function ListUser() {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [dataUserTest, setDataUserTest] = useState({
    data: [...dataUserTestJSON],
  });



  


  const data = dataUserTest.data.map((item, index) => {
    return {
      key: item.ID,
      name: `${item.HoTen}+${item.Ten}`,
      username: item.TaiKhoan,
      address: item.DiaChi,
      group: [item.Group],
      active: item.KichHoat,
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
        <Col span={4}>
          <AddUser />
        </Col>
        <Col span={4} offset={16} className="d-flex justify-content-end">
          <AutoComplete
            options={options}
            style={{ width: 200 }}
            onSearch={onSearch}
            placeholder="Nhập tên cần tìm..."
          />
        </Col>
      </Row>
      <div>
        <Table className="mt-3" columns={columns} dataSource={data} />
      </div>
    </>
  );
}
