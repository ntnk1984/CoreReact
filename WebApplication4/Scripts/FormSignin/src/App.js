import { Button, Input, message, Modal } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import { FileExcelTwoTone, UploadOutlined } from "@ant-design/icons";
import CreateAccount from "./components";
import "./components/Style/App.css";
import * as XLSX from "xlsx";
import TableAccount from "./components/TableAccount";
import "./components/Style/App.css";
// const { TabPane } = Tabs;

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  account: [],
  importAccounts: [],
  listAccount: [],
  visibleModal: false,
};

//usereducer
const createAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT": {
      return { ...state, account: [...state.account, action.payload] };
    }
    case "ADD_ACCOUNTS": {
      console.log(action.payload, "acction.payload");
      return { ...state, importAccounts: action.payload };
    }
    case "CLOSE_VISIBLE_MODAL": {
      return { ...state, visibleModal: false };
    }
    case "GET_LISTACCOUNT": {
      return { ...state };
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
  const [createAccount, dispatch] = useReducer(createAccountReducer, initialState);
  const store = {
    createAccount,
    dispatch,
  };

  // modal signin
  const [visible, setVisible] = useState(false);

  const [nameFileExcel, setNameFileExcel] = useState("Vui Lòng Chọn File");
  useEffect(() => {
    // call API
    const data = [];
    dispatch({ type: "GET_LISTACCOUNT", payload: data });
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
          dispatch({ type: "ADD_ACCOUNTS", payload: [...data] });
          // console.log(data);
        });
        message.success("Improt tài khoản thành công");
      } else {
        setNameFileExcel("Vui Lòng Chọn File");
        message.info("Vui lòng chọn file Excel");
      }
    } else {
      setNameFileExcel("Vui Lòng Chọn File");
      console.log("VUi lòng chọn file");
      message.warning("Vui lòng chọn file");
    }
  };
  // console.log(createAccount.importAccounts, "83");
  return (
    <contextValue.Provider value={store}>
      <div className="app-main  pt-4 " style={{ width: "80%", margin: "auto" }}>
        <div className="d-flex wrapper">
          <Button type="link" onClick={() => setVisible(true)}>
            Tạo Tài Khoản
          </Button>
          <Input
            style={{ border: "none", display: "none" }}
            placeholder="UpLoad"
            id="upload"
            name="upload"
            className="w-25"
            type="file"
            // onChange={importExcel}
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

        <Modal
          // title="Modal 1000px width"
          centered
          visible={visible}
          // onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={600}
          footer={false}
          style={{ height: "500px" }}
        >
          <CreateAccount />
        </Modal>

        <div className="tableAccount pt-4">
          <TableAccount />
        </div>
      </div>
    </contextValue.Provider>
  );
}
