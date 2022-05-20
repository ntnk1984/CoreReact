import React, { useReducer } from "react";
import "./components/Style/App.css";
import TableCustom from "./components/TableCustomer/TableCustom";
// const { TabPane } = Tabs;

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  listOrder: [],
};

//usereducer
const createAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT": {
      return { ...state, account: [...state.account, action.payload] };
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

  // useEffect(async () => {
  //   // call API
  //   let data_request = {
  //     Action_data: "",
  //     Action_type: "ALL",
  //   };
  //   let response = await GetAccountApi(data_request);

  //   const data = response.responses;
  //   const responseJson = data.map((row) => ({
  //     key: row.account, // I added this line
  //     account: row.account,
  //     fullName: row.fullName,
  //     email: row.email,
  //     address: row.address,
  //     phone: row.phone,
  //     postalCode: row.postalCode,
  //     rememberCode: row.rememberCode,
  //   }));
  //   // console.log(data, "app");
  //   dispatch({ type: "GET_LISTACCOUNT", payload: responseJson });
  // }, []);
  // /

  return (
    <contextValue.Provider value={store}>
      <div className="app-main  pt-3 " style={{ width: "95%", margin: "auto" }}>
        <TableCustom />
      </div>
    </contextValue.Provider>
  );
}
