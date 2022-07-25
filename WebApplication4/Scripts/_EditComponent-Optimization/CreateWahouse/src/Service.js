const HOST_SHIPMENT = process.env.HOST_SHIPMENT;
const HOST_UIPARS = process.env.HOST_UIPARS;
const HOST_CATEGORY = process.env.HOST_CATEGORY;
const token_ = process.env.TOKEN;

export const GetToken = async() => {
    if (token_ !== "") {
        return token_;
    } else {
        var res = await fetch(`${HOST_UIPARS}/api/account/get-token`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.STATUS == 200) {
            res = await res.json();
            return res.RESPONSES.ACCESS_TOKEN;
        } else {
            return "";
        }
    }
};

export const getReleasedOrder = async() => {
    var json_request = JSON.stringify({
        Type: "ORDERSHIPPING_GET_CONFIRMED",
    });
    let token = await GetToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/shipment/query`, {
        method: "POST",
        // credentials : "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: json_request,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        return res;
    } else {
        return null;
    }
};

export const postWarehouseApi = async(data) => {
    let token = await GetToken();
    let json_request = JSON.stringify(data);
    let res = await fetch(`${HOST_SHIPMENT}/api/warehouse/add`, {
        // credentials : "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: json_request,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        return res.RESPONSES;
    } else {
        return null;
    }
};

export const getWarehouseApi = async() => {
    let token = await GetToken();
    let res = await fetch(
        `${HOST_SHIPMENT}/api/warehouse/get?` +
        new URLSearchParams({
            Type: "WAREHOUSE_GET_ALLDETAIL",
        }), {
            // credentials : "include",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        return res.RESPONSES;
    } else {
        return null;
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