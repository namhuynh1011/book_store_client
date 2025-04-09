// src/pages/admin/addCategoriesPage/index.js
import axiosInstance from "../../../api/axios";
import { useEffect, useState } from "react";
import "./style.scss";

const AddCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // Gọi API để lấy danh sách thể loại
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res);
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách thể loại:", error);
    }
  };

  // Gọi API để thêm thể loại
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    try {
      await axiosInstance.post("/categories", { name: categoryName });
      setCategoryName("");
      fetchCategories();
    } catch (err) {
      console.error("❌ Lỗi thêm thể loại:", err);
    }
  };

  // Gọi API để xóa thể loại
  const handleDeleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("❌ Lỗi xoá thể loại:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-container">
      <h2>📚 Danh Sách Thể Loại</h2>
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}
            <button className="delete-btn" onClick={() => handleDeleteCategory(cat.id)}>Xoá</button>
          </li>
        ))}
      </ul>

      <div className="form-add-category">
        <h2>➕ Thêm Thể Loại</h2>
        <input
          type="text"
          placeholder="Nhập tên thể loại"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory}>Thêm</button>
      </div>
    </div>
  );
};

export default AddCategoriesPage;
