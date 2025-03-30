import { memo } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { formatter } from "utils/fomater";

const CheckOutPage = () => {
  return (
    <>
      <Breadcrumb name="Thanh Toán" />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="checkout_input">
              <label>
                Họ Và Tên: <span className="required">*</span>
              </label>
              <input type="text" placeholder="Nhập họ và tên" />
            </div>
            <div className="checkout_input">
              <label>
                Địa Chỉ: <span className="required">*</span>
              </label>
              <input type="text" placeholder="Nhập địa chỉ" />
            </div>
            <div className="checkout_input_group">
              <div className="checkout_input">
                <label>
                  Điện Thoại: <span className="required">*</span>
                </label>
                <input type="text" placeholder="Nhập điện thoại" />
              </div>
              <div className="checkout_input">
                <label>
                  Email: <span className="required">*</span>
                </label>
                <input type="text" placeholder="Nhập email" />
              </div>
            </div>
            <div className="checkout_input">
              <label>
                Ghi Chú:
              </label>
              <textarea rows={15} placeholder="Nhập ghi chú" />
            </div>
          </div>


          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="checkout_order">
                  <h3>Đơn Hàng </h3>
                  <ul>
                    <li>
                      <span>San Phẩm 1</span>
                      <b>{formatter(50000)} (1)</b>
                    </li>
                    <li>
                      <span>San Phẩm 2</span>
                      <b>{formatter(100000)} (2)</b>
                    </li>
                    <li>
                      <span>San Phẩm 3</span>
                      <b>{formatter(20000)} (2)</b>
                    </li>
                    <li>
                      <span>San Phẩm 4</span>
                      <b>{formatter(40000)} (1)</b>
                    </li>
                    <li className="checkout_order_subtotal">
                      <h3>Tổng Đơn</h3>
                      <b>{formatter(2000000)}</b>
                    </li>
                  </ul>
                  <button type="button" className="button_submit">Đặt Hàng</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CheckOutPage);
