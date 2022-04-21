import { Tabs } from "antd";
import React, { useEffect, useReducer } from "react";
import DeliveryResults from "./components";
import "./components/Style/App.css";
import data from "./assets/buuTa.json";

const { TabPane } = Tabs;

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  inFoPostman: [
    { id: "", first_name: "", last_name: "", phone: "", email: "" },
  ],
  visibleModal: false,
};

//usereducer
const deliveryResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VISIBLE_MODAL": {
      return { ...state, visibleModal: !state.visibleModal };
    }
    case "CLOSE_VISIBLE_MODAL": {
      return { ...state, visibleModal: false };
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
  const [deliveryResults, dispatch] = useReducer(
    deliveryResultsReducer,
    initialState
  );
  const store = {
    deliveryResults,
    dispatch,
  };
  useEffect(() => {
    dispatch({ type: "LOAD_DATA_POSTMAN", payload: data });
  }, []);
  // console.log(deliveryResults.inFoPostman);
  // const handleModal = () => {
  //   dispatch({ type: "SET_VISIBLE_MODAL" });
  // };
  // const showStatistic = (
  //   <div className="button-statistic">
  //     <Button type="primary" onClick={handleModal}>
  //       Thống Kê
  //     </Button>
  //     <StatisModal handleModal={handleModal} />
  //   </div>
  // );

  return (
    <contextValue.Provider value={store}>
      <div className="app-main  pt-4 ">
        <div className="container">
          <DeliveryResults />
        </div>
      </div>
    </contextValue.Provider>
  );
}
