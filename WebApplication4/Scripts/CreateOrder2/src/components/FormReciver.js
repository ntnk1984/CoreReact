import React from "react";
import { Typography, Space, Divider, Button } from "antd";
const { Text, Link } = Typography;
export default function FormReciver() {
  return (
    <>
      <div className=" p-3 shadow-sm m-3 ms-0 bg-white rounded-2 d-flex ">
        <Text className="w-50 mt-1" strong>
          Người nhận
        </Text>
        <div className=" w-50 d-flex flex-grow justify-content-end">
          <Button className="" type="link" ghost>
            Nhập thông tin
          </Button>
        </div>
      </div>

      <div className=" p-3 shadow-sm m-3 ms-0 bg-white rounded-2">
        <div>
          <Space direction="vertical">
            <Text strong>Thông tin người nhận</Text>
            <Text>Phan Tin Tưởng</Text>
            <Text>tintuogng@gmail.com</Text>
          </Space>
        </div>
        <Divider orientationMargin={12} />
        <div>
          <Space direction="vertical">
            <Text strong>Địa chỉ giao hàng</Text>
            <Text>0935.3534.434</Text>
            <Text>Phú Thứ - Tây Hòa - Phú Yên</Text>{" "}
          </Space>
        </div>
        <Divider />
        <div>
          <Space direction="vertical">
            <Text strong>Ghi chú </Text>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </Text>
          </Space>
        </div>
      </div>
    </>
  );
}
