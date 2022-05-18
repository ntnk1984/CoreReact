import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Tooltip, message, InputNumber, Row, Col, Typography } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { contextValue } from "../App";
import "./Style/TableListOrder.css";
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

function TableListOrder() {
  const context = useContext(contextValue);
  const { importOrderList } = context?.createOrderList;
  // console.log(importOrderList, "account 123");

  const [form] = Form.useForm();
  const [data, setData] = useState();
  // console.log(data, "data");
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    setData(importOrderList);
  }, [importOrderList]);
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
      title: "Hs code",
      dataIndex: "HSCode",
      align: "center",
      width: "75px",
      // editable: true,
      fixed: "left",
      sorter: (a, b) => a.HSCode.length - b.HSCode.length,
    },
    {
      title: "Tên người nhận",
      dataIndex: "ReceiverName",
      width: "150px",
      align: "center",
      editable: true,
    },
    {
      title: "SĐT Người Nhận",
      dataIndex: "ReceiverPhone",
      align: "center",
      width: "100px",
      editable: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "ReceiverAddress",
      align: "center",
      width: "100px",
      editable: true,
    },
    {
      title: "Quốc Gia",
      dataIndex: "ReceiverCountryCode",
      align: "center",
      width: "100px",
      editable: true,
    },
    {
      title: "Thành phố",
      dataIndex: "ReceiverCityCode",
      align: "center",
      width: "100px",
      editable: true,
    },
    {
      title: "Quận/ Huyện",
      dataIndex: "ReceiverDistrictCode",
      align: "center",
      width: "100px",
      editable: true,
    },
    {
      title: "Phường/ Xã",
      dataIndex: "ReceiverWardCode",
      align: "center",
      width: "100px",
      editable: true,
    },
    {
      title: "Bưu Chính",
      dataIndex: "ReceiverPostalCode",
      align: "center",
      width: "90px",
      editable: true,
    },
    {
      title: "Dài",
      dataIndex: "Length",
      align: "center",
      width: "70px",
      editable: true,
    },
    {
      title: "Rộng",
      dataIndex: "Width",
      align: "center",
      width: "70px",
      editable: true,
    },
    {
      title: "Cao",
      dataIndex: "Height",
      align: "center",
      width: "70px",
      editable: true,
    },
    {
      title: "Cân Nặng",
      dataIndex: "Weight",
      align: "center",
      width: "70px",
      editable: true,
    },
    {
      title: "COD",
      dataIndex: "COD",
      align: "center",
      width: "70px",
      editable: true,
    },
    {
      title: "ĐVTT",
      dataIndex: "Currency",
      align: "center",
      width: "70px",
      editable: true,
    },
    {
      title: "Tên VN",
      dataIndex: "VietNameseName",
      align: "center",
      width: "150px",
      editable: true,
    },
    {
      title: "English Name",
      dataIndex: "EnglishName",
      align: "center",
      width: "150px",
      editable: true,
    },
    {
      title: "QGSX",
      dataIndex: "CountryManufacturedCode",
      align: "center",
      width: "75px",
      editable: true,
    },
    {
      title: "Loại",
      dataIndex: "Unit",
      align: "center",
      width: "75px",
      editable: true,
    },
    {
      title: "Giá trị",
      dataIndex: "Value",
      align: "center",
      width: "75px",
      editable: true,
    },
    {
      title: "SL",
      dataIndex: "Quantity",
      align: "center",
      width: "75px",
      editable: true,
    },

    // {
    //   title: "Chỉnh Sửa",
    //   dataIndex: "operation",
    //   width: "15%",
    //   align: "center",

    //   render: (_, record) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link
    //           onClick={() => {
    //             save(record.key);

    //             // GỬi Reacod để gọi api chỉnh sửa
    //           }}
    //           style={{
    //             marginRight: 8,
    //           }}
    //         >
    //           Lưu
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <a>Thoát</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
    //         Sửa
    //       </Typography.Link>
    //     );
    //   },
    // },
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
    <div className="tableListOrder" style={{ marginBottom: "30px" }}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          scroll={{ x: "200px", y: "90vh" }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>
  );
}

export default () => <TableListOrder />;
