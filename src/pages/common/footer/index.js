import { memo } from "react"
import "./style.scss";
import { Link } from "react-router-dom";
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter} from "react-icons/ai";
import { ROUTERS } from "utils/router";
import logo from "assets/users/image/hero/BookStore.jpg";

const Footer = () => {
    return( <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="footer_about">
                        <div className="footer_logo">
                            <Link to={ROUTERS.USER.HOME}>
                                <img src={logo}/>
                            </Link>
                        </div>
                        <ul>
                            <li>Địa Chỉ: 230 Nguyễn Văn Hưởng</li>
                            <li>Phone: 0374786427</li>
                            <li>Email: bookstore@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="footer_widget">
                        <h6>Cửa Hàng</h6>
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
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                    <div className="footer_widget">
                        <h6>Khuyến mãi & ưu đãi</h6>
                        <p>Đăng ký nhận thông tin tại đây</p>
                        <form action="#">
                            <div className="input_group">  
                                <input type="text" placeholder="Nhập email"/>
                                <button type="submit" className="button_submit">
                                    Đăng ký
                                </button>
                            </div>
                            <div className="footer_widget_social">
                                <div>
                                    <Link to="https://www.facebook.com/huynhquocnom/" target="_blank">
                                        <AiOutlineFacebook />
                                    </Link>
                                </div>
                                <div>
                                    <Link to="https://www.instagram.com/_quoc._.nam/" target="_blank">
                                        <AiOutlineInstagram />
                                    </Link>
                                </div>
                                <div>
                                    <AiOutlineLinkedin />   
                                </div>
                                <div>
                                    <AiOutlineTwitter />    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default memo(Footer);