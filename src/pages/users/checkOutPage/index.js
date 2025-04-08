import { useMutation } from "@tanstack/react-query";
import BreadcrumbUS from "pages/users/theme/breadcrumb";
import { memo, useState } from "react";
import { ReactSession } from "react-client-session";
import { formatter } from "utils/formater";
import "./style.scss";
import { postOrderAPI } from "api/ordersPage";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cart = ReactSession.get("cart");

  const { mutate: postOrder, isLoading } = useMutation({
    mutationFn: postOrderAPI,
    onSuccess: () => {
      alert("Đã đặt hành thành công!");
      ReactSession.remove("cart");
      navigate(ROUTERS.USER.HOME);
    },
    onError: (error) => {
      alert(error.response.data.error);
    },
  });

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      address: "",
      phone: "",
      email: "",
    };
    let isValid = true;

    if (!fullName) {
      newErrors.fullName = "Vui lòng điền họ và tên của bạn.";
      isValid = false;
    }
    if (!address) {
      newErrors.address = "Vui lòng điền địa chỉ của bạn.";
      isValid = false;
    }
    if (!phone) {
      newErrors.phone = "Vui lòng điền số điện thoại của bạn.";
      isValid = false;
    }
    if (!email) {
      newErrors.email = "Vui lòng điền email của bạn.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      postOrder({
        fullName,
        address,
        phone,
        email,
        note,
        products: cart.products.map((item) => {
          return {
            product_id: item.product.id,
            quantity: item.quantity,
          };
        }),
      });
      setErrors({ fullName: "", address: "", phone: "", email: "" });
    }
  };

  return (
    <>
      <BreadcrumbUS name={"Thanh Toán"} />
      <div className="container">
        <h2>Thông tin đặt hàng:</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="checkout__input">
                <label>
                  Họ và tên: <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && (
                  <p className="error-message">{errors.fullName}</p>
                )}
              </div>
              <div className="checkout__input">
                <label>
                  Địa chỉ: <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && (
                  <p className="error-message">{errors.address}</p>
                )}
              </div>
              <div className="checkout__input__group">
                <div className="checkout__input">
                  <label>
                    Điện thoại: <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <p className="error-message">{errors.phone}</p>
                  )}
                </div>
                <div className="checkout__input">
                  <label>
                    Email: <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="checkout__input">
                <label>Ghi chú:</label>
                <textarea
                  rows={15}
                  placeholder="Ghi chú về đơn hàng"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="checkout__order">
                <h3>Đơn hàng </h3>
                <ul>
                  {cart.products.map(({ product, quantity }) => (
                    <li key={product.id}>
                      <span>{product.name}</span>
                      <b>
                        {formatter(product.price)} ({quantity})
                      </b>
                    </li>
                  ))}
                  <li>
                    <h4>Mã giảm giá</h4>
                    <b>SVC783</b>
                  </li>
                  <li className="checkout__order__subtotal">
                    <h3>Tổng đơn</h3>
                    <b>{formatter(cart.totalPrice)}</b>
                  </li>
                </ul>
                <button
                  type="submit"
                  className="button-submit"
                  disabled={isLoading}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(CheckoutPage);
