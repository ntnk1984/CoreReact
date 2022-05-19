import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import * as XLSX from "xlsx";
import Sender from "./components/Sender";
import "./components/Style/App.css";
import TableListOrder from "./components/TableListOrder";
import { postListOrder } from "./Service";
export const contextValue = React.createContext();
console.log(process.env.API);
const initialState = {
  importOrderList: [],
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
  onErrorSender: false,
  isPostDataAPI: false,
  showButton: false,
};
const createOrderListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_INFO_SENDER": {
      return { ...state, Sender: action.payload };
    }
    case "ADD_LIST_ORDER": {
      console.log(action.payload, "acction.payload");
      return { ...state, importOrderList: action.payload };
    }
    case "SET_ONERROR_SENDER": {
      return { ...state, onErrorSender: !!action.payload };
    }
    case "GET_LIST_ORDER": {
      return { ...state };
    }
    case "SET_SHOW_BUTTON": {
      return { ...state, showButton: !!action.payload };
    }
    case "SET_SUBMIT_DATA_TO_API": {
      return { ...state, isPostDataAPI: !!action.payload };
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
  // console.log(createOrderList.Sender.Name);
  const [nameFileExcel, setNameFileExcel] = useState("Vui Lòng Chọn File");
  useEffect(() => {
    // call API
    const data = [];
    dispatch({ type: "GET_LIST_ORDER", payload: data });
  }, []);
  const fortmatDataXLSXtoTableAntd = (data) => {
    const responseJson = data.map((row) => ({ ...row, key: row.HSCode }));
    dispatch({ type: "ADD_LIST_ORDER", payload: [...responseJson] });
  };
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
          // dispatch({ type: "ADD_LIST_ORDER", payload: [...data] });
          // console.log(data);
          fortmatDataXLSXtoTableAntd(data);
          dispatch({ type: "SET_SHOW_BUTTON", payload: true });
        });
        message.success("Improt thành công");
      } else {
        setNameFileExcel("Vui Lòng Chọn File");
        dispatch({ type: "SET_SHOW_BUTTON", payload: false });
        message.info("Vui lòng chọn file Excel");
      }
    } else {
      setNameFileExcel("Vui Lòng Chọn File");
      dispatch({ type: "SET_SHOW_BUTTON", payload: false });
      message.warning("Vui lòng chọn file");
    }
  };
  // const handleChangeValue = (e) => {};
  return (
    <contextValue.Provider value={store}>
      <div className="app-main  pt-4 " style={{ width: "95%", margin: "auto" }}>
        <div className="d-flex wrapper justify-content-between">
          <div>
            <Sender />
          </div>
          <div className="d-flex  justify-content-between">
            {createOrderList.showButton ? (
              <div
                className="px-3"
                onClick={() => {
                  if (createOrderList.isPostDataAPI) {
                    postListOrder(createOrderList);
                  } else {
                    dispatch({ type: "SET_ONERROR_SENDER", payload: true });
                    message.warning("Vui lòng nhập thông tin người gửi!");
                  }
                }}
              >
                <label className="btn-style labelPost">
                  <ion-icon style={{ fontSize: "20px", paddingRight: "3px" }} name="cloud-done-outline"></ion-icon> Đẩy
                  dữ liệu
                </label>
              </div>
            ) : (
              ""
            )}

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
              <label className="lableName btn-style" htmlFor="upload">
                <div style={{ fontSize: "17px", padding: " 0 4px 5px 0", alignItems: "flex-start" }}>
                  <p style={{ margin: 0, height: "100%" }}>
                    <UploadOutlined />
                  </p>
                </div>
                <div style={{ alignItems: "center" }}>{nameFileExcel}</div>
              </label>
            </div>
          </div>
        </div>
        <div className="tableAccount pt-4">
          <TableListOrder />
        </div>
      </div>
    </contextValue.Provider>
  );
}
