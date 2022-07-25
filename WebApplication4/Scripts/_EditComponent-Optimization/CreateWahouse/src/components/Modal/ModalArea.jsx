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
function CreateNewArea(props) {
  const { volumetricFunc, makeid, onCancelModal, propertiesArea, handleListArea, activeWHNewArea } = props;
  const [emptyVolume, setEmptyVolume] = useState();
  const [valueTree, setValueTree] = useState([]); // Tree Value
  const [valueAPi, setValueApi] = useState({
    RECEIVEPROVINCE: [],
    SERVICE: [],
    VULL: [],
  }); // Tree Value

  const [isDisable, setIsDisable] = useState(false);
  const [isPropertyForm, setIsPropertyForm] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (activeWHNewArea) {
      // let temp = +((activeWHNewArea.LENGTH * activeWHNewArea.HEIGHT * activeWHNewArea.WIDTH) / 6000).toFixed();
      // setEmptyVolume(temp - activeWHNewArea.LOADED);
      setEmptyVolume(activeWHNewArea.CAPACITY - activeWHNewArea.LOADED);
    }
  }, [activeWHNewArea]);

  useEffect(() => {
    let temp = [];
    Object.keys(dataAPi).map((key) => dataAPi[key].map((x) => temp.push(key + "-" + x.CODE)));
    setValueTree(temp);
    form.setFieldsValue({ PROPERTY: temp });
  }, [activeWHNewArea]);

  const [areaInfo, setAreaInfo] = useState({
    NAME: "",
    LOCATION: "",
    WIDTH: "",
    LENGTH: "",
    HEIGHT: "",
    LOADED: 0,
  });
  const [areaInfoValidate, setAreaInfoValidate] = useState({
    NAME: "",
    LOCATION: "",
    WIDTH: "",
    LENGTH: "",
    HEIGHT: "",
    PROPERTY: "",
    CUBICVOLUME: "",
  });

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    // handleDataCreateNewWH([{ ...values, LISTAREA: [] }]);
    setTimeout(() => {
      onCancelModal({});
      onReset();
    }, 500);
  };

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setAreaInfo({ ...areaInfo, [name]: value });

    if (value) {
      setAreaInfoValidate({ ...areaInfoValidate, [name]: "" });
    } else {
      setAreaInfo({ ...areaInfo, [name]: "" });
      setAreaInfoValidate({ ...areaInfoValidate, [name]: "Vui lòng Nhập" });
    }
  };

  async function postDataWHApi(data) {
    let res = await postWarehouseApi(data);
    return res;
  }
  // const retunNumber =(arr) =>{
  //   let num =( arr.length+1).toString()
  //   if( num.length === 1){
  //     return 0 + num
  //   }else{
  //    return num
  //   }
  // }

  const handleSubmitForm = async () => {
    let valid = true;
    setIsDisable(true);
    Object.keys(areaInfo).forEach((key) => {
      if (areaInfo[key] === "") {
        setAreaInfoValidate((pre) => ({
          ...pre,
          [key]: "Vui Lòng Nhập",
        }));
        setIsDisable(false);
        valid = false;
      }
    });
    if (valid) {
      const { LENGTH, WIDTH, HEIGHT } = areaInfo;
      let total = +((LENGTH * WIDTH * HEIGHT) / 6000).toFixed();
      if (total > emptyVolume) {
        setAreaInfoValidate((pre) => ({
          ...pre,
          CUBICVOLUME: "Thể tích khu đã lớn hơn thể tích còn lại của khu",
        }));
        valid = false;
        setIsDisable(false);
      } else {
        let CAPACITY = volumetricFunc(areaInfo);
        // setTimeout(() => {

        let temp = {
          ...areaInfo,
          CODE: makeid(activeWHNewArea, activeWHNewArea.LISTAREA, "A"),
          CAPACITY,
          IDWarehouse: activeWHNewArea.ID,
        };

        //Api

        var json_request = {
          Type: "ADD_AREA",
          AddAreaRequest: temp,
        };
        let res = await postDataWHApi(json_request);
        if (res) {
          // console.log(res, " ress 148");
          handleListArea({ areaInfo: temp, volume: total, idWh: activeWHNewArea.CODE });
          setAreaInfo({ NAME: "", LOCATION: "", WIDTH: "", LENGTH: "", HEIGHT: "" });
          setAreaInfoValidate({
            NAME: "",
            LOCATION: "",
            WIDTH: "",
            LENGTH: "",
            HEIGHT: "",
            PROPERTY: "",
            CUBICVOLUME: "",
          });
          message.success("Tạo Khu Thành Công");
          setIsPropertyForm(false);
          onCancelModal();
          onReset();
          setIsDisable(false);
        }

        /// End

        // }, 500);
      }
    }
  };

  const checkShowPropety = (e) => {
    const key = "PROPERTY";
    const checked = e.target.checked;
    if (checked) {
      setAreaInfo({ ...areaInfo, PROPERTY: valueTree });
    } else {
      const { [key]: foo, ...rest } = areaInfo;
      setAreaInfo(rest);
    }
    setIsPropertyForm(checked);
  };

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
      setAreaInfo({ ...areaInfo, PROPERTY: temp });
      setValueTree(newValue);
      if (newValue.length) {
        setAreaInfoValidate({ ...areaInfoValidate, PROPERTY: "" });
      } else {
        setAreaInfoValidate({ ...areaInfoValidate, PROPERTY: "Vui Lòng chọn thuộc tính" });
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
        placeholder="Chọn thuộc tính khu"
        treeCheckable={true}
        allowClear
        multiple
        status={areaInfoValidate.PROPERTY ? "error" : "default"}
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
              label="Tên Khu"
              help={
                areaInfoValidate.NAME && <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập tên khu!</span>
              }
            >
              <Input status={areaInfoValidate.NAME ? "error" : "default"} name="NAME" placeholder="Tên khu" />
            </Form.Item>
          </Col>
          <Col md={24} xl={12}>
            <Form.Item
              name="LOCATION"
              label="Vị trí đặt khu"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              help={
                areaInfoValidate.LOCATION && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập vị trí!</span>
                )
              }
            >
              <Input
                status={areaInfoValidate.LOCATION ? "error" : "default"}
                name="LOCATION"
                placeholder="Vị đặt khu"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={[16]}
          style={{ border: !!areaInfoValidate.CUBICVOLUME ? "3px solid red" : "initial", position: "relative" }}
        >
          <Col md={8} xl={8}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="LENGTH"
              label="Chiều dài (cm)"
              help={
                areaInfoValidate.LENGTH && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều dài!</span>
                )
              }
            >
              <InputNumber
                status={areaInfoValidate.LENGTH ? "error" : "default"}
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
                areaInfoValidate.WIDTH && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều rộng!</span>
                )
              }
            >
              <InputNumber
                status={areaInfoValidate.WIDTH ? "error" : "default"}
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
                areaInfoValidate.HEIGHT && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều cao!</span>
                )
              }
            >
              <InputNumber
                status={areaInfoValidate.HEIGHT ? "error" : "default"}
                placeholder="Nhập chiều cao"
                style={{ width: "100%" }}
                name="HEIGHT"
                min={0}
              />
            </Form.Item>
          </Col>
          {!!areaInfoValidate.CUBICVOLUME && (
            <span style={{ color: "red", position: "absolute", bottom: 0, right: 0 }}>
              {areaInfoValidate.CUBICVOLUME}
            </span>
          )}
        </Row>
        <Row gutter={[16, 10]}>
          <Col md={24} xl={24} xxl={24} style={{ textAlign: "left" }}>
            <Checkbox checked={isPropertyForm} onChange={checkShowPropety}>
              Chia thuộc tính
            </Checkbox>
          </Col>
          {isPropertyForm && (
            <Col md={24} xl={24} xxl={24}>
              <Form.Item
                help={
                  areaInfoValidate.PROPERTY && (
                    <span style={{ color: "red", fontSize: "12px" }}>Vui lòng chọn thuộc tính!</span>
                  )
                }
                name="PROPERTY"
                label="Thuộc tính khu khu giúp đơn hàng thu gom có thể nhận biết khu có phù hợp hay không"
              >
                {TreeSelectRender()}
              </Form.Item>
            </Col>
          )}
        </Row>

        <Form.Item {...tailLayout} style={{ textAlign: "end" }}>
          <Button disabled={isDisable} type="primary" onClick={handleSubmitForm}>
            Tạo Khu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateNewArea;
