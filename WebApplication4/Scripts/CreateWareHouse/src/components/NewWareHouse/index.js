import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getCity, getCountryAll, getDistrict, getWard } from "../../utils/Service";
import { validate } from "../../utils/validate";
import ISO from "../../assets/huongdi.json";
import TableWareHouseArea from "./TableWareHouseArea";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
function CreateNewWareHouse(props) {
  const [wareHouseInfo, setWareHouseInfo] = useState({
    NAME: undefined,
    LOCATION: undefined,
    COUNTRYCODE: undefined,
    CITYCODE: undefined,
    DISTRICTCODE: undefined,
    WARDCODE: undefined,
    IDPARTNER: undefined,
    WAREHOUSEAREA: [],
  });
  const [acceptOrderCityCodes, setAcceptOrderCityCodes] = useState(ISO);
  const [showFormWareHouseArea, setShowFormWareHouseArea] = useState("No");
  const [countryCode, setCountryCode] = useState([]);
  const [cityCode, setCityCode] = useState([]);
  const [districtCode, setDistrictCode] = useState([]);
  const [wardCode, setWardCode] = useState([]);
  useEffect(async () => {
    const country = await getCountryAll();
    const abc = country.responses;
    setCountryCode(abc);
  }, []);
  const [form] = Form.useForm();

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        return;

      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        return;

      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
    }
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };
  const handleChangeVal = (e) => {
    let { name, value } = e.target;

    setWareHouseInfo({ ...wareHouseInfo, [name]: value });
  };
  const onSelectShowArea = (e) => {
    setShowFormWareHouseArea(e);
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "20px 30px", textAlign: "center" }}>
      <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
        <h4>Tạo Kho</h4>
        <Row gutter={[16]}>
          <Col md={24} xl={12}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="NAME"
              label="Tên Kho"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="NAME" placeholder="Tên kho" />
            </Form.Item>
          </Col>
          <Col md={24} xl={12}>
            <Form.Item
              name="LOCATION"
              label="Địa điểm"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="LOCATION" placeholder="Điểm đặt kho" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16]}>
          <Col md={12} xl={12} xxl={6}>
            <Form.Item name="COUNTRYCODE" rules={[validate.checkRequire()]} label="Quốc gia" required>
              <Select
                name="COUNTRYCODE"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn quốc gia"
                onChange={async (e) => {
                  setWareHouseInfo({ ...wareHouseInfo, COUNTRYCODE: e });
                  const city = await getCity(e);
                  setCityCode(city);
                }}
                value={wareHouseInfo.COUNTRYCODE ? "Vui lòng chọn" : wareHouseInfo.COUNTRYCODE}
              >
                {countryCode?.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} xl={12} xxl={6}>
            <Form.Item name="CITYCODE" rules={[validate.checkRequire()]} label="Thành phố/Tỉnh" required>
              <Select
                name="CITYCODE"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn tỉnh / thành phố"
                onChange={async (e) => {
                  setWareHouseInfo({ ...wareHouseInfo, CITYCODE: e });
                  const District = await getDistrict(wareHouseInfo.COUNTRYCODE, e);
                  await setDistrictCode(District);
                }}
                value={wareHouseInfo.CITYCODE ? "Vui lòng chọn" : wareHouseInfo.CITYCODE}
              >
                {cityCode?.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} xl={12} xxl={6}>
            <Form.Item rules={[validate.checkRequire()]} name="DISTRICTCODE" label="Quận/Huyện" required>
              <Select
                name="DISTRICTCODE"
                size="middle"
                placeholder="Chọn quận / huyện"
                value={wareHouseInfo.DISTRICTCODE ? "Vui lòng chọn" : wareHouseInfo.DISTRICTCODE}
                style={{ width: "100%" }}
                onChange={async (e) => {
                  setWareHouseInfo({ ...wareHouseInfo, DISTRICTCODE: e });
                  const ward = await getWard(wareHouseInfo.COUNTRYCODE, wareHouseInfo.CITYCODE, e);
                  await setWardCode(ward);
                }}
              >
                {districtCode?.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} xl={12} xxl={6}>
            <Form.Item rules={[validate.checkRequire()]} name="WARDCODE" label="Phường/Xã" required>
              <Select
                name="WARDCODE"
                size="middle"
                placeholder="Chọn xã / PHƯỜNG"
                value={wareHouseInfo.WARDCODE ? "Vui lòng chọn" : wareHouseInfo.WARDCODE}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setWareHouseInfo({ ...wareHouseInfo, WARDCODE: e });
                }}
              >
                {wardCode?.map((item, index) => {
                  return (
                    <Select.Option key={item.id} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16]}>
          <Col md={24} xl={12}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="IDPARTNER"
              label="Mã Đối Tác"
              tooltip={{
                title: "Cần thiết để quản lí kho",
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={24} xl={12}>
            <Form.Item
              name="WAREHOUSEAREA"
              label="Chia Khu"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Chia khu" defaultValue="No" onChange={onSelectShowArea} allowClear>
                <Select.Option value="No">Không chia khu</Select.Option>
                <Select.Option value="Yes">Tạo khu ngay</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {showFormWareHouseArea === "Yes" ? <TableWareHouseArea data={acceptOrderCityCodes} /> : null}
        <Form.Item {...tailLayout} style={{ textAlign: "end" }}>
          <Button type="primary" htmlType="submit">
            Tạo Kho
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateNewWareHouse;
