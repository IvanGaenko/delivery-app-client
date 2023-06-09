import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Root from "../layout/Root";
import routeName from "./routeNames";

import Loading from "../components/Loading";

const Shop = lazy(() => import("../pages/Shop"));
const Cart = lazy(() => import("../pages/Cart"));
const OrderHistory = lazy(() => import("../pages/OrderHistory"));
const Coupons = lazy(() => import("../pages/Coupons"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
        element: (
          <Suspense fallback={<Loading />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: routeName.cart,
        element: (
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: routeName.history,
        element: (
          <Suspense fallback={<Loading />}>
            <OrderHistory />
          </Suspense>
        ),
      },
      {
        path: routeName.coupons,
        element: (
          <Suspense fallback={<Loading />}>
            <Coupons />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
