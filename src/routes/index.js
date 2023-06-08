import { createBrowserRouter, Navigate } from "react-router-dom";

import Root from "../layout/Root";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import OrderHistory from "../pages/OrderHistory";
import Coupons from "../pages/Coupons";
import NotFound from "../pages/NotFound";

import routeName from "./routeNames";

const router = createBrowserRouter([
  {
    path: routeName.main,
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: routeName.main,
        element: <Navigate to={routeName.shop} replace />,
      },
      {
        path: routeName.shop,
        element: <Shop />,
      },
      {
        path: routeName.cart,
        element: <Cart />,
      },
      {
        path: routeName.history,
        element: <OrderHistory />,
      },
      {
        path: routeName.coupons,
        element: <Coupons />,
      },
    ],
  },
]);

export default router;
