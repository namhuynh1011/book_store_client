import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.REACT_APP_API_URI;
console.log("👉 baseURL:", baseURL);
const timeout = +(process.env.REACT_APP_API_TIME_OUT || 20000);

// axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL,
  timeout,
});

// Config axiosInstance
axiosInstance.interceptors.request.use(
  function (config) {
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    if (Cookies.get("access_token")) {
      config.headers["access_token"] = Cookies.get("access_token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data) {
      return response?.data;
    }
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
