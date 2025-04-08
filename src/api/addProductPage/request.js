import axios from "api/axios"; // ✅ Phải là import từ file axios bạn cấu hình baseURL
// KHÔNG ĐƯỢC dùng: import axios from "axios" ❌

// export const createProductAPI = async (data) => {
//   console.log("✅ Gọi API tạo sản phẩm:", data);
//   return await axios({
//     url: "products", // chỉ cần endpoint, vì baseURL là http://127.0.0.1:8000/api
//     method: "POST",
//     data,
//   });
// };



export const createProductAPI = (formData) => {
  return axios.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // ⚠️ Bắt buộc!
    },
  });
};
