import React, { useState } from "react";
import { Form, Input, Button, Radio, Modal, Row, Col, InputNumber } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { fetchUpdateMerchandiseId } from "../../api/Order.js";
const EditMerchandise = ({data}) => {
 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initForm, setInitForm] = useState({
    id: data?.id,
    idordershippingpackage: data?.idordershippingpackage,
    hscode: data?.hscode,
    vietnamesename: data?.vietnamesename,
    englishname: data?.englishname,
    countrymanufacturedcode: data?.countrymanufacturedcode,
    unit: data?.unit,
    currency: data?.currency,
    value: data?.value,
    quantity: data?.quantity,
    weight: data?.weight,
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk =async () => {
      const result =await fetchUpdateMerchandiseId(initForm)
     
    setIsModalVisible(false);
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
        <Form
          layout="vertical"
            initialValues={initForm}
        >
          <Row>
            <Col span={12}>
              <Form.Item name="hscode" label="HS code" className="m-2">
                <Input name="hscode" placeholder="input placeholder" onChange={(e)=>{setInitForm({...initForm,hscode:e.target.value})}}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vietnamesename"
                label="Tên tiếng việt"
                className="m-2"
              >
                <Input name="vietnamesename" placeholder="input placeholder"  onChange={(e)=>{setInitForm({...initForm,vietnamesename:e.target.value})}}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="englishname"
                label="Tên tiếng anh"
                className="m-2"
              >
                <Input name="englishname" placeholder="input placeholder"   onChange={(e)=>{setInitForm({...initForm,englishname:e.target.value})}}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="countrymanufacturedcode"
                label="Mã quốc gia"
                className="m-2"
              >
                <Input
                  name="countrymanufacturedcode"
                  placeholder="input placeholder"
                  onChange={(e)=>{setInitForm({...initForm,countrymanufacturedcode:e.target.value})}}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="unit" label="Loại hàng" className="m-2">
                <Input name="unit" placeholder="input placeholder" onChange={(e)=>{setInitForm({...initForm,unit:e.target.value})}}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="quantity" label="Số lượng" className="m-2">
                <InputNumber  className="w-100" name="quantity" placeholder="input placeholder" onChange={(value)=>{setInitForm({...initForm,quantity:value})}} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="weight" label="Cân nặng" className="m-2">
                <InputNumber  className="w-100" name="weight" placeholder="input placeholder"  onChange={(value)=>{setInitForm({...initForm,weight:value})}}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="value" label="Giá trị" className="m-2">
                <InputNumber className="w-100" name="value" placeholder="input placeholder" onChange={(value)=>{setInitForm({...initForm,value:value})}}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default EditMerchandise;
