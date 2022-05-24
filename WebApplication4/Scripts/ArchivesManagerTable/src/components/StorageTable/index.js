import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Tooltip, message, InputNumber, Row, Col, Select } from "antd";
import { contextValue } from "../../App";
import { DeleteOutlined } from "@ant-design/icons";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const checkShowTypeInput = (dataInd) => {
    if (dataInd === "code" || dataInd === "name") {
      return (
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={() => {
            save();
          }}
        />
      );
    } else if (dataInd === "capacity") {
      return (
        <InputNumber
          min={0}
          ref={inputRef}
          onPressEnter={save}
          onBlur={() => {
            save();
          }}
        />
      );
    } else if (dataInd === "stored") {
      return (
        <InputNumber
          min={0}
          ref={inputRef}
          onPressEnter={save}
          max={record.capacity}
          onBlur={() => {
            save();
          }}
        />
      );
    } else if (dataInd === "acceptOderCityCode") {
      return (
        <Select
          ref={inputRef}
          // onPressEnter={save}
          onBlur={() => {
            save();
          }}
        >
          <Select.Option name="VN-HN" value="VN-HN">
            VN-HN
          </Select.Option>
          <Select.Option name="VN-SG" value="VN-SG">
            VN-SG
          </Select.Option>
          <Select.Option name="VN-DN" value="VN-DN">
            VN-DN
          </Select.Option>
          <Select.Option name="VN-CM" value="VN-SM">
            VN-CM
          </Select.Option>
          <Select.Option name="VN-BD" value="VN-BD">
            VN-BD
          </Select.Option>
        </Select>
      );
    }
  };

  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });

      message.success("Cập Nhật Thành Công");
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
      message.error("Sửa Thất Bại");
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Bắt Buộc`,
          },
        ]}
      >
        {checkShowTypeInput(dataIndex)}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function StorageTable() {
  const context = useContext(contextValue);
  const { storageList } = context?.archiveManager;
  const dataSourceStore = storageList.map((item, index) => ({ ...item, key: index }));
  const count = storageList.length;
  console.log(dataSourceStore, "Data store 111");
  const [dataSources, setDataSources] = useState({
    dataSource: dataSourceStore,
    count: count,
  });

  const columns = [
    {
      title: "Mã Khu",
      dataIndex: "code",
      align: "center",
      width: "15%",
      editable: true,
    },
    {
      title: "Tên Khu",
      dataIndex: "name",
      align: "center",
      width: "20%",
      editable: true,
    },
    {
      title: "Sức Chứa",
      dataIndex: "capacity",
      align: "center",
      width: "20%",
      editable: true,
    },
    {
      title: "Đang Chứa",
      dataIndex: "stored",
      align: "center",
      width: "20%",
      editable: true,
    },
    {
      title: () => {
        return (
          <Tooltip placement="topLeft" title="Phạm vi đơn hàng">
            <span>PV ĐH</span>
          </Tooltip>
        );
      },
      dataIndex: "acceptOderCityCode",
      align: "center",
      width: "15%",
      editable: true,
    },

    {
      title: "Thao Tác",
      dataIndex: "operation",
      align: "center",
      width: "10%",
      render: (_, record) =>
        dataSources.dataSource.length >= 1 ? (
          <>
            <Button type="link">Xuất Kho</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const { count, dataSource } = dataSources;
    let randString = (Math.random() + 1).toString(36).substring(7);
    const newData = {
      key: `${count}`,
      name: "Khu Mới",
      code: `SMDP ${count}`,
      capacity: 1000,
      acceptOderCityCode: "VH-SG",
      stored: 0,
    };
    setDataSources({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  // console.log(dataSources);
  const handleSave = (row) => {
    const newData = [...dataSources.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    // console.log(row, "row");
    newData.splice(index, 1, { ...item, ...row });
    setDataSources({
      ...dataSources,
      dataSource: newData,
    });
  };
  const handleDelete = (key) => {
    const dataSourceTemp = dataSources.dataSource;
    // const index = dataSources.dataSource;
    setDataSources({
      ...dataSources,
      dataSource: dataSourceTemp.filter((item) => item.key !== key),
    });
  };
  const { dataSource } = dataSources;
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns1 = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  return (
    <div style={{ minHeight: "100%" }}>
      <div className="d-flex justify-content-between">
        <div style={{ width: "calc(100%/3)" }}>
          <Select placeholder="Chọn kho" style={{ width: "50%" }}>
            <Select.Option value="HN">Kho Hà Nội</Select.Option>
            <Select.Option value="SG">Kho HCM</Select.Option>
            <Select.Option value="DL">Kho DL</Select.Option>
          </Select>
        </div>
        <h4 style={{ textAlign: "center", padding: "0", width: "calc(100%/3)" }} className="text-secondary ">
          Quản lí khu
        </h4>
        <div style={{ width: "calc(100%/3)", textAlign: "end" }}>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 5,
              // width: "calc(100%/3)",
            }}
          >
            Tạo khu mới
          </Button>
        </div>
      </div>

      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns1}
        size="small"
        scroll={{ y: "80vh" }}
        pagination={false}
        style={{ minHeight: "220px" }}
      />
    </div>
  );
}

export default () => <StorageTable />;
