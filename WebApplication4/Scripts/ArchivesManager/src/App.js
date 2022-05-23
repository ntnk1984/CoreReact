import { message } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import StorageList from "./components/StorageList";
import "./components/Style/App.css";
import { GetAccountApi } from "./utils/Service";

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
const archiveManagerReducer = (state = initialState, action) => {
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
  const [archiveManager, dispatch] = useReducer(archiveManagerReducer, initialState);
  const store = {
    archiveManager,
    dispatch,
  };
  // modal signin
  const [visible, setVisible] = useState(false);
  useEffect(async () => {
    // call API
    let data_request = {
      Action_data: "",
      Action_type: "ALL",
    };
    // let response = await GetAccountApi(data_request);
  }, []);
  // /

  const successFuc = () => {
    message.success("Tạo tài khoản thành công!");
  };
  const errorFuc = (err) => {
    message.error(`Tạo tài khoản thất bại! ${err}`);
    console.log(err);
  };
  //Format XLSX to Json
  return (
    <contextValue.Provider value={store}>
      <div className="app-main  pt-4 " style={{ width: "90%", margin: "auto" }}>
        <div>
          <StorageList />
        </div>
      </div>
    </contextValue.Provider>
  );
}
