import React, { useEffect, useReducer } from "react";
import { Layout, Menu } from "antd";

import ListUser from "./components/ListUser/ListUser.js";
import { getAllUserOfPartner } from "./services/UserService.js";
export const contextValue = React.createContext();
const initialTodos = {
  tinhThanhData: [],
  quanHuyenData: [],
  phuongXaData: [],
  userData: [],
}; // same as above

const userPartnerReducer = (state = initialTodos, action) => {
  switch (action.type) {
    case "GET_TINHTHANH_API": {

      return { ...state, tinhThanhData: action.payload };
    }
    case "GET_QUANHUYEN_API": {

      return { ...state, quanHuyenData: action.payload };
    }
    case "GET_PHUONGXA_API": {

      return { ...state, phuongXaData: action.payload };
    }
    case "GET_ALL_USER_API": {
     
      return { ...state,userData:action.payload };
    }

    default:
      return state;
  }
};

export default function App() {
  console.log(process.env.HOST)
  const [userPartner, dispatch] = useReducer(userPartnerReducer, initialTodos);
  const store = {
    userPartner,
    dispatch,
  };

  useEffect( async() => {
    
    dispatch({
      type: "GET_ALL_USER_API",
      payload:await getAllUserOfPartner(),
    });
  },[]);

  
  return (
    <contextValue.Provider value={store}>
      <div  style={{ margin: "0 auto",width:1600 }}>
        <ListUser />
      </div>
    </contextValue.Provider>
  );
}
