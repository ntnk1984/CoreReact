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

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      console.log(e.target.id);
      switch (e.target.id) {
        case "length":
          record.dimension.length = +e.target.value;
          handleSave({ ...record, ...values });
          break;

        case "width":
          record.dimension.width = +e.target.value;
          handleSave({ ...record, ...values });
          break;

        case "height":
          record.dimension.height = +e.target.value;
          handleSave({ ...record, ...values });
          break;

        case "weight":
          record.dimension.weight = +e.target.value;
          handleSave({ ...record, ...values });
          break;
        default:
          break;
      }
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
        <InputNumber
          ref={inputRef}
          onPressEnter={save}
          onBlur={(e) => {
            save(e);
          }}
        />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function LPackageLineItems() {
  const context = useContext(contextValue);
  const { listOrder } = context?.createOrder;
  const dataSourceStore = listOrder?.RequestedPackageLineItems;

  const [dataSources, setDataSources] = useState({
    dataSource: dataSourceStore,
    count: 1,
  });

  // useEffect(() => {
  //   context.dispatch({ type: "ADD_PACKAGE_LINE_ITEMS", payload: dataSources.dataSource });
  //   console.log("123 126");
  // }, [dataSources]);

  const addPackageLine = () => {
    context.dispatch({ type: "ADD_PACKAGE_LINE_ITEMS", payload: dataSources.dataSource });
    console.log("123 126");
  };
  console.log(dataSourceStore, "Data store 130");
  const columns = [
    {
      title: "Chiều Dài",
      dataIndex: "length",
      align: "center",
      render: (_, record) => record.dimension.length,
      width: "20%",
      editable: true,
    },
    {
      title: "Chiều Rộng",
      dataIndex: `width`,
      align: "center",
      render: (_, record) => record.dimension.width,
      width: "20%",
      editable: true,
    },
    {
      title: "Chiều Cao",
      dataIndex: "height",
      align: "center",
      render: (_, record) => record.dimension.height,
      width: "20%",
      editable: true,
    },
    {
      title: "Cân Nặng",
      align: "center",
      dataIndex: "weight",
      render: (_, record) => record.dimension.weight,
      width: "20%",
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
            <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const { count, dataSource } = dataSources;
    const newData = {
      key: `${count}`,
      SequenceNumber: count,
      dimension: {
        length: 10 + count,
        width: 10 + count,
        height: 10 + count,
        weight: 10 + count,
      },
      currency: "VND",
      COD: count,
      packagetype: 1,
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
    console.log(row, "row");
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
    // console.log(col, " colll");
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
    <div>
      <div>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <h3 style={{ textAlign: "center", padding: "0" }} className="text-secondary ">
              Bưu Gửi
            </h3>
          </Col>
          <Col
            style={{ paddingRight: "24px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}
            span={8}
          >
            <Button
              size="small"
              onClick={handleAdd}
              type="primary"
              style={{
                marginBottom: 5,
              }}
            >
              Thêm Bưu Gửi
            </Button>
          </Col>
        </Row>
      </div>

      <Table
        components={components}
        style={{ minHeight: "140px" }}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns1}
        size="small"
        scroll={{ y: 140 }}
        pagination={false}
      />
      <Button id="LPackageLineId" style={{ display: "none" }} type="dashed" onClick={addPackageLine}>
        Submit
      </Button>
    </div>
  );
}

export default () => <LPackageLineItems />;
