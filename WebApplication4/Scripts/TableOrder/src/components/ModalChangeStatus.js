import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Select, Input } from "antd";
import { fetchAllOrderApi, fetchChangeStatusOrder } from "../api/Order.js";
import { contextValue, FETCH_ORDERS_TABLE_TIME } from "../App.js";
import { openNotificationWithIcon } from "../Notification.js";
const { Option } = Select;
const ModalChangeStatus = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState({ id: props.id });
  const showModal = () => {
    setIsModalVisible(true);
  };
  const {tableReducer,dispatch}=useContext(contextValue)

  const handleOk = async () => {

    await fetchChangeStatusOrder([status.id], status.actionType, status.noteType);
   await setIsModalVisible(false);
    //call api bảng đơn hàng
    const res = await fetchAllOrderApi(
      `${tableReducer.startDate[0]}-${tableReducer.startDate[1]}-${tableReducer.startDate[2]}`,
      `${tableReducer.endDate[0]}-${tableReducer.endDate[1]}-${tableReducer.endDate[2]}`
    );

    dispatch({
      type: FETCH_ORDERS_TABLE_TIME,
      payload: await res.responses,
    });

    openNotificationWithIcon("success")

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  return (
    <>
      <a type="primary" onClick={showModal}>
        Chuyển tiếp
      </a>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="control-hooks" layout="vertical">
          <Form.Item name="action" label="Trạng thái">
            <Select
              onChange={(e) => setStatus({ ...status, actionType: e })}
              placeholder="Vui lòng chọn trạng thái"
            >
              {statusList.map((item, index) => (
                <Option value={item.code}>{item.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item className="mt-4" name="status" label="Ghi chú">
            <Input.TextArea
              onChange={(e) =>
                setStatus({ ...status, noteType: e.target.value })
              }
              rows={4}
            ></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalChangeStatus;
