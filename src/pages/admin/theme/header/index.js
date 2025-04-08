import { memo } from "react";
import { AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import "./style.scss";
import Cookies from "js-cookie";

const HeaderAd = ({ children, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const adminNavItems = [
    {
      path: ROUTERS.ADMIN.ORDERS,
      onClick: () => navigate(ROUTERS.ADMIN.ORDERS),
      label: "Đơn hàng",
      icon: <AiOutlineShoppingCart />,
    },
    {
      path: ROUTERS.ADMIN.ADDPRODUCT,
      onClick: () => navigate(ROUTERS.ADMIN.ADDPRODUCT),
      label: "Thêm sản phẩm",
      icon: <IoIosAddCircleOutline />,
    },
    {
      path: ROUTERS.ADMIN.LOGOUT,
      onClick: () => {
        Cookies.remove("access_token");
        navigate(ROUTERS.USER.HOME);
      },
      label: "Đăng xuất",
      icon: <AiOutlineLogout />,
    },
  ];

  return (
    <div className="header" {...props}>
      <div className="container">
        <nav className="header__nav">
          {adminNavItems.map((item) => (
            <div
              key={item.path}
              onClick={item.onClick}
              className={`header__nav-item ${
                location.pathname.includes(item.path)
                  ? "header__nav-item--active"
                  : ""
              }`}
            >
              <span className="header__nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default memo(HeaderAd);
