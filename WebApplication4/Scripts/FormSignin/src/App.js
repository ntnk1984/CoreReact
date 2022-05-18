import { Button, Input, message, Modal } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import { FileExcelTwoTone, UploadOutlined } from "@ant-design/icons";
import CreateAccount from "./components";
import "./components/Style/App.css";
import * as XLSX from "xlsx";
import TableAccount from "./components/TableAccount";
import "./components/Style/App.css";
import { CreateAccountApi, GetAccountApi } from "./Service";
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
      return { ...state, listAccount: action.payload };
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
  console.log(createAccount.listAccount, "store 52");
  // modal signin
  const [visible, setVisible] = useState(false);

  const [nameFileExcel, setNameFileExcel] = useState("Vui Lòng Chọn File");
  useEffect(async () => {
    // call API
    let data_request = {
      Action_data: "",
      Action_type: "ALL",
    };
    let response = await GetAccountApi(data_request);

    const data = response.responses;
    const responseJson = data.map((row) => ({
      key: row.account, // I added this line
      account: row.account,
      fullName: row.fullName,
      email: row.email,
      address: row.address,
      phone: row.phone,
      postalCode: row.postalCode,
      rememberCode: row.rememberCode,
    }));
    // console.log(data, "app");
    dispatch({ type: "GET_LISTACCOUNT", payload: responseJson });
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
          CreateAccountApi(data, successFuc, errorFuc);
          // console.log(data);
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
        <div className="d-flex wrapper justify-content-between">
          <div>
            <div className="btnName" onClick={() => setVisible(true)}>
              <ion-icon name="person-add-outline"></ion-icon>
              <span>&nbsp;&nbsp;Tạo Tài Khoản</span>
            </div>
          </div>
          <div>
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
