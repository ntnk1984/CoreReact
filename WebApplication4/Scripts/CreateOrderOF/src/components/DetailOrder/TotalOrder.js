import React, { useContext, useState } from "react";
import { InputNumber, message, Select } from "antd";
import { Form, Button, Row, Col } from "antd";
import { contextValue } from "../../App.js";
import { validate } from "../../validate.js";

const { Option } = Select;
export default function TotalOrder() {
  const context = useContext(contextValue);
  const tempInfoOrder = context?.createOrder.listOrder;
  const [totalOrder, setTotalOrder] = useState({
    packageLineItems: [
      {
        SequenceNumber: 1,
        dimension: {
          length: undefined,
          width: undefined,
          height: undefined,
          weight: undefined,
        },
        COD: "Tiền",
        currency: 1,
        packagetype: 2,
      },
    ],
    count: 2,
  });
  // useEffect(() => {
  //   context.dispatch({ type: "ADD_PACKAGE_LINE_ITEMS", payload: totalOrder.packageLineItems });
  // }, [totalOrder]);
  const submitPackgeLine = () => {
    context.dispatch({ type: "ADD_PACKAGE_LINE_ITEMS", payload: totalOrder.packageLineItems });
  };
  const addPackageItem = () => {
    let { count, packageLineItems } = totalOrder;
    const dataTemp = {
      SequenceNumber: count,
      dimension: {
        length: undefined,
        width: undefined,
        height: undefined,
        weight: undefined,
      },
      COD: packageLineItems[0].COD,
      currency: packageLineItems[0].currency,
      packagetype: packageLineItems[0].packagetype,
    };
    const cloneTotalOrder = { ...totalOrder };
    cloneTotalOrder.packageLineItems.push(dataTemp);
    cloneTotalOrder.count++;
    setTotalOrder(cloneTotalOrder);
  };
  const handleChangeVal = (value, name, index) => {
    const temp = { ...totalOrder };
    temp.packageLineItems[index].dimension[name] = value;
    setTotalOrder(temp);
  };
  const onFinish = () => {
    submitPackgeLine();
  };
  const onFinishFailed = () => {
    message.error("Vui lòng nhập đầy đủ thông tin");
  };
  return (
    <div style={{ backgroundColor: "#F2F2F2" }} className="totalOrder p-3 border border-1 rounded-3 mb-3 shadow-sm ">
      {totalOrder.packageLineItems.map((item, index) => {
        const { SequenceNumber, dimension } = item;
        return (
          <Form id="totalOrderBill" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
            <div key={index}>
              <span className=" text-secondary mx-2">Bưu #{SequenceNumber}</span>
              <Row>
                <Col span={6}>
                  <Form.Item
                    name="length"
                    style={{ width: "100%" }}
                    label="Chiều dài"
                    rules={[validate.checkRequire]}
                    required
                  >
                    <InputNumber
                      name="length"
                      onChange={(e) => {
                        handleChangeVal(e, "length", index);
                      }}
                      placeholder=""
                      defaultValue={dimension.length}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="width" style={{ width: "100%" }} label="Chiều rộng" required>
                    <InputNumber
                      name="width"
                      onChange={(e) => {
                        handleChangeVal(e, "width", index);
                      }}
                      placeholder=""
                      defaultValue={dimension.width}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="height" style={{ width: "100%" }} label="Chiều cao" required>
                    <InputNumber
                      name="height"
                      onChange={(e) => {
                        handleChangeVal(e, "height", index);
                      }}
                      placeholder=""
                      defaultValue={dimension.height}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="weight" style={{ width: "100%" }} label="Cân nặng" required>
                    <InputNumber
                      name="weight"
                      onChange={(e) => {
                        handleChangeVal(e, "weight", index);
                      }}
                      placeholder=""
                      defaultValue={dimension.weight}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>{" "}
            <Row>
              <Col lg={{ span: 10, offset: 14 }}>
                <Button
                  // style={{ display: "none" }}
                  className="FormTotalOrder"
                  trigger="click"
                  // className="mx-2"
                  size="middle"
                  type="primary"
                  htmlType="submit"
                >
                  Hoàn Thanh
                </Button>
              </Col>
            </Row>
          </Form>
        );
      })}
      <Button onClick={addPackageItem}>Thêm Buu Gui</Button>
    </div>
  );
}
