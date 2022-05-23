import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Tooltip, message, InputNumber, Row, Col } from "antd";
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
    if (
      dataInd === "VietNameseName" ||
      dataInd === "EnglishName" ||
      dataInd === "CountryManufacturedCode" ||
      dataInd === "Unit" ||
      dataInd === "Currency"
    ) {
      return (
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={() => {
            save();
          }}
        />
      );
    } else if (dataInd === "Value" || dataInd === "Weight" || dataInd === "Quantity") {
      return (
        <InputNumber
          ref={inputRef}
          onPressEnter={save}
          onBlur={() => {
            save();
          }}
        />
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
  const { listOrder } = context?.archiveManager;
  const dataSourceStore = listOrder?.storageList;
  // console.log(dataSourceStore, "Data store 111");
  const [dataSources, setDataSources] = useState({
    dataSource: dataSourceStore,
    count: 1,
  });

  const columns = [
    {
      title: "Mã Khu",
      dataIndex: "code",
      align: "center",
      width: "20%",
      editable: true,
    },

    {
      title: "Tên Khu",
      dataIndex: "name",
      align: "center",
      width: "7%",
      editable: true,
    },
    {
      title: "Sức Chứa",
      dataIndex: "capacity",
      align: "center",
      width: "7%",
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
      width: "7%",
      editable: true,
    },

    {
      title: "Xóa",
      dataIndex: "operation",
      align: "center",
      width: "10%",
      render: (_, record) =>
        dataSources.dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const { count, dataSource } = dataSources;
    let randString = (Math.random() + 1).toString(36).substring(7);
    const newData = {
      key: `${count}`,
      SequenceNumber: count,
      HSCode: randString,
      VietNameseName: `Tên Tiếng Việt ${count}`,
      EnglishName: `Tên Tiếng Anh ${count}`,
      CountryManufacturedCode: `Mã Quốc Gia ${count}`,
      Unit: `Lốc  ${count}`,
      Currency: "VND",
      Value: count,
      Weight: count,
      Quantity: count,
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
      <div>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <h4 style={{ textAlign: "center", padding: "0" }} className="text-secondary ">
              Hàng Hóa
            </h4>
          </Col>
          <Col span={8}>
            <Button
              onClick={handleAdd}
              type="primary"
              style={{
                marginBottom: 5,
              }}
            >
              Thêm Sản Phẩm
            </Button>
          </Col>
        </Row>
      </div>

      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns1}
        size="small"
        scroll={{ y: "220px" }}
        pagination={false}
        style={{ minHeight: "220px" }}
      />
    </div>
  );
}

export default () => <StorageTable />;
