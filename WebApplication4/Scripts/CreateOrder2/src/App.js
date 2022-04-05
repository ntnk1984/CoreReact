import React, { useEffect, useReducer, useRef } from "react";
import { message, Steps } from "antd";
// import CreateOrderThree from "./components/CreateOrderThree";
import CreateOrderOne from "./components/CreateOrderOne";
import CreateOrderTwo from "./components/CreateOrderTwo.js";
import CreateOrderThree from "./components/CreateOrderThree.js";
import { postOrder, postOrderApi } from "./Service.js";

const { Step } = Steps;

export const contextValue = React.createContext();
const initialState = {
  sender: {
    sendername: "",
    senderphone: "",
    phoneregioncode: "",
    senderaddress: "",
    senderemail: "",
    sendercountry: "",
    sendercity: "",
    senderdistrict: "",
    senderward: "",
  },
  receiver: {
    receivername: "",
    receiverphone: "",
    phoneregioncode: "",
    receiveraddress: "",
    receiveremail: "",
    receivercountry: "",
    receivercity: "",
    receiverdistrict: "",
    receiverward: "",
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
  indexBuuGui: 0,
  spin: false,
};

//usereducer
const createOrderReducer =  (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDER": {
      const { indexBuuGui, inputOrder } = action.payload;

      state.listOrder[indexBuuGui] = [
        ...state.listOrder[indexBuuGui],
        inputOrder,
      ];
      message.success("Thêm thành công!");
      return { ...state };
    }
    case "SET_VISIBILITY": {
      return { ...state, visibility: !state.visibility };
    }
    case "SET_PROGRESS": {
   
      return { ...state, progress: ++state.progress };
    }
    case "ADD_BUU_GUI": {
      message.success("Thêm thành công!");
      return { ...state, listOrder: [...state.listOrder, []] };
    }
    case "ADD_INFO_SENDER": {
      message.success("Thêm thành công!");
      return { ...state, sender: action.payload };
    }
    case "ADD_INFO_RECEIVER": {
      message.success("Thêm thành công!");
      return { ...state, receiver: action.payload };
    }
    case "POST_ORDER_API": {
      return postOrder(state);
    }
    case "SET_PROGRESS_BACK": {
      return { ...state, progress: --state.progress };
    }
    case "REMOVE_ORDER_CHILD": {
      const { val, ind, index } = action.payload.value;

      state.listOrder[index] = state.listOrder[index].filter(
        (item) => item.maSP !== val.maSP
      );
      message.success("Xóa thành công!");
      return { ...state };
    }
    case "SET_SPIN_TRUE": {
      state.spin = true;

      return { ...state };
    }
    case "SET_SPIN_FALSE": {
      state.spin = false;

      return { ...state };
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
      <div
        className="main  mt-4 "
        style={{ margin: "0 auto", width: "1000px" }}
      >
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
