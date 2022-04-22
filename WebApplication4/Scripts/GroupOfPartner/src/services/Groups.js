export const getAllGroup = async () => {
  return await (
    await fetch("https://625fcbde53a42eaa07fb1165.mockapi.io/api/groups")
  ).json();
};

export const getGroupById = async (id) => {
    return await (
      await fetch(`https://625fcbde53a42eaa07fb1165.mockapi.io/api/groups/${id}`)
    ).json();
  };

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
  
