import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useProducts, useProductsDispatch } from "../store/ProductsContext";

import ShopService from "../services/shop.service";

import Header from "../components/Header";
import ProductPage from "../components/ProductPage";

function Root() {
  const { currentProductPage } = useProducts();
  const dispatch = useProductsDispatch();

  // document.documentElement.classList.add("dark");

  const getProducts = useCallback(async () => {
    const { data } = await ShopService.getProductList();

    dispatch({
      type: "setProductList",
      data: data.data,
    });
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div
      className={`h-full mx-auto my-0 w-full min-w-[290px] !max-w-[1682px] relative ${
        currentProductPage ? "overflow-y-hidden" : "overflow-y-auto"
      } sm:overflow-y-hidden`}
    >
      <Header />
      <Outlet />
      {currentProductPage && (
        <ProductPage
          product={currentProductPage.product}
          count={currentProductPage.quantity}
          isShopPage={currentProductPage.isShopPage}
        />
      )}
    </div>
  );
}

export default Root;
