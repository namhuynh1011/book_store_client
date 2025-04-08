import { memo } from "react";
import "./style.scss";

const Quantity = ({ hasAddToCart = true, quantity = 1 }) => {
  return (
    <>
      <div className="quantity-container">
        <div className="quantity">
          <span className="qtybtn">-</span>
          <input type="number" defaultValue={quantity} />
          <span className="qtybtn">+</span>
        </div>
        {hasAddToCart && (
          <button type="submit" className="button-submit">
            Thêm giỏ hàng
          </button>
        )}
      </div>
    </>
  );
};

export default memo(Quantity);
