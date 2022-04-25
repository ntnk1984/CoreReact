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
  Menu,
  Dropdown,
} from "antd";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  StopOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import AddUser from "./ChildListUser/AddUser.js";

import EditUser from "./ChildListUser/EditUser.js";
import { contextValue } from "../../App.js";
import {
  getAllUserOfPartner,
  removeUserById,
} from "../../services/UserService.js";

export default function ListUser() {
  const [options, setOptions] = useState([]);
  const { userPartner, dispatch } = useContext(contextValue);
  //search table

  const [search, setSearch] = useState("");

  const data = userPartner?.userData
    ?.filter((value) => {
      if (search == "") {
        return true;
      } else {
        return value.TaiKhoan.toLowerCase().indexOf(search.toLowerCase()) > -1;
      }
    })
    ?.map((item, index) => {
      return {
        key: index,
        name: `${item.HoTen}+${item.Ten}`,
        username: item.TaiKhoan,
        address: item.DiaChi,
        group: item.Nhom,
        active: item.KichHoat,
        hangmuc: item.HangMuc,
        congno: item.CongNo,
        id: item.id,
        dataUser: item,
      };
    });

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
      onOk: async () => {
        /*call API tạo user cho partner*/
        await removeUserById(ID);

        //reset data table
        await dispatch({
          type: "GET_ALL_USER_API",
          payload: await getAllUserOfPartner(),
        });
      },
    });
  }

  // 4.12.2020-tin tuong - confirm remove user
  function confirmRemoveMultiUser(data) {
    Modal.confirm({
      title: "Xác nhận nhiều xóa người dùng",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có muốn xóa nhiều người dùng",
      okText: "Đồng ý",
      cancelText: "Trở lại",
      onOk: async () => {
        // console.log(data);
        /*call API remove all user cho partner*/
        await data.forEach((item) => {
          removeUserById(item);
        });

        //reset data table
        await dispatch({
          type: "GET_ALL_USER_API",
          payload: await getAllUserOfPartner(),
        });
      },
    });
  }

  const { Option } = Select;
  const columns = [
    {
      title: "#",
      width: "40px",
      render: (text, record, index) => <Checkbox value={text.id}></Checkbox>,
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
      width: "150px",
      render: (text, record, index) => (
        <p>
          {record.active ? (
            <DownOutlined style={{ color: "#4E89FF" }} />
          ) : (
            <StopOutlined style={{ color: "#f5222d" }} />
          )}
        </p>
      ),
    },

    {
      title: "Thao tác",
      width: "150px",
      render: (text, record, index) => {
        const menu = (
          <Menu>
            <Menu.Item>
              <Button type="link">Active</Button>
            </Menu.Item>
            <Menu.Item>
              <EditUser data={record.dataUser} />
            </Menu.Item>
            <Menu.Item>
              <Button
                type="link"
                onClick={() => {
                  confirmRemoveUser(record.id);
                }}
              >
                Xóa
              </Button>
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button type="link" icon={<UnorderedListOutlined />}></Button>
          </Dropdown>
        );
      },
    },
  ];

  //call api search gán vào state
  const onSearch = (searchText) => {
    setSearch(searchText);
  };

  //remove user multi check box
  const [list, setList] = useState([]);

  return (
    <>
     
      <Row>
        <Col span={16} className="d-flex">
          <AddUser />
          {/* XOA NHIEU  */}
          <Button
            onClick={() => {
              confirmRemoveMultiUser(list);
            }}
            icon={<DeleteOutlined />}
          ></Button>
        </Col>
        <Col span={8} className="d-flex justify-content-end">
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
          value={list}
          onChange={(e) => {
            setList(e);
          }}
        >
          <Table className="mt-3" columns={columns} dataSource={data} />
        </Checkbox.Group>
      </div>
    </>
  );
}
