
export const ADMIN_PATH = "/quan-tri"

export const ROUTERS = {
    USER: {
        HOME: "",
        PROFILE: "profile",
        PRODUCTS: "/san-pham",
        PRODUCT: "/san-pham/chitiet/:id",
        SHOPPING_CART: "/giohang",
        CHECKOUT: "/thanhtoan",
    },

    ADMIN: {
        LOGIN: `${ADMIN_PATH}/dang-nhap`,
        ORDERS: `${ADMIN_PATH}/dat-hang`,
        LOGOUT: `${ADMIN_PATH}/dang-xuat`,
    }
}