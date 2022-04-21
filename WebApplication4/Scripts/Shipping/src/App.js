import { Button, Input, Tabs } from "antd";
import React, { useReducer } from "react";
import InfoOrder from "./components/InfoOrder";
import StatisModal from "./components/Modal/statisModal";
import OrderStatus from "./components/OrderStatus";
import "./components/Style/App.css";

const { TabPane } = Tabs;

export const contextValue = React.createContext();
const initialState = {
  listOrder: [
    {
      id: 121,
      idPackage: 1,
      HsCode: "ccccc",
      vietnameseName: "Bình Hoa Phong Thủy",
      englishName: "Feng Shui Flower Vase",
      countryCode: "FF01C26B163",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 2,
      weight: 100,
      statusOrder: true,
      tinhTrangDonHang: "daXacNhan",
    },
    {
      id: 122,
      idPackage: 2,
      HsCode: "ccccc",
      vietnameseName: "Bình Hoa Phong Thủy 2",
      englishName: "Feng Shui Flower Vase 2",
      countryCode: "FF01C26B163",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 1,
      weight: 100,
      statusOrder: true,
      tinhTrangDonHang: "daXacNhan",
    },
    {
      id: 123,
      idPackage: 3,
      HsCode: "ccccc",
      vietnameseName: "Bình Hoa Phong Thủy 3",
      englishName: "Feng Shui Flower Vase 3",
      countryCode: "FF01C26B163",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 9,
      weight: 100,
      statusOrder: false,
      tinhTrangDonHang: "choXacNhan",
    },
    {
      id: 124,
      idPackage: 4,
      HsCode: "ccccc",
      vietnameseName: "Bình Hoa Phong Thủy 4",
      englishName: "Feng Shui Flower Vase 4",
      countryCode: "FF01C26B164",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 2,
      weight: 100,
      statusOrder: true,
      tinhTrangDonHang: "daXacNhan",
    },
    {
      id: 125,
      idPackage: 5,
      HsCode: "ccccc",
      vietnameseName: "Dao mổ trâu dùng giết gà",
      englishName: "Dark",
      countryCode: "FF01C26B165",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 4,
      weight: 100,
      statusOrder: false,
      tinhTrangDonHang: "daHuy",
    },
    {
      id: 126,
      idPackage: 6,
      HsCode: "ccccc",
      vietnameseName: "Búp Bê 1m55 ",
      englishName: "Dolly 1m55",
      countryCode: "FF01C26B166",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 4,
      weight: 100,
      statusOrder: false,
      tinhTrangDonHang: "dangGiao",
    },
    {
      id: 127,
      idPackage: 7,
      HsCode: "ccccc",
      vietnameseName: "Siêu Nhân 7",
      englishName: "Superman 7",
      countryCode: "FF01C26B167",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 4,
      weight: 100,
      statusOrder: false,
      tinhTrangDonHang: "daGiao",
    },
    {
      id: 128,
      idPackage: 8,
      HsCode: "ccccc",
      vietnameseName: "Cơm Sườn - Bì - Chả",
      englishName: "Rice with Ribs - Pork - Cha",
      countryCode: "FF01C26B168",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 4,
      weight: 100,
      statusOrder: false,
      tinhTrangDonHang: "daGiao",
    },
    {
      id: 129,
      idPackage: 9,
      HsCode: "ccccc",
      vietnameseName: "Áo Dài Nam Bộ Việt Nam",
      englishName: "Vietnamese men's long dress",
      countryCode: "FF01C26B169",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 4,
      weight: 100,
      statusOrder: false,
      tinhTrangDonHang: "daGiao",
    },
    {
      id: 130,
      idPackage: 10,
      HsCode: "ccccc",
      vietnameseName: "Bánh mì Việt Nam",
      englishName: "Vietnamese bread",
      countryCode: "FF01C26B163",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 9,
      weight: 100,
      statusOrder: false,
      tinhTrangDonHang: "choXacNhan",
    },
    {
      id: 131,
      idPackage: 11,
      HsCode: "ccccc",
      vietnameseName: "Gậy Bắt Chó - Xe Exciter 155",
      englishName: "Noose - Exciter 155",
      countryCode: "FF01C26B163",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 9,
      weight: 100,
      statusOrder: false,
      tinhTrangDonHang: "dangGiao",
    },
    {
      id: 132,
      idPackage: 12,
      HsCode: "ccccc",
      vietnameseName: "Máy Rung Massage 7 cấp độ",
      englishName: "Vibration Massager 7 Levels",
      countryCode: "FF01C26B163",
      donviTinh: "không biết",
      currebcy: "VND",
      quantity: 9,
      weight: 100,
      statusOrder: false,
      tinhTrangDonHang: "daXacNhan",
    },
  ],
  orderShippingInfo: [
    {
      id: 1,
      idOrderShipping: "A00001",
      packageCode: "abc",
      customPackageCode: "abc-auto",
      length: 300,
      width: 400,
      height: 500,
      weight: 100,
      cod: 100000,
      currebcy: "VND",
      packageType: "Hàng Dễ Vỡ",
      idCreator: undefined,
      createdTime: "10/10/2022",
    },
    {
      id: 2,
      idOrderShipping: "A00002",
      packageCode: "abc-2",
      customPackageCode: "abc-auto2",
      length: 300,
      width: 400,
      height: 500,
      weight: 20,
      cod: 200000,
      currebcy: "VND",
      packageType: "Hàng Dễ Vỡ",
      idCreator: undefined,
      createdTime: "20/20/2022",
    },
    {
      id: 3,
      idOrderShipping: "A00003",
      packageCode: "abc-3",
      customPackageCode: "abc-auto3",
      length: 300,
      width: 400,
      height: 500,
      weight: 30,
      cod: 300000,
      currebcy: "VND",
      packageType: "Hàng Bình THường",
      idCreator: undefined,
      createdTime: "10/10/2022",
    },
    {
      id: 4,
      idOrderShipping: "A00004",
      packageCode: "abc-4",
      customPackageCode: "abc-auto4",
      length: 300,
      width: 400,
      height: 500,
      weight: 10,
      cod: 100000,
      currebcy: "VND",
      packageType: "Hàng Dễ Vỡ",
      idCreator: undefined,
      createdTime: "10/10/2022",
    },
    {
      id: 5,
      idOrderShipping: "A00005",
      packageCode: "abc-5",
      customPackageCode: "abc-auto5",
      length: 120,
      width: 220,
      height: 320,
      weight: 420,
      cod: 500,
      currebcy: "VND",
      packageType: "Hàng Bình Thường",
      idCreator: undefined,
      createdTime: "01/02/2021",
    },
    {
      id: 6,
      idOrderShipping: "A00006",
      packageCode: "abc-6",
      customPackageCode: "abc-auto6",
      length: 120,
      width: 220,
      height: 320,
      weight: 420,
      cod: 500,
      currebcy: "VND",
      packageType: "Hàng Bình Thường",
      idCreator: undefined,
      createdTime: "01/02/2021",
    },
    {
      id: 7,
      idOrderShipping: "A00007",
      packageCode: "abc-7",
      customPackageCode: "abc-auto7",
      length: 120,
      width: 220,
      height: 320,
      weight: 420,
      cod: 500,
      currebcy: "VND",
      packageType: "Hàng Bình Thường",
      idCreator: undefined,
      createdTime: "01/02/2021",
    },
    {
      id: 8,
      idOrderShipping: "A00008",
      packageCode: "abc-8",
      customPackageCode: "abc-auto8",
      length: 120,
      width: 220,
      height: 320,
      weight: 420,
      cod: 500,
      currebcy: "VND",
      packageType: "Hàng Bình Thường",
      idCreator: undefined,
      createdTime: "01/02/2021",
    },
    {
      id: 9,
      idOrderShipping: "A00009",
      packageCode: "abc-9",
      customPackageCode: "abc-auto9",
      length: 120,
      width: 220,
      height: 320,
      weight: 420,
      cod: 500,
      currebcy: "VND",
      packageType: "Hàng Bình Thường",
      idCreator: undefined,
      createdTime: "01/02/2021",
    },
    {
      id: 10,
      idOrderShipping: "A000010",
      packageCode: "abc-10",
      customPackageCode: "abc-auto10",
      length: 120,
      width: 220,
      height: 320,
      weight: 420,
      cod: 500,
      currebcy: "VND",
      packageType: "Hàng Bình Thường",
      idCreator: undefined,
      createdTime: "01/02/2021",
    },
    {
      id: 11,
      idOrderShipping: "A000011",
      packageCode: "abc-11",
      customPackageCode: "abc-auto11",
      length: 120,
      width: 220,
      height: 320,
      weight: 420,
      cod: 500,
      currebcy: "VND",
      packageType: "Hàng Bình Thường",
      idCreator: undefined,
      createdTime: "01/02/2021",
    },
    {
      id: 12,
      idOrderShipping: "A000012",
      packageCode: "abc-12",
      customPackageCode: "abc-auto12",
      length: 120,
      width: 220,
      height: 320,
      weight: 420,
      cod: 500,
      currebcy: "VND",
      packageType: "Hàng Bình Thường",
      idCreator: undefined,
      createdTime: "01/02/2021",
    },
  ],
  visibleModal: false,
  // sender: {
  //   sendername: "sadfdsa",
  //   senderphone: "",
  //   phoneregioncode: "",
  //   senderaddress: "",
  //   senderemail: "",
  //   sendercountry: "",
  //   sendercity: "",
  //   senderdistrict: "",
  //   senderward: "",
  // },
  // receiver: {
  //   receivername: "",
  //   receiverphone: "",
  //   phoneregioncode: "",
  //   receiveraddress: "",
  //   receiveremail: "",
  //   receivercountry: "",
  //   receivercity: "",
  //   receiverdistrict: "",
  //   receiverward: "",
  // },
  // total: {
  //   long: 0,
  //   width: 0,
  //   height: 0,
  //   weight: 0,
  //   money: 0,
  //   unit: 0,
  //   type: 0,
  // },
  // orderShippingInfo: {
  //   id: "",
  //   idOrderShipping: "",
  //   packageCode: "",
  //   customPackageCode: "",
  //   length: "",
  //   width: "",
  //   height: "",
  //   weight: "",
  //   cod: "",
  //   currebcy: "",
  //   packageType: "",
  //   idCreator: "",
  //   createdTime: "",
  // },
};

//usereducer
console.log(process.env.API);
const infoOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VISIBLE_MODAL": {
      return { ...state, visibleModal: !state.visibleModal };
    }
    case "CLOSE_VISIBLE_MODAL": {
      return { ...state, visibleModal: false };
    }
    // case "SET_VISIBILITY": {
    //   return { ...state, visibility: !state.visibility };
    // }
    // case "ADD_BUU_GUI": {
    //   return { ...state, listOrder: [...state.listOrder, []] };
    // }

    // case "ADD_INFO_RECEIVER": {
    //   return { ...state, receiver: action.payload };
    // }
    // case "POST_ORDER_API": {
    //   postOrder(state);
    //   return { ...state };
    // }

    default:
      return state;
  }
};

export default function App() {
  //set up reducer
  const [infoOrder, dispatch] = useReducer(infoOrderReducer, initialState);
  const store = {
    infoOrder,
    dispatch,
  };
  const handleModal = () => {
    dispatch({ type: "SET_VISIBLE_MODAL" });
  };
  const showStatistic = (
    <div className="button-statistic">
      <Button type="primary" onClick={handleModal}>
        Thống Kê
      </Button>
      <StatisModal handleModal={handleModal} />
    </div>
  );
  // console.log(infoOrder.visibleModal);
  //handle progress

  return (
    <contextValue.Provider value={store}>
      <div className="app-main  pt-4 ">
        <div style={{ backgroundColor: "#FFFFFF" }} className="container">
          <Tabs
            className="app-tabs"
            // style={{ position: "relative" }}
            defaultActiveKey="1"
            centered
            tabBarExtraContent={showStatistic}
          >
            <TabPane tab="Tất Cả Đơn Hàng" key="1">
              <InfoOrder />
            </TabPane>
            <TabPane tab="Chờ Xác Nhận" key="2">
              <OrderStatus statusOrder="choXacNhan" />
            </TabPane>
            <TabPane tab="Chờ Lấy Hàng" key="3">
              <OrderStatus statusOrder="daXacNhan" />
            </TabPane>
            <TabPane tab="Đang Giao " key="4">
              <OrderStatus statusOrder="dangGiao" />
            </TabPane>
            <TabPane tab="Đã Giao" key="5">
              <OrderStatus statusOrder="daGiao" />
            </TabPane>
            <TabPane tab="Đã Hủy" key="6">
              <OrderStatus statusOrder="daHuy" />
            </TabPane>
            {/* <div style={{ position: "absolute", top: "10px", right: 0 }}>
              <Button type="primary" onClick={handleModal}>
                Thống Kê
              </Button>
              <StatisModal handleModal={handleModal} />
            </div> */}
          </Tabs>
        </div>
      </div>
    </contextValue.Provider>
  );
}
