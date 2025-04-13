import { useMutation } from "@tanstack/react-query";
import { getOrdersAdAPI, putStatusOrdersAdAPI } from "api/ordersAdPage";
import { useEffect, useState } from "react";
import { formatter } from "utils/formater";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";

const STATUS = {
  ORDERED: {
    key: "ORDERED",
    label: "Đã đặt",
    className: "orders__dropdown-item",
  },
  PREPARING: {
    key: "PREPARING",
    label: "Lên đơn",
    className: "orders__dropdown-item",
  },
  DELIVERED: {
    key: "DELIVERED",
    label: "Đã giao hàng",
    className: "orders__dropdown-item",
  },
  CANCELLED: {
    key: "CANCELLED",
    label: "Hủy đơn",
    className: "orders__dropdown-item orders__dropdown-item--danger",
  },
};

const OrdersAdPage = () => {
  const navigate = useNavigate();
  const handleOpenDetail = (id) => {
    navigate(ROUTERS.ADMIN.ORDERSDETAIL.replace(":id", id));
  };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [orders, setOrders] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const { mutate: getOrdersAd, isLoading } = useMutation({
    mutationFn: () => getOrdersAdAPI(params),
    onSuccess: ({ data }) => {
      setOrders(data);
    },
    onError: (error) => {
      console.log(error.response.data.error);
    },
  });

  const { mutate: updateStatusOrdersAdAPI } = useMutation({
    mutationFn: ({ id, status }) => putStatusOrdersAdAPI(id, status),
    onSuccess: ({ data }) => {
      const updatedOrders = orders?.data?.map((order) => {
        if (order.id === data.id) {
          return { ...order, status: data.status };
        }
        return order;
      });

      setOrders({
        ...orders,
        data: updatedOrders,
      });
    },
    onError: (error) => {
      console.log(error.response.data.error);
    },
  });

  useEffect(() => {
    getOrdersAd(params);
  }, [params, getOrdersAd]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdown = event.target.closest(".orders__dropdown");
      if (!isDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = (productId) => {
    setActiveDropdown(productId);
  };

  const handleChangePage = (page) => {
    setParams({
      ...params,
      page,
    });
  };

  const getStatusLabel = (statusKey) => {
    const statusEntry = Object.values(STATUS).find(
      (status) => status.key === statusKey
    );
    return statusEntry ? statusEntry.label : "Unknown";
  };

  const handleAction = (status, productId) => {
    updateStatusOrdersAdAPI({
      id: productId,
      status,
    });
    setActiveDropdown(null);
  };

  // Tính tổng tiền tất cả đơn hàng
  const totalAmount = orders?.data?.reduce((total, order) => {
    const orderTotal = order.details.reduce(
      (acc, item) => acc + Number(item.quantity * item.product.price),
      0
    );
    return total + orderTotal;
  }, 0);

  return (
    <div className="container">
      <div className="orders">
        <h2>Quản lý đơn hàng:</h2>
        {!isLoading && (
          <>
            <div className="orders__content">
              <table className="orders__table">
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Tổng đơn</th>
                    <th>Khách hàng</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái</th>
                    <th>Chi Tiết Đơn</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.data?.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className="orders__product">
                          <span className="orders__link">{order.id}</span>
                        </div>
                      </td>
                      <td>
                        {formatter(
                          order.details.reduce(
                            (acc, item) =>
                              acc + Number(item.quantity * item.product.price),
                            0
                          )
                        )}
                      </td>
                      <td>{order.fullName}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="orders__table-cell">
                        <div className="orders__dropdown">
                          <button
                            className={`orders__action-btn ${
                              activeDropdown === order.id ? "active" : ""
                            }`}
                            onClick={() => handleActionClick(order.id)}
                          >
                            {getStatusLabel(order.status)}{" "}
                            <span className="arrow">▼</span>
                          </button>
                          {activeDropdown === order.id && (
                            <div className="orders__dropdown-menu">
                              {Object.values(STATUS).map((status) => (
                                <button
                                  key={status.key}
                                  className={status.className}
                                  onClick={() =>
                                    handleAction(status.key, order.id)
                                  }
                                >
                                  {status.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <button
                          className="orders__detail-btn"
                          onClick={() => handleOpenDetail(order.id)}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Tổng tiền các đơn hàng */}
              <div className="orders__summary">
                <h4>
                  Tổng tiền tất cả đơn hàng:{" "}
                  {formatter(totalAmount)}
                </h4>
              </div>
            </div>

            <div className="orders__footer">
              <div className="orders__pagination">
                <div className="orders__page-numbers">
                  {orders.current_page > 1 && (
                    <button
                      onClick={() => handleChangePage(orders.current_page - 1)}
                      className="orders__page-btn"
                    >
                      ←
                    </button>
                  )}
                  {[...Array(orders.last_page)].map((_, index) => (
                    <button
                      key={index}
                      className={`orders__page-btn ${
                        index + 1 === orders.current_page
                          ? "orders__page-btn--active"
                          : ""
                      }`}
                      onClick={() => handleChangePage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  {orders.current_page !== orders.last_page && (
                    <button
                      onClick={() => handleChangePage(orders.current_page + 1)}
                      className="orders__page-btn"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersAdPage;
