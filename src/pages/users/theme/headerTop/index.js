import { memo } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BiMailSend, BiUser } from "react-icons/bi";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { formatter } from "utils/formater";
import "./style.scss";
import { ROUTERS } from "utils/router";

const HeaderTop = () => {
  const navigate = useNavigate();

  return (
    <div className="header__top">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="header__top__left">
              <ul>
                <li>
                  <BiMailSend /> bookstore@gmail.com
                </li>
                <li>Miễn phí ship đơn từ {formatter(200000)}</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="header__top__right">
              <div className="header__top__right__social">
                <ul>
                  <li>
                    <Link to="">
                      <AiOutlineFacebook />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <AiOutlineInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <AiOutlineLinkedin />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <AiOutlineTwitter />
                    </Link>
                  </li>
                  <li onClick={() => navigate(ROUTERS.ADMIN.LOGIN)}>
                    <BiUser />
                    <span>Đăng nhập</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderTop);
