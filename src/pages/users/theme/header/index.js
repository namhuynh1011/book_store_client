import "./style.scss";
import { AiOutlineShoppingCart, AiTwotoneMail, AiOutlineUser, AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter, AiOutlineMenu, AiOutlinePhone, AiOutlineDownCircle, AiOutlineUpCircle, AiOutlineMail } from "react-icons/ai";
import { memo, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatter } from "utils/fomater";
import { ROUTERS } from "utils/router";
import logo from "assets/users/image/hero/BookStore.jpg";

export const categories = [
    "Truyện Tranh",
    "Tiểu Thuyết",
    "Tâm Lý",
    "Kinh Tế",
    "Sách Giáo Khoa",
];

const Header = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [isShowHumberger, setShowHumberger] = useState(false);
    const [isHome, setIsHome] = useState(location.pathname.length <= 1);
    const [isShowCatergories, setShowCategories] = useState(isHome);
    const [menus, setMenus] = useState([
        {
            name: "Trang chủ",
            path: ROUTERS.USER.HOME,
        },
        {
            name: "Cửa hàng",
            path: ROUTERS.USER.PRODUCT,

        },
        {
            //Cần Chỉnh Sửa
            name: "Sản phẩm",
            path: "",
            isShowSubMenu: false,
            child: [
                {
                    name: "Sách",
                    path: "",
                },
                {
                    name: "Truyện Tranh",
                    path: "",
                },
                {
                    name: "Tiểu Thuyết",
                    path: "",
                },
            ]

        },
        {
            name: "Bài viết",
            path: "",

        },
        {
            name: "Liên hệ",
            path: "",

        }
    ]);

    

    useEffect(() => {
        const isHome = location.pathname.length <= 1;
        setIsHome(isHome);
        setShowCategories(isHome);
    }, [location]);

    return (
        <>
            <div className={`humberger_menu_overlay${isShowHumberger ? " active" : ""}`}
                onClick={() => setShowHumberger(false)} />

            <div className={`humberger_menu_wrapper${isShowHumberger ? " show" : ""}`}>
                <div className="header_logo">
                    <h1>Book Store</h1>
                </div>
                <div className="humberger_menu_cart">
                    <ul>
                        <li>
                            <Link to="#">
                                <AiOutlineShoppingCart />
                                <span>5</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="header_cart_price">
                        Giỏ Hàng: <span>{formatter(1001390)}</span>
                    </div>
                </div>
                <div className="humberger_menu_wideget">
                    <div className="header_top_right_auth">
                        <Link to={""}>
                            <AiOutlineUser /> Đăng Nhập
                        </Link>
                    </div>
                </div>
                <div className="humberger_menu_nav">
                    <ul>
                        {
                            menus.map((menu, menukey) => (
                                <li key={menukey} to={menu.path}>
                                    <Link to={menu.path} onClick={() => {
                                        const newMenus = [...menus];
                                        newMenus[menukey].isShowSubMenu = !newMenus[menukey].isShowSubMenu;
                                        setMenus(newMenus)
                                    }}>
                                        {menu.name}
                                        {menu.child &&
                                            (menu.isShowSubMenu ? (
                                                <AiOutlineDownCircle />
                                            ) : (
                                                <AiOutlineUpCircle />
                                            ))}
                                    </Link>

                                    {menu.child && (
                                        <ul className={`header_menu_dropdown ${menu.isShowSubMenu ? "show_submenu" : ""}`}>
                                            {menu.child.map((childItem, childKey) => (
                                                <li key={`${menukey}-${childKey}`}>
                                                    <Link to={childItem.path}>{childItem.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="humberger_top_right_social">

                    <Link to="https://www.facebook.com/huynhquocnom/" target="_blank">
                        <AiOutlineFacebook />
                    </Link>
                    <Link to="">
                        <AiOutlineInstagram />
                    </Link>
                    <Link to="">
                        <AiOutlineLinkedin />
                    </Link>
                    <Link to="">
                        <AiOutlineTwitter />
                    </Link>
                </div>
                <div className="humberger_menu_contact">
                    <ul>
                        <li>
                            <AiOutlineMail />bookstore@gmail.com
                        </li>
                        <li>Miễn phí giao hàng cho đơn trên {formatter(200000)}</li>
                    </ul>
                </div>
            </div>


            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header_top_left">
                            <ul>
                                <li>
                                    <AiTwotoneMail />
                                    bookstore@gmail.com
                                </li>
                                <li>Miễn phí giao hàng cho đơn trên {formatter(200000)}</li>
                            </ul>
                        </div>
                        <div className="col-6 header_top_right">
                            <ul>
                                <li>
                                    <Link to="https://www.facebook.com/huynhquocnom/" target="_blank">
                                        <AiOutlineFacebook />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://www.facebook.com/huynhquocnom/" target="_blank">
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
                                    <Link to={""}>
                                        <AiOutlineUser />
                                    </Link>
                                    <span> Đăng Nhập </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="header_logo" >
                            <Link to={ROUTERS.USER.HOME}>
                                <img src={logo}/>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header_menu">
                            <ul>
                                {menus?.map((menu, menukey) => (
                                    <li key={menukey} className={menukey === 0 ? "active" : ""}>
                                        <Link to={menu?.path}>{menu?.name}</Link>
                                        {
                                            menu.child && (
                                                <ul className="header_menu_dropdown">
                                                    {
                                                        menu.child.map((childItem, childKey) => (
                                                            <li key={`${menukey}-${childKey}`}>
                                                                <Link to={childItem.path}>{childItem.name}</Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            )
                                        }
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header_cart" >
                            <div className="header_cart_price">
                                <span>{formatter(1113000)}</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to={ROUTERS.USER.SHOPPING_CART}>
                                        <AiOutlineShoppingCart />
                                        <span>5</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="humberger_open">
                            <AiOutlineMenu onClick={() => { setShowHumberger(true) }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row hero_categories_container">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 hero_categories">
                        <div className="hero_categories_all"
                            onClick={() => setShowCategories(!isShowCatergories)}>
                            <AiOutlineMenu />
                            Danh Sách Sản Phẩm
                        </div>
                        <ul className={isShowCatergories ? "" : "hidden"}>
                            {
                                categories.map((category, key) => (
                                    <li key={key}>
                                        <Link to={ROUTERS.USER.PRODUCTS}>{category}</Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="col-lg-9 col-xl-12 col-md-12 col-sm-12 col-xs-12 hero_search_container">
                        <div className="hero_search">
                            <div className="hero_search_form">
                                <form>
                                    <input type="text" name="" placeholder="Tìm kiếm sản phẩm" />
                                    <button type="submit" className="">Tìm kiếm</button>
                                </form>
                            </div>
                            <div className="hero_search_phone">
                                <div className="hero_search_phone_icon">
                                    <AiOutlinePhone />
                                </div>
                                <div className="hero_search_phone_text">
                                    <p>037.478.6427</p>
                                    <span>Hỗ Trợ 24/7</span>
                                </div>
                            </div>
                        </div>
                        {isHome && (

                            <div className="hero_item">
                                <div className="hero_text">
                                    <span>Sách Hay Sách Đẹp</span>
                                    <h2>
                                        Sách<br />
                                        Cũ 100%
                                    </h2>
                                    <p>Lấy Phí Giao Hàng Tận Nơi</p>
                                    <Link to="" className="primary_btn">
                                        Mua Ngay
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Header);