import React, { useEffect, useReducer } from "react";
import "./components/Style/App.css";
import TableCustom from "./components/TableCustomer/TableCustom";
import data from "./assets/buuTa.json";
import listOder from "./assets/MOCK_DATA.json";
import { Tabs } from "antd";
import TableCollect from "./components/TableCustomer/TableCollect";

const { TabPane } = Tabs;

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  listOrder: [],
  listUser: [
    { key: 1, Account: "a123", FullName: "Nguyen Dai Phuc", Phone: "0999999999", Email: "Abc1@gmail.com" },
    { key: 2, Account: "b123", FullName: "Nguyễn Quốc Thắng", Phone: "087777777", Email: "Abc2@gmail.com" },
    { key: 3, Account: "user1", FullName: "Lưu Công Thành", Phone: "087777778", Email: "Abc1@gmail.com" },
    { key: 4, Account: "user2", FullName: "Phan Tin Tưởng", Phone: "087777779", Email: "Abc1@gmail.com" },
    { key: 5, Account: "user3", FullName: "Trần Văn Đen", Phone: "087777780", Email: "Abc1@gmail.com" },
  ],
  newUsers: [{ id: "", first_name: "", last_name: "", phone: "", email: "" }],
};

//usereducer
const userManagermentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_LIST_ORDER": {
      return { ...state, listOrder: action.payload };
    }
    case "LOAD_LIST_ORDER_STARTUS3": {
      return { ...state, listOrderStartus3: action.payload };
    }
    case "LOAD_DATA_NEW_USER": {
      return { ...state, newUsers: action.payload };
    }
    default:
      return state;
  }
};

export default function App() {
  //set up reducer
  const [userManagerment, dispatch] = useReducer(userManagermentReducer, initialState);
  const store = {
    userManagerment,
    dispatch,
  };

  useEffect(() => {
    dispatch({ type: "LOAD_DATA_NEW_USER", payload: data });
  }, []);
  console.log(userManagerment);

  return (
    <contextValue.Provider value={store}>
      <div className="app-main  py-2 " style={{ background: "#F4F9F9", minHeight: "100vh" }}>
        <div style={{ width: "95%", margin: "auto" }}>
          <h1 className="text-secondary text-center" style={{ fontSize: "28px" }}>
            Quản lý nhóm ngươi dùng
          </h1>
          <TableCustom />
        </div>
      </div>
    </contextValue.Provider>
  );
}
