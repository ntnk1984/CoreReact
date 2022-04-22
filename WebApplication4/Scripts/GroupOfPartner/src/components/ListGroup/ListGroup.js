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
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { getAllGroup, removeGroupById } from "../../services/Groups.js";
import AddGroup from "./ChildListGroup/AddGroup.js";
import EditGroup from "./ChildListGroup/EditGroup.js";
import ListUserGroup from "./ChildListGroup/ListUserGroup.js";

const { Option } = Select;
const { Text, Link } = Typography;
export default function ListGroup() {
  //SELECT CHECKBOX
  const [listCheckBox, setListCheckBox] = useState([]);
  const [options, setOptions] = useState([]);
  const [dataGroup, setDataGroup] = useState([]);
  const [search, setSearch] = useState("");
  const dataTable = dataGroup.filter((item) => {
    if (search == "") {
      return true;
    } else {
      return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    }
  });

  const handleRefeshData = async () => {
    const res = await getAllGroup();
    await setDataGroup(res);
  };

  // 4.12.2020-tin tuong - confirm remove group
  function confirmRemoveGroup(ID) {
    Modal.confirm({
      title: "Xác nhận xóa nhóm",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có muốn xóa nhóm ",
      okText: "Đồng ý",
      cancelText: "Trở lại",
      onOk: async () => {
        /*call API tạo user cho partner*/
        await removeGroupById(ID);
        await handleRefeshData();
      },
    });
  }
  // 4.12.2020-tin tuong - confirm remove group
  function confirmRemoveMultiGroup() {
    Modal.confirm({
      title: "Xác nhận xóa nhiều nhóm",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có muốn xóa nhiều nhóm ",
      okText: "Đồng ý",
      cancelText: "Trở lại",
      onOk: async () => {
        /*call API tạo user cho partner*/
        await listCheckBox.forEach(async (item) => {
          await removeGroupById(item);
        });

        await handleRefeshData();
      },
    });
  }
  //cal API search group in partner
  const onSearch = (searchText) => {
   setSearch(searchText)
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

      render: (text, record, index) => <Checkbox value={text.id}></Checkbox>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
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
          {text.jurisdiction.map((item) => (
            <Avatar style={{ backgroundColor: "#efdbff" }}>{item}</Avatar>
          ))}
        </Avatar.Group>
      ),
    },

    {
      title: "Sửa",

      render: (text) => (
        <Space size="middle">
          <EditGroup id={text.id} icon={<EditOutlined />} type={"primary"} />
        </Space>
      ),
    },
    {
      title: "Xóa",

      render: (text, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              confirmRemoveGroup(record.id);
            }}
            icon={<DeleteOutlined />}
            danger
          ></Button>
        </Space>
      ),
    },
  ];

  useEffect(async () => {
    await handleRefeshData();
  }, []);

  return (
    <>
      {/* <h3 className="text-center mt-3">DANH SÁCH NHÓM</h3> */}
      <Row>
        <Col span={4}>
          <AddGroup handle={handleRefeshData} />

          <Button
            className="mx-2"
            onClick={() => {
              confirmRemoveMultiGroup();
            }}
            icon={<DeleteOutlined />}
          ></Button>
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
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={(e) => {
            setListCheckBox(e);
          }}
          value={listCheckBox}
        >
          <Table className="mt-3" columns={columns} dataSource={dataTable} />
        </Checkbox.Group>
      </div>
      <Drawer placement="right" onClose={onClose} visible={visible}>
        <ListUserGroup />
      </Drawer>
    </>
  );
}
