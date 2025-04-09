import { memo } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { Link, generatePath } from "react-router-dom";
import { formatter } from "utils/formater";
import { ROUTERS } from "utils/router";
import "./style.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProductAdCard = ({ product, onDeleted }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/products/${product.id}`);
      alert("Xóa thành công");
      navigate(0); // Reload current page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-product__item">
      <div
        className="admin-product__item__pic"
        style={{
          backgroundImage: `url(http://localhost:8000${product.img})`,
        }}
      >
        <ul className="admin-product__item__pic__hover">
          <li>
            <Link
              to={generatePath(ROUTERS.ADMIN.EDITPRODUCT, { id: product.id })}
            >
              <AiOutlineEye />
            </Link>
          </li>
          <li onClick={handleDelete}>
            <AiOutlineDelete />
          </li>
        </ul>
      </div>
      <div className="admin-product__item__text">
        <h6>
          <Link to={generatePath(ROUTERS.ADMIN.EDITPRODUCT, { id: product.id })}>
            {product.name}
          </Link>
        </h6>
        <h5>{formatter(product.price)}</h5>
      </div>
    </div>
  );
};

export default memo(ProductAdCard);
