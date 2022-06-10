import { Col, Divider, Form, Row, Select, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { contextValue } from "../../App";

const { Option } = Select;
function ZoneItems({ itemZoneChecked, editZoneItem }) {
  const context = useContext(contextValue);
  useEffect(() => {
    setItemValue(itemZoneChecked);
  }, [itemZoneChecked]);
  const [itemValue, setItemValue] = useState(itemZoneChecked);
  console.log(itemValue, "item vlue");
  const [selectZoneType, setSelectZoneType] = useState();
  const handleValue = () => {
    editZoneItem("Nguyễn Đại Phúc");
  };

  const handleChange = (value) => {
    setSelectZoneType(value);
    console.log(`Selected: ${value}`);
  };
  return (
    <div>
      <Row>
        <Col span={20}>
          <Divider style={{ marginTop: 0 }} orientation="left" orientationMargin={50}>
            Chi tiết khu
          </Divider>
        </Col>
        <Col span={4}></Col>
      </Row>

      <div>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <div>
              <Skeleton active />
            </div>
          </Col>
          <Col span={16}>
            <Form>
              <Form.Item name="loaiKhu" label="Loại Khu">
                <Select
                  mode="tags"
                  size="middle"
                  labelInValue="loại khu"
                  placeholder="Please select"
                  defaultValue={["KCB"]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                  }}
                >
                  <Option value="KL">Khu lạnh</Option>
                  <Option value="KDN">Khu đồ nhẹ</Option>
                  <Option value="KDV">Khu dễ vỡ</Option>
                  <Option value="KCB">Khu chưa biết </Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ZoneItems;
