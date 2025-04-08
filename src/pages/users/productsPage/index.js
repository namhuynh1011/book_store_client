import { memo, useState, useEffect, useMemo } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useGetCategoriesUS, useGetProductUS } from "../../../api/homePage";
import { ProductCard } from "component";

const ProductsPage = () => {
  const { data: allProducts } = useGetProductUS();
  const { data: categories } = useGetCategoriesUS();
  const [searchParams, setSearchParams] = useSearchParams();

  // State cho bộ lọc và sắp xếp
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const [priceMin, setPriceMin] = useState(searchParams.get('minPrice') || "");
  const [priceMax, setPriceMax] = useState(searchParams.get('maxPrice') || "");
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || "Giá Thấp Đến Cao");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);

  const sorts = [
    "Giá Thấp Đến Cao",
    "Giá Cao Đến Thấp",
    "Cũ Đến Mới",
    "Mới Đến Cũ",
    "Đang Giảm Giá",
    "Bán Chạy Nhất",
  ];

  // Hàm xử lý thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Hàm xử lý thay đổi giá trị min của giá
  const handlePriceMinChange = (e) => {
    setPriceMin(e.target.value);
  };

  // Hàm xử lý thay đổi giá trị max của giá
  const handlePriceMaxChange = (e) => {
    setPriceMax(e.target.value);
  };

  // Hàm xử lý thay đổi sắp xếp
  const handleSortChange = (item) => {
    setSortBy(item);
    setSearchParams(params => {
      params.set('sort', item);
      return params;
    });
  };

  // Hàm xử lý chọn thể loại
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams(params => {
      if (categoryId) {
        params.set('category', categoryId);
      } else {
        params.delete('category'); // Để bỏ chọn
      }
      return params;
    });
  };

  // Hàm lọc sản phẩm
  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];

    let filtered = [...allProducts];

    // Lọc theo tìm kiếm
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Lọc theo giá
    const min = parseFloat(priceMin);
    const max = parseFloat(priceMax);
    if (!isNaN(min)) {
      filtered = filtered.filter(product => product.price >= min);
    }
    if (!isNaN(max)) {
      filtered = filtered.filter(product => product.price <= max);
    }

    // Lọc theo thể loại
    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoryId === parseInt(selectedCategory)); // Giả sử có trường categoryId
    }

    return filtered;
  }, [allProducts, searchQuery, priceMin, priceMax, selectedCategory]);

  // Hàm sắp xếp sản phẩm đã lọc
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    switch (sortBy) {
      case "Giá Thấp Đến Cao":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Giá Cao Đến Thấp":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Cũ Đến Mới":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Giả sử có trường createdAt
        break;
      case "Mới Đến Cũ":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Giả sử có trường createdAt
        break;
      case "Đang Giảm Giá":
        sorted.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)); // Giả sử có trường discountPercentage
        break;
      case "Bán Chạy Nhất":
        sorted.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)); // Giả sử có trường soldCount
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredProducts, sortBy]);

  // Cập nhật state ban đầu từ URL
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || "");
    setPriceMin(searchParams.get('minPrice') || "");
    setPriceMax(searchParams.get('maxPrice') || "");
    setSortBy(searchParams.get('sort') || "Giá Thấp Đến Cao");
    setSelectedCategory(searchParams.get('category') || null);
  }, [searchParams]);

  return (
    <>
      <Breadcrumb name="Danh Sách Sản Phẩm" />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div className="sidebar">
              <div className="sidebar_item">
                <h2>Tìm Kiếm</h2>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <div className="sildebar_item">
                <h2>Mức Giá</h2>
                <div className="price_range_wrap">
                  <div>
                    <p>Từ:</p>
                    <input
                      type="number"
                      min={0}
                      value={priceMin}
                      onChange={handlePriceMinChange}
                      placeholder="Giá tối thiểu"
                    />
                  </div>
                  <div>
                    <p>Đến:</p>
                    <input
                      type="number"
                      min={0}
                      value={priceMax}
                      onChange={handlePriceMaxChange}
                      placeholder="Giá tối đa"
                    />
                  </div>
                </div>
              </div>
              <div className="sidebar_item">
                <h2>Sắp Xếp</h2>
                <div className="tags">
                  {sorts.map((item, key) => (
                    <div
                      className={`tag ${sortBy === item ? "active" : ""}`}
                      key={key}
                      onClick={() => handleSortChange(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="sidebar_item">
                <h2>Thể Loại</h2>
                <ul>
                  <li key="all" className={selectedCategory === null ? "active" : ""}>
                    <Link to={ROUTERS.USER.PRODUCTS} onClick={() => handleCategoryChange(null)}>Tất Cả</Link>
                  </li>
                  {categories?.map((category) => (
                    <li
                      key={category.id}
                      className={selectedCategory === String(category.id) ? "active" : ""}
                    >
                      <Link
                        to={`${ROUTERS.USER.PRODUCTS}?category=${category.id}`}
                        onClick={() => handleCategoryChange(String(category.id))}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div className="row pl-10">
              {sortedProducts && sortedProducts.length > 0 ? (
                sortedProducts.map((item) => (
                  <div
                    className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                    key={item.id} // Sử dụng item.id làm key nếu có
                  >
                    <ProductCard product={item} />
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm nào phù hợp với bộ lọc.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductsPage);