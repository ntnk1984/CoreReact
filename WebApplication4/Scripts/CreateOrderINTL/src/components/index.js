import { CheckOutlined } from "@ant-design/icons";
import { Alert, Button, Col, DatePicker, Form, Input, message, Row, Select, Spin, Tabs } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { contextValue } from "../App";
import InputSearch from "./Modal/InputSearch";
import SelectModal from "./Modal/selectModal";
import "./Style/index.css";
import { validate } from "../until/validate";

function DeliveryResults(props) {
  const { TabPane } = Tabs;
  const layout = {
    labelCol: {
      md: { span: 8 },
      lg: { span: 4 },
    },
    wrapperCol: {
      md: { span: 15 },
      lg: { offset: 1, span: 19 },
    },
  };

  const context = useContext(contextValue);
  const { inFoPostman } = context.deliveryResults;
  const typingTimesOutRef = useRef(null);

  const [tabsKey, setTabsKey] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFormErors, setShowFormErors] = useState(false);
  const updateState = (value) => {
    setSearchTerm(value);
    // console.log(value);
  };
  const [dataFormSuccess, setDataFormSuccess] = useState({
    postman: "",
    timedate: "",
  });
  const [dataFormError, setDataFormError] = useState({
    postman: "",
    timedate: "",
  });
  //showFormErors false
  const handDataFormSuccess = (e) => {
    const { name, value } = e.target;
    if (typingTimesOutRef.current) clearTimeout(typingTimesOutRef.current);

    typingTimesOutRef.current = setTimeout(() => {
      setDataFormSuccess({ ...dataFormSuccess, [name]: value });
    }, 300);
  };

  const handDataFormError = (e) => {
    const { name, value } = e.target;
    if (typingTimesOutRef.current) clearTimeout(typingTimesOutRef.current);

    typingTimesOutRef.current = setTimeout(() => {
      setDataFormError({ ...dataFormError, [name]: value });
    }, 300);
  };
  const handleNoteFormData = (e) => {
    const { name, value } = e.target;
    if (typingTimesOutRef.current) clearTimeout(typingTimesOutRef.current);

    typingTimesOutRef.current = setTimeout(() => {
      setDataFormError({ ...dataFormError, [name]: value });
      setDataFormSuccess({ ...dataFormSuccess, [name]: value });
    }, 300);
  };
  //Custom format Date
  const formatsDate = (e) => {
    if (!e) return;
    const longDate = e._d;
    console.log(longDate);
    let day = new Date(longDate).getDate();
    let month = new Date(longDate).getMonth() + 1;
    let year = new Date(longDate).getFullYear();
    let hours = new Date(longDate).getHours();
    let minute = new Date(longDate).getMinutes();

    let formats = month + "-" + day + "-" + year + " " + hours + ":" + minute;

    setDataFormSuccess({ ...dataFormSuccess, timedate: formats });
    setDataFormError({ ...dataFormError, timedate: formats });
  };

  const onFinish = () => {
    if (tabsKey) {
      console.log(dataFormError, " onfinsh error");
    } else {
      console.log(dataFormSuccess, "onfinsh success");
    }
  };
  const onFinishFailed = () => {
    console.log("onFalse ");
    message.error("Vui lòng nhập đầy đủ thông tin....");
  };
  //Render Tabs by key
  const renderTabsByKey = (e) => {
    console.log(e);
    if (e === "1") {
      setTabsKey(false);
    }
    if (e === "2") {
      setTabsKey(true);
    }
  };
  // console.log(tabsKey, "Log Key");
  const tabsSuccess = () => {
    return (
      <div style={{ width: "95%" }}>
        <Form.Item rules={!tabsKey ? [validate.checkRequire("tên người nhận")] : ""} name="receiver" label="Người nhận">
          <Input
            onChange={(e) => {
              handDataFormSuccess(e);
            }}
            placeholder="Người nhận"
            name="receiver"
          />
        </Form.Item>
        <Form.Item
          rules={!tabsKey ? [validate.checkRequire("quan hệ với người nhận hoặc 'Chính Chủ' ")] : ""}
          name="relative"
          label="Quan hệ"
        >
          <Input
            onChange={(e) => {
              handDataFormSuccess(e);
            }}
            placeholder="Quan hệ"
            name="relative"
          />
        </Form.Item>
        <Form.Item
          rules={!tabsKey ? [validate.checkRequire("giấy tờ hoặc 'Không Có' ")] : ""}
          name="exhibit"
          label="Giấy tờ"
        >
          <Input
            onChange={(e) => {
              handDataFormSuccess(e);
            }}
            placeholder="Giấy tờ"
            name="exhibit"
          />
        </Form.Item>
        <Form.Item rules={!tabsKey ? [validate.checkRequire("số tiền")] : ""} name="collectMoney" label="Tiền thu">
          <Input
            onChange={(e) => {
              handDataFormSuccess(e);
            }}
            placeholder="Tiền thu"
            name="collectMoney"
          />
        </Form.Item>
      </div>
    );
  };

  const tabsErrors = () => {
    return (
      <div style={{ width: "95%" }}>
        <Form.Item
          onChange={(e) => handDataFormError(e)}
          rules={tabsKey ? [validate.checkRequire("lý do boom hàng ")] : ""}
          name="reason"
          label="Lý do"
        >
          <Input placeholder="Lý do" name="reason" />
        </Form.Item>
        <Form.Item
          rules={tabsKey ? [validate.checkRequire("hướng xữ lý")] : ""}
          name="processDirection"
          label="Hướng xữ lý"
        >
          <Input
            onChange={(e) => {
              handDataFormError(e);
            }}
            placeholder="Hướng xữ lý"
            name="processDirection"
          />
        </Form.Item>
      </div>
    );
  };

  return (
    <div className="DeliveryResults">
      <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className="inFoReceiver ">
          <Row gutter={[48, 16]}>
            <Col md={24} lg={12}>
              <Row gutter={[48, 16]} className="receiver-left">
                <Col>
                  <label htmlFor="search-data"> Số hiệu</label>
                </Col>
                <Col>
                  <InputSearch updateState={updateState} placeholder="Nhập số hiệu . . . " />
                </Col>
              </Row>
            </Col>
            <Col md={24} lg={12}>
              <div className="receiver-right">
                <label>Người nhận: </label>
              </div>
            </Col>
          </Row>
        </div>
        <div className="formPost">
          <Row gutter={[48, 20]}>
            <Col md={24}>
              <div className="inFoPost">
                <Form.Item name="postman" rules={[validate.checkRequire("tên người bưu tá")]} label="Bưu tá:">
                  <Select
                    showSearch
                    // name={name}
                    style={{ width: "100%" }}
                    placeholder="Bưu tá"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    filterSort={(optionA, optionB) =>
                      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(e) => {
                      setDataFormSuccess({ ...dataFormSuccess, postman: e });
                      setDataFormError({ ...dataFormError, postman: e });
                    }}
                  >
                    {inFoPostman.map((item) => {
                      let name = `${item.first_name}  ${item.last_name}  ${item.phone}`;
                      let value = `${item.first_name} ${item.last_name} `;
                      return (
                        <Select.Option key={item.id} value={value}>
                          {name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item name="timedate" rules={[validate.checkRequire("ngày và giờ phát")]} label="Ngày giờ phát:">
                  <DatePicker
                    onChange={(e) => {
                      formatsDate(e);
                    }}
                    style={{ width: "100%" }}
                    name="timedate"
                    showTime
                    format=" DD/MM/YYYY HH:mm"
                  />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} md={24}>
              <div className="stepForm">
                <Tabs
                  onChange={(e) => {
                    renderTabsByKey(e);
                  }}
                  defaultActiveKey="1"
                  type="card"
                >
                  <TabPane
                    tab={
                      <span
                        style={{
                          color: "#519259",
                        }}
                      >
                        <CheckOutlined />
                        Phát thành công
                      </span>
                    }
                    key="1"
                  >
                    {tabsSuccess()}
                  </TabPane>
                  <TabPane
                    tab={<span style={{ color: "#CD1818", lineHeight: "19px" }}>Phát không thành công</span>}
                    key="2"
                  >
                    {tabsErrors()}
                  </TabPane>
                </Tabs>
              </div>
            </Col>

            <Col md={24}>
              <Form.Item
                labelCol={6}
                wrapperCol={18}
                name="note"
                label="Ghi chú"

                // rules={[{ required: true }]}
              >
                <Input
                  onChange={(e) => {
                    handleNoteFormData(e);
                  }}
                  placeholder="Ghi chú . . ."
                  name="note"
                />
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                <Button style={{ marginRight: 10 }} type="primary" htmlType="submit">
                  Xác Nhận
                </Button>
                <Button type="primary" htmlType="reset">
                  Đặt Lại
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
}

export default DeliveryResults;
