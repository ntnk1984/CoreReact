import { Tabs } from "antd";
import React, { useEffect, useReducer } from "react";
import Domestic from "./components/Domestic";
import CreateNewWareHouse from "./components/NewWareHouse";
import "./components/Style/App.css";
const { TabPane } = Tabs;
export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  storageList: [
    { id: 1, name: "Khu Hà Nội" },
    { id: 2, name: "Khu Hồ Chí Minh" },
    { id: 3, name: "Khu Đà Nẵng" },
    { id: 4, name: "Khu Bình Dương" },
    { id: 5, name: "Khu Hà Tĩnh" },
    { id: 6, name: "Khu Đồng Nai" },
    { id: 7, name: "Khu Đăk Lăk" },
    { id: 8, name: "Khu Cà Mau" },
    { id: 9, name: "Khu Cao Bằng" },
  ],
};

//usereducer
const createWareHouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LISTSTORAGE": {
      return { ...state, storageList: action.payload };
    }
    default:
      return state;
  }
};

export default function App() {
  //set up reducer
  const [createWareHouse, dispatch] = useReducer(createWareHouseReducer, initialState);
  const store = {
    createWareHouse,
    dispatch,
  };
  // modal signin

  //Format XLSX to Json
  return (
    <contextValue.Provider value={store}>
      <div className="app-main " style={{ backgroundColor: "#F2F2F2", minHeight: "100vh" }}>
        {/* <div className=" pt-4 " style={{ width: "90%", margin: "auto" }}>
          <CreateNewWareHouse />
        </div> */}

        {/* test */}
        <div className=" pt-4 " style={{ width: "90%", margin: "auto" }}>
          <Tabs tabPosition="left">
            <TabPane tab="Quản lí khu" key="1">
              <Domestic />
            </TabPane>
            <TabPane tab="Tạo kho mới" key="2">
              <CreateNewWareHouse />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </contextValue.Provider>
  );
}
