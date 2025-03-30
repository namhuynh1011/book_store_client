import { memo } from "react";
import "./style.scss";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { formatter } from "utils/fomater";
import { generatePath, Link } from "react-router-dom";
import { ROUTERS } from "utils/router";

const ProductCard = ({ img, name, price }) => {
    return (

        <div className="featured_item pl-pr-10">
            <div className="featured_item_pic" >
                <img src={img} className="featured_image" />
                <ul className="featured_item_pic_hover">
                    <li>
                        <AiOutlineEye />
                    </li>
                    <li>
                        <AiOutlineShoppingCart />
                    </li>
                </ul>
            </div>
            <div className="featured_item_text">
                <h6>
                    <Link to={generatePath(ROUTERS.USER.PRODUCT, { id: 1 })}>{name}</Link>
                </h6>
                <h5>{formatter(price)}</h5>
            </div>
        </div>

    );
};

export default memo(ProductCard)