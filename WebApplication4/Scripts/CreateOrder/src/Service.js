export const postOrder = async (data) => {
  let { listOrder, receiver, sender } = data;

  //xu li total order
  // const temp = [];
  let RequestedPackageLineItems = [];
  let MerchandiseItems = [];
  // const handleTotalOrder = () => {
  //   listOrder.map((item) => {
  //     RequestedPackageLineItems = item.RequestedPackageLineItems;
  //     MerchandiseItems = item.RequestedPackageLineItems;
  //     const temp2 = {
  //       length: 1,
  //       width: 2,
  //       height: 3,
  //       weight: 4,
  //       COD: 100,
  //       currency: "VND",
  //       packagetype: 3,
  //       MerchandiseInfomation: [],
  //     };
  //     item.map((value) => {
  //       let temp3 = {
  //         HSCode: value.maSP,
  //         VietNameseName: value.nameSP,
  //         EnglishName: value.nameEngSP,
  //         CountryManufacturedCode: value.maQuocGia,
  //         Unit: value.donViTienTe,
  //         Currency: value.maSP,
  //         Value: parseFloat(value.donGia),
  //         Quantity: parseFloat(value.soLuong),
  //         Weight: parseFloat(value.canNang),
  //       };
  //       temp2.MerchandiseInfomation.push(temp3);
  //     });
  //     temp.push(temp2);
  //   });
  // };

  // handleTotalOrder();
  let dataPostJson = {
    ShipmentRequest: {
      DropoffType: "01",
      ServiceType: "01",
      Sender: {
        Name: sender.sendername,
        Phone: sender.senderphone,
        CountryCode: sender.sendercountry,
        CityCode: sender.sendercity,
        DistrictCode: sender.senderdistrict,
        WardCode: sender.senderward,
        PostalCode: sender.phoneregioncode,
        Address: sender.senderaddress,
      },
      Receiver: {
        Name: receiver.receivername,
        Phone: receiver.receiverphone,
        Address: receiver.receiveraddress,
        CountryCode: receiver.receivercountry,
        CityCode: receiver.receivercity,
        DistrictCode: receiver.receiverdistrict,
        WardCode: receiver.receiverward,
        PostalCode: receiver.phoneregioncode,
      },
      //test
      ShippingChargesPayment: {
        PaymentType: "Sender",
      },
      SpecialServicesRequested: {
        SpecialServiceType: "COD",
        CODDetail: {
          CodCollectionAmount: 100000,
        },
      },
      PackageRating: {
        RateType: "1a2b",
        TotalSurcharges: 20,
        TotalTaxes: 30,
        NetCharge: 40,
        TotalRebates: 2,
        Discount: 20,
        Surcharges: {
          SurchargeType: "1a2b3c",
          Description: "Surcharges for 1b2b3c",
          Amount: 15,
          Taxes: 1.5,
        },
      },
      //test
      RequestedPackageLineItems: listOrder.RequestedPackageLineItems,
      MerchandiseItems: listOrder.MerchandiseItems,
    },
  };
  dataPostJson = JSON.stringify(dataPostJson);
  console.log("dataPostJson", dataPostJson);

  var res = await fetch(`http://localhost:5020/api/Shipment/add`, {
    method: "POST",
    credentials: "include",
    body: dataPostJson,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    res = await res.json();
    console.log(res);
  } else {
    console.log(res);
  }
};

export const layThongTinQuanHuyen = () => {};
