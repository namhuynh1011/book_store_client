import { memo, useEffect, useState } from "react";
import "./style.scss";
import { formatter } from "utils/fomater";

const STATUS = {
  ORDERED: {
    key: "ORDERED",
    label: "Đã Đặt",
    className: "orders_dropdown-item",
  },
  PREPARING: {
    key: "PREPARING",
    label: "Đang Chuẩn Bị",
    className: "orders_dropdown-item",
  },
  DIVIVERED: {
    key: "DIVIVERED",
    label: "Đã Giao Hàng",
    className: "orders_dropdown-item",
  },
  CANCELLED: {
    key: "CANCELLED",
    label: "Đã Hủy",
    className: "orders_dropdown-item orders_dropdown-item--danger",
  },
};
const OrderAdPage = () => {
  const orders = [
    {
      id: 1,
      total: 1000000,
      customerName: "John",
      date: "11/12/2025",
      status: "Đang Giao",
    },
    {
      id: 2,
      total: 3000000,
      customerName: "Đặng",
      date: "10/12/2025",
      status: "Chờ Xác Nhận",
    },
  ];

  const [activedDropDown, setActivedDropDown] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdown = event.target.closest(".orders_dropdown");
      if(!isDropdown){
        setActivedDropDown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[])
  return (
    <div className="container">
      <div className="orders">
        <h2>Quản Lý Đơn Hàng:</h2>

        <div className="orders_content">
          <table className="orders_table">
            <thead>
              <tr>
                <th>Mã Đơn Hàng</th>
                <th>Tổng Tiền</th>
                <th>Khách Hàng</th>
                <th>Ngày Đặt</th>
                <th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, key) => (
                <tr key={key}>
                  <td>
                    <span>{item.id}</span>
                  </td>
                  <td>{formatter(item.total)}</td>
                  <td>{item.customerName}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>
                    <div className="orders_dropdown">
                      <button
                        className={`orders_action-button`}
                        onClick={() => setActivedDropDown(item.id)}
                      >
                        Đã đặt
                        <span className="arrow">▽</span>
                      </button>
                      {activedDropDown === item.id && (
                        <div className="ordes_dropdown-menu">
                          {Object.values(STATUS).map((status) => (
                            <button
                              key={status.key}
                              className={status.className}
                              onClick={() => setActivedDropDown(null)}
                            >
                              {status.label}
                            </button>
                          ))}
                        </div>
                      )} 
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="orders_footer">
          <div className="orders_patination">
            <div className="orders_page_numbers">
              <button className="orders_page_btn  ">-</button>
              <button className="orders_page_btn orders_page_btn--active">
                1
              </button>
              <button className="orders_page_btn  ">2</button>
              <button className="orders_page_btn  ">3</button>
              <button className="orders_page_btn  ">4</button>
              <button className="orders_page_btn  ">5</button>
              <button className="orders_page_btn  ">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderAdPage);
