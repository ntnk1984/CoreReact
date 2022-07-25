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
        if (res.status == 200) {
            res = await res.json();
            return res.RESPONSES.ACCESS_TOKEN;
        } else {
            return "";
        }
    }
};

export const getCountryAll = async() => {
    const res = await fetch(`${HOST_CATEGORY}/api/Country/GetAllCountry`);
    let res_ = await res.json()
    if (res_) {
        return res_.responses
    }
    return res_
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