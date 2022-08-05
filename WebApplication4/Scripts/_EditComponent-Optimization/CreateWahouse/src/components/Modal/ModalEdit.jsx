import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, InputNumber, message, Row, Select, TreeSelect } from "antd";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { postWarehouseApi, updateWarehouseApi } from "../../Service";

const { Option } = Select;
const { TreeNode } = TreeSelect;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function ModalEdit(props) {
  const { volumetricFunc, onCancelModal, propertiesArea, propertiesWH, dataEdit, onReLoad, updateRecord } = props;
  const [emptyVolume, setEmptyVolume] = useState();
  const [valueTree, setValueTree] = useState([]); // Tree Value

  const [isDisable, setIsDisable] = useState(false);
  const [isPropertyForm, setIsPropertyForm] = useState(false);
  const initialValueEdit = { NAME: "", WIDTH: "", LENGTH: "", HEIGHT: "", PROPERTY: "", LOADED: 0 };
  const initialValueEditValidate = {
    NAME: "",
    LOCATION: "",
    WIDTH: "",
    LENGTH: "",
    HEIGHT: "",
    PROPERTY: "",
    CUBICVOLUME: "",
  };
  const [editInfo, setEditInfo] = useState({ ...initialValueEdit });
  const [editInfoValidate, setEditInfoValidate] = useState({ ...initialValueEditValidate });
  const [form] = Form.useForm();
  const isShowProperty = () => {
    if (dataEdit?.LISTBIN?.length === 0) {
      setIsPropertyForm(true);
    } else if (dataEdit?.LISTBOX?.length === 0) {
      setIsPropertyForm(true);
    } else if (dataEdit?.IDBIN) {
      setIsPropertyForm(true);
    } else {
      setIsPropertyForm(false);
    }
  };
  const handleTypeKeyApi = (key, data) => {
    switch (key) {
      case "LISTAREA":
        return {
          Type: "UPDATE_WAREHOUSE",
          UpdateWarehouseRequest: data,
        };
      case "LISTBIN":
        return {
          Type: "UPDATE_AREA",
          UpdateAreaRequest: data,
        };
      case "LISTBOX":
        return {
          Type: "UPDATE_BIN",
          UpdateBinRequest: data,
        };
      default:
        return {
          Type: "UPDATE_BOX",
          UpdateBoxRequest: data,
        };
    }
  };
  useEffect(() => {
    if (dataEdit) {
      setEmptyVolume(dataEdit.CAPACITY - (dataEdit.LOADED - dataEdit.LENGTH * dataEdit.WIDTH * dataEdit.HEIGHT));
      isShowProperty();
    }
  });

  useEffect(() => {
    let defaultValue = {
      NAME: "",
      WIDTH: "",
      HEIGHT: "",
      LENGTH: "",
    };
    form.setFieldsValue({ ...defaultValue });
    let temp = [];
    const { LOCATION, PROPERTY } = dataEdit || [];
    let temp2 = {
      NAME: dataEdit?.NAME,
      WIDTH: dataEdit?.WIDTH,
      HEIGHT: dataEdit?.HEIGHT,
      LENGTH: dataEdit?.LENGTH,
    };
    if (dataEdit.WAREHOUSECODE) {
      temp = dataEdit?.PROPERTY?.split(",");

      form.setFieldsValue({ ...temp2, PROPERTY: temp });
      setEditInfo({ ...temp2, PROPERTY: temp });
      return;
    } else {
      if (dataEdit?.PROPERTY && Object.keys(dataEdit?.PROPERTY).length) {
        Object.keys(dataEdit?.PROPERTY).map((key) => dataEdit?.PROPERTY[key].map((x) => temp.push(key + "_" + x)));
        setValueTree(temp);
        form.setFieldsValue({ ...temp2, PROPERTY: temp, LOCATION });
        setEditInfo({ ...temp2, PROPERTY, LOCATION });
      } else {
        form.setFieldsValue({ ...temp2, PROPERTY: temp, LOCATION });
        setEditInfo({ ...temp2, PROPERTY, LOCATION });
      }
    }
  }, [emptyVolume, dataEdit.ID, dataEdit.NAME, dataEdit.LENGTH, dataEdit.HEIGHT, dataEdit.WIDTH, dataEdit.PROPERTY]);

  const onReset = () => {
    form.resetFields(["NAME", "WIDTH", "LENGTH", "HEIGHT", "PROPERTY", "LOADED", "LOCATION"]);
  };
  const onFinish = (values) => {
    setTimeout(() => {
      onCancelModal({});
      onReset();
    }, 500);
  };
  const onCancel = () => {
    setEditInfo(initialValueEdit);
    setEditInfoValidate(initialValueEditValidate);
    setEmptyVolume();
    setIsPropertyForm(false);
    setValueTree([]);
    onReset();
    onCancelModal();
  };
  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setEditInfo({ ...editInfo, [name]: value });

    if (value) {
      setEditInfoValidate({ ...editInfoValidate, [name]: "" });
    } else {
      setEditInfo({ ...editInfo, [name]: "" });
      setEditInfoValidate({ ...editInfoValidate, [name]: "Vui lòng Nhập" });
    }
  };

  async function postDataWHApi(data) {
    let res = await postWarehouseApi(data);
    return res;
  }
  const errMesager = (e = "Vui lòng nhập đầy đủ thông tin") => message.error(e);
  const successMesager = (e = "Chỉnh sửa thành công!") => message.success(e);

  const handleSubmitForm = async () => {
    let valid = true;
    setIsDisable(true);
    Object.keys(editInfo).forEach((key) => {
      if (editInfo[key] === "") {
        setEditInfoValidate((pre) => ({
          ...pre,
          [key]: "Vui Lòng Nhập",
        }));
        setIsDisable(false);
        valid = false;
        errMesager();
      }
    });
    if (valid) {
      const { LENGTH, WIDTH, HEIGHT } = editInfo;
      let total = +(LENGTH * WIDTH * HEIGHT);
      if (total > emptyVolume) {
        setEditInfoValidate((pre) => ({
          ...pre,
          CUBICVOLUME: "Thể tích đã lớn hơn thể tích còn lại ",
        }));
        valid = false;
        errMesager(`Thể tích đã lớn hơn thể tích còn lại ${total + " / " + emptyVolume}`);
        setIsDisable(false);
      } else {
        let CAPACITY = volumetricFunc(editInfo);

        let temp = {
          ...editInfo,
          CAPACITY,
        };
        //Api
        let keyType = Object.keys(dataEdit).find((x) => x.includes("LIST"));
        let dataEditClone = { ...dataEdit, ...temp };
        if (dataEditClone.PROPERTY) {
          if (dataEditClone?.PROPERTY?.length === 0 || Object.keys(dataEditClone.PROPERTY).length === 0) {
            dataEditClone.PROPERTY = null;
          }
        }

        var json_request = handleTypeKeyApi(keyType, dataEditClone);
        // console.log(json_request, " json_request");
        let res = await updateWarehouseApi(json_request, onReLoad);

        if (res) {
          let arrCode = res?.CODE?.split("_") || [res?.WAREHOUSECODE];
          let length = arrCode.length;
          updateRecord(length, arrCode, res);
          successMesager();
          onCancel();
        }
      }
    }
  };
console.log(propertiesArea,"propertiesArea");

  const TreeSelectRender = () => {
    const onChange = (newValue) => {
      let temp = {
        RECEIVEPROVINCE: [],
        SERVICE: [],
        VULL: [],
      };
      newValue.forEach((x) => {
        let a = x.split("_");
        temp[a[0]].push(a[1]);
      });

      setEditInfo({ ...editInfo, PROPERTY: temp });
      setValueTree(newValue);
      if (newValue.length) {
        setEditInfoValidate({ ...editInfoValidate, PROPERTY: "" });
      } else {
        setEditInfoValidate({ ...editInfoValidate, PROPERTY: "Vui Lòng chọn thuộc tính" });
      }
    };

    return (
      <TreeSelect
        showSearch
        style={{
          width: "100%",
        }}
        value={valueTree}
        // defaultValue={value}
        dropdownStyle={{
          maxHeight: 400,
          overflow: "auto",
        }}
        placeholder="Chọn thuộc tính"
        treeCheckable={true}
        allowClear
        multiple
        status={editInfoValidate.PROPERTY ? "error" : "default"}
        onChange={onChange}
      >
        {Object.keys(propertiesArea).map((key, index) => {
          return (
            <TreeNode key={`ALL` + key} value={`ALL` + key} title={"Nhóm " + (index + 1)}>
              {propertiesArea[key].map((item) => (
                <TreeNode key={key + "_" + item.CODE} value={key + "_" + item.CODE} title={item.NAME}></TreeNode>
              ))}
            </TreeNode>
          );
        })}
      </TreeSelect>
    );
  };
  const SelectWarehouse = () => {
    const onChange = (newValue) => {
      setEditInfo({ ...editInfo, PROPERTY: newValue });
      if (newValue.length) {
        setEditInfoValidate({ ...editInfoValidate, PROPERTY: "" });
      } else {
        setEditInfoValidate({ ...editInfoValidate, PROPERTY: "Vui Lòng chọn thuộc tính" });
      }
    };
    return (
      <Select
        mode="multiple"
        name="PROPERTY"
        allowClear
        style={{
          width: "100%",
        }}
        placeholder="Vui lòng chọn đặc tính kho"
        onChange={onChange}
      >
        {propertiesWH.map((item, index) => {
          return (
            <Select.Option key={index} value={item.ID}>
              {item.NAME}
            </Select.Option>
          );
        })}
      </Select>
    );
  };
  return (
    <div style={{ minHeight: "50vh", textAlign: "center" }}>
      <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
        <Row gutter={[16]}>
          <Col md={24} xl={12}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="NAME"
              label="Tên "
              help={
                editInfoValidate.NAME && <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập tên !</span>
              }
            >
              <Input status={editInfoValidate.NAME ? "error" : "default"} name="NAME" placeholder="Tên " />
            </Form.Item>
          </Col>
          <Col md={24} xl={12}>
            {!!dataEdit.WAREHOUSECODE ? null : (
              <Form.Item
                name="LOCATION"
                label="Vị trí"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                help={
                  editInfoValidate.LOCATION && (
                    <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập vị trí!</span>
                  )
                }
              >
                <Input status={editInfoValidate.LOCATION ? "error" : "default"} name="LOCATION" placeholder="Vị đặt" />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Row
          gutter={[16]}
          style={{ border: !!editInfoValidate.CUBICVOLUME ? "3px solid red" : "initial", position: "relative" }}
        >
          <Col md={8} xl={8}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="LENGTH"
              label="Chiều dài (cm)"
              help={
                editInfoValidate.LENGTH && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều dài!</span>
                )
              }
            >
              <InputNumber
                status={editInfoValidate.LENGTH ? "error" : "default"}
                placeholder="Nhập chiều dài"
                style={{ width: "100%" }}
                name="LENGTH"
                min={0}
              />
            </Form.Item>
          </Col>
          <Col md={8} xl={8}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="WIDTH"
              label="Chiều rộng (cm)"
              help={
                editInfoValidate.WIDTH && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều rộng!</span>
                )
              }
            >
              <InputNumber
                status={editInfoValidate.WIDTH ? "error" : "default"}
                placeholder="Nhập chiều rộng"
                style={{ width: "100%" }}
                name="WIDTH"
                min={0}
              />
            </Form.Item>
          </Col>
          <Col md={8} xl={8}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="HEIGHT"
              label="Chiều cao (cm)"
              help={
                editInfoValidate.HEIGHT && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều cao!</span>
                )
              }
            >
              <InputNumber
                status={editInfoValidate.HEIGHT ? "error" : "default"}
                placeholder="Nhập chiều cao"
                style={{ width: "100%" }}
                name="HEIGHT"
                min={0}
              />
            </Form.Item>
          </Col>
          {!!editInfoValidate.CUBICVOLUME && (
            <span style={{ color: "red", position: "absolute", bottom: 0, right: 0 }}>
              {editInfoValidate.CUBICVOLUME}
            </span>
          )}
        </Row>
        <Row gutter={[16, 10]}>
          <Col md={24} xl={24} xxl={24}>
            {dataEdit?.WAREHOUSECODE ? (
              <Form.Item
                help={
                  editInfoValidate.PROPERTY && (
                    <span style={{ color: "red", fontSize: "12px" }}>Vui lòng chọn thuộc tính!</span>
                  )
                }
                name="PROPERTY"
                label="Thuộc tính"
              >
                {SelectWarehouse()}
              </Form.Item>
            ) : (
              !!isPropertyForm && (
                <Form.Item
                  help={
                    editInfoValidate.PROPERTY && (
                      <span style={{ color: "red", fontSize: "12px" }}>Vui lòng chọn thuộc tính!</span>
                    )
                  }
                  name="PROPERTY"
                  label="Thuộc tính"
                >
                  {TreeSelectRender()}
                </Form.Item>
              )
            )}
          </Col>
        </Row>

        <Form.Item {...tailLayout} style={{ textAlign: "end" }}>
          <Button type="default" onClick={onCancel}>
            Thoát
          </Button>
          <Button
            // disabled={isDisable}
            type="primary"
            onClick={handleSubmitForm}
          >
            Hoàn Tất
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ModalEdit;
