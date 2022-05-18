import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import * as XLSX from "xlsx";
import Sender from "./components/Sender";
import "./components/Style/App.css";
import TableListOrder from "./components/TableListOrder";
// const { TabPane } = Tabs;

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  account: [],
  importOrderList: [],
  listAccount: [],
  visibleModal: false,
  Sender: {
    Name: undefined,
    Phone: undefined,
    Address: undefined,
    CountryCode: undefined,
    CityCode: undefined,
    DistrictCode: undefined,
    WardCode: undefined,
    PostalCode: undefined,
  },
};

//usereducer
const createOrderListReducer = (state = initialState, action) => {
  switch (action.type) {
    // case "ADD_ACCOUNT": {
    //   return { ...state, account: [...state.account, action.payload] };
    // }
    case "ADD_LIST_ORDER": {
      console.log(action.payload, "acction.payload");
      return { ...state, importOrderList: action.payload };
    }
    case "CLOSE_VISIBLE_MODAL": {
      return { ...state, visibleModal: false };
    }
    case "GET_LIST_ORDER": {
      return { ...state };
    }
    default:
      return state;
  }
};

export default function App() {
  //set up reducer
  const [createOrderList, dispatch] = useReducer(createOrderListReducer, initialState);
  const store = {
    createOrderList,
    dispatch,
  };

  //State
  const [visible, setVisible] = useState(false);
  // console.log(createOrderList.Sender.Name);
  const [nameFileExcel, setNameFileExcel] = useState("Vui Lòng Chọn File");
  const [senderName, setSenderName] = useState("Thông Tin người gửi ");

  //  /State
  useEffect(() => {
    // call API
    const data = [];
    dispatch({ type: "GET_LIST_ORDER", payload: data });
  }, []);
  // /
  const typeFileExcel = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  const importExcel = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file && typeFileExcel.includes(file.type)) {
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();

          fileReader.readAsArrayBuffer(file);
          fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const workBook = XLSX.read(bufferArray, { type: "buffer" });

            const workSheetName = workBook.SheetNames[0];

            const workSheet = workBook.Sheets[workSheetName];

            const data = XLSX.utils.sheet_to_json(workSheet);

            resolve(data);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        });
        promise.then((data) => {
          dispatch({ type: "ADD_LIST_ORDER", payload: [...data] });
          // console.log(data);
        });
        message.success("Improt thành công");
      } else {
        setNameFileExcel("Vui Lòng Chọn File");
        message.info("Vui lòng chọn file Excel");
      }
    } else {
      setNameFileExcel("Vui Lòng Chọn File");
      console.log("Vui lòng chọn file");
      message.warning("Vui lòng chọn file");
    }
  };
  const handleChangeValue = (e) => {};
  // console.log(createOrderList.importAccounts, "83");
  return (
    <contextValue.Provider value={store}>
      <div className="app-main  pt-4 " style={{ width: "80%", margin: "auto" }}>
        <div className="d-flex wrapper justify-content-between">
          <div>
            <Sender />
          </div>
          <div>
            <Input
              style={{ border: "none", display: "none" }}
              placeholder="UpLoad"
              id="upload"
              name="upload"
              className="w-25"
              type="file"
              onChange={(e) => {
                const fileName = e.target.value.split("\\").slice(-1).join();
                setNameFileExcel(fileName);
                importExcel(e);
              }}
            />
            <label className="lableName" htmlFor="upload">
              <div style={{ fontSize: "17px", padding: " 0 4px 5px 0", alignItems: "flex-start" }}>
                <p style={{ margin: 0, height: "100%" }}>
                  <UploadOutlined />
                </p>
              </div>
              <div style={{ alignItems: "center" }}>{nameFileExcel}</div>
            </label>
          </div>
        </div>

        <div className="tableAccount pt-4">
          <TableListOrder />
        </div>
      </div>
    </contextValue.Provider>
  );
}
