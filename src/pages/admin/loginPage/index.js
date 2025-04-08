import { useMutation } from "@tanstack/react-query";
import { postLoginAPI } from "api/loginPage";
import { memo, useState } from "react";
import "./style.scss";
import Cookies from "js-cookie";
import { ROUTERS } from "utils/router";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const isLoggedIn = Cookies.get("access_token") ? true : false;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { mutate: login, isLoading } = useMutation({
    mutationFn: postLoginAPI,
    onSuccess: (data) => {
      // Save token in cookie for 1 days
      Cookies.set("access_token", data.access_token, { expires: 1 });
      navigate(ROUTERS.ADMIN.ORDERS);
    },
    onError: (error) => {
      alert(error.response.data.error);
    },
  });

  const validateForm = () => {
    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!emailPattern.test(email)) {
      setEmailError("Vui lòng nhập địa chỉ email hợp lệ.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (password.length < 3) {
      setPasswordError("Mật khẩu phải có ít nhất 3 ký tự.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login({ email, password });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTERS.ADMIN.ORDERS);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">TRUY CẬP HỆ THỐNG QUẢN TRỊ</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-group">
            <label className="login__label" htmlFor="email">
              Địa chỉ email
            </label>
            <input
              className="login__input"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
            />
            {emailError && <div className="error-message">{emailError}</div>}{" "}
          </div>
          <div className="login__form-group">
            <label className="login__label" htmlFor="password">
              Mật khẩu
            </label>
            <input
              className="login__input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
            />
            {passwordError && (
              <div className="login__error">{passwordError}</div>
            )}{" "}
          </div>
          <button type="submit" className="login__button" disabled={isLoading}>
            ĐĂNG NHẬP
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(LoginPage);
