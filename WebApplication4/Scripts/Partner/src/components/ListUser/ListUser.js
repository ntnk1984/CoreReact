import React, { useState } from "react";
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
} from "antd";
import AddUser from "./ChildListUser/AddUser.js";

const { Option } = Select;
const columns = [
  {
    title: "#",

    render: (text, record, index) => <a>{++index}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Nhóm",
    key: "group",
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
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            </Popover>
          );
        })}

        <Popover placement="top" content={<AutoComplete
            
            style={{ width: 150 }}
           
            placeholder="Tên nhóm"
          />} trigger="click">
          <Tag  color="#f50">Thêm nhóm</Tag>
        </Popover>
      </>
    ),
  },
  {
    title: "Active",

    render: () => (
      <Space size="middle">
        <Select defaultValue="active"  style={{ width: 120,    backgroundColor: '#0000 !important' }} allowClear>
          <Option  value="active">Active</Option>
          <Option value="deactive">De-active</Option>
        </Select>
      </Space>
    ),
  },
  {
    title: "Sửa",

    render: () => (
      <Space size="middle">
        <Button type="link">Sửa</Button>
      </Space>
    ),
  },
  {
    title: "Xóa",

    render: () => (
      <Space size="middle">
        <Button type="link" danger>
          Xóa
        </Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    username: "helloword123",
    age: 32,
    address: "New York No. 1 Lake Park",
    group: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    username: "helloword123",
    age: 42,
    address: "London No. 1 Lake Park",
    group: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    username: "helloword123",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    group: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "Joe Black",
    username: "helloword123",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    group: ["cool", "teacher"],
  },
  {
    key: "5",
    name: "Joe Black",
    username: "helloword123",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    group: ["cool", "teacher"],
  },
  {
    key: "6",
    name: "Joe Black",
    username: "helloword123",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    group: ["cool", "teacher"],
  },
  {
    key: "7",
    name: "Joe Black",
    username: "helloword123",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    group: ["cool", "teacher"],
  },
  {
    key: "8",
    name: "Joe Black",
    username: "helloword123",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    group: ["cool", "teacher"],
  },
];
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});



export default function ListUser() {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const onChange = (data) => {
    setValue(data);
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
            onSelect={onSelect}
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
