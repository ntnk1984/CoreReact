import React from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import ListUser from "./components/ListUser/ListUser.js";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
export default function App() {
  return (
    <div className="w-75 " style={{margin:"0 auto"}}>
      <ListUser/> 
   
    </div>
  );
}
