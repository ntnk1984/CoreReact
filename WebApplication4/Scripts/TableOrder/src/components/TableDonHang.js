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
//antd
const { Text } = Typography;

//menu cho nút thao tác trên bảng đơn hàng
const menu = (
  <Menu>
    <Menu.Item>
      <a href="#">Phân chia</a>
    </Menu.Item>
    <Menu.Item>
      <a href="#">Sửa đơn</a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="#">
        Hủy đơn
      </a>
    </Menu.Item>
  </Menu>
);

function TableDonHang(props) {
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
      dataIndex: "maDonHang",
    },
    {
      title: FilterByName("nguoiGui", "senderName", "Người giao"),
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>{text.nguoiGui}</Col>
            <Col span={24}>
              <Text disabled>{text.soDienThoaiNguoiGui}</Text>
            </Col>
          </Row>
        );
      },
    },
    {
      title: FilterByAddress(
        "nguoiGui",
        "tinhNguoiGui",
        "huyenNguoiGui",
        "phuongNguoiGui",
        "senderAdress",
        "Địa chỉ"
      ),
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>
              <Text>
                {text.tinhNguoiGui +
                  "-" +
                  text.huyenNguoiGui +
                  "-" +
                  text.phuongNguoiGui}
              </Text>
            </Col>
          </Row>
        );
      },
    },
    {
      title: FilterByName("nguoiNhan", "revicerName", "Người nhận"),
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>{text.nguoiNhan}</Col>
            <Col span={24}>
              <Text disabled>{text.soDienThoaiNguoiNhan}</Text>
            </Col>
          </Row>
        );
      },
    },
    {
      title: FilterByAddress(
        "nguoiNhan",
        "tinhNguoiNhan",
        "huyenNguoiNhan",
        "phuongNguoiNhan",
        "revicerAdress",
        "Địa chỉ"
      ),
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={24}>
              <Text>
                {text.tinhNguoiNhan +
                  " - " +
                  text.huyenNguoiNhan +
                  " - " +
                  text.phuongNguoiNhan}
              </Text>
            </Col>
          </Row>
        );
      },
    },

    {
      title: "Thời gian lập",
      render: () => (
        <Row>
          <Col span={24}>{"10:19"}</Col>
          <Col span={24}>
            <Text disabled>{"20/10/2020"}</Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "Loại hàng",
      dataIndex: "loaiHang",
    },

    {
      title: "Thu Hộ",
      render: (text, record, index) => record.thuHo.toLocaleString(),
    },
    {
      title: "Tổng cước",
      render: (text, record, index) => record.tongCuoc.toLocaleString(),
    },

    {
      title: "Trạng thái",
      render: (text, record, index) => {
        return <Tag color="blue">{record.trangThai}</Tag>;
      },
    },
    {
      title: " Thao tác",
      render: (text, record, index) => {
        return (
          <Dropdown overlay={menu} placement="bottomLeft">
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
