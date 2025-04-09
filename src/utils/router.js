export const ROUTERS = {
  USER: {
    HOME: "/",
    PRODUCTS: "/san-pham",
    PRODUCT: "/san-pham/chi-tiet/:id",
    SHOPPING_CART: "/gio-hang",
    CHECKOUT: "/thanh-toan",
  },
  ADMIN: {
    LISTPRODUCTS:"/quan-tri/danh-sach-san-pham",
    EDITPRODUCT:"/quan-tri/san-pham/sua-chua/:id",
    ORDERS: "/quan-tri/dat-hang",
    ORDERSDETAIL: "/quan-tri/chi-tiet-don/:id",
    PRODUCTLIST: "/quan-tri/san-pham",
    ADDPRODUCT: "/quan-tri/them-san-pham",
    ADDCATEGORY: "/quan-tri/them-the-loai",
    LOGIN: "/quan-tri/dang-nhap",
    LOGOUT: "/quan-tri/dang-xuat",
  },
};
