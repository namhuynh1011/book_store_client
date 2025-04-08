import axios from "api/axios";

const END_POINT = {
  PRODUCTS: "products",
};

export const getProductDetailAPI = async (id) => {
  return await axios({
    url: `${END_POINT.PRODUCTS}/${id}`,
    method: "GET",
  });
};
