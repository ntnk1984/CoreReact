import React from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import ListUser from "./components/ListUser/ListUser.js";
import ListGroup from "./components/ListGroup/ListGroup.js";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
export default function App() {
  return (
    // <Layout>
    //   <Sider breakpoint="lg" collapsedWidth="0">
    //     <Menu theme="dark" mode="inline" >
    //     <Menu.Item key="4" >
    //         LOGO
    //       </Menu.Item>
    //       <SubMenu key="sub2" icon={<TeamOutlined />} title="PARTNER">

    //         <Menu.Item key="6">Danh sách user</Menu.Item>
    //         <Menu.Item key="8">Danh sách nhóm</Menu.Item>
    //       </SubMenu>
    //       <Menu.Item key="2" icon={<VideoCameraOutlined />}>
    //         nav 2
    //       </Menu.Item>
    //       <Menu.Item key="3" icon={<UploadOutlined />}>
    //         nav 3
    //       </Menu.Item>
    //       <Menu.Item key="5" icon={<UserOutlined />}>
    //         nav 4
    //       </Menu.Item>
    //     </Menu>
    //   </Sider>
    //   <Layout>
    //     <Header
    //       className="site-layout-sub-header-background"
    //       style={{ padding: 0 }}
    //     />
    //     <Content style={{ margin: "24px 16px 0" }}>
    //       <div
    //         className="site-layout-background"
    //         style={{ padding: 24, minHeight: 860 }}
    //       >
    //   {/* content */}

    <div className="w-75 " style={{margin:"0 auto"}}>
      <ListUser/> 
      {/* <ListGroup /> */}
    </div>
    //     </Content>
    //     <Footer style={{ textAlign: "center" }}>
    //       Ant Design ©2018 Created by Ant UED
    //     </Footer>
    //   </Layout>
    // </Layout>
  );
}
