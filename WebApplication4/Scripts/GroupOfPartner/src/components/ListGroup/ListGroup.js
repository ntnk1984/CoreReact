import React, { useEffect, useMemo, useState } from "react";
import { getAllGroup, removeGroupById } from "../../services/Groups.js";
import AddGroup from "./ChildListGroup/AddGroup.js";
import EditGroup from "./ChildListGroup/EditGroup.js";
import ListUserGroup from "./ChildListGroup/ListUserGroup.js";
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
  Space,
  Table,
  Typography,
} from "antd";
import { useDebouncedCallback } from "use-debounce";
const { Text } = Typography;
export default function ListGroup() {
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
  function confirmRemoveMultiGroup(data) {
    Modal.confirm({
      title: "Xác nhận xóa nhiều nhóm",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có muốn xóa nhiều nhóm ",
      okText: "Đồng ý",
      cancelText: "Trở lại",
      onOk: async () => {
        /*call API tạo user cho partner*/
        await data.forEach((item) => {
          removeGroupById(item.id);
        });
        await handleRefeshData();
      },
    });
  }

  /* Từ khóa tìm kiếm */
  const [search, setSearch] = useState("");

  /* Danh sách bảng nhóm */
  const [dataGroup, setDataGroup] = useState([]);

  const dataTable = dataGroup.filter((item) => {
    if (search == "") return true;
    else return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });
  const dataTableMap = dataTable.map((item, index) => {
    return { ...item, key: index };
  });


  /* Refesh lại bảng sau khi đã xử lý */
  const handleRefeshData = async () => {
    const res = await getAllGroup();
    await setDataGroup(res);
  };

  //set lại từ khóa tìm kiếm
  const onSearch = useDebouncedCallback((searchText) => {
    setSearch(searchText);
  }, 500);

  //Ẩn hiện bảng tạo mới group
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const columns = [
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
  const [list, setList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKey, item) => {
    setSelectedRowKeys(selectedRowKey);
    setList(item);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <Row>
        <Col span={4}>
          <AddGroup handle={handleRefeshData} />

          <Button
            className="mx-2"
            onClick={() => {
              confirmRemoveMultiGroup(list);
            }}
            icon={<DeleteOutlined />}
          ></Button>
        </Col>

        <Col span={4} offset={16} className="d-flex justify-content-end">
          <AutoComplete
            style={{ width: 200 }}
            onSearch={onSearch}
            placeholder="Nhập tên cần tìm..."
          />
        </Col>
      </Row>
      <div>
        <Table
          className="mt-3"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataTableMap}
          pagination={{ pageSize: 13 }}
        />
      </div>
      <Drawer placement="right" onClose={onClose} visible={visible}>
        <ListUserGroup />
      </Drawer>
    </>
  );
}
