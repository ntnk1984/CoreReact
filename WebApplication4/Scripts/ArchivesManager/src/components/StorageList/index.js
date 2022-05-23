import { Col, Row } from "antd";
import React, { useContext } from "react";
import { contextValue } from "../../App";
import { RobotOutlined, PlusOutlined } from "@ant-design/icons";
function StorageList(props) {
  const context = useContext(contextValue);
  const { storageList } = context?.archiveManager;

  const renderStorage = () => {
    return storageList.map((item, index) => {
      return (
        <Col key={index} span={6}>
          <div
            className="p-3"
            style={{
              cursor: "pointer",
              border: "3px solid #1BA0E1",
              color: "#f1f1f1",
              background: "#1BA0E1",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div className="p-3" style={{ fontSize: "50px" }}>
              <RobotOutlined />
            </div>
            <div>{item.name}</div>
          </div>
        </Col>
      );
    });
  };
  return (
    <div>
      <Row gutter={[32, 32]}>
        {renderStorage()}
        <Col span={6}>
          <div
            className="p-3"
            style={{
              cursor: "pointer",
              color: "#1BA0E1",
              border: "3px solid #1BA0E1",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div className="p-3" style={{ fontSize: "50px" }}>
              <PlusOutlined />
            </div>
            <div>Thêm khu</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default StorageList;
