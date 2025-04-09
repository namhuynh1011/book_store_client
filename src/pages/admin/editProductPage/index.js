import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import { ROUTERS } from "utils/router";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sort_description: "",
    inventory: "",
    category_id: "",
    facebook: "",
    linkedin: "",
    img: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`).then((res) => {
      setProduct(res.data);
      setFormData({
        name: res.data.name,
        price: res.data.price,
        sort_description: res.data.sort_description,
        inventory: res.data.inventory,
        category_id: res.data.category_id,
        facebook: res.data.facebook,
        linkedin: res.data.linkedin,
        img: null, // không set ảnh cũ
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setFormData((prev) => ({ ...prev, img: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }
      await axios.post(`http://localhost:8000/api/products/${id}?_method=PUT`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Cập nhật thành công!");
      navigate(ROUTERS.ADMIN.LISTPRODUCTS); // điều hướng về trang danh sách
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi xảy ra!");
    }
  };

  if (!product) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="edit_product container">
      <h2>Chỉnh Sửa Sản Phẩm</h2>
      <form onSubmit={handleSubmit} className="edit_form">
        <label>
          Tên sản phẩm:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Giá:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>

        <label>
          Mô tả ngắn:
          <textarea name="sort_description" value={formData.sort_description} onChange={handleChange} required />
        </label>

        <label>
          Tồn kho:
          <input type="number" name="inventory" value={formData.inventory} onChange={handleChange} required />
        </label>

        <label>
          Danh mục (ID):
          <input type="number" name="category_id" value={formData.category_id} onChange={handleChange} required />
        </label>

        <label>
          Facebook:
          <input type="url" name="facebook" value={formData.facebook || ""} onChange={handleChange} />
        </label>

        <label>
          LinkedIn:
          <input type="url" name="linkedin" value={formData.linkedin || ""} onChange={handleChange} />
        </label>

        <label>
          Hình ảnh (chọn mới nếu muốn đổi):
          <input type="file" name="img" onChange={handleChange} />
        </label>

        <div className="btn-group">
          <button type="submit" className="save-btn">Lưu</button>
          <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
