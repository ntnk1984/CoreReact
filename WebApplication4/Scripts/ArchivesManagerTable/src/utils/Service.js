export const CreateAccountApi = async (data, successFuc, ErrorFuc) => {
  const dataPostJson = JSON.stringify({ accounts: data });
  console.log(dataPostJson, "dataJson Service");
  let res = await fetch(`${process.env.API}/api/account/create`, {
    method: "POST",
    body: dataPostJson,
    headers: {
      "Content-Type": "application/json",
      // Authorization:
      //   "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
    },
  });
  if (res.status < 400) {
    res = await res.json();
    successFuc();
  } else {
    res = await res.json();
    ErrorFuc(res.message);
  }
};

export const GetAccountApi = async (data) => {
  const dataPostJson = JSON.stringify(data);
  let res = await fetch(`${process.env.API}/api/account/find`, {
    method: "POST",
    body: dataPostJson,
    headers: {
      "Content-Type": "application/json",
      // Authorization:
      //   "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
    },
  });
  if (res.status < 400) {
    res = await res.json();
    console.log(res);
    return res;
  } else {
    res = await res.json();
    console.log(res);
    return res;
  }
};

export const UpdateAccountApi = async (data) => {
  const dataPostJson = JSON.stringify(data);
  let res = await fetch(`${process.env.API}/api/account/update`, {
    method: "POST",
    body: dataPostJson,
    headers: {
      "Content-Type": "application/json",
      // Authorization:
      //   "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDEiLCJJRCI6IjAyMDBhYTJmLTE1ZDUtNGMzMS05NmQ0LTU0ZTVlYmFjNzI2MSIsIklEUGFydG5lciI6InBhcnRuZXJfMSIsImV4cCI6MTY1NTc4NjMzMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDUwIn0.jX6rajdge6YaD7CxY-5nurWjcy-ZNs6R2Fsux5hyiww",
    },
  });
  if (res.status < 400) {
    res = await res.json();
    console.log(res);
    return res;
  } else {
    res = await res.json();
    console.log(res);
    return res;
  }
};
