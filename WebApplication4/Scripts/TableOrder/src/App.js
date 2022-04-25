import React, { useEffect, useRef, useState } from "react";

import {
  Tabs,
  Radio,
  Space,
  Badge,
  Row,
  AutoComplete,
  Input,
  Button,
  Col,
  Checkbox,
  Modal,
} from "antd";
import TableDonHang from "./components/TableDonHang.js";
import { DeleteOutlined,ExclamationCircleOutlined } from "@ant-design/icons";
import { getAllOrderApi, removeOrderByIdApi } from "./Services/Order.js";
import Test from "./components/Test.js";


const { TabPane } = Tabs;
const App = () => {
  return <Test/>

  // function confirmDeleteMulti(list) {
  //   Modal.confirm({
  //     title: 'Xác nhận ',
  //     icon: <ExclamationCircleOutlined />,
  //     content: 'Bạn muốn xóa đơn hàng',
  //     okText: 'Đồng ý',
  //     cancelText: 'Hủy',
  //     onOk:()=>{
  //       //call api delete hang loat
  //       list.forEach(async item=>{
  //         await removeOrderByIdApi(item)
  //         await getAllOrderApi();
  //       })
  //     }
  //   });
  // }


  // const [data, setData] = useState([]);

  // const [deliveryState,setDeliveryState]=useState([])

  // const dataTable = data.filter((item) => {
  //   return true;
  // });

  // useEffect(async () => {
  //   const response = await getAllOrderApi();

  //   await setData(response);

    
  // }, []);

  // const [search, setSearch] = useState("");

  // const [listSelectCheckBox, setListSelectCheckBox] = useState(null);

  // return (
  //   <div style={{ width: "1600px", margin: "0 auto" }}>

  //     <Row className="mb-3">
  //       <Col span={9} offset={3}>
  //         <Button
  //           onClick={() => {
           
  //             confirmDeleteMulti(listSelectCheckBox)
  //           }}
  //           icon={<DeleteOutlined />}
  //         ></Button>
  //       </Col>
  //       <Col span={12} className="d-flex justify-content-end">
  //         <Input
  //           style={{ width: 200 }}
  //           placeholder="Nhập mã đơn hàng"
  //           name="name"
  //           onChange={async (e) => {
  //             await setSearch(e.target.value);
  //           }}
  //         />
  //       </Col>
  //     </Row>

  //     <Checkbox.Group
  //       value={listSelectCheckBox}
  //       className="w-100"
  //       onChange={(e) => setListSelectCheckBox(e)}
  //     >
  //       <Tabs
  //         onChange={() => {
  //           setListSelectCheckBox(null);
  //         }}
  //         tabPosition="left"
  //       >
  //         <TabPane tab={`Tất cả (${dataTable.length})`} key="all">
  //           <TableDonHang value={search} data={dataTable} />
  //         </TabPane>
  //         <TabPane
  //           tab={`Mới tạo (${
  //             dataTable.filter((item) => item.trangThai == "Mới tạo").length
  //           })`}
  //           key="Mới tạo"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter((item) => item.trangThai == "Mới tạo")}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Chờ xử lý (${
  //             dataTable.filter((item) => item.trangThai == "Chờ xử lý").length
  //           })`}
  //           key="Chờ xử lý"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter((item) => item.trangThai == "Chờ xử lý")}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Chờ lấy (${
  //             dataTable.filter((item) => item.trangThai == "Chờ lấy").length
  //           })`}
  //           key="Chờ lấy"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter((item) => item.trangThai == "Chờ lấy")}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Đã lấy (${
  //             dataTable.filter((item) => item.trangThai == "Đã lấy").length
  //           })`}
  //           key="Đã lấy"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter((item) => item.trangThai == "Đã lấy")}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Đang vận chuyển (${
  //             dataTable.filter((item) => item.trangThai == "Đang vận chuyển")
  //               .length
  //           })`}
  //           key="Đang vận chuyển"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter(
  //               (item) => item.trangThai == "Đang vận chuyển"
  //             )}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Đang giao (${
  //             dataTable.filter((item) => item.trangThai == "Đang giao").length
  //           })`}
  //           key="Đang giao"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter((item) => item.trangThai == "Đang giao")}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Giao thành công (${
  //             dataTable.filter((item) => item.trangThai == "Giao thành công")
  //               .length
  //           })`}
  //           key="Giao thành công"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter(
  //               (item) => item.trangThai == "Giao thành công"
  //             )}
  //           />
  //         </TabPane>

  //         <TabPane
  //           tab={`Đã duyệt hoàn (${
  //             dataTable.filter((item) => item.trangThai == "Đã duyệt hoàn")
  //               .length
  //           })`}
  //           key="Đã duyệt hoàn"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter(
  //               (item) => item.trangThai == "Đã duyệt hoàn"
  //             )}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Đang hoàn chuyển (${
  //             dataTable.filter((item) => item.trangThai == "Đang hoàn chuyển")
  //               .length
  //           })`}
  //           key="Đang hoàn chuyển"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter(
  //               (item) => item.trangThai == "Đang hoàn chuyển"
  //             )}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Phát tiếp (${
  //             dataTable.filter((item) => item.trangThai == "Phát tiếp").length
  //           })`}
  //           key="Phát tiếp"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter((item) => item.trangThai == "Phát tiếp")}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Đã trả (${
  //             dataTable.filter((item) => item.trangThai == "Đã trả").length
  //           })`}
  //           key="Đã trả"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter((item) => item.trangThai == "Đã trả")}
  //           />
  //         </TabPane>
  //         <TabPane
  //           tab={`Đã hủy (${
  //             dataTable.filter((item) => item.trangThai == "Đã hủy").length
  //           })`}
  //           key="Đã hủy"
  //         >
  //           <TableDonHang
  //             value={search}
  //             data={dataTable.filter((item) => item.trangThai == "Đã hủy")}
  //           />
  //         </TabPane>
  //       </Tabs>
  //     </Checkbox.Group>
  //   </div>
  // );
};

export default App;
