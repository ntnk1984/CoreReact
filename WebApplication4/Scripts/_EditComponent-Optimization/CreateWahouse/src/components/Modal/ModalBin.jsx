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
function CreateNewBin(props) {
  const { makeid, onCancelModal, propertiesArea, handleListBin, activeAreaNewBin,volumetricFunc } = props;
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
    if (activeAreaNewBin) {
      // let temp = +((activeAreaNewBin.LENGTH * activeAreaNewBin.HEIGHT * activeAreaNewBin.WIDTH) / 6000).toFixed();
      setEmptyVolume(activeAreaNewBin.CAPACITY - activeAreaNewBin.LOADED);
    }
  }, [activeAreaNewBin]);



  const [binInfo, setBinInfo] = useState({
    NAME: "",
    LOCATION: "",
    WIDTH: "",
    LENGTH: "",
    HEIGHT: "",
    LOADED: 0,
  });
  const [binInfoValidate, setBinInfoValidate] = useState({
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
    setTimeout(() => {
      onCancelModal({});
      onReset();
    }, 500);
  };

  async function postDataAreaApi(data) {
    let res = await postWarehouseApi(data);
    return res;
  }

  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setBinInfo({ ...binInfo, [name]: value });

    if (value) {
      setBinInfoValidate({ ...binInfoValidate, [name]: "" });
    } else {
      setBinInfo({ ...binInfo, [name]: "" });
      setBinInfoValidate({ ...binInfoValidate, [name]: "Vui lòng Nhập" });
    }
  };
  const handleSubmitForm = async () => {
    let valid = true;
    setIsDisable(true);
    Object.keys(binInfo).forEach((key) => {
      if (binInfo[key] === "") {
        // console.log(key, " key");
        setBinInfoValidate((pre) => ({
          ...pre,
          [key]: "Vui Lòng Nhập",
        }));
        setIsDisable(false);
        valid = false;
      }
    });
    if (valid) {
      const { LENGTH, WIDTH, HEIGHT } = binInfo;
      let total = +(LENGTH * WIDTH * HEIGHT) ;
      if (total > emptyVolume) {
        setBinInfoValidate((pre) => ({
          ...pre,
          CUBICVOLUME: "Thể tích kệ đã lớn hơn thể tích còn lại của kệ",
        }));
        valid = false;
        setIsDisable(false);
      } else {
        // setTimeout(() => {
        let CAPACITY = volumetricFunc(binInfo);

        let temp = { ...binInfo, CODE: makeid(activeAreaNewBin,activeAreaNewBin.LISTBIN,"B"), CAPACITY,IDArea: activeAreaNewBin.ID };
        var json_request = {
          Type: "ADD_BIN",
          AddBinRequest: temp,
        };
        console.log(json_request," json_request");
        let res = await postDataAreaApi(json_request);
        if (res) {
          message.success("Tạo Kệ Thành Công");

          handleListBin({ binInfo: res, volume: total, idArea: activeAreaNewBin.CODE });
          setBinInfo({ NAME: "", LOCATION: "", WIDTH: "", LENGTH: "", HEIGHT: "" });
          setBinInfoValidate({
            NAME: "",
            LOCATION: "",
            WIDTH: "",
            LENGTH: "",
            HEIGHT: "",
            PROPERTY: "",
            CUBICVOLUME: "",
          });
          setIsPropertyForm(false);
          onCancelModal();
          onReset();
          setIsDisable(false);
        }

        // }, 500);
      }
    }
  };

  const checkShowPropety = (e) => {
    const key = "PROPERTY";
    const checked = e.target.checked;
    if (checked) {
      setBinInfo({ ...binInfo, PROPERTY: "" });
    } else {
      const { [key]: foo, ...rest } = binInfo;
      setBinInfo(rest);
    }
    setIsPropertyForm(checked);
  };

  const TreeSelectRender = () => {
    const onChange = (newValue) => {
      console.log(newValue," new Value");
      let temp = {
        RECEIVEPROVINCE: [],
        SERVICE: [],
        VULL: [],
      };
      newValue.forEach((x) => {
        let a = x.split("__");
        console.log(a," split");
        temp[a[0]].push(a[1]);
      });
      console.log(temp," temp");
      setBinInfo({ ...binInfo, PROPERTY: temp });
      setValueTree(newValue);
      if (newValue.length) {
        setBinInfoValidate({ ...binInfoValidate, PROPERTY: "" });
      } else {
        setBinInfoValidate({ ...binInfoValidate, PROPERTY: "Vui Lòng chọn thuộc tính" });
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
          // overflow: "auto",
        }}
        placeholder="Chọn thuộc tính kệ"
        treeCheckable={true}
        allowClear
        multiple
        status={binInfoValidate.PROPERTY ? "error" : "default"}
        onChange={onChange}
      >
        {Object.keys(propertiesArea).map((key, index) => {
          return (
            <TreeNode key={`ALL` + key} value={`ALL` + key} title={"Nhóm " + (index + 1)}>
              {propertiesArea[key].map((item) => (
                <TreeNode key={key + "__" + item.CODE} value={key + "__" + item.CODE} title={item.NAME}></TreeNode>
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
              label="Tên kệ"
              help={
                binInfoValidate.NAME && <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập tên kệ!</span>
              }
            >
              <Input status={binInfoValidate.NAME ? "error" : "default"} name="NAME" placeholder="Tên kệ" />
            </Form.Item>
          </Col>
          <Col md={24} xl={12}>
            <Form.Item
              name="LOCATION"
              label="Vị trí đặt kệ"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              help={
                binInfoValidate.LOCATION && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập vị trí!</span>
                )
              }
            >
              <Input status={binInfoValidate.LOCATION ? "error" : "default"} name="LOCATION" placeholder="Vị đặt kệ" />
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={[16]}
          style={{ border: !!binInfoValidate.CUBICVOLUME ? "3px solid red" : "initial", position: "relative" }}
        >
          <Col md={8} xl={8}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="LENGTH"
              label="Chiều dài (cm)"
              help={
                binInfoValidate.LENGTH && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều dài!</span>
                )
              }
            >
              <InputNumber
                status={binInfoValidate.LENGTH ? "error" : "default"}
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
                binInfoValidate.WIDTH && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều rộng!</span>
                )
              }
            >
              <InputNumber
                status={binInfoValidate.WIDTH ? "error" : "default"}
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
                binInfoValidate.HEIGHT && (
                  <span style={{ color: "red", fontSize: "12px" }}>Vui lòng nhập chiều cao!</span>
                )
              }
            >
              <InputNumber
                status={binInfoValidate.HEIGHT ? "error" : "default"}
                placeholder="Nhập chiều cao"
                style={{ width: "100%" }}
                name="HEIGHT"
                min={0}
              />
            </Form.Item>
          </Col>
          {!!binInfoValidate.CUBICVOLUME && (
            <span style={{ color: "red", position: "absolute", bottom: 0, right: 0 }}>
              {binInfoValidate.CUBICVOLUME}
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
                  binInfoValidate.PROPERTY && (
                    <span style={{ color: "red", fontSize: "12px" }}>Vui lòng chọn thuộc tính!</span>
                  )
                }
                name="PROPERTY"
                label="Thuộc tính kệ  giúp đơn hàng thu gom có thể nhận biết kệ có phù hợp hay không"
              >
                {TreeSelectRender()}
              </Form.Item>
            </Col>
          )}
        </Row>

        <Form.Item {...tailLayout} style={{ textAlign: "end" }}>
          <Button disabled={isDisable} type="primary" onClick={handleSubmitForm}>
            Tạo kệ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateNewBin;
