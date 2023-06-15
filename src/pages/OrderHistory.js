import { useState } from "react";

import CartService from "../services/cart.service";

import HistoryForm from "../components/HistoryForm";
import HistoryBody from "../components/HistoryBody";
import Loading from "../components/Loading";

const OrderHistory = () => {
  const [cartHistory, setCartHistory] = useState({ data: [], error: null });
  const [isLoading, setIsLoading] = useState(false);

  const errorMessage = "No order history on these email and phone number.";

  const onSubmitHandler = async (data) => {
    setIsLoading(true);

    const result = await CartService.getUserCartHistory(data);

    setIsLoading(false);

    if (result.data.success === true) {
      setCartHistory({ data: result.data.orderHistory, error: null });
    } else {
      setCartHistory({
        data: [],
        error: errorMessage,
      });
    }
  };

  return (
    <div className="flex flex-col items-center h-full mx-3">
      <HistoryForm onSubmitHandler={onSubmitHandler} />

      {isLoading ? (
        <Loading />
      ) : cartHistory.data.length > 0 ? (
        <HistoryBody cartHistory={cartHistory.data} />
      ) : (
        cartHistory.error && <p>{cartHistory.error}</p>
      )}
    </div>
  );
};

export default OrderHistory;
