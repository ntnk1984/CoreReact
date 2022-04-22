export const getAllOrderApi=async ()=>{
    return await (await (fetch("https://625fcbde53a42eaa07fb1165.mockapi.io/api/orders"))).json()
}
export const removeOrderByIdApi=async(id)=>{
    const options={
        method:"DELETE",
        headers: { "Content-Type": "application/json" },
    }
    return await (await (fetch(`https://625fcbde53a42eaa07fb1165.mockapi.io/api/orders/${id}`,options))).json()
}