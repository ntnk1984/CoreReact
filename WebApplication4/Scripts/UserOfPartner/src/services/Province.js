export  const getTinhThanh=async()=> {
  return await (
    await fetch("https://api.mysupership.vn/v1/partner/areas/province")
  ).json();
}

export  const getQuanHuyen=async(id)=> {
    return await (
      await fetch(`https://api.mysupership.vn/v1/partner/areas/district?province=${id}`)
    ).json();
  }

  export  const getPhuongXa=async(id)=> {
    return await (
      await fetch(`https://api.mysupership.vn/v1/partner/areas/commune?district=${id}`)
    ).json();
  }
