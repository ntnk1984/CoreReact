export const postOrder =  (data) => {
  let { listOrder, receiver, sender } = data;
  
  //xu li total order
  const temp = [];
  const handleTotalOrder = () => {
    listOrder.map((item) => {
      const temp2 = {
        length: 1,
        width: 2,
        height: 3,
        weight: 4,
        COD: 100,
        currency: "VND",
        packagetype: 3,
        MerchandiseInfomation: [],
      };
      item.map((value) => {
        let temp3 = {
          HSCode: value.maSP,
          VietNameseName: value.nameSP,
          EnglishName: value.nameEngSP,
          CountryManufacturedCode: value.maQuocGia,
          Unit: value.donViTienTe,
          Currency: value.maSP,
          Value: parseFloat(value.donGia),
          Quantity: parseFloat(value.soLuong),
          Weight: parseFloat(value.canNang),
        };
        temp2.MerchandiseInfomation.push(temp3);
      });
      temp.push(temp2);
    });
  };

  handleTotalOrder();
  let dataPostJson = {
    orderShippingItems: [
      {
        SenderName: sender.sendername,
        SenderPhone: sender.senderphone,
        SenderCountryCode: sender.sendercountry,
        SenderCityCode: sender.sendercity,
        SenderDistrictCode: sender.senderdistrict,
        SenderWardCode: sender.senderward,
        SenderPostalCode: sender.phoneregioncode,
        SenderAddress: sender.senderaddress,
        ReceiverName: receiver.receivername,
        ReceiverPhone: receiver.receiverphone,
        ReceiverAddress: receiver.receiveraddress,
        ReceiverCountryCode: receiver.receivercountry,
        ReceiverCityCode: receiver.receivercity,
        ReceiverDistrictCode: receiver.receiverdistrict,
        ReceiverWardCode: receiver.receiverward,
        ReceiverPostalCode: receiver.phoneregioncode,
        OrderInfomation: [...temp],
      },
    ],
  };
  dataPostJson = JSON.stringify(dataPostJson);
  console.log("dataPostJson", dataPostJson);

  return fetch(`http://localhost:5020/api/OrderShipping/add-orderShipping`, {
    method: "POST",
    body: dataPostJson,
    headers: { "Content-Type": "application/json" },
  })
   
  //   if (res.status === 200) {
  //     res = await res.json();
  //     console.log("Thành công!");
  //   } else {
  //     console.log("thất  bại!");
  //   }
};
