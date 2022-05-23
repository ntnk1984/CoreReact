import { Col, message, Row, Button } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import CreateOrderFour from "./components/CreateOrderFour";
import CreateOrderOne from "./components/CreateOrderOne";
import CreateOrderThree from "./components/CreateOrderThree.js";
import CreateOrderTwo from "./components/CreateOrderTwo.js";
import "./components/Style/CustomForm.css";
import { postOrder } from "./Service.js";

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
    MerchandiseItems: [
      // {
      //   SequenceNumber: 1,
      //   HSCode: undefined,
      //   VietNameseName: undefined,
      //   EnglishName: undefined,
      //   CountryManufacturedCode: undefined,
      //   Unit: undefined,
      //   Currency: undefined,
      //   Value: 2,
      //   Quantity: 2,
      //   Weight: 2,
      // },
    ],
    RequestedPackageLineItems: [
      // {
      //   key: 1,
      //   SequenceNumber: 1,
      //   dimension: {
      //     length: 222,
      //     width: 333,
      //     height: 444,
      //     weight: 5555,
      //   },
      //   COD: 0,
      //   currency: "VND",
      //   packagetype: 1,
      // },
      // {
      //   key: 2,
      //   SequenceNumber: 2,
      //   dimension: {
      //     length: 200,
      //     width: 300,
      //     height: 400,
      //     weight: 500,
      //   },
      //   COD: 0,
      //   currency: "VND",
      //   packagetype: 1,
      // },
    ],
  },

  progress: 0,
  indexBuuGui: 0,
  spin: false,
  checkData: false,
  DropoffType: {
    type: "1",
    detail: {
      location: "",
    },
  },
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
    case "ADD_MERCHANDISE_ITEMS": {
      return {
        ...state,
        listOrder: { ...state.listOrder, MerchandiseItems: action.payload },
      };
    }
    case "ADD_PACKAGE_LINE_ITEMS": {
      // message.success("Thêm bưu gửi thành công!");
      return { ...state, listOrder: { ...state.listOrder, RequestedPackageLineItems: action.payload } };
    }
    case "ADD_INFO_SENDER": {
      return { ...state, sender: action.payload };
    }
    case "ADD_INFO_RECEIVER": {
      return { ...state, receiver: action.payload };
    }
    case "POST_ORDER_API": {
      return postOrder(state);
    }
    case "SET_PROGRESS_BACK": {
      return { ...state, progress: --state.progress };
    }
    case "REMOVE_ORDER_CHILD": {
      const { val, index } = action.payload.value;

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
    case "CHECKDATA_REQUEST": {
      return { ...state, checkData: !!action.payload };
    }
    case "ADD_DROPOFFTYPE": {
      return { ...state, DropoffType: action.payload };
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
  const handelSubmit = async () => {
    console.log("Subit");
    document.getElementById("FormOne").click();
    document.getElementById("FormTwo").click();

    if (createOrder.checkData) {
      postOrder(createOrder);
    }
  };

  return (
    <contextValue.Provider value={store}>
      <div className="App-Form ">
        <div className="main " style={{ margin: "0 auto", width: "95%" }}>
          <Row style={{ height: "fit-content" }}>
            <Col style={{ height: "fit-content" }} className="Scroll-Left" sm={24} lg={17} xxl={19}>
              <Row gutter={[16, 24]} id="height123">
                <Col sm={24} lg={12} xxl={12}>
                  <CreateOrderOne />
                </Col>
                <Col sm={24} lg={12} xxl={12}>
                  <CreateOrderTwo />
                </Col>

                <Col style={{ width: "100%", overflow: "hidden" }} xl={24}>
                  <CreateOrderFour />
                </Col>
              </Row>
            </Col>

            <Col style={{ paddingLeft: "10px", backgroundColor: "white", position: "relative" }} sm={24} lg={7} xxl={5}>
              <CreateOrderThree handelSubmit={handelSubmit} />
              <div style={{ position: "absolute", bottom: "5%", right: "10px" }}>
                {createOrder.checkData ? (
                  <Button className="btn-Submit" onClick={handelSubmit} type="primary">
                    Hoàn tất
                  </Button>
                ) : (
                  <Button className="btn-Submit" onClick={handelSubmit} type="primary">
                    Check
                  </Button>
                )}
              </div>
              <div style={{ position: "absolute", bottom: "5%", left: "10px" }}>
                <Button danger className="btn-Submit" type="primary">
                  Xóa dữ liệu
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </contextValue.Provider>
  );
}
