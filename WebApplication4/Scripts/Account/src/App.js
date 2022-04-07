import React, { useReducer } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

const initialState = {
  step: 0,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN": {
     
      return { ...state ,step:0};
    }
    case "SIGN_UP": {
     
      return { ...state ,step:1};
    }
    case "FORGOT": {
     
      return { ...state ,step:2};
    }
    
  }
};

const handleRender = (step) => {
  switch (step) {
    case 0:
      return <Login />;
    case 1:
      return <Register />;
    case 2:
      return <ForgotPassword />;
  }
};

export const contextLogin = React.createContext();

export default function App() {
  const [loginState, dispatch] = useReducer(loginReducer, initialState);
  const store = {
    loginState,
    dispatch,
  };

  return (
    <contextLogin.Provider value={store}>
      {handleRender(loginState.step)}
    </contextLogin.Provider>
  );
}
