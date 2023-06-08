import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useProductsDispatch } from "../store/ProductsContext";

import ShopService from "../services/shop.service";

import Header from "../components/Header";

function Root() {
  const dispatch = useProductsDispatch();

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
    <div className="h-full mx-auto my-0 w-full min-w-[290px] !max-w-[1682px] relative bg-[beige] overflow-y-auto sm:overflow-y-hidden">
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
