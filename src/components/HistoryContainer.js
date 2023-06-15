import OrderCard from "./OrderCard";

const HistoryContainer = ({ cart }) => {
  console.log("cart", cart);
  return (
    <div className="sm:h-[150px] sm:min-h-[150px] w-full mb-3 rounded-xl flex flex-col sm:flex-row shadow-xl">
      <div className="w-full min-w-full h-[150px] sm:h-full sm:w-[75%] sm:min-w-[75%] bg-[rgba(0,0,0,60%)] rounded-t-xl sm:rounded-bl sm:rounded-r-none overflow-y-hidden flex overflow-x-auto py-3 pl-3 dark:border dark:border-gray-700 dark:border-r-0">
        {cart.cart.map((c) => {
          return (
            <OrderCard
              key={c.product.id}
              product={c.product}
              count={c.quantity}
              orderHistory
            />
          );
        })}
      </div>
      <div className="text-white dark:text-gray-300 text-base bg-gray-500 dark:bg-gray-700 w-full max-h-[150px] rounded-b-xl sm:rounded-r sm:rounded-l-none p-3 flex flex-col justify-center sm:justify-start items-center sm:items-start overflow-x-hidden overflow-y-auto">
        <p>Order ID: {cart.id}</p>
        <p>Total price: {cart.totalprice} UAH</p>
        {cart.discountprice && (
          <>
            <p>Discount: - {cart.discount}</p>
            <p className="font-semibold">
              Discount price: {cart.discountprice} UAH
            </p>
          </>
        )}
        {cart.address && <p>Address: {cart.address}</p>}
      </div>
    </div>
  );
};

export default HistoryContainer;
