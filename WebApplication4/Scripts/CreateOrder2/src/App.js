import React, { useReducer } from "react";
import { Steps } from "antd";
// import CreateOrderThree from "./components/CreateOrderThree";
import CreateOrderOne from "./components/CreateOrderOne";
import CreateOrderTwo from "./components/CreateOrderTwo.js";
import CreateOrderThree from "./components/CreateOrderThree.js";
import { postOrder, postOrderApi } from "./Service.js";
// import CreateOrderTwo from "./components/CreateOrderTwo";
// import { orderService } from "../services/orderService";
const { Step } = Steps;

export const contextValue = React.createContext();
const initialState = {
  sender:{
    sendername:"sadfdsa",
    senderphone:"",
    phoneregioncode:"",
    senderaddress:"",
    senderemail:"",
    sendercountry:"",
    sendercity:"",
    senderdistrict:"",
    senderward:"",
  },
  receiver:{
    receivername:"",
    receiverphone:"",
    phoneregioncode:"",
    receiveraddress:"",
    receiveremail:"",
    receivercountry:"",
    receivercity:"",
    receiverdistrict:"",
    receiverward:"",
  },
  total: {
    long: 0,
    width: 0,
    height: 0,
    weight: 0,
    money: 0,
    unit: 0,
    type: 0,
  },
  listOrder: [],
  visibility: true,
  progress: 0,
  indexBuuGui:0,
};

//usereducer
const createOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDER": {
     
      const { indexBuuGui, inputOrder } = action.payload;
      
      state.listOrder[indexBuuGui] = [
        ...state.listOrder[indexBuuGui],
        inputOrder,
      ];
      

      return { ...state };
    }
    case "SET_VISIBILITY": {
      return { ...state, visibility: !state.visibility };
    }
    case "SET_PROGRESS": {
        console.log(action)
      return { ...state, progress: ++state.progress };
    }
    case "ADD_BUU_GUI":{
      return {...state,listOrder:[...state.listOrder,[]]}
    }
    case "ADD_INFO_SENDER":{
     
      return {...state,sender:action.payload}
    }
    case "ADD_INFO_RECEIVER":{
    
      return {...state,receiver:action.payload}
    }
    case "POST_ORDER_API":{
    
        postOrder(state)
      return {...state}
    }
    case "SET_PROGRESS_BACK": {
      
      return { ...state, progress: --state.progress };
    }
 
    default:
      return state;
  }
};

export default function App() {
  //set up reducer
  const [createOrder, dispatch] = useReducer(createOrderReducer, initialState);
  const store = {
    createOrder,
    dispatch,
  };

  //handle progress
  const handleProgress = (progress) => {
    switch (progress) {
      case 0:
        return <CreateOrderOne />;
      case 1:
        return <CreateOrderTwo />;
      case 2:
        return <CreateOrderThree />;
      default:
        <div></div>;
    }
  };
  return (
    <contextValue.Provider value={store}>
      <div className="main  mt-4 " style={{ margin: "0 auto", width: "1000px" }}>
        <Steps
          style={{ margin: "0 auto" }}
          className="w-75"
          size="small"
          current={createOrder.progress}
        >
          <Step title="Người gửi" />
          <Step title="Người nhận" />
          <Step title="Đơn hàng" />
        </Steps>

        {handleProgress(createOrder.progress)}
      </div>
    </contextValue.Provider>
  );
}
