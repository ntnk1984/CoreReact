const HOST_SHIPMENT = process.env.HOST_SHIPMENT;
const HOST_UIPARS = process.env.HOST_UIPARS;
const HOST_CATEGORY = process.env.HOST_CATEGORY;

export const postListOrder = async(data) => {
    let { importOrderList, Sender } = data;
    const ShipmentRequest = [];
    const fortmatJson = () => {
        importOrderList.map((item, index) => {
            const temp = {
                DropoffType: {
                    type: `${item.DropoffType}`,
                },
                ServiceType: "1",
                Sender: Sender,
                Receiver: {
                    Name: item.ReceiverName,
                    Phone: item.ReceiverPhone,
                    Address: item.ReceiverAddress,
                    CountryCode: item.ReceiverCountryCode,
                    CityCode: item.ReceiverCityCode,
                    DistrictCode: item.ReceiverDistrictCode,
                    WardCode: item.ReceiverWardCode,
                    PostalCode: item.ReceiverPostalCode,
                },
                ShippingChargesPayment: {
                    PaymentType: item.PaymentType,
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
                RequestedPackageLineItems: [{
                    SequenceNumber: index + 1,
                    dimension: {
                        length: item.Length,
                        width: item.Width,
                        height: item.Height,
                        weight: item.Weight,
                    },
                    COD: item.COD,
                    currency: item.Currency,
                    packagetype: 3,
                }, ],
                MerchandiseItems: [{
                    SequenceNumber: index + 1,
                    HSCode: item.HSCode,
                    VietNameseName: item.VietNameseName,
                    EnglishName: item.EnglishName,
                    CountryManufacturedCode: item.CountryManufacturedCode,
                    Unit: item.Unit,
                    Currency: item.Currency,
                    Value: parseFloat(item.Value),
                    Quantity: parseFloat(item.Quantity),
                    Weight: parseFloat(item.Weight),
                }, ],
            };
            ShipmentRequest.push(temp);
        });
    };
    fortmatJson();
    const dataPostJson = JSON.stringify({ ShipmentRequest: ShipmentRequest });
    console.log("dataPostJson", dataPostJson);
    var res = await fetch(`http://localhost:5020/api/Shipment/add`, {
        method: "POST",
        credentials: "include",
        body: dataPostJson,
        headers: {
            Authorization: "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
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

export const getCountryAll = async() => {
    const res = await fetch(`${HOST_CATEGORY}/api/Country/GetAllCountry`);

    return await res.json();
};

export const getCity = async(countryCode) => {
    let res = await fetch(`${HOST_CATEGORY}/api/City/GetAllCityByCountryCode?CountryCode=${countryCode}`);
    res = await res.json();
    return await res.responses;
};

export const getDistrict = async(countryCode, cityCode) => {
    let res = await fetch(
        `${HOST_CATEGORY}/api/District/GetAllDistrictByCityCountryCode?CityCode=${cityCode}&CountryCode=${countryCode}`
    );
    res = await res.json();
    return await res.responses;
};

export const getWard = async(countryCode, cityCode, districtCode) => {
    let res = await fetch(
        `${HOST_CATEGORY}/api/Ward/GetAllWardByDistrictCityCountryCode?DistrictCode=${districtCode}&CityCode=${cityCode}&CountryCode=${countryCode}`
    );
    res = await res.json();
    return await res.responses;
};