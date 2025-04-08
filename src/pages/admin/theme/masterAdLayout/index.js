import { memo } from "react";
import HeaderAd from "../header";
import "./style.scss";
import { useLocation } from "react-router-dom";

const MasterAdLayout = ({ children, ...props }) => {
  const location = useLocation();
  const isLoginPage = location.pathname.startsWith("/quan-tri/dang-nhap");

  return (
    <div className="admin" {...props}>
      {!isLoginPage && <HeaderAd />}
      <div className="admin__content">{children}</div>
    </div>
  );
};

export default memo(MasterAdLayout);
