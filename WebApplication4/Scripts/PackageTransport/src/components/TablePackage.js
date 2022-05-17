import React, { useState } from "react";
import { Table, Button, Popover, Menu, Dropdown, Typography } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import ModalTransport from "./ModalTransport.js";

const { Text } = Typography;
const columns = [
  {
    title: "Mã kiện hàng ",
    dataIndex: "id",
  },
  {
    title: "Đơn vị vận chuyển",
    dataIndex: "donvivanchuyen",
    sorter: (a, b) => {
      if (a.donvivanchuyen > b.donvivanchuyen) return -1;
      if (a.donvivanchuyen < b.donvivanchuyen) return 1;
      return 0;
    },
    
  },
  {
    title: "Số xe ",
    dataIndex: "soxe",
  },
  {
    title: "Nơi đi ",
    render: (text, record, index) => {
      return (
        <>
          <Text>{text.noidi}</Text>
          <br></br>
          <Text disabled>{text.diachinoidi}</Text>
        </>
      );
    },
  },
  {
    title: "Nơi đến ",
    render: (text, record, index) => {
      return (
        <>
          <Text>{text.noiden}</Text>
          <br></br>
          <Text disabled>{text.diachinoiden}</Text>
        </>
      );
    },
  },
  {
    title: "Trạng thái ",
    dataIndex: "trangthai",
  },
  {
    title: "Thao tác ",
    render: () => {
      let menu = (
        <Menu style={{ width: 120 }}>
          <Menu.Item>
            <ModalTransport />
          </Menu.Item>
        </Menu>
      );
      return (
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button type="link" primary icon={<UnorderedListOutlined />} />
        </Dropdown>
      );
    },
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default function TablePackage({ data }) {
  //chọn nhiều hàng trong bảng
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <Table
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
      }}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 9 }}
    />
  );
}
