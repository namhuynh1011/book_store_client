import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.scss";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/orders/${id}/details`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Không thể tải chi tiết đơn hàng.");
      });
  }, [id]);

  if (!order) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="container">
      <h2>Chi Tiết Đơn Hàng #{order.order_id}</h2>
      
      <div className="order-info">
        <p><strong>Người đặt:</strong> {order.full_name}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <p><strong>Số điện thoại:</strong> {order.phone}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Tổng tiền đơn hàng:</strong> {order.total_amount.toLocaleString()} VND</p>
      </div>

      <h3>Sản phẩm đã đặt</h3>
      <table className="order-details-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.details.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product_id}</td>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.total_price.toLocaleString()} VND</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailPage;
