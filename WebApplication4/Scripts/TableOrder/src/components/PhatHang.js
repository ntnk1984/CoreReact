import React, { useContext, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Modal,
  notification,
  Divider,
} from "antd";
const { Option } = Select;
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { fetchChangeStatusOrder, fetchAllOrderApi } from "../api/Order.js";
import { checkQuyen } from "../author/Authoraziton.js";
import { contextValue, FETCH_ORDERS_TABLE_TIME } from "../App.js";

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


  const [status, setStatus] = useState({});
  const { tableReducer, dispatch } = useContext(contextValue);
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
          return val.code == status.actionType;
        }).code,
        status.noteType
      );
      const res = await fetchAllOrderApi(
        `${tableReducer.startDate[0]}-${tableReducer.startDate[1]}-${tableReducer.startDate[2]}`,
        `${tableReducer.endDate[0]}-${tableReducer.endDate[1]}-${tableReducer.endDate[2]}`
      );

      dispatch({
        type: FETCH_ORDERS_TABLE_TIME,
        payload: await res.responses,
      });
      openNotificationWithIcon("success");
    }
    props.close();
  };

  return (
    <>
      <Form layout="vertical">
        <Form.Item name="status" label="Trạng thái">
          <Select
            onChange={async (e) => {
              await setStatus({ ...status, actionType: e });
            }}
            placeholder="Vui lòng chọn trạng thái"
          >
            {statusList.map((item, index) => (
              <Option value={item.code}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="note" label="Ghi chú" className="mt-2">
          <Input.TextArea
            name="note"
            rows={4}
            onChange={async (e) => {
              await setStatus({ ...status, noteType: e.target.value });
            }}
          ></Input.TextArea>
        </Form.Item>
        <Divider />
        <Form.Item className="mt-3">
          <Button type="primary" onClick={handleOk}>
            Xác nhận
          </Button>
          <Button className="mx-2" onClick={props.close}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
