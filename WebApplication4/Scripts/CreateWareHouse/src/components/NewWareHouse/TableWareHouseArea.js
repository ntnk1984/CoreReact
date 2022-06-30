import { Button, Form, Input, InputNumber, Popconfirm, Select, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
const EditableContext = React.createContext(null);

const TableWareHouseArea = ({ data }) => {
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
      if (dataInd === "NAME") {
        return (
          <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={() => {
              save();
            }}
          />
        );
      } else if (dataInd === "CAPACITY" || dataInd === "TOTALWEIGHT") {
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
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
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
              message: `${title} is required.`,
            },
          ]}
        >
          {checkShowTypeInput(dataIndex)}
          {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const [dataSource, setDataSource] = useState([]);
  const [validataDataSource, setValidateDataSource] = useState([]);
  const [count, setCount] = useState(0);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "Tên Khu",
      dataIndex: "NAME",
      width: "20%",
      align: "center",
      editable: true,
    },
    {
      title: "Thể Tích",

      dataIndex: "CAPACITY",
      width: "10%",
      align: "center",
      editable: true,
    },
    {
      title: "Trọng lượng",
      dataIndex: "TOTALWEIGHT",
      width: "10%",
      align: "center",
      editable: true,
    },
    {
      title: "Hướng",
      width: "55%",
      dataIndex: "WAREHOUSEAREA",
      align: "center",
      render: (text, record) => {
        console.log(text);
        const handleChangeSelect = async (e, record) => {
          const temp = dataSource.filter((item) => item.key === record.key);
          const rows = temp[0];
          const newRows = { ...rows, WAREHOUSEAREA: e };
          //valitate
          const tempValidate = validataDataSource.filter((item) => item.key === record.key);
          const indexValidate = validataDataSource.findIndex((item) => item.key === record.key);
          if (e.length === 0) {
            const temp2 = { ...tempValidate[0], WAREHOUSEAREA: `Chưa chọn hướng dòng ${indexValidate + 1}` };
            validataDataSource.splice(indexValidate, 1, temp2);
            setValidateDataSource([...validataDataSource]);
          } else {
            const temp2 = { ...tempValidate[0], WAREHOUSEAREA: undefined };
            validataDataSource.splice(indexValidate, 1, temp2);
            setValidateDataSource([...validataDataSource]);
          }
          try {
            handleSave({ ...newRows });
          } catch (errInfo) {
            console.log("Save failed:", errInfo);
          }
        };
        return (
          <Select
            mode="multiple"
            status={
              validataDataSource.map((item) => {
                if (item.key === record.key) {
                  return item.WAREHOUSEAREA ? "default" : "error";
                }
              })
              // ? "default"
              // : "error"
            }
            defaultValue={text}
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Vui lòng chọn hướng"
            onChange={(e) => {
              handleChangeSelect(e, record);
            }}
          >
            {data?.map((item, index) => {
              return (
                <Select.Option key={index} value={item.CODE}>
                  {item.NAME}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      // editable: true,
    },
    {
      title: "Xóa",
      dataIndex: "operation",
      align: "center",
      width: "5%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Xóa</a>
          </Popconfirm>
        ) : null,
    },
  ];
  console.log(validataDataSource, " validate");
  const handleAdd = () => {
    const newData = {
      key: count,
      NAME: `Khu  ${count}`,
      CAPACITY: ` ${count}`,
      TOTALWEIGHT: `${count}`,
      WAREHOUSEAREA: undefined,
    };
    const validateData = {
      key: count,
      WAREHOUSEAREA: undefined,
    };
    setValidateDataSource([...validataDataSource, validateData]);
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  console.log(dataSource, "dât Suc");
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
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
        handleSave,
      }),
    };
  });
  return (
    <div style={{ textAlign: "end", paddingBottom: "30px" }}>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Thêm Khu
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        scroll={{ y: "200px" }}
        style={{ padding: "0", margin: "0" }}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default TableWareHouseArea;
