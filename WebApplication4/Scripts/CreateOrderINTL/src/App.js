import { Col, Row, Tabs } from "antd";
import React, { useEffect, useReducer } from "react";
import DeliveryResults from "./components";
import InfoReceiver from "./components/InfoReceiver";
import InfoSender from "./components/InfoSender";
import "./components/Style/App.css";

export const contextValue = React.createContext();

console.log(process.env.API);
const initialState = {
  CountryCodes: [],
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
};

//usereducer
const creatOrderINTLReducer = (state = initialState, action) => {
  switch (action.type) {
    // case "SET_VISIBLE_MODAL": {
    //   return { ...state, visibleModal: !state.visibleModal };
    // }
    // case "CLOSE_VISIBLE_MODAL": {
    //   return { ...state, visibleModal: false };
    // }
    case "LOAD_DATA_COUNTRY_CODES": {
      return { ...state, CountryCodes: action.payload };
    }
    case "ADD_INFO_SENDER_INTL": {
      // message.success("Thêm thông tin thành công!");
      return { ...state, sender: action.payload };
    }
    case "ADD_INFO_RECEIVER_INTL": {
      // message.success("Thêm thông tin thành công!");
      return { ...state, receiver: action.payload };
    }

    default:
      return state;
  }
};

export default function App() {
  //set up reducer
  const [creatOrderINTL, dispatch] = useReducer(creatOrderINTLReducer, initialState);
  const store = {
    creatOrderINTL,
    dispatch,
  };
  // console.log(creatOrderINTL);
  const getDataNumberPhone = async () => {
    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
      );
      const responseJson = await res.json();
      dispatch({ type: "LOAD_DATA_COUNTRY_CODES", payload: responseJson });
      console.log(responseJson);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataNumberPhone();
  }, []);
  return (
    <contextValue.Provider value={store}>
      <div className="app-main">
        <div style={{ position: "relative" }} className="container pt-4">
          <span
            style={{ color: "red", position: "absolute", top: 0, right: 0, fontSize: "12px", letterSpacing: "1px" }}
          >
            * Là các trường bắt buộc nhập
          </span>
          <Row gutter={[16, 16]}>
            <Col xl={12} xxl={12}>
              <Row gutter={[16, 16]}>
                <Col xl={24} xxl={24}>
                  <InfoSender />
                </Col>
                <Col xl={24} xxl={24}>
                  <InfoReceiver />
                </Col>
              </Row>
            </Col>
            <Col xl={12} xxl={12}>
              <div style={{ width: "100%", minHeight: "50vh", backgroundColor: "#EEEEEE" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque similique esse veritatis nihil, sequi
                consequatur numquam doloribus dolores rem consectetur ut repudiandae libero fuga quaerat, placeat sunt
                porro ipsa aspernatur!
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </contextValue.Provider>
  );
}
