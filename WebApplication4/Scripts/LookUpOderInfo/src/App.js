import { message } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import StorageTable from "./components/StorageTable";
import "./components/Style/App.css";
import { GetAccountApi } from "./utils/Service";

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  myOrder: [{ HSCode: "TRACUU123", NguoiNhan: "Nguyễn Đại Phúc", NgayTao: "20-02-2022 7:30:16 PM", TrangThai: "5" }],
};

//usereducer
const lookUpOderInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LISTSTORAGE": {
      return { ...state, myOrder: action.payload };
    }

    default:
      return state;
  }
};

export default function App() {
  //set up reducer
  const [lookUpOderInfo, dispatch] = useReducer(lookUpOderInfoReducer, initialState);
  const store = {
    lookUpOderInfo,
    dispatch,
  };
  // modal signin

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
        <div></div>
      </div>
    </contextValue.Provider>
  );
}
