import { memo } from "react"
import { ROUTERS } from "utils/router";
import {useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import "./style.scss"

const HeaderAd = ({children,  ...props}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const navItems = [
        {
            path: ROUTERS.ADMIN.ORDERS,
            onclick: () => navigate(ROUTERS.ADMIN.ORDERS),
            label: "Đặt Hàng",
            icon: <AiOutlineShoppingCart/>
        },
        {
            path: ROUTERS.ADMIN.LOGOUT,
            onclick: () => {},
            label: "Đăng Xuất",
            icon: <AiOutlineLogout/>
        },
    ]
    return (
    <div className="admin_header container" {  ...props}>
        <nav className="admin_header_nav">
            {
                navItems.map(({path, onclick, label, icon}) => (
                    <div key={path}
                    className={`admin_header_nav_item ${location.pathname.includes(path) ? "admin_header_nav_item--active" : ""  }`} 
                    onclick = {onclick}>
                        <span className="admin_header_nav_icon">{icon}</span>
                        <sapn>{label}</sapn>
                    </div>
                ))}
        </nav>
    </ div>
    );
};

export default memo(HeaderAd);