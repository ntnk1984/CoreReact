import React, { useContext } from "react";

import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Dropdown,
  Menu,
  Select,
  InputNumber,
} from "antd";
import { contextValue } from "../../App.js";

const { Option } = Select;
export default function OrderChild(props) {
  let { val, ind } = props.value;
  const context = useContext(contextValue);

  return (
    <div className="p-3 rounded-3 mb-3 shadow-sm ">
      <Row className="mb-2">
        <h6 className=" text-secondary mt-1 mx-2">#{++ind} </h6>

        <Button type="link">Sửa</Button>
        <Button
          type="link"
          danger
          onClick={() => {
            let index = --ind;
            context.dispatch({
              type: "REMOVE_ORDER_CHILD",
              payload: { index, val },
            });
            // console.log("hii", index);
          }}
        >
          Xóa
        </Button>
      </Row>
      <Row>
        <Col span={3}>
          <Row>
            <Form.Item name="defaultName" className="mx-2" required>
              <Col span={24}>
                <label>Mã sản phẩm</label>
              </Col>
              <Col span={24}>
                <Input placeholder="MSP" disabled value={val?.maSP} />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Form.Item name="defaultName" className="mx-2" required>
              <Col span={24}>
                <label>Tên Sản Phẩm</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Tên Sản Phẩm"
                  disabled
                  value={val?.nameSP}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Form.Item name="defaultName" className="mx-2" required>
              <Col span={24}>
                <label>Tên tiếng anh sản phẩm</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Tên tiếng anh sản phẩm "
                  disabled
                  value={val?.nameEngSP}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={5}>
          <Row>
            <Form.Item name="defaultName" className="mx-2" required>
              <Col span={24}>
                <label>Mã quốc gia sản xuất</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Mã quốc gia sản xuất"
                  disabled
                  value={val?.maQuocGia}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={4}>
          <Row>
            <Form.Item name="defaultName" className="mx-2" required>
              <Col span={24}>
                <label>Đơn vị sản phẩm</label>
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Đơn vị sản phẩm"
                  disabled
                  value={val?.donViSP}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Form.Item name="defaultName" className="mx-2" required>
              <Col span={24}>
                <label>Đơn vị tiền tệ</label>
              </Col>
              <Col span={24}>
                <Select
                  disabled
                  labelInValue
                  style={{ width: "100%" }}
                  defaultValue={{ value: val?.donViTienTe }}
                >
                  <Option value="vnd">VNĐ</Option>
                  <Option value="usd">USD</Option>
                </Select>
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Form.Item name="defaultName" className="mx-2" required>
              <Col span={24}>
                <label>Đơn giá </label>
              </Col>
              <Col span={24}>
                <InputNumber
                  disabled
                  style={{ width: "100%" }}
                  placeholder=""
                  value={val?.donGia}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Form.Item name="defaultName" className="mx-2" required>
              <Col span={24}>
                <label>Số lượng</label>
              </Col>
              <Col span={24}>
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder=""
                  disabled
                  value={val?.soLuong}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Form.Item name="defaultName" className="mx-2" required>
              <Col span={24}>
                <label>Cân nặng</label>
              </Col>
              <Col span={24}>
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder=""
                  disabled
                  value={val?.canNang}
                />
              </Col>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
