import React, { useState, memo, useMemo } from "react";
import {
  Button,
  Table,
  Tag,
  Row,
  Col,
  Typography,
  Dropdown,
  Menu,
  Input,
  Popover,
} from "antd";
import { UnorderedListOutlined, SearchOutlined } from "@ant-design/icons";
import { fetchChangeStatusOrder } from "../api/Order.js";
import { checkQuyen } from "../athor/Authoraziton.js";
//antd
const { Text } = Typography;

//menu cho nút thao tác trên bảng đơn hàng
const menu = (item) => {

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
    <Menu
      onClick={async (e) => {
        if (e.keyPath.length < 2) {
        } else {
          await fetchChangeStatusOrder(
            [item.id],
            statusList.find((val) => val.key == e.key).code
          );
        }
      }}
      items={[
        {
          key: "1",
          disabled:(checkQuyen()!=1),
          label: "Chuyển tiếp",
          children: [
            ...statusList.filter(
              (val) => parseInt(item.deliverystatus) < parseInt(val.key)
            ),
          ],
        },
        {
          key: "2",
          label: "Sửa",
          disabled:(checkQuyen()!=1),
        },
        {
          key: "3",
          label: "Xóa",
          disabled:(checkQuyen()!=1),
        },
      ]}
    />
  );
};
// const menu = (item) => (

//   <Menu>
//     <Menu.Item key="1">

//       <a
//         onClick={async () => {
//           const response = await fetchChangeStatusOrder(
//             item.id,
//             "CREATED_WAITING"
//           );
//         }}
//       >
//         Chuyển tiếp
//       </a>
//     </Menu.Item>
//     <Menu.Item key="2">
//       <a>Sửa đơn</a>
//     </Menu.Item>
//     <Menu.Item key="3">
//       <a rel="noopener noreferrer">Hủy đơn</a>
//     </Menu.Item>
//   </Menu>
// );

function TableDonHang(props) {
  //data
  console.log(props.data);
  //dữ liệu của bảng đơn hàng
  let dataTemp = [];
  const [dataSource, setDataSource] = useState(dataTemp);
  const [search, setSearch] = useState({
    senderAdress: undefined,
    revicerAdress: undefined,
    senderName: undefined,
    revicerName: undefined,
  });
  //xử lý dữ liệu cho từ bảng tránh bảng render lại khi tìm kiếm

  useMemo(() => {
    if (props.value == undefined || props.value == "") {
      dataTemp = props?.data?.map((item, index) => ({ ...item, key: index }));
    } else {
      dataTemp = props?.data
        ?.filter((item) => {
          return item.maDonHang.indexOf(props.value) > -1;
        })
        ?.map((item, index) => ({ ...item, key: index }));
    }

    //lọc theo thơi gian
    if (props.time.length > 0) {
      dataTemp = dataTemp.filter((item, index) => {
        return (
          Date.parse(item.timeregister) >= Date.parse(props.time[0]) &&
          Date.parse(item.timeregister) <= Date.parse(props.time[1])
        );
      });
    }

    return dataTemp;
  }, [props]);

  //tìm kiếm theo địa chỉ giao nhận, người nhận

  const FilterByAddress = (name, tinh, huyen, phuong, key, title) => (
    <Row>
      <Col span={18} className="text-start">
        {title}
      </Col>
      <Col span={6} className="text-end">
        <Popover
          placement="bottomRight"
          trigger="click"
          content={
            <Input
              placeholder="Nhập nội dung..."
              value={search[name]}
              onChange={(e) => {
                const currValue = e.target.value;
                setSearch({
                  ...search,
                  [key]: currValue,
                });

                const filteredData = dataTemp.filter((entry) => {
                  const address =
                    entry[tinh] + " " + entry[huyen] + " " + entry[phuong];
                  return address
                    .toLowerCase()
                    .includes(currValue.toLowerCase());
                });
                setDataSource(filteredData);
              }}
            />
          }
        >
          <SearchOutlined style={{ color: "#d9d9d9" }} />
        </Popover>
      </Col>
    </Row>
  );

  //tìm kiếm theo tên giao nhận, người nhận

  const FilterByName = (name, key, title) => (
    <Row>
      <Col span={18} className="text-start">
        {title}
      </Col>
      <Col span={6} className="text-end">
        <Popover
          placement="bottomRight"
          trigger="click"
          content={
            <Input
              placeholder="Nhập nội dung..."
              value={search[key]}
              onChange={(e) => {
                const currValue = e.target.value;
                setSearch({
                  ...search,
                  [key]: currValue,
                });

                const filteredData = dataTemp.filter((entry) => {
                  return entry[name]
                    .toLowerCase()
                    .includes(currValue.toLowerCase());
                });
                setDataSource(filteredData);
              }}
            />
          }
        >
          <SearchOutlined style={{ color: "#d9d9d9" }} />
        </Popover>
      </Col>
    </Row>
  );

  //danh sách cột của bảng
  const columns = [
    {
      title: "Mã đơn hàng ",
      dataIndex: "ordercode",
    },
    {
      title: FilterByName("sendername", "senderName", "Người gửi"),
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>{text.sendername}</Col>
            <Col span={24}>
              <Text disabled>{text.senderphone}</Text>
            </Col>
          </Row>
        );
      },
    },
    {
      title: FilterByAddress(
        "sendername",
        "sendercitycode",
        "senderdistrictcode",
        "senderwardcode",
        "senderaddress",
        "Địa chỉ"
      ),
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>
              <Text>
                {text.sendercitycode +
                  "-" +
                  text.senderdistrictcode +
                  "-" +
                  text.senderwardcode}
              </Text>
            </Col>
          </Row>
        );
      },
    },
    {
      title: FilterByName("receivername", "revicerName", "Người nhận"),
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>{text.receivername}</Col>
            <Col span={24}>
              <Text disabled>{text.receiverphone}</Text>
            </Col>
          </Row>
        );
      },
    },
    {
      title: FilterByAddress(
        "nguoiNhan",
        "receivercitycode",
        "receiverdistrictcode",
        "receiverwardcode",
        "receivername",
        "Địa chỉ"
      ),
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>
              <Text>
                {text.sendercitycode +
                  " - " +
                  text.senderdistrictcode +
                  " - " +
                  text.senderwardcode}
              </Text>
            </Col>
          </Row>
        );
      },
    },

    {
      title: "Thời gian lập",
      render: (text, record) => (
        <Row>
          <Col span={24}>
            {record.timeregister.toString().split(" ")[1] +
              " " +
              record.timeregister.toString().split(" ")[2]}
          </Col>
          <Col span={24}>
            <Text disabled>{record.timeregister.toString().split(" ")[0]}</Text>
          </Col>
        </Row>
      ),
    },

    {
      title: "Thu Hộ",
      render: (text, record, index) => record.cod.toLocaleString(),
    },
    {
      title: "Tổng cước",
      render: (text, record, index) => record.totalpostage.toLocaleString(),
    },

    {
      title: "Trạng thái",
      render: (text, record, index) => {
        return <Tag color="blue">{record.deliverystatus}</Tag>;
      },
    },
    {
      title: " Thao tác",
      render: (text, record, index) => {
        return (
          <Dropdown overlay={menu(text)} placement="bottomLeft">
            <Button type="link" icon={<UnorderedListOutlined />}></Button>
          </Dropdown>
        );
      },
    },
  ];
  //select checkbox

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = async (selectedRowKeys, item) => {
    await setSelectedRowKeys(selectedRowKeys);
    await props.handleSetList(item);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //render

  return (
    <Table
      style={{ margin: "0 auto" }}
      columns={columns}
      dataSource={dataSource.length == 0 ? dataTemp : dataSource}
      pagination={{ pageSize: 9 }}
      rowSelection={rowSelection}
    />
  );
}

export default memo(TableDonHang);
