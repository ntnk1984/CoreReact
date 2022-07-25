import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  DirectionsRenderer,
  DirectionsService,
  Circle,
} from "@react-google-maps/api";

// import ISO from "../../assets/huongdi.json";

import { getCity, getCountryAll, getDistrict, getWard, postWarehouseApi } from "../../Service";

const { Option } = Select;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
function CreateNewWareHouse(props) {
  const { handleDataCreateNewWH, onCancelModal, propertiesWH } = props;
  const [wareHouseInfo, setWareHouseInfo] = useState({
    NAME: "",
    LOCATION: "1 Nguyễn Thái Sơn, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh",
    COUNTRYCODE: "",
    CITYCODE: "",
    DISTRICTCODE: "",
    WARDCODE: "",
    IDPARTNER: "",
    LOADED: 0,
    CORORDINATES: "10.816041241243504,106.67967080863245",
    PROPERTY: "",
    LISTAREA: [],
    LENGTH:"",
    WIDTH:"",
    HEIGHT:"",
    CAPACITY:""
  });
  // const [acceptOrderCityCodes, setAcceptOrderCityCodes] = useState(ISO);

  const [countryCode, setCountryCode] = useState([]);
  const [cityCode, setCityCode] = useState([]);
  const [districtCode, setDistrictCode] = useState([]);
  const [wardCode, setWardCode] = useState([]);

  /// GGMap
  console.log(wareHouseInfo, "111");
  const [location, setLocation] = useState();
  const [locationAutocomplete, setLocationAutocomplete] = useState();
  const onLocationLoad = (autocomplete) => {
    setLocationAutocomplete(autocomplete);
  };
  const libraries = ["places"];
  const onLocationPointChanged = () => {
    // setSuiTableData([])
    if (locationAutocomplete !== null) {
      let a = locationAutocomplete.getPlace();
      let lng = a.geometry.location.lng();
      let lat = a.geometry.location.lat();
      setLocation(a.formatted_address);
      setWareHouseInfo((prev) => ({ ...prev, LOCATION: a.formatted_address, CORORDINATES: lat + "," + lng }));
    }
  };
  ///end GGMap
  async function GetAllCoutry() {
    const country = await getCountryAll();
    const abc = country.responses;
    setCountryCode(abc);
  }

  useEffect(() => {
    GetAllCoutry();
  }, []);
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  async function postDataWHApi(data) {
    let res = await postWarehouseApi(data);
    console.log(res," resssss line 84");
    return res;
  }
  const onFinish = async(values) => {
    let CAPACITY = (wareHouseInfo.LENGTH* wareHouseInfo.WIDTH* wareHouseInfo.HEIGHT)
    var json_request = {
      Type: "ADD_WAREHOUSE",
      AddWarehouseRequest: {...wareHouseInfo, CAPACITY },
    };

   let res = await postDataWHApi(json_request);
   if(res){
    let mapProperty = res.PROPERTY.split(",");
    let temp = {...res, PROPERTY: mapProperty}
    handleDataCreateNewWH({ ...temp });
    setTimeout(() => {
      onCancelModal();
      onReset();
    }, 500);
   }
   
  };

  const handleChangeVal = (e) => {
    let { name, value } = e.target;

    setWareHouseInfo({ ...wareHouseInfo, [name]: value });
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", textAlign: "center",  }}>
      <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
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
              label="Địa chỉ"
              onChange={(e) => {
                handleChangeVal(e);
              }}
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
            >
              {/* <Input name="LOCATION" placeholder="Điểm đặt kho" /> */}

              <LoadScript googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg" libraries={libraries}>
                <GoogleMap>
                  <Autocomplete name="LOCATION" onLoad={onLocationLoad} onPlaceChanged={onLocationPointChanged}>
                    <Input
                      name="LOCATION"
                      placeholder="Điểm đặt kho"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Autocomplete>
                  <></>
                </GoogleMap>
              </LoadScript>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16]}>
          <Col md={8} xl={8}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="LENGTH"
              label="Chiều dài (cm)"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber placeholder="Nhập chiều dài" style={{ width: "100%" }} name="LENGTH" min={0} />
            </Form.Item>
          </Col>
          <Col md={8} xl={8}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="WIDTH"
              label="Chiều rộng (cm)"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber placeholder="Nhập chiều rộng" style={{ width: "100%" }} name="WIDTH" min={0} />
            </Form.Item>
          </Col>
          <Col md={8} xl={8}>
            <Form.Item
              onChange={(e) => {
                handleChangeVal(e);
              }}
              name="HEIGHT"
              label="Chiều cao (cm)"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber placeholder="Nhập chiều cao" style={{ width: "100%" }} name="HEIGHT" min={0} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16]}>
          <Col md={12} xl={12} xxl={6}>
            <Form.Item
              name="COUNTRYCODE"
              rules={[
                {
                  required: true,
                },
              ]}
              label="Quốc gia"
              required
            >
              <Select
                name="COUNTRYCODE"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn quốc gia"
                onChange={async (e) => {
                  setWareHouseInfo({
                    ...wareHouseInfo,
                    COUNTRYCODE: e,
                    CITYCODE: undefined,
                    DISTRICTCODE: undefined,
                    WARDCODE: undefined,
                  });

                  const city = await getCity(e);
                  setCityCode(city);
                }}
                value={wareHouseInfo.COUNTRYCODE}
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
            <Form.Item
              name="CITYCODE"
              rules={[
                {
                  required: true,
                },
              ]}
              label="Thành phố/Tỉnh"
              required
            >
              <Select
                name="CITYCODE"
                size="middle"
                style={{ width: "100%" }}
                placeholder="Chọn tỉnh / thành phố"
                onChange={async (e) => {
                  setWareHouseInfo({ ...wareHouseInfo, CITYCODE: e });
                  const District = await getDistrict(wareHouseInfo.COUNTRYCODE, e);
                  setDistrictCode(District);
                }}
                value={wareHouseInfo.CITYCODE ? wareHouseInfo.CITYCODE : undefined}
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
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="DISTRICTCODE"
              label="Quận/Huyện"
            >
              <Select
                name="DISTRICTCODE"
                size="middle"
                placeholder="Chọn quận / huyện"
                value={wareHouseInfo.DISTRICTCODE ? "Vui lòng chọn" : wareHouseInfo.DISTRICTCODE}
                style={{ width: "100%" }}
                onChange={async (e) => {
                  setWareHouseInfo({ ...wareHouseInfo, DISTRICTCODE: e });
                  const ward = await getWard(wareHouseInfo.COUNTRYCODE, wareHouseInfo.CITYCODE, e);
                  setWardCode(ward);
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
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="WARDCODE"
              label="Phường/Xã"
              required
            >
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
                    <Select.Option key={index} value={item.code}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col md={24} xl={24} xxl={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="PROPERTY"
              label="Đặc tính của kho giúp đơn hàng thu gom có thể nhận biết kho có phù hợp hay không"
            >
              <Select
                mode="multiple"
                name="PROPERTY"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Vui lòng chọn đặc tính kho"
                onChange={(e) => {
                  setWareHouseInfo({ ...wareHouseInfo, PROPERTY: e });
                }}
              >
                {propertiesWH.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.ID}>
                      {item.NAME}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

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
