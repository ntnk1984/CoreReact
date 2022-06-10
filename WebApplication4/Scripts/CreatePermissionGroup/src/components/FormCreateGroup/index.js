import { Button, Col, Form, Input, message, Modal, Popconfirm, Row, Select, Table, Tag } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function CreatePermisGroup(props) {
  // chọn nhóm quyên

  const [dataTable, setDataTable] = useState([
    {
      key: 1,
      groupName: "Nhóm của các đại ca",
      groupCode: "NHOM-01-ADMIN",
      permission: ["QuanLy", "TG", "CTV", "SeoManager", "BTV", "SeoEditor", "Tester"],
      description: "Nhóm dành cho nhan viên bảo hành, bảo trì hệ thống",
    },
    {
      key: 2,
      groupName: "Nhóm người dùng mới",
      groupCode: "NHOM-02-ADMIN",
      permission: ["CTV"],
      description: "Nhóm dành cho những người dùng mới, new user,....",
    },
    {
      key: 3,
      groupName: "Nhóm SEO",
      groupCode: "NHOM-03-ADMIN",
      permission: ["SeoManager", "SeoEditor"],
      description: "Nhóm dành cho SEO ",
    },
    {
      key: 4,
      groupName: "Nhóm Tester",
      groupCode: "NHOM-04-ADMIN",
      permission: ["Tester"],
      description: "Nhóm này là dành cho bạn đấy teser à....",
    },
  ]);
  const [dataEdit, setDataEdit] = useState();
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [dataNewGroup, setDataNewGroup] = useState();
  const [visibleNew, setVisibleNew] = useState(false);

  const typingTimeOutRef = useRef(null);
  // delay 0.5s giữa mỗi lần gõ kí tự trên bàn phím hạn chế việc set lại State
  const keyBoardTypingTime = (fSetState) => {
    if (typingTimeOutRef.current) clearTimeout(typingTimeOutRef.current);
    typingTimeOutRef.current = setTimeout(() => {
      fSetState();
    }, 500);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    const setStateInputEditF = () => setDataEdit({ ...dataEdit, [name]: value });
    const setSateInputNewGroupF = () => setDataNewGroup({ ...dataNewGroup, [name]: value });
    if (dataEdit) {
      keyBoardTypingTime(setStateInputEditF);
      return;
    } else {
      keyBoardTypingTime(setSateInputNewGroupF);
      return;
    }
  };
  const handleChangeSelect = (e) => {
    const setStateSelectEditF = () => setDataEdit({ ...dataEdit, permission: e });
    const setStateSelectNewGroupF = () => setDataNewGroup({ ...dataNewGroup, permission: e });
    if (dataEdit) {
      keyBoardTypingTime(setStateSelectEditF);
      return;
    } else {
      keyBoardTypingTime(setStateSelectNewGroupF);
      return;
    }
  };
  const [form] = Form.useForm();
  const onFillEdit = (value) => {
    form.setFieldsValue({
      groupName: value?.groupName,
      description: value?.description,
      permission: value?.permission,
    });
  };
  const createNewPresGroup = (props = undefined) => {
    return (
      <div className="create-group">
        <Form layout="vertical" form={form} name="control-hooks">
          <Form.Item name="groupName" label="Tên nhóm">
            <Input name="groupName" placeholder="Vui lòng nhập tên nhóm" onChange={handleChange} />
          </Form.Item>
          <Form.Item name="description" label="Mô tả nhóm">
            <TextArea name="description" placeholder="Mô tả nhóm" onChange={handleChange} />
          </Form.Item>

          <Form.Item name="permission" label="Các quyền mà nhóm được sử dụng (Áp dụng cho tất cả các thành viên)">
            <Select
              mode="multiple"
              name="permission"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={handleChangeSelect}
            >
              <Select.Option value="QuanLy"> Quản lý</Select.Option>
              <Select.Option value="CTV"> Cộng tác viên</Select.Option>
              <Select.Option value="TG"> Tác giả</Select.Option>
              <Select.Option value="BTV"> Biên tập viên</Select.Option>
              <Select.Option value="SeoManager"> SEO manager </Select.Option>
              <Select.Option value="SeoEditor"> SEO Editor </Select.Option>
              <Select.Option value="Tester"> Tester </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  };

  // table các quyền hiện có
  const handleShowColor = (permission) => {
    switch (permission) {
      case "QuanLy":
        return <Tag color="magenta"> Quản Lý</Tag>;

      case "TG":
        return <Tag color="red">Tác Giả</Tag>;
      case "CTV":
        return <Tag color="volcano">Cộng Tác Viên</Tag>;
      case "SeoManager":
        return <Tag color="orange">Seo Manager</Tag>;
      case "BTV":
        return <Tag color="cyan">Biên tập viên</Tag>;
      case "SeoEditor":
        return <Tag color="gold">Seo Editor</Tag>;
      case "Tester":
        return <Tag color="geekblue">Tester</Tag>;

      default:
        return <Tag color="green">{permission}</Tag>;
    }
  };
  const confirm = (e) => {
    console.log(e);
    // message.success("Click on Yes");
    const temp = [...dataTable];
    const dataDeleted = temp.filter((item) => item.groupCode !== e);
    console.log(dataDeleted);
    setDataTable(dataDeleted);
  };

  const handlDataEdit = (record) => {
    setDataEdit(record);
    setVisibleEdit(true);
    onFillEdit(record);
  };
  console.log(dataEdit, "DataEdit");
  console.log(dataNewGroup, " data new");
  const columns = [
    {
      title: "Mã Nhóm",
      dataIndex: "groupCode",
      align: "center",
      width: "15%",
    },
    {
      title: "Tên Nhóm",
      dataIndex: "groupName",
      align: "center",
      width: "15%",
    },
    {
      title: "Các Quyền",
      dataIndex: "",
      align: "center",
      width: "60%",
      render: (_, { permission }) => (
        <>
          {permission.map((item, index) => {
            const tag = handleShowColor(item);
            return <span key={index}> {tag}</span>;
          })}
        </>
      ),
    },

    {
      title: "Thao Tác",
      dataIndex: "",
      align: "center",
      width: "10%",
      render: (_, record) => {
        // console.log(record);

        return (
          <>
            <span style={{ paddingRight: "20px" }}>
              <EditOutlined
                onClick={() => handlDataEdit(record)}
                style={{ cursor: "pointer", fontSize: "20px", color: "#7900FF" }}
              />
            </span>
            <Popconfirm
              placement="top"
              title="Bạn chắc chắc xóa"
              onConfirm={() => confirm(record.groupCode)}
              okText="Xóa"
              cancelText="Thoát"
            >
              <DeleteOutlined style={{ cursor: "pointer", fontSize: "20px", color: "#EB5353" }} />
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const data = dataTable;
  // end table

  // func edit Table
  const [loadingEdit, setLoadingEdit] = useState(false);
  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };
  const handleOkEdit = () => {
    const index = dataTable.findIndex((item) => item.groupCode === dataEdit.groupCode);
    dataTable.splice(index, 1, dataEdit);
    setDataTable([...dataTable]);
    setLoadingEdit(true);
    setTimeout(() => {
      setDataEdit(undefined);
      setLoadingEdit(false);
      setVisibleEdit(false);
    }, 2000);
  };

  // const modal = Modal.info()
  // const closeModal = () => modal.destroy()

  //en edit table

  // func new Group
  const handleCancelNew = () => {
    setVisibleNew(false);
  };
  const handleOkNew = () => {
    const stt = dataTable.length + 1;
    const keyTable = stt;
    const GR_CODE = `NHOM-${stt}-ADMIN`;
    dataTable.push({ ...dataNewGroup, groupCode: GR_CODE, key: keyTable });
    setDataTable([...dataTable]);
    setTimeout(() => {
      setVisibleNew(false);
    }, 1000);
  };
  const handleShowModalNewGroup = () => {
    Promise.resolve().then(setDataEdit(undefined)).then(onFillEdit(undefined)).then(setVisibleNew(true));
  };
  // end new
  return (
    <div style={{ textAlign: "center", backgroundColor: "#FFFFFF", borderRadius: "20px" }}>
      <h1 className="text-secondary pt-3" style={{ fontSize: "2rem" }}>
        Tất Cả Các Nhóm Quyền Hiện Có
      </h1>
      <div className="text-end px-3">
        <Button type="primary" onClick={handleShowModalNewGroup}>
          Thêm nhóm quyền
        </Button>
      </div>
      <div className="py-3 mt-3">
        <Table
          style={{ padding: "0 20px" }}
          columns={columns}
          bordered
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {record.description}
              </p>
            ),
          }}
          dataSource={data}
        />
      </div>
      <div className="modaEditGroup">
        <Modal
          title={<h5 className="text-secondary">Chỉnh sửa nhóm quyền!</h5>}
          centered
          visible={visibleEdit}
          // onOk={() => {
          //   setVisibleEdit(false);
          // }}
          // onCancel={() => setVisibleEdit(false)}
          width={800}
          footer={[
            <Button key="back" onClick={handleCancelEdit}>
              Thoát
            </Button>,
            <Button key="submit" type="primary" loading={loadingEdit} onClick={handleOkEdit}>
              Hoàn thành
            </Button>,
          ]}
        >
          {createNewPresGroup(dataEdit)}
        </Modal>
      </div>
      <div className="modaNewGroup">
        <Modal
          title={<h5 className="text-secondary">Tạo nhóm quyền</h5>}
          centered
          visible={visibleNew}
          // onOk={() => {
          //   setVisibleNew(false);
          // }}
          // onCancel={() => setVisibleNew(false)}
          width={800}
          footer={[
            <Button key="back" onClick={handleCancelNew}>
              Thoát
            </Button>,
            <Button key="submit" type="primary" onClick={handleOkNew}>
              Hoàn thành
            </Button>,
          ]}
        >
          {createNewPresGroup()}
        </Modal>
      </div>
    </div>
  );
}

export default CreatePermisGroup;
