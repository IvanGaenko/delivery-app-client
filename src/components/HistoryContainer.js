import OrderCard from "./OrderCard";

const HistoryContainer = ({ cart }) => {
  return (
    <div className="h-[300px] min-h-[300px] sm:h-[150px] sm:min-h-[150px] w-full mb-3 rounded-xl flex flex-col sm:flex-row shadow-xl">
      <div className="w-full min-w-full sm:w-[75%] sm:min-w-[75%] bg-[rgba(0,0,0,60%)] rounded-t-xl sm:rounded-bl sm:rounded-r-none overflow-y-hidden flex overflow-x-auto py-3 pl-3 dark:border dark:border-gray-700 dark:border-r-0">
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
      <div className="text-white bg-gray-500 dark:bg-gray-700 w-full rounded-b-xl sm:rounded-r-xl sm:rounded-l-none p-3 flex flex-col justify-center items-center">
        <p>Total price: {cart.totalprice} UAH</p>
        {cart.discountprice && (
          <>
            <p>Discount: - {cart.discount}</p>
            <p className="font-semibold">
              Discount price: {cart.discountprice} UAH
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryContainer;
