import { Button, Col, Divider, Form, message, Row, Select, Skeleton, Space, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  CheckOutlined,
  CloseCircleFilled,
  CloseOutlined,
  EditOutlined,
  HomeOutlined,
  LoadingOutlined,
  ReloadOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import ISO from "../../assets/huongdi.json";
import { updateOrderShippingListApi } from "../../utils/Service";
import "../Style/ZoneItem.css";
const { Option } = Select;

function ZoneItems(props) {
  const { closeDetail, orderMapKey, itemZoneChecked, editZoneItem,fetchListOrder } = props;
  const [acceptOrderCityCodes, setAcceptOrderCityCodes] = useState(ISO);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [itemValue, setItemValue] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);


  //edit state
  const [editDirection, setEditDirection] = useState(false);

  //
  useEffect(() => {
    setItemValue(itemZoneChecked);
    setEditDirection(false);
  }, [itemZoneChecked]);
  useEffect(() => {
    const dataTemp = orderMapKey[itemZoneChecked.CODE] || orderMapKey[itemZoneChecked] || [];

    if (dataTemp?.length) {
      const dataKey = dataTemp.map((item) => ({ ...item, key: item.ID })) || [];
      setData(dataKey);
      const totalW = dataKey.reduce((weight, curentValue) => weight + curentValue.WEIGHT, 0);
      setTotalWeight(totalW);
    } else {
      setData([]);
      setTotalWeight(0);
    }
  }, [itemZoneChecked]);
 
  const [selectAccepOrderCityCode, setSelectAccepOrderCityCode] = useState();

  const editData = () => {};

  const submitDataLocation = () => {
    const objT = { ...itemValue, ACCEPTORDERCITYCODE: selectAccepOrderCityCode };

    editZoneItem(objT);
    setItemValue(objT);
    setEditDirection(false);
  };
  const selectLocation = () => {
    return (
      <Select
        mode="multiple"
        // value={}
        defaultValue={itemValue.ACCEPTORDERCITYCODE?.split(",")}
        // allowClear
        style={{
          width: "100%",
        }}
        placeholder="Vui lòng chọn hướng"
        onChange={(e) => {
          let temp = e.join(",");
          setSelectAccepOrderCityCode(temp);
        }}
      >
        {acceptOrderCityCodes?.map((item, index) => {
          return (
            <Select.Option
              // disabled={itemValue.ACCEPTORDERCITYCODE.split(",").includes(item.CODE)}
              key={index}
              value={item.CODE}
            >
              {item.NAME}
            </Select.Option>
          );
        })}
      </Select>
    );
  };

  const fetchDataTable = async () => {
    fetchListOrder()
  };

  const listOrderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ORDERCODE",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Địa chỉ gửi",
      dataIndex: "SENDERADDRESS",
      width: "20%",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "RECEIVERADDRESS",
      width: "20%",
    },
    {
      title: "Khối lượng",
      dataIndex: "WEIGHT",
      width: "20%",
    },
  ];
  const listOrderColumn = listOrderColumns.map((item) => ({ ...item, ellipsis: true, align: "center" }));
  const HandleSetSelectedData = (e) => {
    setSelectedData(e);
  };
  ///Api
  const succF = () => message.success("Cập nhật thành công");
  const failF = () => message.error("Cập nhật thất bại");

  const divisionArea = () => {
    updateOrderShippingListApi(selectedData, succF, failF);
  };
  let locale = {
    emptyText: () => <p style={{ fontWeight: "600", fontSize: "18px" }}>Khu trống</p>,
  };

  const defaultTitle = () => (
    <>
      <Space direction="horizonal" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Space>
          <div style={{ display: "flex", gap: "1.2rem", fontWeight: "bold", paddingRight: "30px" }}>
            <HomeOutlined style={{ fontSize: "1rem", color: "#8c8c8c" }} />
            <span style={{ color: "#8c8c8c", fontWeight: "bold" }}>Mã Kho: {itemValue.WAREHOUSECODE}</span>
          </div>
        </Space>

        <Space>
          <Button
            disabled={selectedData.length ? false : true}
            hidden={itemValue != "null"}
            onClick={divisionArea}
            type="primary"
          >
            Phân Khu
          </Button>

          <Button
            icon={isLoading ? <LoadingOutlined /> : <ReloadOutlined onClick={fetchDataTable} />}
            onClick={fetchDataTable}
            type="primary"
          >
            Tải lại
          </Button>
        </Space>
      </Space>
    </>
  );

  const listOrderProps = {
    bordered: true,
    pagination: false,
    title: defaultTitle,
    rowSelection: {
      onChange: (e) => HandleSetSelectedData(e),
    },
    size: "middle",
    showHeader: true,
    tableLayout: "unset",
  };
  // end tab
  return (
    <div>
      <Row>
        <Col span={20}>
          <Divider style={{ marginTop: 0 }} orientation="left" orientationMargin={50}>
            Chi tiết khu
          </Divider>
        </Col>
        <Col span={4} style={{ textAlign: "end" }}>
          <CloseOutlined onClick={closeDetail} style={{ cursor: "pointer", fontSize: 24 }} />
        </Col>
      </Row>

      <div>
        <Row gutter={[16]}>
          <Col span={8}>
            <div>
              {/* <Skeleton active /> */}
              <Row>
                <Col span={6}>
                  <p style={{ fontWeight: 600, fontSize: "1rem" }}>Tên Khu:</p>
                </Col>
                <Col span={18}>
                  <p> {itemValue.NAME || "Khu đặc biệt"}</p>
                </Col>

                <Col span={6}>
                  <p style={{ fontWeight: 600, fontSize: "1rem" }}>Hướng:</p>
                </Col>
                <Col span={18}>
                  {editDirection ? (
                    <Row style={{ textAlign: "center" }}>
                      <Col span={22}>{selectLocation()}</Col>
                      <Col span={2}>
                        <CheckOutlined
                          onClick={() => submitDataLocation()}
                          style={{ fontSize: "18px", cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col span={22}>
                        <p> {itemValue.ACCEPTORDERCITYCODE || "Tất Cả"}</p>
                      </Col>
                      <Col span={2}>
                        <EditOutlined
                          onClick={() => setEditDirection(true)}
                          style={{ fontSize: "18px", cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                  )}
                </Col>

                <Col span={12}>
                  <p style={{ fontWeight: 600, fontSize: "1rem" }}>Sức chứa / Đã chứa:</p>
                </Col>
                <Col span={12}>
                  {/* {itemValue?.CAPACITY > totalWeight ? (
                    <p>
                      {itemValue.CAPACITY || "+∞"} / {totalWeight}
                    </p>
                  ) : (
                    
                  )} */}
                  <p 
                    // style={{ color: "red" }}
                    className={itemValue?.CAPACITY && itemValue.CAPACITY < totalWeight ? "test" : ""}
                    >
                      {itemValue.CAPACITY || "+∞"} / {totalWeight}
                    </p>
                </Col>

                {/* <Col span={6}>
                  <p style={{ fontWeight: 600, fontSize: "1rem" }}>Đã chứa:</p>
                </Col>
                <Col span={18}>
                  <p> {totalWeight}</p>
                </Col> */}
              </Row>
            </div>
          </Col>
          <Col span={16}>
            <Table
              locale={locale}
              {...listOrderProps}
              columns={listOrderColumn}
              dataSource={data}
              scroll={{ y: 200 }}
            ></Table>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ZoneItems;
