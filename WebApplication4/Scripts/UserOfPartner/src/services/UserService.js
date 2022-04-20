export const getAllUserOfPartner = async () => {
  return await (
    await fetch("https://625fcbde53a42eaa07fb1165.mockapi.io/api/users")
  ).json();
};

export const getUserByIdOfPartner= async (id) => {
    return await (
      await fetch(`https://625fcbde53a42eaa07fb1165.mockapi.io/api/users/${id}`)
    ).json();
  };


  export const createUserOfPartner= async (data) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    return await (
      await fetch(`https://625fcbde53a42eaa07fb1165.mockapi.io/api/users`,options)
    ).json();
  };

  
  
