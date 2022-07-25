import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, InputNumber, message, Row, Select, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import { postWarehouseApi } from "../../Service";

const { Option } = Select;
const { TreeNode } = TreeSelect;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
let dataAPi = {
  RECEIVEPROVINCE: [
    {
      NAME: "Hồ Chí Minh",
      CODE: "SG",
    },
  ],
  SERVICE: [
    {
      NAME: "Giao Hàng Nhanh",
      CODE: "GHN",
    },
  ],
  VULL: [
    {
      NAME: "Đông Lạnh",
      CODE: "DL",
    },
  ],
};
function CreateNewBox(props) {
  const { makeid, onCancelModal, propertiesArea, handleListBox, activeBinNewBox, volumetricFunc } = props;
  const [emptyVolume, setEmptyVolume] = useState();
  const [valueTree, setValueTree] = useState([]); // Tree Value
  const [valueAPi, setValueApi] = useState({
    RECEIVEPROVINCE: [],
    SERVICE: [],
    VULL: [],
  }); // Tree Value
  const [boxInfo, setBoxInfo] = useState({
    NAME: "",
    LOCATION: "",
    WIDTH: "",
    LENGTH: "",
    PROPERTY: "",
    HEIGHT: "",
  });
  const [boxInfoValidate, setBoxInfoValidate] = useState({
    NAME: "",
    LOCATION: "",
    WIDTH: "",
    LENGTH: "",
    HEIGHT: "",
    PROPERTY: "",
    CUBICVOLUME: "",
  });

  const [isDisable, setIsDisable] = useState(false);
  // const [isPropertyForm, setIsPropertyForm] = useState(true);
  const [form] = Form.useForm();
  useEffect(() => {
    if (activeBinNewBox) {
      setEmptyVolume(activeBinNewBox.CAPACITY - activeBinNewBox.LOADED);
    }
  }, [activeBinNewBox]);

  // // Chỉnh sửa ô, load property đã có lên state
  // useEffect(() => {
  //   let temp = [];
  //   Object.keys(dataAPi).map((key) => dataAPi[key].map((x) => temp.push(key + "-" + x.CODE)));
  //   setValueTree(temp);
  //   setBoxInfo({...boxInfo, PROPERTY: dataAPi})
  //   form.setFieldsValue({ PROPERTY: temp})
  // }, [activeBinNewBox]);

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    setTimeout(() => {
      onCancelModal({});
      onReset();
    }, 500);
  };

  async function postDataBinApi(data) {
    let res = await postWarehouseApi(data);
    return res;
  }

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setBoxInfo({ ...boxInfo, [name]: value });

    if (value) {
      setBoxInfoValidate({ ...boxInfoValidate, [name]: "" });
    } else {
      setBoxInfo({ ...boxInfo, [name]: "" });
      setBoxInfoValidate({ ...boxInfoValidate, [name]: "Vui lòng Nhập" });
    }
  };
  const handleSubmitForm = async () => {
    let valid = true;
    // setIsDisable(true);
    Object.keys(boxInfo).forEach((key) => {
      if (boxInfo[key] === "") {
        console.log(key, " key");
        setBoxInfoValidate((pre) => ({
          ...pre,
          [key]: "Vui Lòng Nhập",
        }));
        setIsDisable(false);
        valid = false;
      }
    });
    if (valid) {
      const { LENGTH, WIDTH, HEIGHT } = boxInfo;
      let total = +((LENGTH * WIDTH * HEIGHT) / 6000).toFixed();
      if (total > emptyVolume) {
        setBoxInfoValidate((pre) => ({
          ...pre,
          CUBICVOLUME: "Thể tích Ô đã lớn hơn thể tích còn lại của kệ",
        }));
        valid = false;
        setIsDisable(false);
      } else {
        // setTimeout(() => {

        let CAPACITY = volumetricFunc(boxInfo);

        let temp = {
          ...boxInfo,
          CODE: makeid(activeBinNewBox, activeBinNewBox.LISTBOX, "X"),
          CAPACITY,
          IDBin: activeBinNewBox.ID,
        };
        var json_request = {
          Type: "ADD_BOX",
          AddBoxRequest: temp,
        };
        let res = await postDataBinApi(json_request);
        if (res) {
          message.success("Tạo Ô Thành Công");
          console.log(res,"ress");
          handleListBox({ boxInfo: temp, volume: total, idBin: activeBinNewBox.CODE });
          setBoxInfo({ NAME: "", LOCATION: "", WIDTH: "", LENGTH: "", HEIGHT: "", PROPERTY: "" });
          setBoxInfoValidate({
            NAME: "",
            LOCATION: "",
            WIDTH: "",
            LENGTH: "",
            HEIGHT: "",
            PROPERTY: "",
            CUBICVOLUME: "",
          });
          // setIsPropertyForm(false);
          onCancelModal();
          onReset();
          setIsDisable(false);
        } else {
          message.error("Tạo ô thất bại");
        }

        // }, 500);
      }
    }
  };

  // const checkShowPropety = (e) => {
  //   const key = "PROPERTY";
  //   const checked = e.target.checked;
  //   if (checked) {
  //     setBoxInfo({ ...boxInfo, PROPERTY: "" });
  //   } else {
  //     const { [key]: foo, ...rest } = boxInfo;
  //     setBoxInfo(rest);
  //   }
  //   setIsPropertyForm(checked);
  // };

  const TreeSelectRender = () => {
    const onChange = (newValue) => {
      let temp = {
        RECEIVEPROVINCE: [],
        SERVICE: [],
        VULL: [],
      };
      newValue.forEach((x) => {
        let a = x.split("-");
        temp[a[0]].push(a[1]);
      });
      setBoxInfo({ ...boxInfo, PROPERTY: temp });
      setValueTree(newValue);
      if (newValue.length) {
        setBoxInfoValidate({ ...boxInfoValidate, PROPERTY: "" });
      } else {
        setBoxInfoValidate({ ...boxInfoValidate, PROPERTY: "Vui Lòng chọn thuộc tính" });
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
          maxHeight: 200,
          overflow: "auto",
        }}
        placeholder="Chọn thuộc tính Ô"
        treeCheckable={true}
        allowClear
        multiple
        status={boxInfoValidate.PROPERTY ? "error" : "default"}
        onChange={onChange}
      >
        {Object.keys(propertiesArea).map((key, index) => {
          return (
            <TreeNode key={`ALL` + key} value={`ALL` + key} title={"Nhóm " + (index + 1)}>
              {propertiesArea[key].map((item) => (
                <TreeNode key={key + "-" + item.CODE} value={key + "-" + item.CODE} title={item.NAME}></TreeNode>
              ))}
            </TreeNode>
          );
        })}
      </TreeSelect>
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
              label="Tên Ô"
              help={
                boxInfoValidate.NAME && <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập tên Ô!</span>
              }
            >
              <Input status={boxInfoValidate.NAME ? "error" : "default"} name="NAME" placeholder="Tên Ô" />
            </Form.Item>
          </Col>
          <Col md={24} xl={12}>
            <Form.Item
              name="LOCATION"
              label="Vị trí đặt Ô"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              help={
                boxInfoValidate.LOCATION && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập vị trí!</span>
                )
              }
            >
              <Input status={boxInfoValidate.LOCATION ? "error" : "default"} name="LOCATION" placeholder="Vị đặt Ô" />
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={[16]}
          style={{ border: !!boxInfoValidate.CUBICVOLUME ? "3px solid red" : "initial", position: "relative" }}
        >
          <Col md={8} xl={8}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="LENGTH"
              label="Chiều dài (cm)"
              help={
                boxInfoValidate.LENGTH && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều dài!</span>
                )
              }
            >
              <InputNumber
                status={boxInfoValidate.LENGTH ? "error" : "default"}
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
                boxInfoValidate.WIDTH && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều rộng!</span>
                )
              }
            >
              <InputNumber
                status={boxInfoValidate.WIDTH ? "error" : "default"}
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
                boxInfoValidate.HEIGHT && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều cao!</span>
                )
              }
            >
              <InputNumber
                status={boxInfoValidate.HEIGHT ? "error" : "default"}
                placeholder="Nhập chiều cao"
                style={{ width: "100%" }}
                name="HEIGHT"
                min={0}
              />
            </Form.Item>
          </Col>
          {!!boxInfoValidate.CUBICVOLUME && (
            <span style={{ color: "red", position: "absolute", bottom: 0, right: 0 }}>
              {boxInfoValidate.CUBICVOLUME}
            </span>
          )}
        </Row>
        <Row gutter={[16, 10]}>
          {/* <Col md={24} xl={24} xxl={24} style={{ textAlign: "left" }}>
            <Checkbox checked={isPropertyForm} onChange={checkShowPropety}>
              Chia thuộc tính
            </Checkbox>
          </Col> */}
          {/* {isPropertyForm && ( */}
          <Col md={24} xl={24} xxl={24}>
            <Form.Item
              help={
                boxInfoValidate.PROPERTY && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng chọn thuộc tính!</span>
                )
              }
              name="PROPERTY"
              label="Thuộc tính Ô  giúp đơn hàng thu gom có thể nhận biết Ô có phù hợp hay không"
            >
              {TreeSelectRender()}
            </Form.Item>
          </Col>
          {/* )} */}
        </Row>

        <Form.Item {...tailLayout} style={{ textAlign: "end" }}>
          <Button disabled={isDisable} type="primary" onClick={handleSubmitForm}>
            Tạo Ô
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateNewBox;
