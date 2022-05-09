import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Modal,
  notification,
} from "antd";
const { Option } = Select;
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { fetchChangeStatusOrder, getAllOrderApi } from "../api/Order.js";
import { checkQuyen } from "../athor/Authoraziton.js";

let statusList = [
  { key: 1, code: "DRAFT", label: "Mới tạo" },
  { key: 2, code: "CREATE_WAITING", label: "Chờ xử lý" },
  { key: 3, code: "PICKUP_WAITING", label: "Chờ lấy" },
  { key: 4, code: "PICKUPED", label: "Đã lấy" },
  { key: 5, code: "SHIPPING", label: "Đang vận chuyển" },
  { key: 6, code: "DELIVERY", label: "Đang giao" },
  { key: 7, code: "DELIVERY_SUCCESS", label: "Giao thành công" },
  { key: 8, code: "RETURN_APPROVED", label: "Đã duyệt hoàn" },
  { key: 9, code: "RETURN_SHIPPING", label: "Đang chuyển hoàn" },
  { key: 10, code: "DELIVERY_CONT", label: "Phát tiếp" },
  { key: 11, code: "RETURN_SUCCESS", label: "Đã trả" },
  { key: 12, code: "CANCELED", label: "Đã hủy" },
];
export default function PhatHang(props) {
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Vui lòng chọn lại",
    });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [key, setKey] = useState(null);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    let listId = [];
    let newStatus = [];
    let flag = true;
    props.data.forEach((item) => {
      listId.push(item.id);
      newStatus.push(item.deliverystatus);
    });

    for (let i = 0; i < newStatus.length - 2; i++) {
      for (let j = ++i; j < newStatus.length - 1; j++) {
        if (newStatus[i] != newStatus[j]) {
          flag = false;
        }
      }
    }
    if (!flag) {
      openNotificationWithIcon("error");
    } else {
      await fetchChangeStatusOrder(
        listId,
        statusList.find((val) => {
          return val.key == key;
        }).code
      );
      const response = await getAllOrderApi();
      console.log("props",props)
      await props.setData(response.responses);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="link" onClick={showModal} disabled={checkQuyen()!=1}>
        Chuyển tiếp
      </Button>
      <Modal
        title="Chuyển tiếp"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          className="mt-3"
          defaultValue="Vui lòng chọn "
          style={{ width: "100%" }}
          onChange={async (e) => {
            await setKey(e);
          }}
        >
          {statusList.map((item) => (
            <Option value={item.key}>{item.label}</Option>
          ))}
        </Select>
      </Modal>
    </>
  );
}
