import axios from "api/axios";

export const postLoginAPI = async (data) => {
  return await axios({
    url: `/login`,
    method: "POST",
    data,
  });
};
