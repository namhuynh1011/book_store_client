import React, { memo } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import "./style.scss";
import Logo from "../../../assets/users/images/banner/BookStore.jpg"
const FooterUS = () => {
  return (
    <footer className="footer spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="footer__about">
              <img src={Logo} alt="Bookstore Logo"/>
              <ul>
                <li>Địa chỉ: 230 Nguyễn Văn Hưởng</li>
                <li>Phone: 0374-786-427</li>
                <li>Email: bookstore@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="footer__widget">
              <h6>Cửa hàng</h6>
              <ul>
                <li>
                  <Link to="">Liên hệ</Link>
                </li>
                <li>
                  <Link to="">Thông tin về chúng tôi</Link>
                </li>
                <li>
                  <Link to="">Sản phẩm kinh doanh</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="">Thông tin tài khoản</Link>
                </li>
                <li>
                  <Link to="">Giỏ hàng</Link>
                </li>
                <li>
                  <Link to="">Danh sách ưa thích</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-6 col-xs-12">
            <div className="footer__widget">
              <h6>Khuyến mãi & ưu đãi</h6>
              <p>Đăng ký nhận thông tin tại đây.</p>
              <form action="#">
                <div>
                  <input type="text" placeholder="Nhập email" />
                  <button type="submit" className="button-submit">
                    Đăng ký
                  </button>
                </div>
              </form>
              <div className="footer__widget__social">
                <div>
                  <AiOutlineFacebook />
                </div>
                <div>
                  <AiOutlineInstagram />
                </div>
                <div>
                  <AiOutlineLinkedin />
                </div>
                <div>
                  <AiOutlineTwitter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(FooterUS);
