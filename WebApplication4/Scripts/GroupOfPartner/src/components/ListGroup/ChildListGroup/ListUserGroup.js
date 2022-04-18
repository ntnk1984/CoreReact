import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Avatar, Checkbox, List, Modal, Row, Button, Tabs } from "antd";
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
// 4.18.2022-tin tuong - confirm add user to group
function confirmAddUserInGroup() {
  Modal.confirm({
    title: "Xác nhận thêm người dùng ",
    icon: <ExclamationCircleOutlined />,
    content: "Bạn có muốn thêm người dùng vào nhóm",
    okText: "Đồng ý",
    cancelText: "Trở lại",
    onOk: () => {
      /*call API remove user in group*/
    },
  });
}


export default function ListUserGroup() {


  // 4.18.2022 -Tin Tuong - disable btn them thanh vien btn xoa thanh vien
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Row justify="center">
        <Button type="danger" disabled={!visible} onClick={()=>{confirmRemoveUserInGroup()}}>Xóa khỏi nhóm</Button>
        <Button  type="primary" disabled={visible}  onClick={()=>{confirmAddUserInGroup()}}>
          Thêm vào nhóm
        </Button>
      </Row>
      <Tabs
        defaultActiveKey="1"
        onChange={(e) => {
          e == 1 ? setVisible(true) : setVisible(false);
        }}
        centered
      >
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
