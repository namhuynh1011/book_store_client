import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProductAPI } from "api/addProductPage/request"; // Tạo API thêm sản phẩm
import "./style.scss";
import { useGetCategoriesUS } from "api/homePage";

const AddProductPage = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    inventory: "",
    sort_description: "",
    facebook: "",
    linkedin: "",
    category_id: "",
    img: null,
  });

  const { data: categories } = useGetCategoriesUS();
  console.log("Categories:", categories);
  const { mutate: createProduct, isLoading } = useMutation({
    mutationFn: (data) => createProductAPI(data),
    onSuccess: () => {
      alert("Thêm sản phẩm thành công!");
    },
    onError: (err) => {
      console.error(err);
      alert("Lỗi khi thêm sản phẩm!");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        img: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.img) {
      alert("Vui lòng chọn ảnh!");
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (["price", "inventory", "category_id"].includes(key)) {
        formData.append(key, Number(value));
      } else {
        formData.append(key, value);
      }
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    createProduct(formData);
  };

  return (
    <div className="add-product container">
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit} className="add-product__form">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="inventory"
          placeholder="Số lượng tồn kho"
          onChange={handleChange}
          required
        />
        <textarea
          name="sort_description"
          placeholder="Mô tả ngắn"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="facebook"
          placeholder="Facebook"
          onChange={handleChange}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          onChange={handleChange}
        />
        <select
          name="category_id" className="category_id"
          onChange={handleChange}
          value={form.category_id}
          required
        >
          <option value="">-- Chọn danh mục --</option>
          {categories?.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>Không có danh mục</option>
          )}
        </select>
        <input
          type="file"
          accept="image/*"
          name="img"
          onChange={handleFileChange}
        />

        <button
          type="submit"
          className="add-product__submit"
          disabled={isLoading}
        >
          {isLoading ? "Đang thêm..." : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
