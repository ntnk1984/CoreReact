
/** Lấy tất cả group của đối tác **/
export const getAllGroup = async () => {
  return await (
    await fetch("https://625fcbde53a42eaa07fb1165.mockapi.io/api/groups")
  ).json();
};
/** Lấy  group theo id của đối tác **/
export const getGroupById = async (id) => {
  return await (
    await fetch(`https://625fcbde53a42eaa07fb1165.mockapi.io/api/groups/${id}`)
  ).json();
};
/** Tạo mới group của đối tác **/
export const createGroupPartner = async (data) => {
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return await (
    await fetch(
      "https://625fcbde53a42eaa07fb1165.mockapi.io/api/groups",
      option
    )
  ).json();
};
/** Xóa group của đối tác theo id **/
export const removeGroupById = async (id) => {
  const option = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  return await (
    await fetch(
      `https://625fcbde53a42eaa07fb1165.mockapi.io/api/groups/${id}`,
      option
    )
  ).json();
};
