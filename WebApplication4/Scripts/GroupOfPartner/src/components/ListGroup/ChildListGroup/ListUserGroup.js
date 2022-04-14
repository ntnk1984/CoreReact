import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Avatar, Checkbox, List, Modal,Row, Button, Tabs } from "antd";
import React, { useState } from "react";
const { TabPane } = Tabs;
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
  }
  
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

  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  return (
    <>
      <Row justify="center"><Button type="danger">Xóa khỏi nhóm</Button>
      <Button disabled type="primary">Thêm vào nhóm</Button></Row>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Trong nhóm" key="1">
          <Checkbox.Group style={{ width: "100%" }}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item actions={[<Checkbox value={item}></Checkbox>]}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                  />
                </List.Item>
              )}
            />
          </Checkbox.Group>
        </TabPane>
        <TabPane tab="Toàn bộ" key="2">
          <Checkbox.Group style={{ width: "100%" }}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item actions={[<Checkbox value={item}></Checkbox>]}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="#">{item.title}</a>}
                  />
                </List.Item>
              )}
            />
          </Checkbox.Group>
        </TabPane>
      </Tabs>
    </>
  );
}
