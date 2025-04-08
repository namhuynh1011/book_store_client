import BreadcrumbUS from "pages/users/theme/breadcrumb";
import { memo, useState } from "react";
import {
  AiOutlineCopy,
  AiOutlineEye,
  AiOutlineFacebook,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { formatter } from "utils/formater";
import "./style.scss";
import { ProductCard } from "component";
import { useGetProductDetailUS } from "api/productDetailPage/queries";
import { Link, useParams } from "react-router-dom";
import { useGetProductUS } from "api/homePage";
import useShoppingCart from "hooks/useShoppingCart";

const ProductsDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useShoppingCart();

  const { data: product, isLoading } = useGetProductDetailUS(id);
  const { data: products } = useGetProductUS();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increase") return prev + 1;
      if (type === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const baseImageUrl = process.env.REACT_APP_IMG_URL || "http://localhost:8000";
  const imageUrl = product?.img?.startsWith("http")
    ? product.img
    : `${baseImageUrl}${product?.img?.startsWith("/") ? "" : "/"}${
        product?.img
      }`;

  const similarProducts = products?.filter(
    (item) =>
      item.category_id === product?.category_id && item.id !== product?.id
  );

  return (
    <>
      <BreadcrumbUS name={"Chi tiết sản phẩm"} />
      {!isLoading && product && (
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 product__details__pic">
              <img
                src={imageUrl}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 product__details__text">
              <h2>{product?.name || "Tên sản phẩm không tồn tại"}</h2>
              <div className="seen-icon">
                <AiOutlineEye />
                {` 10 (lượt đã xem)`}
              </div>
              <h3 className="product__details__quantity">
                {formatter(+product?.price || 0)}
              </h3>
              <p>{product?.sort_description || "Không có mô tả ngắn"}</p>

              <div className="quantity-control">
                <button onClick={() => handleQuantityChange("decrease")}>
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
                />
                <button onClick={() => handleQuantityChange("increase")}>
                  +
                </button>
              </div>

              <button
                className="add-to-cart-btn"
                onClick={() => {
                  addToCart(product, quantity); // sửa lại để thêm đúng số lượng
                }}
              >
                Thêm vào giỏ hàng
              </button>

              <ul>
                <li>
                  <b>Tình trạng:</b> <span>Còn hàng</span>
                </li>
                <li>
                  <b>Số lượng:</b> <span>{product?.inventory || 0}</span>
                </li>
                <li>
                  <b>Chia sẻ:</b>{" "}
                  <span>
                    <AiOutlineFacebook />
                    <AiOutlineLinkedin />
                    <AiOutlineCopy />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="product__details__tab">
            <h4>Thông tin chi tiết</h4>
            <ul>
              <li>
                <p>
                  Sách chứa đựng rất nhiều kiến thức và giá trị tinh thần, mang
                  đến vô vàn lợi ích cho sự phát triển trí tuệ và đời sống tinh
                  thần của con người.
                </p>
              </li>
              <li>
                <p>Giúp giảm căng thẳng, cải thiện tâm trạng</p>
              </li>
              <li>
                <p>Tăng cường khả năng tư duy và tập trung</p>
              </li>
              <li>
                <p>Cải thiện trí nhớ và kích thích trí não hoạt động</p>
              </li>
              <li>
                <p>Mở rộng hiểu biết và nâng cao kiến thức</p>
              </li>
              <li>
                <p>Tạo cảm hứng, động lực và nuôi dưỡng tinh thần tích cực</p>
              </li>
              <li>
                <p>Nâng cao vốn từ vựng và khả năng giao tiếp</p>
              </li>
            </ul>

            <p>
              <br />
              <strong>Cách chọn sách hay, phù hợp</strong>
            </p>
            <ul>
              <li>
                <p>
                  Dựa vào nội dung: Hãy chọn sách có nội dung phù hợp với sở
                  thích và mục tiêu đọc của bạn, như sách kỹ năng, tiểu thuyết,
                  sách học thuật hay truyền cảm hứng.
                </p>
              </li>
              <li>
                <p>
                  Dựa vào tác giả: Những cuốn sách của tác giả nổi tiếng, uy tín
                  hoặc được độc giả đánh giá cao thường đáng để đọc và dễ mang
                  lại giá trị.
                </p>
              </li>
              <li>
                <p>
                  Dựa vào đánh giá từ người đọc: Xem qua nhận xét, bình luận
                  trên các trang bán sách, diễn đàn hoặc mạng xã hội để có cái
                  nhìn khách quan trước khi chọn mua.
                </p>
              </li>
              <li>
                <p>
                  Dựa vào cảm nhận khi lật sách: Một cuốn sách tốt sẽ tạo cảm
                  giác thu hút ngay từ những trang đầu. Bạn có thể đọc thử một
                  vài đoạn để cảm nhận lối viết và nội dung có phù hợp hay
                  không.
                </p>
              </li>
              <li>
                <p>
                  Dựa vào hình thức: Sách có bìa rõ ràng, trình bày đẹp mắt,
                  giấy in chất lượng và không có lỗi chính tả sẽ mang đến trải
                  nghiệm đọc tốt hơn.
                </p>
              </li>
            </ul>
          </div>

          <div className="section-title">
            <h2>Sản phẩm tương tự</h2>
          </div>
          <div className="row">
            {similarProducts?.length > 0 ? (
              similarProducts.map((item, key) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={key}>
                  <Link to={`/san-pham/chi-tiet/${item.id}`}>
                    <ProductCard product={item} />
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm tương tự.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ProductsDetailPage);
