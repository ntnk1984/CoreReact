export const fetchAllOrderApi = async (fromDate, toDate) => {
  return await (
    await fetch("http://localhost:5020/api/shipment/query", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({
        fromDate: `${fromDate} 23:59:00`,
        toDate: `${toDate} 23:59:00`,
        type: 0,
      }), // body data type must match "Content-Type" header
    })
  ).json();
};
export const removeOrderByIdApi = async (id) => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return await (
    await fetch(
      `https://625fcbde53a42eaa07fb1165.mockapi.io/api/orders/${id}`,
      options
    )
  ).json();
};

export const fetchChangeStatusOrder = async (listId, newStatus, noteType) => {
  return await (
    await fetch("http://localhost:5020/api/shipment/delivery/update", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
      },
      body: JSON.stringify({
        id: listId,
        actionType: newStatus,
        note: noteType,
      }),
    })
  ).json();
};

export const fetchPackageByShipmentId = async (id) => {
  return await (
    await fetch(
      `http://localhost:5020/api/package/get-by-shipment-id?IDOrderShipping=${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
        },
      }
    )
  ).json();
};

export const fetchDeletePackageId = async (id) => {
  return await await fetch("http://localhost:5020/api/package/delete", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
    },
    body: JSON.stringify({
      id,
      token:
        "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
    }),
  });
};

export const fetchMerchandiseShipmentCode = async (code) => {
  console.log(code, "code");
  return await (
    await fetch(`http://localhost:5020/api/merchandise/get?OrderCode=${code}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
      },
    })
  ).json();
};

export const fetchDeleteMerchandiseId = async (id) => {
  return await await fetch("http://localhost:5020/api/merchandise/delete", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
    },
    body: JSON.stringify({
      id,
      // token:"eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww"
    }),
  });
};

export const fetchUpdateMerchandiseId = async (item) => {
  return await (
    await fetch("http://localhost:5020/api/merchandise/edit", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
      },
      body: JSON.stringify({
        editMerchandiseRequest: item,
      }),
    })
  ).json();
};

export const fetchUpdatePackage = async (item) => {
  console.log(item);
  return await (
    await fetch("http://localhost:5020/api/package/edit-by-order-id", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
      },
      body: JSON.stringify({
        editPackageRequest: {
          id: item.id,
          customPackageCode: item.customPackageCode,
          dimension: {
            length: item["length"],
            width: item.width,
            height: item.height,
            weight: item.weight,
          },
          cod: item.cod,
          currency: item.currency,
          packageType: item.packageType,
        },
      }),
    })
  ).json();
};
