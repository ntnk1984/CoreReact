import { AutoComplete, Avatar, Button, List, Modal } from "antd";
import React, { useState } from "react";
import { ExclamationCircleOutlined,EditOutlined,DeleteOutlined } from "@ant-design/icons";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];


// 4.12.2020-tin tuong - confirm remove user in group
function confirmRemoveUserInGroup() {
  Modal.confirm({
    title: "Xác nhận xóa người dùng ",
    icon: <ExclamationCircleOutlined />,
    content: "Bạn có muốn xóa người dùng khỏi nhóm",
    okText: "Đồng ý",
    cancelText: "Trở lại",
    onOk: () => {
      /*call API remove user in group*/
    },
  });
}
export default function ListUserGroup() {
  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  }
  return (
    <>
     <AutoComplete
        options={options}
        style={{ width: "100%" }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Thêm user mới"
       
      />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
            onClick={() => {
              confirmRemoveUserInGroup();
            }}
            icon={<DeleteOutlined />}
            danger
          ></Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
            />
          </List.Item>
        )}
      />
    </>
  )
}
