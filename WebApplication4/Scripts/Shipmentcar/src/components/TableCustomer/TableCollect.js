import React, { useContext, useEffect, useState } from "react";

import { Table, Switch, Space, Select, Button, DatePicker, Typography, Tag, message } from "antd";
import { contextValue } from "../../App";
import moment from "moment";
import { GetQueryShipmentApi, PostDataAPI } from "../../utils/Service";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const columns = [
  {
    title: "Mã Đơn Hàng",
    dataIndex: "ordercode",
    width: "70px",
    align: "center",
  },
  {
    title: "Người gửi",
    width: "12%",
    align: "center",
    render: (text, record) => (
      <>
        <p style={{ margin: 0, fontSize: "15px" }}>{record.sendername}</p>
        <Text style={{ fontSize: "12px" }} disabled>
          {record.senderphone}
        </Text>
      </>
    ),
  },
  {
    title: "Địa Chỉ",
    dataIndex: "senderaddress",
    width: "10%",
    align: "center",
  },
  {
    title: "Người Nhận",
    align: "center",
    render: (text, record) => (
      <>
        <p style={{ margin: 0, fontSize: "15px" }}>{record.receiveraddress}</p>
        <Text style={{ fontSize: "12px" }} disabled>
          {record.receiverphone}
        </Text>
      </>
    ),
    width: "12%",
  },
  {
    title: "Địa Chỉ",
    dataIndex: "receiveraddress",
    width: "10%",
    align: "center",
  },
  {
    title: "Thời Gian Lập",
    width: "10%",
    align: "center",
    render: (text, record) => {
      const day = text.timeregister?.split(" ") || "";
      return (
        <>
          <p style={{ margin: 0, fontSize: "15px" }}>{day[0]}</p>
          <Text style={{ fontSize: "12px" }} disabled>
            {day[1] + day[2]}
          </Text>
        </>
      );
    },
  },
  {
    title: "Thu Hộ",
    dataIndex: "cod",
    width: "10%",
    align: "center",
    // key: "currebcy",
  },
  {
    title: "Tổng Cước",
    dataIndex: "totalpostage",
    align: "center",
    width: "10%",
  },
  {
    title: "Trạng Thái",
    dataIndex: "deliverystatus",
    align: "center",
    render: (text, record) => {
      return <Tag color="geekblue">{record.deliverystatus}</Tag>;
    },
    width: "10%",
  },
];

// rowSelection objects indicates the need for row selection

function TableCollect(props) {
  const context = useContext(contextValue);
  const [dateFortmat, setDateFortmat] = useState({
    startDate: "",
    endDate: "",
  });
  const [rowItem, setRowItem] = useState();
  const [postmanID, setPostmanID] = useState();

  const { inFoPostman, listOrderStartus6 } = context?.patnerDeliver;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowItem(selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      setRowItem(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setRowItem(selectedRows);
    },
  };
  const FucSuccess = () => {
    return message.success("Giao thành công!");
  };
  // const FucError = () => message.error("Giao thất bại");

  const data = listOrderStartus6;
  const Postman = () => {
    return (
      <>
        <Select
          showSearch
          // name={name}

          style={{ width: "100%" }}
          placeholder="Bưu tá"
          defaultValue={postmanID}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
          onChange={(e) => {
            setPostmanID(e);
          }}
        >
          {inFoPostman.map((item) => {
            let name = `${item.first_name}  ${item.last_name}  ${item.phone}`;
            let value = `${item.id}  `;
            return (
              <Select.Option key={item.id} value={value}>
                {name}
              </Select.Option>
            );
          })}
        </Select>
      </>
    );
  };
  const dateFormatDMY = "MM-DD-YYYY";

  useEffect(() => {
    const startDate = new Date(Date.now() - 1296000000).toLocaleDateString().split("/");
    const endDate = new Date(Date.now()).toLocaleDateString().split("/");
    const tempStart = `${startDate[1]}-${startDate[0]}-${startDate[2]}`;
    const tempEnd = `${endDate[1]}-${endDate[0]}-${endDate[2]}`;
    setDateFortmat({ ...dateFortmat, startDate: tempStart, endDate: tempEnd });
    //Cal Api
  }, []);
  useEffect(async () => {
    //Cal Api
    const data = {
      FromDate: dateFortmat.startDate,
      ToDate: dateFortmat.endDate,
      Type: 6,
    };
    const res = await GetQueryShipmentApi(data);
    console.log(res.responses);
    const listOrderJson = res.responses?.map((row) => ({ ...row, key: row.ordercode }));
    context.dispatch({ type: "LOAD_LIST_ORDER_STARTUS3", payload: listOrderJson });
  }, [dateFortmat]);

  const DateLoadData = () => {
    return (
      <>
        <RangePicker
          onChange={(date, dateString) => {
            setDateFortmat({ ...dateFortmat, startDate: dateString[0], endDate: dateString[1] });
            // console.log(date, dateString);
          }}
          defaultValue={[moment(dateFortmat.startDate, dateFormatDMY), moment(dateFortmat.endDate, dateFormatDMY)]}
          format={dateFormatDMY}
        />
      </>
    );
  };
  return (
    <div className="tableCustom">
      <div className="d-flex justify-content-between">
        <div>
          <DateLoadData />
        </div>
        <div style={{ width: "50%", paddingBottom: "10px" }}>
          <Postman />
        </div>
        <div>
          <Button
            disabled={!!rowItem && !!postmanID && rowItem.length !== 0 ? false : true}
            onClick={() => {
              PostDataAPI(rowItem, postmanID, FucSuccess);
            }}
            type="primary"
          >
            Giao Bưu Tá
          </Button>
        </div>
      </div>

      <Table columns={columns} rowSelection={{ ...rowSelection }} dataSource={data} />
    </div>
  );
}

export default TableCollect;
