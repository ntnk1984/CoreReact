import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Button,
  Form,
  Select,
  Input,
  Row,
  Col,
  Steps,
  Divider,
  List,
  Typography,
  Popconfirm,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  fetchChangeStatusOrder,
  fetchDeleteMerchandiseId,
  fetchDeletePackageId,
  fetchMerchandiseShipmentCode,
  fetchPackageByShipmentId,
  fetchShipmentId,
} from "../api/Order.js";
import EditSender from "./UI/EditSender.js";
import EditRevicer from "./UI/EditRevicer.js";
import EditMerchandise from "./UI/EditMerchandise.js";
import EditPackage from "./UI/EditPackage.js";
import {
  contextValue,
  FETCH_MERCHANDISE_BY_ID_SHIPMENT,
  FETCH_PACKAGE_BY_ID_SHIPMENT,
  FETCH_SHIPMENT_BY_ID,
} from "../App.js";
const { Step } = Steps;
const { Option } = Select;
const { Text } = Typography;
const DetailOrder = ({ idShipment, orderCodeShipment }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState({ id: idShipment });
  const showModal = () => {
    setIsModalVisible(true);
  };
  const { tableReducer, dispatch } = useContext(contextValue);

  const [packageShipment, setPackageShipment] = useState();
  const [merchandise, setMerchandise] = useState();
  const handleOk = async () => {
    await fetchChangeStatusOrder(status.id, status.actionType, status.noteType);
    await setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const {
    addedpostage,
    cod,
    codpostage,
    content,
    currency,
    deliverystatus,
    dropofftype,
    id,
    key,
    note,
    ordercode,
    receiveraddress,
    receivercitycode,
    receivercountrycode,
    receiverdistrictcode,
    receivername,
    receiverphone,
    receiverpostalcode,
    receiverwardcode,
    senderaddress,
    sendercitycode,
    sendercountrycode,
    senderdistrictcode,
    sendername,
    senderphone,
    senderpostalcode,
    senderwardcode,
    servicepostage,
    servicetype,
    shipno,
    shippingchargespayment,
    surcharge,
    timeregister,
    totalpackages,
    totalpostage,
    vat,
    weight,
  } = tableReducer?.shipmentDetail;

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

  async function confirmPackage(id) {
    const result = await (await fetchDeletePackageId(id)).json();
    await message.success(await result.message);
    const response = await fetchPackageByShipmentId(idShipment);
    dispatch({
      type: FETCH_PACKAGE_BY_ID_SHIPMENT,
      payload: response?.responses,
    });
  }

  async function confirmMerchandise(id) {
    const result = await (await fetchDeleteMerchandiseId(id)).json();
    await message.success(await result.message);
    const response = await fetchMerchandiseShipmentCode(orderCodeShipment);
    dispatch({
      type: FETCH_MERCHANDISE_BY_ID_SHIPMENT,
      payload: response?.responses,
    });
  }

  function cancel(e) {
    message.error("Cancel");
  }

  useEffect(async () => {
    const result = await fetchPackageByShipmentId(idShipment);
    const response = await fetchMerchandiseShipmentCode(orderCodeShipment);
    const res = await fetchShipmentId(idShipment, orderCodeShipment);
    dispatch({
      type: FETCH_PACKAGE_BY_ID_SHIPMENT,
      payload: result?.responses,
    });
    dispatch({
      type: FETCH_MERCHANDISE_BY_ID_SHIPMENT,
      payload: response?.responses,
    });
    dispatch({
      type: FETCH_SHIPMENT_BY_ID,
      payload: res?.responses,
    });
  }, [isModalVisible]);

  return (
    <>
      <a type="primary" onClick={showModal}>
        Chi tiết
      </a>
      <Modal
        width={"1200px"}
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={18}>
            <div>
              <h6>Thông tin đơn hàng </h6>
              <p>
                Mã đơn hàng : {id} - Ngày tạo: {timeregister} - Trạng thái :
                {deliverystatus}
              </p>
              <p>
                Tiền thu hộ : {cod?.toLocaleString()} đ - Phí vận chuyển:
                {codpostage} đ - Khối lượng : {weight} kg
              </p>
            </div>
            <Divider className="my-1 " />
            <Row>
              <Col span={12}>
                <h6 className="mb-3">
                  Thông tin người gửi
                  <EditSender
                    idShipment={idShipment}
                    orderCodeShipment={orderCodeShipment}
                    data={tableReducer?.shipmentDetail}
                  />
                </h6>

                <p>
                  <i className="bi bi-person-fill"></i> : {sendername} &nbsp;
                  &nbsp; <i className="bi bi-telephone-fill"></i> :{senderphone}{" "}
                  &nbsp; &nbsp;
                  <i className="bi bi-envelope-fill"></i> : tintuong95@gmail.com
                </p>
                <p>
                  <i className="bi bi-house-fill"></i> : {senderaddress}
                </p>
              </Col>
              <Col span={12}>
                <h6 className="mb-3">
                  Thông tin người nhận
                  <EditRevicer
                    idShipment={idShipment}
                    orderCodeShipment={orderCodeShipment}
                    data={tableReducer?.shipmentDetail}
                  />
                </h6>
                <p>
                  <i className="bi bi-person-fill"></i> : {receivername} &nbsp;
                  &nbsp; <i className="bi bi-telephone-fill"></i> :
                  {receiverphone} &nbsp; &nbsp;
                  <i className="bi bi-envelope-fill"></i> : tintuong95@gmail.com
                </p>
                <p>
                  <i className="bi bi-house-fill"></i> : {receiveraddress}
                </p>
              </Col>
            </Row>
            <Divider className="my-1 " />
            <h6 className="my-2">Thông tin gói hàng </h6>
            <ul className="list-group mx-3 listOrder">
              {tableReducer?.packageList?.map((item, index) => {
                return (
                  <li className="list-group-item d-flex flex-row row ">
                    <div className="col-2">{item.packagecode}</div>
                    <div className="col-3 text-center">
                      {item.length}x{item.width}x{item.height} (mm)
                    </div>
                    <div className="col-2 text-center">
                      <Text>{item.weight} (kg)</Text>
                    </div>
                    <div className="col-3 text-center">
                      <Text>
                        {item.cod} ({item.currency})
                      </Text>
                    </div>
                    <div className="col-2 text-end">
                      <EditPackage idShipment={idShipment} data={item} />
                      &nbsp;
                      <Popconfirm
                        title="Bạn muốn xóa sản phẩm?"
                        onConfirm={() => {
                          confirmPackage(item.id);
                        }}
                        onCancel={() => {
                          cancel();
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a>
                          <i className="bi bi-trash"></i>
                        </a>
                        &nbsp;
                      </Popconfirm>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Divider className="my-1 " />

            <h6 className="my-2">Thông tin đơn hàng </h6>
            <ul className="list-group mx-3 listOrder">
              <li className="list-group-item d-flex flex-row row ">
                <div className="col-2">
                  <i>Tên sản phẩm</i>
                </div>
                <div className="col-2 text-center">
                  <i>Cân nặng</i>
                </div>
                <div className="col-3 text-center">
                  <i>Số lượng</i>
                </div>
                <div className="col-3 text-center">
                  <i>Giá trị</i>
                </div>
                <div className="col-2 text-end">
                  <a>
                    <i>Thao tác</i>
                  </a>
                </div>
              </li>
              {tableReducer?.merChandiseList?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex flex-row row "
                  >
                    <div className="col-2">{item.vietnamesename}</div>
                    <div className="col-2 text-center">11 (kg)</div>
                    <div className="col-3 text-center">
                      <Text>
                        {item.quantity} ({item.unit})
                      </Text>
                    </div>
                    <div className="col-3 text-center">
                      <Text>
                        {item.value} ({item.currency})
                      </Text>
                    </div>
                    <div className="col-2 text-end">
                      <EditMerchandise
                        orderCodeShipment={orderCodeShipment}
                        data={item}
                      />
                      <Popconfirm
                        title="Bạn muốn xóa sản phẩm?"
                        onConfirm={() => {
                          confirmMerchandise(item.id);
                        }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a>
                          <i className="bi bi-trash"></i>
                        </a>
                        &nbsp;
                      </Popconfirm>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col span={6} style={{ height: 100, overflow: scroll }}>
            <h6 className="mx-3">Lịch sử đơn hàng</h6>

            <Steps
              progressDot
              current={1}
              direction="vertical"
              className="p-3"
              style={{ height: 500 }}
            >
              <Step
                title="Finished"
                description="This is a description. This is a description."
              />
              <Step
                title="Finished"
                description="This is a description. This is a description."
              />
              <Step
                title="In Progress"
                description="This is a description. This is a description."
              />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DetailOrder;
