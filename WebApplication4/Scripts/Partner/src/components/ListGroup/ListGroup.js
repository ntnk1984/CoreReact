import React, { useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Tooltip,
  Avatar,
  Popover,
  Select,
  AutoComplete,
  Row,
  Col,
} from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import AddGroup from "./ChildListGroup/AddGroup.js";
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
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
    title: "Mô tả ",
    dataIndex: "description",
    render: (text) => {
      return (
        <Tooltip placement="topLeft" title={text}>
          <Button type="link">Chi tiết mô tả</Button>
        </Tooltip>
      );
    },
  },
  {
    title: "Thành viên ",
    dataIndex: "member",
    render: (text) => {
      return (
        <Avatar.Group>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>

          <Avatar style={{ backgroundColor: "#87d068" }}>+2</Avatar>

          <Popover
            placement="right"
            title={<span>Thêm user</span>}
            content={
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags Mode"
              >
                {children}
              </Select>
            }
            trigger="click"
          >
            <Avatar style={{ backgroundColor: "#87d068", cursor: "pointer" }}>
              +
            </Avatar>
          </Popover>
        </Avatar.Group>
      );
    },
  },

  {
    title: "Cấp quyền",
    width: '25%',
    render: () => (
      <>
      
        <Avatar
          className="mx-1"
          size="small"
          style={{ color: "black", backgroundColor: "#fcffe6" }}
        >
          1
        </Avatar>
        <Avatar
          className="mx-1"
          size="small"
          style={{ color: "black", backgroundColor: "#f4ffb8" }}
        >
          2
        </Avatar>
        <Avatar
          className="mx-1"
          size="small"
          style={{ color: "black", backgroundColor: "#eaff8f" }}
        >
          3
        </Avatar>
        <Avatar
          className="mx-1"
          size="small"
          style={{ color: "black", backgroundColor: "#d3f261" }}
        >
          4
        </Avatar>
        <Avatar
          className="mx-1"
          size="small"
          style={{ color: "black", backgroundColor: "#bae637" }}
        >
          5
        </Avatar>
        <Avatar
          className="mx-1"
          size="small"
          style={{ color: "white", backgroundColor: "#a0d911" }}
        >
          6
        </Avatar>
        <Avatar
          className="mx-1"
          size="small"
          style={{ color: "white", backgroundColor: "#7cb305" }}
        >
          7
        </Avatar>
        <Popover
          placement="bottomRight"
          content={<Button type="danger">Xóa</Button>}
          trigger="click"
        >
        <Avatar
          className="mx-1"
          size="small"
          style={{ color: "white", backgroundColor: "#5b8c00" }}
        >
          8
        </Avatar>
        </Popover>
        <Popover
          placement="bottomRight"
          content={<Button type="danger">Xóa</Button>}
          trigger="click"
        >
          <Avatar
            className="mx-1"
            size="small"
            style={{ color: "white", backgroundColor: "#3f6600" }}
          >
            9
          </Avatar>
        </Popover>
        <Popover
          placement="bottomRight"
          content={
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Cấp 1</Option>
              <Option value="lucy">Cấp 2</Option>
            </Select>
          }
          trigger="click"
        >
          <Avatar
            className="mx-1"
            size="small"
            style={{ color: "white", backgroundColor: "#8c8c8c" }}
          >
            +
          </Avatar>
        </Popover>
      </>
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
    description:
      " helloword123helloword123helloword123 helloword123helloword123helloword123 ",
  },
  {
    key: "2",
    name: "Jim Green",
    description:
      " helloword123helloword123helloword123 helloword123helloword123helloword123 ",
  },
  {
    key: "3",
    name: "Joe Black",
    description:
      " helloword123helloword123helloword123 helloword123helloword123helloword123 ",
  },
  {
    key: "4",
    name: "Joe Black",
    description:
      " helloword123helloword123helloword123 helloword123helloword123helloword123 ",
  },
  {
    key: "5",
    name: "Joe Black",
    description:
      " helloword123helloword123helloword123 helloword123helloword123helloword123 ",
  },
  {
    key: "6",
    name: "Joe Black",
    description:
      " helloword123helloword123helloword123 helloword123helloword123helloword123 ",
  },
  {
    key: "7",
    name: "Joe Black",
    description:
      " helloword123helloword123helloword123 helloword123helloword123helloword123 ",
  },
];

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});
export default function ListGroup() {
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
    <h3 className="text-center mt-3">DANH SÁCH NHÓM</h3>
      <Row>
        <Col span={4}>
          <AddGroup />
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
