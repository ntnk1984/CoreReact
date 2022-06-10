import { Tabs } from "antd";
import React, { useEffect, useReducer } from "react";
import data from "./assets/buuTa.json";
import CreatePermisGroup from "./components/FormCreateGroup";
import "./components/Style/App.css";
import TableCustom from "./components/TableCustomer/TableCustom";

const { TabPane } = Tabs;

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  listOrder: [],
};

//usereducer
const createPermissionGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_LIST_ORDER": {
      return { ...state, listOrder: action.payload };
    }

    default:
      return state;
  }
};

export default function App() {
  //set up reducer
  const [createPermissionGroup, dispatch] = useReducer(createPermissionGroupReducer, initialState);
  const store = {
    createPermissionGroup,
    dispatch,
  };

  useEffect(() => {
    dispatch({ type: "LOAD_DATA_POSTMAN", payload: data });
  }, []);
  console.log(createPermissionGroup);

  return (
    <contextValue.Provider value={store}>
      <div style={{ backgroundColor: "#F1f1f1", minHeight: "100vh" }}>
        <div className="app-main  pt-3 " style={{ width: "95%", margin: "auto" }}>
          <CreatePermisGroup />
        </div>
      </div>
    </contextValue.Provider>
  );
}
