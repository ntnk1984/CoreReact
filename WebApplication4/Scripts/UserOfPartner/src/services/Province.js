export const getTinhThanh = async () => {
  return await await fetch("http://192.168.5.157:5010/api/Areas/Province")
    .then((responsi) => responsi.json())
    .catch((err) => console.log(err));
};

export const getQuanHuyen = async (id) => {
  return await (
    await fetch(
      `http://192.168.5.157:5010/api/Areas/District?ProvinceCode=${id}`
    )
  ).json();
};

export const getPhuongXa = async (id) => {
  return await (
    await fetch(`http://192.168.5.157:5010/api/Areas/Ward?DistrictCode=${id}`)
  ).json();
};
