export const getTinhThanh = async () => {
  return await (
    await fetch(`${process.env.HOST}Areas/Province`)
  ).json();
};

export const getQuanHuyen = async (id) => {
  return await (
    await fetch(
      `${process.env.HOST}Areas/District?ProvinceCode=${id}`
    )
  ).json();
};

export const getPhuongXa = async (id) => {
  return await (
    await fetch(`${process.env.HOST}Areas/Ward?DistrictCode=${id}`)
  ).json();
};
