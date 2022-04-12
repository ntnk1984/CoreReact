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
  Modal,
  Drawer,
} from "antd";
import {
  UserOutlined,
  AntDesignOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
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
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit... ",
    level: [0, 1, 2],
  },
  {
    key: "2",
    ID: 2,
    name: "Nhóm 1",
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit... ",
    level: [0, 1, 2, 3, 4],
  },
  {
    key: "3",
    ID: 3,
    name: "Nhóm 1",
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit... ",
    level: [0, 1, 2, 3, 4, 5],
  },
  {
    key: "4",
    ID: 4,
    name: "Nhóm 1",
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit... ",
    level: [0, 1, 2],
  },
  {
    key: "5",
    ID: 5,
    name: "Nhóm 1",
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit... ",

    level: [0, 1, 2, 9],
  },
  {
    key: "6",
    ID: 6,
    name: "Nhóm 1",
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit... ",

    level: [0, 1, 2, 4, 8],
  },
  {
    key: "7",
    ID: 7,
    name: "Nhóm 1",
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit... ",

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

      render: (text, record, index) => <a>{++index}</a>,
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
        return (
          <p className="m-0">
            {text}
            <Button className="p-0 m-0" type="link" ghost>
              Xem thêm
            </Button>
          </p>
        );
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
              <Popover
                placement="bottomRight"
                content={
                  <Button type="danger" style={{ width: 100 }}>
                    Xóa
                  </Button>
                }
                trigger="click"
              >
                <Tooltip placement="topLeft" title={"Mô tả quyền hạn"}>
                  <Avatar
                    style={{ color: "white", backgroundColor: "#bae7ff" }}
                  >
                    {item}
                  </Avatar>
                </Tooltip>
              </Popover>
            );
          })}
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
            <Avatar style={{ color: "white", backgroundColor: "#69c0ff" }}>
              +
            </Avatar>
          </Popover>
        </Avatar.Group>
      ),
    },

    {
      title: "Sửa",

      render: () => (
        <Space size="middle">
          <EditGroup />
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
        <Table className="mt-3" columns={columns} dataSource={dataGroup.data} />
      </div>
      <Drawer
        title="Danh sách thành viên"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <ListUserGroup />
      </Drawer>
    </>
  );
}
