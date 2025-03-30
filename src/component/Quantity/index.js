import { memo } from "react";
import "./style.scss";

const Quantity = ({ hasAddToCart = true }) => {
    return (
        <div className="quantity_container">
            <div className="quantity">
                <span className="qytbtn">-</span>
                <input type="number" defaultValue={1} />
                <span className="qytbtn">+</span>
            </div>
            {
                hasAddToCart && (
                    <button type="sumnit" className="button_submit">
                        Thêm Giỏ Hàng
                    </button>
                )
            }
        </div>
    );
};

export default memo(Quantity)