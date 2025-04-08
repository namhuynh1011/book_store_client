import { Quantity } from "component";
import useShoppingCart from "hooks/useShoppingCart";
import BreadcrumbUS from "pages/users/theme/breadcrumb";
import { memo, useState } from "react";
import { ReactSession } from "react-client-session";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { formatter } from "utils/formater";
import { ROUTERS } from "utils/router";
import "./style.scss";

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const { removeCart } = useShoppingCart();
  const [cart, setCart] = useState(ReactSession.get("cart"));
  // file đầu trang ShoppingCartPage.jsx
  const BASE_IMG_URL = process.env.REACT_APP_IMG_URL || "http://localhost:8000";

  return (
    <>
      <BreadcrumbUS name={"Giỏ hàng"} />
      <div className="container">
        {cart && (
          <>
            <div className="table__cart">
              <table>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cart?.products?.map(({ product, quantity }) => (
                    <tr key={product.id}>
                      <td className="shoping__cart__item">
                        <img
                          src={
                            product.img?.startsWith("http")
                              ? product.img
                              : `${BASE_IMG_URL}${
                                  product.img?.startsWith("/") ? "" : "/"
                                }${product.img}`
                          }
                          alt="product-pic"
                        />

                        <h4>{product.name}</h4>
                      </td>
                      <td>{formatter(product.price)}</td>
                      <td>
                        <Quantity quantity={quantity} hasAddToCart={false} />
                      </td>
                      <td>{formatter(product.price * quantity)}</td>
                      <td className="icon_close">
                        <AiOutlineClose
                          onClick={() => setCart(removeCart(product.id))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="shopping__continue">
                  <h3>Mã giảm giá:</h3>
                  <div className="shopping__discount">
                    <input placeholder="Nhập mã giảm giá" />
                    <button type="button" className="button-submit">
                      Áp dụng
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="shopping__checkout">
                  <h2>Tổng đơn:</h2>
                  <ul>
                    <li>
                      Số lượng: <span>{cart.totalQuantity}</span>
                    </li>
                    <li>
                      Thành tiền: <span>{formatter(cart.totalPrice)}</span>
                    </li>
                  </ul>
                  {cart.totalQuantity > 0 && (
                    <button
                      type="button"
                      className="button-submit"
                      onClick={() => navigate(ROUTERS.USER.CHECKOUT)}
                    >
                      Thanh toán
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default memo(ShoppingCartPage);
