import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import {
  HomePageUS,
  ProductsPage,
  ProductDetailPage,
  ShoppingCartPage,
  CheckoutPage,
  LoginPage,
  OrdersAdPage,
} from "../pages";
import MasterUsLayout from "./users/theme/masterUsLayout";
import MasterAdLayout from "./admin/theme/masterAdLayout";
import Cookies from "js-cookie";
import AddProductPage from "./admin/addProductPage";
import OrderDetail from "./admin/orderDetailPage";
import AddCategoriesPage from "./admin/addCategoriesPage";
import ListProductsPage from "./admin/listProductsPage";
import EditProductPage from "./admin/editProductPage";
const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePageUS />,
    },
    {
      path: ROUTERS.USER.PRODUCTS,
      component: <ProductsPage />,
    },
    {
      path: ROUTERS.USER.PRODUCT,
      component: <ProductDetailPage />,
    },
    {
      path: ROUTERS.USER.SHOPPING_CART,
      component: <ShoppingCartPage />,
    },
    {
      path: ROUTERS.USER.CHECKOUT,
      component: <CheckoutPage />,
    },
  ];

  return (
    <MasterUsLayout>
      <Routes>
        {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterUsLayout>
  );
};

const renderAdminRouter = () => {
  const isLoggedIn = Cookies.get("access_token") ? true : false;

  const adminRouters = [
    {
      path: ROUTERS.ADMIN.LISTPRODUCTS,
      component: isLoggedIn ? (
        <ListProductsPage />
      ) : (
        <Navigate to={ROUTERS.ADMIN.LOGIN} replace={false} />
      ),
    },
    {
      path: ROUTERS.ADMIN.EDITPRODUCT,
      component: isLoggedIn ? (
        <EditProductPage />
      ) : (
        <Navigate to={ROUTERS.ADMIN.LOGIN} replace={false} />
      ),
    },
    {
      path: ROUTERS.ADMIN.ADDPRODUCT,
      component: isLoggedIn ? (
        <AddProductPage />
      ) : (
        <Navigate to={ROUTERS.ADMIN.LOGIN} replace={false} />
      ),
    },
    {
      path: ROUTERS.ADMIN.ORDERS,
      component: isLoggedIn ? (
        <OrdersAdPage />
      ) : (
        <Navigate to={ROUTERS.ADMIN.LOGIN} replace={false} />
      ),
    },
    {
      path: ROUTERS.ADMIN.ORDERSDETAIL,
      component: isLoggedIn ? (
        <OrderDetail />
      ) : (
        <Navigate to={ROUTERS.ADMIN.LOGIN} replace={false} />
      ),
    },
    {
      path: ROUTERS.ADMIN.ADDCATEGORY,
      component: isLoggedIn ? (
        <AddCategoriesPage />
      ) : (
        <Navigate to={ROUTERS.ADMIN.LOGIN} replace={false} />
      ),
    },
    {
      path: ROUTERS.ADMIN.LOGIN,
      component: <LoginPage />,
    },
  ];

  return (
    <MasterAdLayout>
      <Routes>
        {adminRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterAdLayout>
  );
};

const RouterCustom = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/quan-tri");

  return <>{isAdminRoute ? renderAdminRouter() : renderUserRouter()}</>;
};

export default RouterCustom;
