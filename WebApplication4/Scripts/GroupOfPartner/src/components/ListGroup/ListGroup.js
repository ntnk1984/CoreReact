import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Button,
  Col,
  Drawer,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Checkbox,
} from "antd";
import React, { useState } from "react";
import AddGroup from "./ChildListGroup/AddGroup.js";
import EditGroup from "./ChildListGroup/EditGroup.js";
import ListUserGroup from "./ChildListGroup/ListUserGroup.js";

const { Option } = Select;

// 4.12.2020-tin tuong - confirm remove group
function confirmRemoveGroup(ID) {
  Modal.confirm({
    title: "Xác nhận xóa nhóm",
    icon: <ExclamationCircleOutlined />,
    content: "Bạn có muốn xóa nhóm ",
    okText: "Đồng ý",
    cancelText: "Trở lại",
    onOk: () => {
      /*call API tạo user cho partner*/
    },
  });
}

const dataJSON = [
  {
    key: "1",
    ID: 1,
    name: "Nhóm 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    level: [0, 1, 2],
  },
  {
    key: "2",
    ID: 2,
    name: "Nhóm 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    level: [0, 1, 2, 3, 4],
  },
  {
    key: "3",
    ID: 3,
    name: "Nhóm 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    level: [0, 1, 2, 3, 4, 5],
  },
  {
    key: "4",
    ID: 4,
    name: "Nhóm 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    level: [0, 1, 2],
  },
  {
    key: "5",
    ID: 5,
    name: "Nhóm 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",

    level: [0, 1, 2, 9],
  },
  {
    key: "6",
    ID: 6,
    name: "Nhóm 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",

    level: [0, 1, 2, 4, 8],
  },
  {
    key: "7",
    ID: 7,
    name: "Nhóm 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",

    level: [0, 1],
  },
];

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function ListGroup() {
  const [options, setOptions] = useState([]);
  const [dataGroup, setDataGroup] = useState({ data: [...dataJSON] });
  //cal API search group in partner
  const onSearch = (searchText) => {
    let dataSearch = dataGroup.data.filter(
      (item) => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
    setDataGroup({ data: dataSearch });
  };

  //set drawer
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "#",

      render: (text, record, index) => <Checkbox value={text}></Checkbox>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Tag color="geekblue">{text}</Tag>,
    },
    {
      title: "Mô tả ",
      width: "450px",
      dataIndex: "description",
      render: (text) => {
        return <p className="m-0 text-over">{text}</p>;
      },
    },
    {
      title: "Thành viên ",
      dataIndex: "member",
      render: (text) => {
        return (
          <>
            <Avatar.Group>
              <Avatar style={{ backgroundColor: "#efdbff" }}>K</Avatar>
              <Avatar style={{ backgroundColor: "#efdbff" }}>M</Avatar>
              <Avatar style={{ backgroundColor: "#efdbff" }}>K</Avatar>

              <Avatar
                onClick={() => {
                  setVisible(true);
                }}
                style={{ backgroundColor: "#d3adf7", cursor: "pointer" }}
              >
                +3
              </Avatar>
              
            </Avatar.Group>
          </>
        );
      },
    },

    {
      title: "Cấp quyền",
      width: "25%",
      render: (text, record, index) => (
        <Avatar.Group>
          {record.level.map((item, index) => {
            return (
              <Tooltip placement="topLeft" title={"Mô tả quyền hạn"}>
                <Avatar style={{ color: "white", backgroundColor: "#bae7ff" }}>
                  {item}
                </Avatar>
              </Tooltip>
            );
          })}

          <Avatar style={{ color: "white", backgroundColor: "#69c0ff" }}>
            <EditGroup icon={"+"} type={"link"} style={{ color: "white" }} />
          </Avatar>
        </Avatar.Group>
      ),
    },

    {
      title: "Sửa",

      render: () => (
        <Space size="middle">
          <EditGroup icon={<EditOutlined />} type={"primary"} />
        </Space>
      ),
    },
    {
      title: "Xóa",

      render: (text, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              confirmRemoveGroup(record.ID);
            }}
            icon={<DeleteOutlined />}
            danger
          ></Button>
        </Space>
      ),
    },
  ];

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
            onSearch={onSearch}
            placeholder="Nhập tên cần tìm..."
          />
        </Col>
      </Row>
      <div>
        <Checkbox.Group style={{ width: "100%" }} >
          <Table
            className="mt-3"
            columns={columns}
            dataSource={dataGroup.data}
          />
        </Checkbox.Group>
      </div>
      <Drawer
      
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <ListUserGroup />
      </Drawer>
    </>
  );
}
