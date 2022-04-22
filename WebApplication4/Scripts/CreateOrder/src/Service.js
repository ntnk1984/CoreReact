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
        Sender:{
          Name: sender.sendername,
        Phone: sender.senderphone,
        CountryCode: sender.sendercountry,
        CityCode: sender.sendercity,
        DistrictCode: sender.senderdistrict,
        WardCode: sender.senderward,
        PostalCode: sender.phoneregioncode,
       Address: sender.senderaddress,
        },
       Receiver:{
        Name: receiver.receivername,
        Phone: receiver.receiverphone,
        Address: receiver.receiveraddress,
        CountryCode: receiver.receivercountry,
        CityCode: receiver.receivercity,
        DistrictCode: receiver.receiverdistrict,
        WardCode: receiver.receiverward,
        PostalCode: receiver.phoneregioncode,
       },
        OrderInfomation: [...temp],
      },
    ],
  };
  dataPostJson = JSON.stringify(dataPostJson);
  console.log("dataPostJson",dataPostJson);

  return fetch(`${process.env.ORDER}/api/OrderShipping/add-orderShipping`, {
    method: "POST",
    body: dataPostJson,
    headers: {Authorization: `Bearer ${process.env.TOKEN}`},
  })
   
  //   if (res.status === 200) {
  //     res = await res.json();
  //     console.log("Thành công!");
  //   } else {
  //     console.log("thất  bại!");
  //   }
};
