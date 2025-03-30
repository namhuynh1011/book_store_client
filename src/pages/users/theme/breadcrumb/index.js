import { memo } from "react"
import "./style.scss";
import { ROUTERS } from "utils/router";
import { Link } from "react-router-dom";


const BreadCrumb = (props) => {
    return <div className="breadcrumb">
        <div className="breadcrumb_text">
            <h2>Book Store</h2>
            <div className="breadcrumb_option">
                <ul>
                    <li className="link">
                        <Link to={ROUTERS.USER.HOME}>Trang Chủ</Link>
                    </li>
                    <li>
                        {props.name}
                    </li>
                </ul>
            </div>
        </div>
    </div>;
};

export default memo(BreadCrumb);