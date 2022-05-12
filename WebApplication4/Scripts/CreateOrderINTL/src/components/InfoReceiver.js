import React, { useContext, useState } from "react";
import { Select, Steps } from "antd";
import { Form, Input, Button, Row, Col, message } from "antd";
import { contextValue } from "../App";
import { validate } from "../until/validate";

function InfoReceiver(props) {
  const context = useContext(contextValue);
  const temp = context?.creatOrderINTL.receiver;
  const countryCodes = context?.creatOrderINTL.CountryCodes;

  const [receiverInfo, setReceiverInfo] = useState({
    receivername: temp.receivername,
    receiverphone: temp.receiverphone,
    phoneregioncode: temp.phoneregioncode,
    receiveraddress: temp.receiveraddress,
    receiveremail: temp.receiveremail,
    receivercountry: temp.receivercountry,
    receivercity: temp.receivercity,
    receiverdistrict: temp.receiverdistrict,
    receiverward: temp.receiverward,
  });
  const handleChangeVal = (e) => {
    let { name, value } = e.target;
    setReceiverInfo({ ...receiverInfo, [name]: value });
  };
  console.log(receiverInfo);
  const onFinish = () => {
    context.dispatch({
      type: "ADD_INFO_RECEIVER_INTL",
      payload: receiverInfo,
    });
    // context.dispatch({ type: "SET_PROGRESS" });
  };

  const onFinishFailed = () => {
    message.error("Vui lòng nhập đầy đủ thông tin");
  };
  return (
    <div className="CustomFormInput" style={{ width: "100%" }}>
      <Form
        size="small"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className=" rounded rounded-3 p-3 shadow-sm"
        style={{ background: "white", minWidth: "100%" }}
      >
        <h4 className="text-secondary mx-2">Người Nhận</h4>
        <Row>
          <Col span={17}>
            <Form.Item
              name="receivername"
              rules={[validate.checkRequire(), validate.checkName()]}
              className="mx-2"
              label="Tên người gửi"
              required
            >
              <Input
                placeholder="Vui lòng nhập"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                name="receivername"
                size="middle"
                value={receiverInfo.receivername}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="receiveremail"
              // rules={[validate.checkRequire(), validate.checkMail()]}
              className="mx-2"
              label="Email"
              // required
            >
              <Input
                name="receiveremail"
                size="middle"
                placeholder="Vui lòng nhập"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={receiverInfo.receiveremail}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={17}>
            <Form.Item
              name="receiverphone"
              rules={[validate.checkRequire()]}
              className="mx-2"
              label="Số điện thoại"
              required
            >
              <Row>
                <Col span={8}>
                  <Select
                    showSearch
                    size="middle"
                    // name={name}
                    style={{ width: "100%" }}
                    placeholder="Number Phone"
                    optionFilterProp="children"
                    defaultValue="(+84) Vietnam"
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    filterSort={(optionA, optionB) =>
                      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(e) => {
                      console.log(e);
                    }}
                  >
                    {countryCodes.map((item, index) => {
                      let name = `(${item.dial_code}) ${item.name}`;
                      // let value = `${item.first_name} ${item.last_name} `;
                      return (
                        <Select.Option key={index} value={name}>
                          {name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col span={16}>
                  <Input
                    name="receiverphone"
                    type="number"
                    size="middle"
                    placeholder="Vui lòng nhập"
                    onChange={(e) => {
                      handleChangeVal(e);
                    }}
                    value={receiverInfo.receiverphone}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              // rules={[validate.checkRequire(), validate.checkCodePost()]}
              name="phoneregioncode"
              className="mx-2"
              label="Mã bưu chính"
              // required
            >
              <Input
                name="phoneregioncode"
                size="middle"
                placeholder="Vui lòng nhập"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={receiverInfo.phoneregioncode}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              rules={[validate.checkRequire()]}
              name="receiveraddress"
              className="mx-2"
              label="Địa chỉ"
              required
            >
              <Input
                name="receiveraddress"
                size="middle"
                placeholder="Vui lòng nhập"
                onChange={(e) => {
                  handleChangeVal(e);
                }}
                value={receiverInfo.receiveraddress}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12} xl={12} xxl={6}>
            <Form.Item
              rules={[validate.checkRequire()]}
              name="receivercountry"
              className="mx-2"
              label="Quốc gia"
              required
            >
              <Select
                name="receivercountry"
                size="middle"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setReceiverInfo({ ...receiverInfo, receivercountry: e });
                }}
                placeholder="Chọn quốc gia"
                value={receiverInfo.receivercountry ? "Vui lòng chọn" : receiverInfo.receivercountry}
              >
                <Option value="VN">Việt Nam</Option>
                <Option value="CAM">Campuchia</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} xl={12} xxl={6}>
            <Form.Item
              rules={[validate.checkRequire()]}
              name="receivercity"
              className="mx-2"
              label="Thành phố/Tỉnh"
              required
            >
              <Select
                name="receivercity"
                size="middle"
                placeholder="Chọn tỉnh / thành phố"
                value={receiverInfo.receivercity ? "Vui lòng chọn" : receiverInfo.receivercity}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setReceiverInfo({ ...receiverInfo, receivercity: e });
                }}
              >
                <Option value="HCM">Hồ Chí Minh</Option>
                <Option value="HN">Hà Nội</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button
            id="FormTwo"
            style={{ display: "none" }}
            trigger="click"
            className="mx-2"
            size="middle"
            type="primary"
            htmlType="submit"
          >
            Tiếp tục
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default InfoReceiver;
