import { useState } from "react";
import { useProductsDispatch } from "../store/ProductsContext";

const OrderCard = ({ product, count = 1, orderHistory }) => {
  const dispatch = useProductsDispatch();
  const [quantity, setQuantity] = useState(count);

  const setProductPage = () => {
    dispatch({
      type: "setProductPage",
      payload: {
        product,
        quantity,
        isShopPage: false,
      },
    });
  };

  const increaseQuantity = () => {
    dispatch({
      type: "changeQuantityInCart",
      payload: {
        product,
        quantity: quantity + 1,
      },
    });
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      dispatch({
        type: "changeQuantityInCart",
        payload: {
          product,
          quantity: quantity - 1,
        },
      });
      setQuantity((prev) => prev - 1);
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: "removeFromCart",
      id: product.id,
      dealerid: product.dealerid,
    });
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,70%)] text-white rounded-xl flex min-[800px]:flex-row mb-3 shadow ${
        orderHistory
          ? "w-[350px] min-w-[350px] h-full flex-row mb-0 mr-3 shadow-lg"
          : "flex-col h-[350px] min-h-[350px] max-h-[350px] min-[800px]:h-[250px] min-[800px]:min-h-[143px] min-[800px]:max-h-[143px]"
      }`}
    >
      <div
        onClick={setProductPage}
        className={`bg-green-400 flex justify-center items-center  cursor-pointer ${
          orderHistory
            ? "min-w-[60%] w-[60%] h-[100%] rounded-l-xl"
            : "w-full min-w-[60%] min-[800px]:w-[60%] h-[60%] rounded-t-xl min-[800px]:rounded-l-xl min-[800px]:rounded-r-none"
        } min-[800px]:h-[100%]`}
      >
        {product.image ? (
          <img
            src={product.image}
            className={`w-full h-full object-cover ${
              orderHistory
                ? "rounded-l-xl"
                : "rounded-t-xl min-[800px]:rounded-l-xl min-[800px]:rounded-r-none"
            }`}
            alt=""
          />
        ) : (
          "Image"
        )}
      </div>
      <div className="p-2 flex flex-col flex-1 justify-between">
        <div className="flex justify-between">
          <p
            onClick={setProductPage}
            className="font-semibold truncate cursor-pointer hover:underline"
          >
            {product.name}
          </p>
          {!orderHistory && (
            <button
              className="border border-gray-300 text-gray-300 min-w-fit px-2 rounded bg-transparent hover:bg-[hsla(0,0%,77%,.08)]"
              onClick={removeFromCart}
            >
              X
            </button>
          )}
        </div>
        <p className="text-gray-300 truncate">{product.dealer}</p>
        <p className="font-semibold">
          <span>{product.price} UAH</span>
          <span>
            {" "}
            x {quantity} = {product.price * quantity} UAH
          </span>
        </p>
        {!orderHistory && (
          <div className="flex justify-between">
            <div className="inline-flex bg-blue-500 rounded">
              <button
                className={`w-[30px] rounded-l ${
                  quantity > 1 && "hover:bg-blue-400"
                }`}
                disabled={quantity === 1}
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-3 pointer-events-none">{quantity}</span>
              <button
                className="w-[30px] rounded-r hover:bg-blue-400"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
