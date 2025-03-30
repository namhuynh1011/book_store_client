import { memo } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { formatter } from "utils/fomater";
import { Quantity } from "component";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";

const ShoppingCartPage = () => {

  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb name="Giỏ Hàng" />
      <div className="container">
        <div className="table_cart">
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Thành Tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="shopping_cart_item">
                  <img src="https://via.placeholder.com/50" alt="product_pic" />
                  <h4>Ten San Pham 1</h4>
                </td>
                <td>{formatter(200000)}</td>
                <td>
                  <Quantity quantity="2" hasAddToCart={false} />
                </td>
                <td>{formatter(400000)}</td>
                <td className="icon_close">
                  <AiOutlineClose />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="shopping_continue">
              <h3>Mã Giảm Giá</h3>
              <div className="shopping_discount">
                <input placeholder="Nhập mã giảm giá" />
                <button type="button"  className="button_submit">Áp Dụng</button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="shopping_checkout">
              <h2>Tổng đơn:</h2>
              <ul>
                <li>Số Lượng: <span>{2}</span></li>
                <li>Thành Tiền: <span>{formatter(200000)}</span></li>
              </ul>
              <button type="button" className="button_submit" onClick={() => navigate(ROUTERS.USER.CHECKOUT) }>Thanh Toán</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ShoppingCartPage);
