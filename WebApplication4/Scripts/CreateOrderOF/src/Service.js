const HOST_SHIPMENT=process.env.HOST_SHIPMENT;
const HOST_UIPARS=process.env.HOST_UIPARS;
const HOST_CATEGORY=process.env.HOST_CATEGORY;

export const postOrder = async (data) => {
  let { listOrder, receiver, sender, DropoffType } = data;

  let dataPostJson = {
    ShipmentRequest: {
      DropoffType: DropoffType,
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
  let dataRequest = {
    ShipmentRequest: [dataPostJson.ShipmentRequest],
  };
  dataRequest = JSON.stringify(dataRequest);

  var res = await fetch(`${HOST_SHIPMENT}/api/Shipment/add`, {
    method: "POST",
    credentials: "include",
    body: dataRequest,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    res = await res.json();
  }
};

export const getDataLocationPost = async (showSelect) => {
  let res = await fetch(`https://62666598dbee37aff9b052e0.mockapi.io/location`);
  if (res.status === 200) {
    showSelect();
    return res.json();
  }
};

export const getCountryAll = async () => {
  const res = await fetch(`${HOST_CATEGORY}/api/Country/GetAllCountry`);

  return await res.json();
};

export const getCity = async (countryCode) => {
  let res = await fetch(`${HOST_CATEGORY}/api/City/GetAllCityByCountryCode?CountryCode=${countryCode}`);
  res = await res.json();
  return await res.responses;
};

export const getDistrict = async (countryCode, cityCode) => {
  let res = await fetch(
    `${HOST_CATEGORY}/api/District/GetAllDistrictByCityCountryCode?CityCode=${cityCode}&CountryCode=${countryCode}`
  );
  res = await res.json();
  return await res.responses;
};

export const getWard = async (countryCode, cityCode, districtCode) => {
  let res = await fetch(
    `${HOST_CATEGORY}/api/Ward/GetAllWardByDistrictCityCountryCode?DistrictCode=${districtCode}&CityCode=${cityCode}&CountryCode=${countryCode}`
  );
  res = await res.json();
  return await res.responses;
};

export const getExtraService = async () => {
  let res = await fetch(
    `${HOST_CATEGORY}/api/ExtraService/GetAllExtraService`
  );
  return await res.json();
};

export const getMerchandiseType = async () => {
  let res = await fetch(
    `${HOST_CATEGORY}/api/MerchandiseType/GetAllMerchandiseType`
  );
  return await res.json();
};
