import React, { useContext, useEffect, useState } from "react";

import { Table, Switch, Space, Select, Button, DatePicker, Typography, Tag, message, Form, Input } from "antd";
import { LoadingOutlined, ReloadOutlined, RestOutlined } from "@ant-design/icons";
import { contextValue } from "../../App";
import moment from "moment";
import { GetQueryShipmentApi, PostDataAPI } from "../../utils/Service";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    align: "center",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
// rowSelection objects indicates the need for row selection

function TableCustom(props) {
  const context = useContext(contextValue);
  const [dateFortmat, setDateFortmat] = useState({
    startDate: "",
    endDate: "",
  });
  const [rowItem, setRowItem] = useState();
  const [postmanID, setPostmanID] = useState();
  const [reLoadData, setReLoadData] = useState(false);

  const [accoutNewGroup, setAccountNewGroup] = useState({ group: { groupName: "", depiction: "" }, accounts: [] });
  const [dataGroup, setDataGroup] = useState({ groupName: "", depiction: "" });
  const [hanldeShowNewGroup, setHanldeShowNewGroup] = useState(false);

  const { newUsers, listOrder, listUser } = context?.userManagerment;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // setRowItem(selectedRows);
      console.log(selectedRows), " onchange";
    },
    onSelect: (record, selected, selectedRows) => {
      // setRowItem(selectedRows);
      console.log(selectedRows, "onSelect");
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // setRowItem(selectedRows);
      console.log(selectedRows, "onSelectAll");
    },
  };
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "3",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "5",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "6",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const Postman = () => {
    return (
      <>
        <Select
          showSearch
          // name={name}
          // className="my-3"
          style={{ width: "100%" }}
          placeholder="Nhóm người dùng"
          defaultValue={postmanID}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
          onChange={(e) => {
            setPostmanID(e);
          }}
        >
          {newUsers.map((item) => {
            let name = `${item.first_name}  ${item.last_name}  ${item.phone}`;
            let value = `${item.id}  `;
            return (
              <Select.Option key={item.id} value={value}>
                {name}
              </Select.Option>
            );
          })}
        </Select>
      </>
    );
  };

  //Tạo mới nhóm
  console.log(accoutNewGroup, "accoun new");
  const SelcetAccout = () => {
    const objDefault = accoutNewGroup.accounts.slice(-1);
    const defaultValue = objDefault[0]?.Account;

    return (
      <>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Nhóm người dùng"
          defaultValue={defaultValue}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
          onChange={(e) => {
            const temp = [...accoutNewGroup.accounts];
            const item1 = listUser.filter((item) => {
              if (item.Account.trim() == e.trim()) {
                const _index = accoutNewGroup.accounts.findIndex((acc) => acc.Account.trim() === e.trim());
                if (_index === -1) {
                  temp.push(item);
                  setAccountNewGroup({ ...accoutNewGroup, accounts: temp });
                } else {
                  return message.warning("Đã thêm người dùng này");
                }
              }
            });
          }}
        >
          {listUser?.map((item, index) => {
            let name = `${item.Account} : Tên người dùng: ${item.FullName} `;
            let value = `${item.Account}  `;
            return (
              <Select.Option key={index} value={value}>
                {name}
              </Select.Option>
            );
          })}
        </Select>
      </>
    );
  };
  const AddNewGroup = () => {
    const columnAccount = [
      {
        title: "Người Dùng",
        dataIndex: "Account",
        align: "center",
        key: "Account",
      },
      {
        title: "Thông tin người dùng",
        align: "center",
        key: "FullName",
        render: (text, record) => {
          return (
            <>
              <p style={{ margin: 0, fontSize: "15px" }}>{record.FullName}</p>
              <Text style={{ fontSize: "12px" }} disabled>
                {record.Phone}
              </Text>
            </>
          );
        },
      },
      {
        title: "Xóa",
        align: "center",
        render: (_, record) => {
          return (
            <>
              <RestOutlined style={{ fontSize: "24px", color: "red", cursor: "pointer" }} />
            </>
          );
        },
      },
    ];
    // const [dataGroup, setDataGroup] = useState({ groupName: "", depiction: "" });

    const data = accoutNewGroup.accounts;
    const onFinish = () => {
      console.log("Thành Công");
    };
    const onFinishFailed = () => {
      console.log("Thất Bại");
    };
    const handleChangeValue = (e) => {
      let { name, value } = e.target;
      setAccountNewGroup({ ...accoutNewGroup, group: { ...accoutNewGroup.group, [name]: value } });
    };

    const handleSubmitForm = () => {
      document.getElementById("Btn_addNewGroupSubit").click();
      // gửi accountNewGroup lên Api
    };

    return (
      <div className="p-3">
        <h3>Tạo nhóm mới</h3>
        <div>
          <Form
            labelCol={{ xl: { span: 3 } }}
            wrapperCol={{ xl: { offset: 1, span: 20 } }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tên Nhóm"
              name="groupName"
              onChange={(e) => {
                handleChangeValue(e);
              }}
              // rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input name="groupName" placeholder="Tên Nhóm" />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="depiction"
              // rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input
                name="depiction"
                placeholder="Mô tả: Nhóm này làm gì "
                value={dataGroup.depiction}
                onChange={(e) => {
                  handleChangeValue(e);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button id="Btn_addNewGroupSubit" htmlType="submit" type="primary" style={{ display: "none" }}>
                subumit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="my-3">
          <SelcetAccout />
        </div>
        <div>
          <div className="p-3 text-end">
            {reLoadData ? (
              <LoadingOutlined />
            ) : (
              <ReloadOutlined
                onClick={() => {
                  setReLoadData(true);
                  setTimeout(() => {
                    setReLoadData(false);
                  }, 1000);
                  message.info("Tạo mới thông tin thành công!");
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
          <Table
            bordered
            scroll={{ y: "200px" }}
            pagination={false}
            dataSource={data}
            rowSelection={{ ...rowSelection }}
            columns={columnAccount}
          />
        </div>
        <div className="d-flex justify-content-betweeen m-3">
          <Button onClick={handleSubmitForm} type="primary">
            Tạo Nhóm
          </Button>
        </div>
      </div>
    );
  };
  // / tạo mới nhóm

  return (
    <div className="tableCustom">
      <div className="user-group">
        <div className="d-flex justify-content-between" style={{ background: "#FFFFFF" }}>
          <Postman />
        </div>
        <div className="tabble-group-actived mt-3" style={{ background: "#FFFFFF" }}>
          <div className="p-3" style={{ minHeight: "200px" }}>
            <Table
              bordered
              scroll={{ y: "200px" }}
              pagination={{ position: ["bottomLeft"] }}
              dataSource={dataSource}
              rowSelection={{ ...rowSelection }}
              columns={columns}
            />
          </div>
          <div className="operation text-end pb-3">
            <Button
              className="mx-3"
              type="primary"
              onClick={() => {
                setHanldeShowNewGroup(!hanldeShowNewGroup);
              }}
            >
              Thêm Mới
            </Button>
            <Button className="mx-3" type="primary">
              Xem danh sách người dùng
            </Button>
            <Button className="mx-3" danger type="primary">
              Xóa
            </Button>
          </div>
        </div>
        {hanldeShowNewGroup ? (
          <div className="mt-4" style={{ background: "#FFFFFF" }}>
            {AddNewGroup()}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TableCustom;
