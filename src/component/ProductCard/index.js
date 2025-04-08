import { memo } from "react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, generatePath } from "react-router-dom";
import { formatter } from "utils/formater";
import { ROUTERS } from "utils/router";
import "./style.scss";
import useShoppingCart from "hooks/useShoppingCart";

const ProductCard = ({ product }) => {
  const { addToCart } = useShoppingCart();

  return (
    <div className="featured__item pl-pr-10">
      <div
        className="featured__item__pic set-bg"
        style={{
          backgroundImage: `url(http://localhost:8000${product.img})`,
        }}
      >
        <ul className="featured__item__pic__hover">
          <li>
            
            <AiOutlineEye to={generatePath(ROUTERS.USER.PRODUCT, { id: product.id })}/>
          </li>
          <li
            onClick={() => {
              addToCart(product, 1);
            }}
          >
            <AiOutlineShoppingCart />
          </li>
        </ul>
      </div>
      <div className="featured__item__text">
        <h6>
          <Link to={generatePath(ROUTERS.USER.PRODUCT, { id: product.id })}>
            {product.name}
          </Link>
        </h6>
        <h5>{formatter(product.price)}</h5>
      </div>
    </div>
  );
};

export default memo(ProductCard);
