import React from "react";
import { Layout, Menu } from "antd";

import ListGroup from "./components/ListGroup/ListGroup.js";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
export default function App() {
  return (
    <div style={{ margin: "0 auto", width: 1600 }}>
      <ListGroup />
    </div>
  );
}
