import React, { useEffect, useReducer } from "react";
import "./components/Style/App.css";

import data from "./assets/buuTa.json";
import listOder from "./assets/MOCK_DATA.json";
import { Tabs } from "antd";
import TableCustom from "./components/TableCustomer/ChoPhat";

const { TabPane } = Tabs;

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  listOrder: [],
  listOrderStartus6: [],
  inFoPostman: [{ id: "", first_name: "", last_name: "", phone: "", email: "" }],
};

//usereducer
const handoutTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_LIST_ORDER": {
      return { ...state, listOrder: action.payload };
    }
    case "LOAD_LIST_ORDER_STARTUS3": {
      return { ...state, listOrderStartus3: action.payload };
    }
    case "LOAD_DATA_POSTMAN": {
      return { ...state, inFoPostman: action.payload };
    }
    default:
      return state;
  }
};

export default function App() {
  //set up reducer
  const [handoutTicket, dispatch] = useReducer(handoutTicketReducer, initialState);
  const store = {
    handoutTicket,
    dispatch,
  };

  useEffect(() => {
    dispatch({ type: "LOAD_DATA_POSTMAN", payload: data });
  }, []);
  console.log(handoutTicket);

  return (
    <contextValue.Provider value={store}>
      <div className="app-main  pt-3 " style={{ width: "95%", margin: "auto" }}>
        <Tabs tabPosition="left">
          <TabPane tab="Chờ phát" key="1">
            {/* Giao Phiếu */}
            <TableCustom />
          </TabPane>
          <TabPane tab="Đã Phát" key="2">
            Đã Giao cho bưu tá
          </TabPane>
        </Tabs>
      </div>
    </contextValue.Provider>
  );
}
