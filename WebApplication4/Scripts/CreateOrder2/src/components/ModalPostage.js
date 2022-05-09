import React, { useContext, useState } from "react";
import { Modal, Button, Row, Col, Form, Input, Select } from "antd";
import { ADD_ITEM_POSTAGE, ContextValue } from "../App.js";

export default function ModalPostage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postage, setPostage] = useState({
    name: undefined,
    SequenceNumber: Date.now(),
    dimension: {
      length: undefined,
      width: undefined,
      height: undefined,
      weight: undefined,
    },
    COD: undefined,
    currency: "VND",
    packagetype: undefined,
  });
  const context = useContext(ContextValue);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    context.dispatch({
      type: ADD_ITEM_POSTAGE,
      payload: postage,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className="mt-2 mx-2" type="primary" onClick={showModal}>
        Tạo bưu gửi
      </Button>
      <Modal
        title="Tạo bưu gửi"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Row>
            <Col span={12} className="p-2">
              <Form.Item name="name" label="Tên bưu gửi">
                <Input
                  name="name"
                  placeholder="input placeholder"
                  onChange={(e) => {
                    setPostage({ ...postage, name: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="p-2">
              <Form.Item name="length" label="Chiều dài">
                <Input
                  name="length"
                  placeholder="input placeholder"
                  onChange={(e) => {
                    setPostage({
                      ...postage,
                      dimension: {
                        ...postage.dimension,
                        length: e.target.value,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="p-2">
              <Form.Item name="width" label="Chiều rộng">
                <Input
                  name="width"
                  placeholder="input placeholder"
                  onChange={(e) => {
                    setPostage({
                      ...postage,
                      dimension: {
                        ...postage.dimension,
                        width: e.target.value,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="p-2">
              <Form.Item name="height" label="Chiều cao">
                <Input
                  name="height"
                  placeholder="input placeholder"
                  onChange={(e) => {
                    setPostage({
                      ...postage,
                      dimension: {
                        ...postage.dimension,
                        height: e.target.value,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="p-2">
              <Form.Item name="weight" label="Cân nặng">
                <Input
                  name="weight"
                  placeholder="input placeholder"
                  onChange={(e) => {
                    setPostage({
                      ...postage,
                      dimension: {
                        ...postage.dimension,
                        weight: e.target.value,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
