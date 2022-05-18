import React, { useContext, useState } from "react";
import { Form, Input, Button, Radio, Modal, Row, Col, InputNumber } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  fetchPackageByShipmentId,
  fetchUpdateMerchandiseId,
  fetchUpdatePackage,
} from "../../api/Order.js";
import { contextValue, FETCH_PACKAGE_BY_ID_SHIPMENT } from "../../App.js";
import { openNotificationWithIcon } from "../../Notification.js";
const EditPackage = ({ data, reset, idShipment }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initForm, setInitForm] = useState({
    cod: data?.cod,
    currency: data?.currency,
    custompackagecode: data?.custompackagecode,
    height: data?.height,
    id: data?.id,
    length: data["length"],
    packagecode: data?.packagecode,
    packagetype: data?.packagetype,
    weight: data?.weight,
    width: data?.width,
  });
  const { tableReducer, dispatch } = useContext(contextValue);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {

    const result = await fetchUpdatePackage(initForm);
    const response = await fetchPackageByShipmentId(idShipment);
    await setIsModalVisible(false);
    await dispatch({
      type: FETCH_PACKAGE_BY_ID_SHIPMENT,
      payload: response?.responses,
    });
    openNotificationWithIcon("success")
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <a onClick={showModal}>
        <i class="bi bi-pencil-square"></i> &nbsp;
      </a>

      <Modal
        title="Sửa hàng hóa"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" initialValues={initForm}>
          <Row>
            <Col span={12}>
              <Form.Item name="length" label="Chiều dài" className="m-2">
                <InputNumber
                  className="w-100"
                  name="length"
                  placeholder="input placeholder"
                  onChange={(value) => {
                    setInitForm({ ...initForm, length: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="width" label="Chiều rộng" className="m-2">
                <InputNumber
                  className="w-100"
                  name="width"
                  placeholder="input placeholder"
                  onChange={(value) => {
                    setInitForm({ ...initForm, width: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="height" label="Chiều cao" className="m-2">
                <InputNumber
                  className="w-100"
                  name="height"
                  placeholder="input placeholder"
                  onChange={(value) => {
                    setInitForm({ ...initForm, height: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="weight" label="Loại hàng" className="m-2">
                <Input
                  className="w-100"
                  name="weight"
                  placeholder="input placeholder"
                  onChange={(e) => {
                    setInitForm({ ...initForm, weight: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="cod" label="Số lượng" className="m-2">
                <InputNumber
                  className="w-100"
                  name="cod"
                  placeholder="input placeholder"
                  onChange={(value) => {
                    setInitForm({ ...initForm, cod: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="currency" label="Cân nặng" className="m-2">
                <Input
                  className="w-100"
                  name="currency"
                  placeholder="input placeholder"
                  onChange={(e) => {
                    setInitForm({ ...initForm, currency: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default EditPackage;
