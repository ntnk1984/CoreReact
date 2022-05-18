import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Tooltip, message, InputNumber, Row, Col, Typography } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { contextValue } from "../App";
import { UpdateAccountApi } from "../Service";
// const EditableContext = React.createContext(null);

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function TableAccount() {
  const context = useContext(contextValue);
  const { importAccounts, listAccount } = context?.createAccount;

  const [form] = Form.useForm();
  const [data, setData] = useState();

  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    setData(listAccount);
  }, [listAccount]);
  const isEditing = (record) => record.account === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      userName: "",
      numberPhone: "",
      password: "",
      ...record,
    });
    setEditingKey(record.account);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.account);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        const dataPost = { ...item, ...row };
        // Gửi lên  { ...item, ...row } API  để thay đổi
        UpdateAccountApi(dataPost);
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      key: "account",
      title: "Tài Khoản",
      dataIndex: "account",
      align: "center",
      width: "20%",
      // editable: true,
      // sorter: (a, b) => a.FullName.length - b.FullName.length,
    },
    {
      key: "fullName",
      title: "Họ Tên",
      dataIndex: "fullName",
      align: "center",
      width: "20%",
      editable: true,
      sorter: (a, b) => a.FullName.length - b.FullName.length,
    },

    {
      key: "phone",
      title: "Số Điện Thoại",
      dataIndex: "phone",
      width: "20%",
      align: "center",
      editable: true,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      align: "center",
      width: "15%",
      editable: true,
    },
    {
      key: "address",
      title: "Địa chỉ",
      dataIndex: "address",
      align: "center",
      width: "15%",
      editable: true,
    },
    {
      key: "active",
      title: "Khóa Người Dùng",
      dataIndex: "active",
      width: "15%",
      align: "center",

      render: (_, record) => {
        let activeKey = record.key % 2 === 0;
        return (
          <>
            {activeKey ? (
              <Tooltip title="Ấn Để Mở Khóa" color="red" key={record.account}>
                <ion-icon
                  onClick={() => {
                    // Status Set khóa người dùng,
                    console.log(record.account);
                  }}
                  style={{ fontSize: " 24px", color: " #EB5353", cursor: "pointer" }}
                  name="lock-closed-outline"
                ></ion-icon>
              </Tooltip>
            ) : (
              <Tooltip title="Ấn Để Khóa" color="geekblue" key={record.account}>
                <Popconfirm title="Bạn muốn Khóa" onConfirm={cancel}>
                  <ion-icon
                    onClick={() => {
                      // Status Set khóa người dùng,
                      console.log(record.account);
                    }}
                    style={{ fontSize: " 24px", color: " #73777B", cursor: "pointer" }}
                    name="lock-open-outline"
                  ></ion-icon>
                </Popconfirm>
              </Tooltip>
            )}
          </>
        );
      },
    },
    {
      key: "operation",
      title: "Chỉnh Sửa",
      dataIndex: "operation",
      width: "15%",
      align: "center",

      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => {
                save(record.account);
                // GỬi Reacod để gọi api chỉnh sửa
              }}
              style={{
                marginRight: 8,
              }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn muốn hủy thao tác?" onConfirm={cancel}>
              <a>Thoát</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
            Sửa
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
}

export default () => <TableAccount />;
