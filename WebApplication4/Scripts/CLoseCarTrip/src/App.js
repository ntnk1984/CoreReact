import { Tabs } from "antd";
import React, { useState } from "react";
import TableImportList from "./components/TableImportList";
import TableTripList from "./components/TableTripList";
const { TabPane } = Tabs;

const ManageTrip = () => {
  return (
    <>
      <Tabs tabPosition="left">
        <TabPane tab="Danh sách phiếu" key="0">
          <TableImportList />
        </TabPane>
        <TabPane tab="Danh sách chuyến" key="1">
          <TableTripList />
        </TabPane>
      </Tabs>
    </>
  );
}

export default ManageTrip;
