import { message } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import StorageTable from "./components/StorageTable";
import "./components/Style/App.css";
import { GetAccountApi } from "./utils/Service";

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  storageList: [
    { id: 1, name: "Khu Hà Nội", code: "AHML", capacity: 6000, acceptOderCityCode: "VN-HN", stored: 4000 },
    { id: 2, name: "Khu Hồ Chí Minh", code: "SMDP-1", capacity: 5000, acceptOderCityCode: "VN-SG", stored: 4561 },
    { id: 3, name: "Khu Đà Nẵng", code: "SMDP-2", capacity: 3000, acceptOderCityCode: "VN-DN", stored: 561 },
    { id: 4, name: "Khu Bình Dương", code: "SMDP-3", capacity: 600, acceptOderCityCode: "VN-BD", stored: 200 },
    { id: 5, name: "Khu Hà Tĩnh", code: "SMDP-4", capacity: 100, acceptOderCityCode: "VN-HT", stored: 10 },
    { id: 6, name: "Khu Đồng Nai", code: "SMDP-5", capacity: 1200, acceptOderCityCode: "VN-DNN", stored: 900 },
    { id: 7, name: "Khu Đăk Lăk", code: "SMDP-6", capacity: 400, acceptOderCityCode: "VN-DL", stored: 250 },
    { id: 8, name: "Khu Cà Mau", code: "SMDP-7", capacity: 200, acceptOderCityCode: "VN-CM", stored: 100 },
    { id: 9, name: "Khu Cao Bằng", code: "SMDP-8", capacity: 100, acceptOderCityCode: "VN-CB", stored: 9 },
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
          <StorageTable />
        </div>
      </div>
    </contextValue.Provider>
  );
}
