import { useProducts } from "../store/ProductsContext";

const OrderSuccess = ({ id, setOrderSuccess, address }) => {
  const { successDuration } = useProducts();

  const closeHandler = () => {
    setOrderSuccess({ status: false, id: null });
  };

  return (
    <div className="bg-green-500 flex-1 flex flex-col mx-3 mb-10 mt-44 sm:mt-10 items-center justify-start p-10 rounded-xl">
      <img
        width="64"
        height="64"
        src="https://img.icons8.com/cotton/64/checkmark.png"
        alt="checkmark"
      />
      <p className="font-semibold text-lg my-3">
        You successfully created a delivery order.
      </p>
      <p>Your order ID is {id}.</p>
      <p>Delivery address: {address}</p>
      <p className="mb-10">{successDuration}</p>
      <p className="underline cursor-pointer" onClick={closeHandler}>
        Close
      </p>
    </div>
  );
};

export default OrderSuccess;
