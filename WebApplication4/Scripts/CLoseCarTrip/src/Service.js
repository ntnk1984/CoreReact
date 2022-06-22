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

export const getImportList = async(data, loadingFail) => {
    let dataImport = JSON.stringify({
        Type: "IMEXPORT_GET_CAN_TRANSPORT",
        FromDate: data.startDate,
        ToDate: data.endDate + " 23:59:00",
        Data: "",
    });
    let token = await GetToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/im-export/get-import`, {
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
        loadingFail();
        if (res_) {
            let res__ = res_.map((x) => ({...x, key: x.ID }));
            return res__;
        }

        return res_;
    } else {
        loadingFail();
        return null;
    }
};


export const CreateTripApi = async(data, successFunc,erroFunc) => {
    let dataImport = JSON.stringify(data);
    let token = await GetToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/transport/add`, {
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
        successFunc();
        return res_;
    } else {
        erroFunc();
        return null;
    }
};


export const getDetailImExport = async(data) => {
    let token = await GetToken();
    let dataJson = JSON.stringify(data);
    let res = await fetch(`${HOST_SHIPMENT}/api/im-export/get-detail`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: dataJson,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        var res_ = res.RESPONSES;

        if (res_) {
            let res__ = res_.map((x) => ({...x, key: x.ID }));
            return res__;
        }

        return res_;
    } else {
        return null;
    }
};

export const getTransportList = async(data, loadingFail) => {
    let dataImport = JSON.stringify({
        Type: "TRANSPORT_GET_ALL",
        FromDate: data.startDate,
        ToDate: data.endDate + " 23:59:00",
        Data: "",
    });
    let token = await GetToken();
    let res = await fetch(`${HOST_SHIPMENT}/api/transport/get`, {
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
        loadingFail();
        if (res_) {
            let res__ = res_.map((x) => ({...x, key: x.ID }));
            return res__;
        }

        return res_;
    } else {
        loadingFail();
        return null;
    }
};

export const getDetailTransport = async(data) => {
    let token = await GetToken();
    let dataJson = JSON.stringify(data);
    let res = await fetch(`${HOST_SHIPMENT}/api/transport/get-detail`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: dataJson,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        var res_ = res.RESPONSES;

        if (res_) {
            let res__ = res_.map((x) => ({...x, key: x.ID }));
            return res__;
        }

        return res_;
    } else {
        return null;
    }
};

export const updateTransportState = async(data, successFunc, errorFuc, onCancel = () => {}) => {
    let token = await GetToken();
    let dataJson = JSON.stringify(data);
    let res = await fetch(`${HOST_SHIPMENT}/api/transport/update-state`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: dataJson,
    });
    res = await res.json();
    if (res.STATUSCODE == 200 && res.MESSAGE == "Success") {
        successFunc();
        onCancel();
        return res;
    } else {
        errorFuc();
        return null;
    }
};
