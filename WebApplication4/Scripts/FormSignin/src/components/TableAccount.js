import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Tooltip, message, InputNumber, Row, Col, Typography } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { contextValue } from "../App";
// const EditableContext = React.createContext(null);
const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

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
  const { importAccounts } = context?.createAccount;
  // console.log(importAccounts, "account 123");

  const [form] = Form.useForm();
  const [data, setData] = useState();
  // console.log(data, "data");
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    setData(importAccounts);
  }, [importAccounts]);
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      userName: "",
      numberPhone: "",
      password: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        console.log("row 81", { ...item, ...row });
        // Gửi lên  { ...item, ...row } API  để thay đổi
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
      title: "Tài Khoản",
      dataIndex: "userName",
      align: "center",
      width: "20%",
      // editable: true,
      sorter: (a, b) => a.userName.length - b.userName.length,
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "numberPhone",
      width: "20%",
      align: "center",
      editable: true,
    },
    {
      title: "Mật Khẩu",
      dataIndex: "password",
      align: "center",
      width: "15%",
      editable: true,
    },
    {
      title: "Khóa Người Dùng",
      dataIndex: "active",
      width: "15%",
      align: "center",

      render: (_, record) => {
        // console.log(record, "");
        let activeKey = record.key % 2 === 0;
        return (
          <>
            {activeKey ? (
              <Tooltip title="Ấn Để Mở Khóa" color="red" key={record.key}>
                <ion-icon
                  onClick={() => {
                    console.log(record.key);
                  }}
                  style={{ fontSize: " 24px", color: " #EB5353", cursor: "pointer" }}
                  name="lock-closed-outline"
                ></ion-icon>
              </Tooltip>
            ) : (
              <Tooltip title="Ấn Để Khóa" color="geekblue" key={record.key}>
                <ion-icon
                  onClick={() => {
                    console.log(record.key);
                  }}
                  style={{ fontSize: " 24px", color: " #73777B", cursor: "pointer" }}
                  name="lock-open-outline"
                ></ion-icon>
              </Tooltip>
            )}
          </>
        );
      },
    },
    {
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
                save(record.key);

                // GỬi Reacod để gọi api chỉnh sửa
              }}
              style={{
                marginRight: 8,
              }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
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
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
}

export default () => <TableAccount />;
