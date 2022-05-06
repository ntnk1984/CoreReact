import { Button, Collapse, Spin } from "antd";
import React, { useContext, useState } from "react";
import { contextValue } from "../App.js";
import EditableTableFuc from "./DetailOrder/EditableTableFuc";

const { Panel } = Collapse;

function CreateOrderFour({ handelSubmit }) {
  const context = useContext(contextValue);
  const { createOrder, dispatch } = context;
  const { listOrder, visibility, sender, receiver } = context.createOrder;

  const [OpenSpin, setOpenSpin] = useState(false);

  return (
    <Spin spinning={OpenSpin}>
      <div className=" rounded rounded-3 shadow-sm" style={{ background: "white", padding: "10px 20px" }}>
        <div style={{ paddingBottom: "20px", textAlign: "end" }}>
          <EditableTableFuc />
        </div>
      </div>
    </Spin>
  );
}
export default CreateOrderFour;
