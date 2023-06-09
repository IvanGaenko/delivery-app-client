import { useState } from "react";

import CartService from "../services/cart.service";

import HistoryForm from "../components/HistoryForm";
import HistoryBody from "../components/HistoryBody";

const OrderHistory = () => {
  const [cartHistory, setCartHistory] = useState([]);
  const [isEmptyHistory, setIsEmptyHistory] = useState(false);

  const onSubmitHandler = async (data) => {
    setIsEmptyHistory(false);
    const result = await CartService.getUserCartHistory(data);

    if (result.data.success === true) {
      setCartHistory(result.data.orderHistory);
    } else {
      setIsEmptyHistory(true);
    }
  };

  return (
    <div className="flex flex-col h-full mx-3">
      <HistoryForm onSubmitHandler={onSubmitHandler} />
      {cartHistory.length > 0 && <HistoryBody cartHistory={cartHistory} />}
      {isEmptyHistory && cartHistory.length === 0 && (
        <p>No history on these email and phone number.</p>
      )}
    </div>
  );
};

export default OrderHistory;
