import axios from "api/axios";

const END_POINT = {
  ORDER: "admin/order",
};

export const getOrdersAdAPI = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  return await axios({
    url: `${END_POINT.ORDER}?${queryString}`,
    method: "GET",
  });
};

export const putStatusOrdersAdAPI = async (id, status) => {
  return await axios({
    url: `${END_POINT.ORDER}/${id}`,
    method: "PUT",
    data: { status },
  });
};
