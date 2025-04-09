// src/pages/admin/listProductsPage/index.js
import "./style.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import ProductAdCard from "../ProductAdCard";

const ListProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res);
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách sản phẩm:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      fetchProducts(); // Refresh danh sách sau khi xoá
    } catch (error) {
      console.error("❌ Lỗi xoá sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="add-product container">
      <h2>Danh Sách Sản Phẩm</h2>
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductAdCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ListProductsPage;
