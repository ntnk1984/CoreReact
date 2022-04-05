import React, { useContext } from "react";

import { Form, Input, Button, Row, Col, Dropdown, Menu, Select, InputNumber } from "antd";
import { contextValue } from "../../App.js";

const { Option } = Select;
export default function OrderChild(props) {

  let { val, ind,index } = props.value;
  const context=useContext(contextValue)


  return (
    <div className="p-3 border border-1 rounded-3 mb-3 shadow-sm " >
      
      <Row className="mb-2">
      
      <h6 className=" text-secondary mt-1 mx-2">#{++ind} </h6>
       
         <Button type="link">Sửa</Button>
        <Button type="link" danger onClick={()=>{
         
          context.dispatch({
            type:"REMOVE_ORDER_CHILD",
            payload:props
          })
        }}>Xóa</Button>
      </Row>
      <Row>
        <Col span={3}>
          <Form.Item className="mx-2" label="Mã sản phẩm" required>
            <Input placeholder="" disabled value={val?.maSP} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Tên sản phẩm" required>
            <Input placeholder="" disabled value={val?.nameSP}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Tên tiếng anh sản phẩm " required>
            <Input placeholder="" disabled value={val?.nameEngSP}/>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item className="mx-2" label="Mã quốc gia sản xuất" required>
            <Input placeholder="" disabled value={val?.maQuocGia}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item className="mx-2" label="Đơn vị sản phẩm" required>
            <Input placeholder="" disabled value={val?.donViSP}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Đơn vị tiền tệ" required>
            
            <Select
            disabled
              labelInValue
              style={{ width: "100%" }}
              defaultValue={{ value: val?.donViTienTe }}
            >
              <Option value="vnd">VNĐ</Option>
              <Option value="usd">USD</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Đơn giá  " required>
            <InputNumber disabled style={{ width: "100%" }} placeholder=""  value={val?.donGia}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Số lượng" required>
            <InputNumber style={{ width: "100%" }} placeholder="" disabled value={val?.soLuong}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className="mx-2" label="Cân nặng" required>
            <InputNumber style={{ width: "100%" }} placeholder="" disabled value={val?.canNang}/>
          </Form.Item>
        </Col>
      </Row>
      
    </div>
  );
}
