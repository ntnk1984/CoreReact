import React, { useReducer, useState } from "react";
import { Steps, Row, Col, Form, Button } from "antd";
// import CreateOrderThree from "./components/CreateOrderThree";
import CreateOrderOne from "./components/CreateOrderOne";
import CreateOrderTwo from "./components/CreateOrderTwo.js";
import CreateOrderThree from "./components/CreateOrderThree.js";
import CreateOrderTest from "./components/CreateOrderTest";
import { postOrder, postOrderApi } from "./Service.js";
// import CreateOrderTwo from "./components/CreateOrderTwo";
// import { orderService } from "../services/orderService";
import "./App.css";
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
  isDisplayOne: false,
  isDisplayTwo: false,
  // hanl:()=>{co}
};

// console.log(initialState);
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
    case "SET_DISPLAY_ONE": {
      return { ...state, isDisplayOne: !state.isDisplayOne };
    }
    case "SET_DISPLAY_TWO": {
      return { ...state, isDisplayTwo: !state.isDisplayTwo };
    }
    case "SET_VISIBILITY": {
      return { ...state, visibility: !state.visibility };
    }
    case "SET_PROGRESS": {
      console.log(action);
      return { ...state, progress: ++state.progress };
    }
    case "ADD_BUU_GUI": {
      return { ...state, listOrder: [...state.listOrder, []] };
    }
    case "ADD_INFO_SENDER": {
      return { ...state, sender: action.payload };
    }
    case "ADD_INFO_RECEIVER": {
      return { ...state, receiver: action.payload };
    }
    case "POST_ORDER_API": {
      console.log("Hoàn Thành");
      // postOrder(state);
      // return { ...state };
    }
    case "SET_PROGRESS_BACK": {
      return { ...state, progress: --state.progress };
    }
    case "HANDLE_SUBMIT_SENDER": {
      // console.log(action.payload, " log payload Reducer");
      return { ...state, sender: action.payload };
    }

    case "REMOVE_ORDER_CHILD": {
      const { index, val } = action.payload;
      state.listOrder[index] = state.listOrder[index].filter(
        (item) => item.maSP !== val.maSP
      );
      // message.success("Xóa thành công!");
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
  // console.log(createOrder.sender);

  const [form] = Form.useForm();
  const [isT, setIsT] = useState(false);
  const onFinish = (e) => {
    setIsT(!isT);
    dispatch({ type: "POST_ORDER_API" });
    console.log(createOrder.sender, "log App");
    console.log(createOrder.listOrder, "Logg Lis App");
    console.log("thanh cong");
  };
  const onFinishFailed = (e) => {
    console.log("log lỗi");
    console.log(createOrder.sender, "log App");
    console.log(createOrder.listOrder, "Logg Lis App");
  };
  return (
    <contextValue.Provider value={store}>
      <div
        className="main"
        style={{ backgroundColor: "#F5F5FA", margin: "0 auto" }}
      >
        <Form
          className="form-app"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={[16, 24]} style={{ margin: "0 auto", width: "80%" }}>
            <Col lg={24} xl={12}>
              <CreateOrderOne isT={isT} />
            </Col>
            <Col lg={24} xl={12}>
              <CreateOrderTwo isT={isT} />
            </Col>

            <Col className="form-app" xl={24}>
              <CreateOrderThree />
              <div className="button-center" style={{ margin: "0 auto" }}>
                <Button
                  className="mx-2"
                  onClick={() => {
                    dispatch({ type: "ADD_BUU_GUI" });
                  }}
                >
                  Tạo đơn bưu gửi
                </Button>
                <Button htmlType="submit" type="primary">
                  Hoàn tất
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </contextValue.Provider>
  );
}
