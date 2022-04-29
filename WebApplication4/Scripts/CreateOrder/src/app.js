import { Col, message, Row, Steps } from "antd";
import React, { useReducer } from "react";
import CreateOrderFour from "./components/CreateOrderFour";
// import CreateOrderThree from "./components/CreateOrderThree";
import CreateOrderOne from "./components/CreateOrderOne";
import CreateOrderThree from "./components/CreateOrderThree.js";
import CreateOrderTwo from "./components/CreateOrderTwo.js";
import "./components/Style/CustomForm.css";
import { postOrder } from "./Service.js";

const { Step } = Steps;

export const contextValue = React.createContext();
const initialState = {
  sender: {
    sendername: undefined,
    senderphone: undefined,
    phoneregioncode: undefined,
    senderaddress: undefined,
    senderemail: undefined,
    sendercountry: undefined,
    sendercity: undefined,
    senderdistrict: undefined,
    senderward: undefined,
  },
  receiver: {
    receivername: undefined,
    receiverphone: undefined,
    phoneregioncode: undefined,
    receiveraddress: undefined,
    receiveremail: undefined,
    receivercountry: undefined,
    receivercity: undefined,
    receiverdistrict: undefined,
    receiverward: undefined,
  },
  total: {
    long: 0,
    width: 0,
    height: 0,
    weight: 0,
    money: 0,
    unit: 0,
    type: "",
  },
  listOrder: {
    arrOrder: [{ visibility: true, data: [] }, { visibility: false }],
  },

  visibility: true,
  progress: 0,
  indexBuuGui: 0,
  spin: false,
};

//usereducer
const createOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDER": {
      const { indexBuuGui, inputOrder } = action.payload;
      let flag = false;
      state.listOrder.arrOrder[indexBuuGui]?.data?.forEach((item) => {
        if (item.maSP == inputOrder.maSP) {
          flag = true;
        }
      });

      if (flag) {
        message.error("Đã Thêm sp này!");
      } else {
        state.listOrder.arrOrder[indexBuuGui].data = [...state.listOrder.arrOrder[indexBuuGui].data, inputOrder];
        message.success("Thêm thành công!");
      }

      console.log(state.listOrder.arrOrder[indexBuuGui].data);

      return { ...state };
    }
    case "SET_VISIBILITY_LISTOREDER": {
      const index = action.payload;
      state.listOrder.arrOrder[index].visibility = !state.listOrder.arrOrder[index].visibility;

      return { ...state };
    }
    case "SET_VISIBILITY": {
      return { ...state, visibility: !state.visibility };
    }
    case "SET_PROGRESS": {
      return { ...state, progress: ++state.progress };
    }
    case "ADD_BUU_GUI": {
      let cloneArrOrder = { ...state.listOrder };
      // cloneListOder.arrOrder;
      // cloneArrOrder.arrOrder.push({ visibility: true })
      state.listOrder.arrOrder.push({ visibility: true });
      message.success("Thêm bưu gửi thành công!");
      return { ...state };
    }
    case "ADD_INFO_SENDER": {
      message.success("Thêm thông tin thành công!");
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

      state.listOrder[index] = state.listOrder[index].filter((item) => item.maSP !== val.maSP);
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

  const handelSubmit = () => {
    console.log("Subit");
    const formOne = document.getElementById("FormOne");
    document.getElementById("FormOne").click();
    document.getElementById("FormTwo").click();
    document.getElementById("FormThree").click();
  };

  return (
    <contextValue.Provider value={store}>
      <div className="App-Form ">
        <div className="main pt-4" style={{ margin: "0 auto", width: "95%" }}>
          <Row>
            <Col className="Scroll-Left" sm={24} lg={17} xxl={19}>
              <Row gutter={[16, 24]}>
                <Col sm={24} lg={12} xxl={12}>
                  <CreateOrderOne />
                </Col>
                <Col sm={24} lg={12} xxl={12}>
                  <CreateOrderTwo />
                </Col>

                <Col style={{ width: "100%" }} xl={24}>
                  <CreateOrderFour handelSubmit={handelSubmit} />
                </Col>
              </Row>
            </Col>

            <Col style={{ paddingLeft: "10px" }} sm={24} lg={7} xxl={5}>
              <CreateOrderThree handelSubmit={handelSubmit} />
            </Col>
          </Row>
        </div>
      </div>
    </contextValue.Provider>
  );
}
{
  /* <Row gutter={[16, 24]}>
            <Col xs={24} sm={24} md={24} lg={10}>
              <Row>
                <Col span={24}>
                  <CreateOrderOne />
                </Col>
                <Col span={24}>
                  <CreateOrderTwo />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={14}>
              <CreateOrderThree handelSubmit={handelSubmit} />
            </Col>
          </Row> */
}
