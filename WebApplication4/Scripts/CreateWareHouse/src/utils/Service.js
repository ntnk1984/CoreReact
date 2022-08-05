const HOST_SHIPMENT = process.env.HOST_SHIPMENT; //5020
const HOST_UIPARS = process.env.HOST_UIPARS;
const HOST_CATEGORY = process.env.HOST_CATEGORY;
const token_ = process.env.TOKEN;
// Lấy token để gọi request

export const GetToken = async() => {
    if (token_ != "") {
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


export const getAreaList = async(data, loadingFail) => {
    let dataImport = JSON.stringify({
        Action_Type: "GET_ALL_AREA",
        // Action_Data: "",
    });
    let token = await GetToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/warehouse/get-area`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: dataImport,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        var res_ = res.RESPONSES;
        // loadingFail();
        // if (res_) {
        //     let res__ = res_.map((x) => ({...x, key: x.ID }));
        //     return res__;
        // }

        return res_;
    } else {
        // loadingFail();
        return null;
    }
};

export const updateAreaList = async(data, succ, loadingFail) => {
    let dataImport = JSON.stringify(data);
    let token = await GetToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/warehouse/update-area`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: dataImport,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        var res_ = res.RESPONSES;
        // loadingFail();
        // if (res_) {
        //     let res__ = res_.map((x) => ({...x, key: x.ID }));
        //     return res__;
        // }
        succ();
        return res_;
    } else {
        loadingFail();
        return null;
    }
};
/// Phân Khu
export const updateOrderShippingListApi = async(data, succF, failF) => {
    let dataImport = JSON.stringify({
        ActionType: "ORDERSHIPPING_CONFIRM_ORDER",
        ID: data,
    });
    let token = await GetToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/shipment/delivery/update`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: dataImport,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        var res_ = res.RESPONSES;
        // loadingFail();
        // if (res_) {
        //     let res__ = res_.map((x) => ({...x, key: x.ID }));
        //     return res__;
        // }
        succF();
        return res_;
    } else {
        failF;
        return null;
    }
};

//e

export const getOrderShippingListApi = async(data, loadingFail) => {
    let dataImport = JSON.stringify({
        Type: "ORDERSHIPPING_GET_VALID",
        // Action_Data: "",
    });
    let token = await GetToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/shipment/query`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: dataImport,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        var res_ = res.RESPONSES;
        // loadingFail();
        // if (res_) {
        //     let res__ = res_.map((x) => ({...x, key: x.ID }));
        //     return res__;
        // }

        return res_;
    } else {
        // loadingFail();
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