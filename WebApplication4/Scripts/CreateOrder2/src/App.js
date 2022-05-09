import { Row, Col, Button } from "antd";
import React, { Component, useEffect, useReducer } from "react";
import FormOrder from "./components/FormOrder.js";
import FormReciver from "./components/FormReciver.js";
import FormSender from "./components/FormSender.js";
import FormTotal from "./components/FormTotal.js";
import "./App.css";
import FormPostage from "./components/FormPostage.js";
import ModalOrder from "./components/ModalOrder.js";
import ModalPostage from "./components/ModalPostage.js";
import { Record } from "immutable";

export const ContextValue = React.createContext(null);

export const ADD_ITEM_ORDER = "ADD_ITEM_ORDER";
export const ADD_ITEM_POSTAGE = "ADD_ITEM_POSTAGE";

const initReducer = new Record({
  MerchandiseItems: [],
  RequestedPackageLineItems: [],
});

const actionOrder = (state, { type, payload }) => {
  switch (type) {
    case ADD_ITEM_ORDER: {      
      return state.set("MerchandiseItems", [
        ...state.get("MerchandiseItems"),
        payload,
      ]);
    }
    case ADD_ITEM_POSTAGE: {        
        return state.set("RequestedPackageLineItems", [
          ...state.get("RequestedPackageLineItems"),
          payload,
        ]);
      }
    // case ADD_VALUE_POSTAGE: {        
    //     return state.set("RequestedPackageLineItems", [
    //       ...state.get("RequestedPackageLineItems"),
    //       payload,
    //     ]);
    //   }
  }
};

export default function App() {

  const [reducerOrder, dispatch] = useReducer(actionOrder, new initReducer());
 
  const store = {
    reducerOrder,
    dispatch,
  };

  return (
    <ContextValue.Provider value={store}>
      <div className="m-3 m-auto" style={{ width: 1160 }}>
        {/* <ModalOrder /> */}
        <ModalPostage />
      </div>
      <Row className="main  m-auto" style={{ width: 1200 }}>
        <Col span={17}>
         
          <FormPostage />
          <FormOrder />
          <FormTotal />
        </Col>
        <Col span={7}>
          <FormSender />
          <FormReciver />
        </Col>
      </Row>
    </ContextValue.Provider>
  );
}
