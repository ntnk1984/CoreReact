export const getAllOrderApi = async () => {
  return await (
    await fetch("http://localhost:5020/api/Shipment/find", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({
        ID: "",
        OrderCode: "",
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

export const fetchChangeStatusOrder = async (listId, newStatus) => {
  return await (
    await fetch("http://localhost:5020/api/Shipment/delivery/update", {
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
      }),
    })
  ).json();
};
