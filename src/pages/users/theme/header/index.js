import { useGetCategoriesUS } from "api/homePage";
import { memo, useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import {
  AiOutlineDownCircle,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMenu,
  AiOutlinePhone,
  AiOutlineShoppingCart,
  AiOutlineTwitter,
  AiOutlineUpCircle,
} from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatter } from "utils/formater";
import { ROUTERS } from "utils/router";
import { setCart, setCommonCategories } from "../../../../redux/commonSlice";
import HeaderTop from "../headerTop";
import "./style.scss";
import Logo from "../../../../assets/users/images/banner/BookStore.jpg"
const HeaderUS = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowHumberger, setIsShowHumberger] = useState(false);
  const [isHome, setIsHome] = useState(location.pathname.length <= 1);
  const [isShowCategories, setIsShowCategories] = useState(isHome);
  const { categories: categoriesRedux, cart: cartRedux } = useSelector(
    (state) => state.commonSlice
  );
  const [menus, setMenus] = useState([
    {
      name: "Trang chủ",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "Cửa hàng",
      path: ROUTERS.USER.PRODUCTS,
    },
    {
      name: "Sản phẩm",
      path: "",
      isShoSubMenu: false,
      child: [
        {
          name: "Tiểu Thuyết",
          path: "",
        },
        {
          name: "Truyện Tranh",
          path: "",
        },
        
      ],
    },
    {
      name: "Bài viết",
      path: "",
    },
    {
      name: "Liên hệ",
      path: "",
    },
  ]);

  useEffect(() => {
    const isHome = location.pathname.length <= 1;
    setIsHome(isHome);
    setIsShowCategories(isHome);
  }, [location]);

  const { data: categories } = useGetCategoriesUS();

  useEffect(() => {
    if (!categoriesRedux) dispatch(setCommonCategories(categories));
  }, [categories, categoriesRedux, dispatch]);

  useEffect(() => {
    const cart = ReactSession.get("cart");
    if (cart) {
      dispatch(setCart(cart));
    }
  }, [dispatch]);

  return (
    <>
      {/* Humberger Begin */}
      <div
        className={`humberger__menu__overlay ${
          isShowHumberger ? "active" : ""
        }`}
        onClick={() => setIsShowHumberger(false)}
      />
      <div
        className={`humberger__menu__wrapper ${
          isShowHumberger ? "show__humberger__menu__wrapper" : ""
        }`}
      >
        <div
          className="header__logo"
          onClick={() => navigate(ROUTERS.USER.HOME)}
        >
          <img src={Logo} alt="BookStore-logo"/>
        </div>
        <div className="humberger__menu__cart">
          <ul>
            <li>
              <Link to="#">
                <AiOutlineShoppingCart /> <span>{cartRedux.totalQuantity}</span>
              </Link>
            </li>
          </ul>
          <div className="header__cart__price">
            Giỏ hàng: <span>{formatter(cartRedux.totalPrice)}</span>
          </div>
        </div>
        <div className="humberger__menu__widget">
          <div className="header__top__right__auth">
            <Link to="">
              <BiUser /> Đăng nhập
            </Link>
          </div>
        </div>
        <nav className="humberger__menu__nav">
          <ul>
            {menus.map((menu, menuKey) => (
              <li key={menuKey}>
                <Link
                  to={menu.path}
                  onClick={() => {
                    const newMenus = [...menus];
                    newMenus[menuKey].isShoSubMenu =
                      !newMenus[menuKey].isShoSubMenu;
                    setMenus(newMenus);
                  }}
                >
                  {menu.name}{" "}
                  {menu.child &&
                    (menu.isShoSubMenu ? (
                      <AiOutlineDownCircle />
                    ) : (
                      <AiOutlineUpCircle />
                    ))}
                </Link>
                {menu.child && (
                  <ul
                    className={`header__menu__dropdown ${
                      menu.isShoSubMenu ? "show__submenu" : ""
                    }`}
                  >
                    {menu.child.map((childItem, childKey) => (
                      <li key={`${menuKey}-${childKey}`}>
                        <Link to={childItem.path}>{childItem.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__top__right__social">
          <Link to="">
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
        <div className="humberger__menu__contact">
          <ul>
            <li>
              <i className="fa fa-envelope"></i> bookstore@gmail.com
            </li>
            <li>Miễn phí ship đơn từ {formatter(200000)}</li>
          </ul>
        </div>
      </div>
      {/* Humberger End */}

      <header className="header">
        {/* Humberger Begin */}
        <HeaderTop />
        {/* Humberger End */}
        {/* Header Begin */}
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div
                className="header__logo"
                onClick={() => navigate(ROUTERS.USER.HOME)}
              >
                <img src={Logo} alt="BookStore-logo"/>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul>
                  {menus.map((menu, menuKey) => (
                    <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                      <Link
                        to={menu.path}
                        onClick={(e) => {
                          const newMenus = [...menus];
                          newMenus[menuKey].isShoSubMenu =
                            !newMenus[menuKey].isShoSubMenu;
                          setMenus(newMenus);
                        }}
                      >
                        {menu.name}
                      </Link>
                      {menu.child && (
                        <ul className="header__menu__dropdown">
                          {menu.child.map((childItem, childKey) => (
                            <li key={`${menuKey}-${childKey}`}>
                              <Link to={childItem.path}>{childItem.name}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__cart">
                <div className="header__cart__price">
                  <span>{formatter(cartRedux.totalPrice)}</span>
                </div>
                <ul>
                  <li>
                    <Link to={ROUTERS.USER.SHOPPING_CART}>
                      <AiOutlineShoppingCart />{" "}
                      <span>{cartRedux.totalQuantity}</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="humberger__open">
                <AiOutlineMenu onClick={() => setIsShowHumberger(true)} />
              </div>
            </div>
          </div>
        </div>
        {/* Header End */}
      </header>
      {/* Hero Begin */}
      <div className="container">
        <div className="row">
          <div className="col-lg-3 hero__categories_container">
            <div className="hero__categories">
              <div
                className="hero__categories__all"
                onClick={() => setIsShowCategories(!isShowCategories)}
              >
                <AiOutlineMenu />
                <span>Danh sách sản phẩm</span>
              </div>
              <ul className={isShowCategories ? "" : "hidden"}>
                <li>
                  {categoriesRedux?.map((item) => (
                    <Link to={ROUTERS.USER.PRODUCTS} key={item.id}>
                      {item.name}
                    </Link>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9 hero__search__container">
            <div className="hero__search">
              <div className="hero__search__form">
                <form>
                  <div className="hero__search__form__group">
                    <input type="text" placeholder="Bạn đang tìm gì?" />
                    <button type="submit" className="site-btn">
                      Tìm kiếm
                    </button>
                  </div>
                </form>
              </div>
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <AiOutlinePhone />
                </div>
                <div className="hero__search__phone__text">
                  <p>0374.786.427</p>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
            {isHome && (
              <div className="hero__item">
                <div className="hero__text">
                  <span>Sách Hay</span>
                  <h2>
                    Sách Mới, <br />
                    Đẹp 100%
                  </h2>
                  <p>Miễn phí giao hàng tận nơi.</p>
                  <Link to="" className="primary-btn">
                    Mua ngay
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Hero End */}
    </>
  );
};

export default memo(HeaderUS);
