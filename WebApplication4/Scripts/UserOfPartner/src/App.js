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
      console.log(action)
      return { ...state, tinhThanhData: action.payload.results };
    }
    case "GET_QUANHUYEN_API": {
      console.log(action);
      return { ...state, quanHuyenData: action.payload.results };
    }
    case "GET_PHUONGXA_API": {
      console.log(action);
      return { ...state, phuongXaData: action.payload.results };
    }
    case "GET_ALL_USER_API": {
     
      return { ...state,userData:action.payload };
    }

    default:
      return state;
  }
};

export default function App() {
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
      <div className="w-75 " style={{ margin: "0 auto" }}>
        <ListUser />
      </div>
    </contextValue.Provider>
  );
}
