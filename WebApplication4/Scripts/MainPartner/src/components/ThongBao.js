import React from "react";
import { Typography, Space, Button, Divider } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
const { Text, Link } = Typography;
export default function ThongBao() {
  return (
    <div
      className="bg-white  rounded p-4 pt-3 shadow  me-4 "
      style={{ margin: "0 auto" }}
    >
      <p>
        <b>Thông báo</b>
      </p>
      <Link href="https://ant.design" target="_blank">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry
    </Link>
    <Divider />
    <Link href="https://ant.design" target="_blank">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry
    </Link>
    <Divider />
    <Link href="https://ant.design" target="_blank">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry
    </Link>
    <Divider />
    <Link href="https://ant.design" target="_blank">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry
    </Link>
    <Divider />
    <Link href="https://ant.design" target="_blank">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry
    </Link>
    <Divider />
    <Link href="https://ant.design" target="_blank">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry
    </Link>
    </div>
  );
}
