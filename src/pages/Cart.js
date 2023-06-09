import { useState, useEffect } from "react";
import { useProductsDispatch } from "../store/ProductsContext";

import InputForm from "../components/InputForm";
import CartBody from "../components/CartBody";
import OrderSuccess from "../components/OrderSuccess";

const Cart = () => {
  const [orderSuccess, setOrderSuccess] = useState({
    status: false,
    id: null,
    address: "",
  });
  const dispatch = useProductsDispatch();

  useEffect(() => {
    if (orderSuccess.status) {
      dispatch({
        type: "resetOrderPage",
      });
    }
  }, [orderSuccess, dispatch]);

  return (
    <div className="flex flex-col sm:flex-row h-full mx-3">
      {orderSuccess.status ? (
        <OrderSuccess
          id={orderSuccess.id}
          address={orderSuccess.address}
          setOrderSuccess={setOrderSuccess}
        />
      ) : (
        <>
          <InputForm />
          <CartBody setOrderSuccess={setOrderSuccess} />
        </>
      )}
    </div>
  );
};

export default Cart;
