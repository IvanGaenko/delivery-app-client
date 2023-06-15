import { useState } from "react";
import { useProductsDispatch } from "../store/ProductsContext";

const ProductCard = ({ product, count = 1 }) => {
  const dispatch = useProductsDispatch();
  const [quantity, setQuantity] = useState(count);

  const setProductPage = () => {
    dispatch({
      type: "setProductPage",
      payload: {
        product,
        quantity,
        isShopPage: true,
      },
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = (product) => {
    dispatch({
      type: "addToCart",
      payload: {
        product,
        quantity,
      },
    });
    setQuantity(1);
  };

  return (
    <div className={`rounded-xl h-[250px] relative text-white shadow-xl`}>
      <div
        onClick={setProductPage}
        className={`bg-green-400 h-full w-full rounded-xl flex justify-center items-center cursor-pointer`}
      >
        {product.image ? (
          <img
            src={product.image}
            className="w-full h-full object-cover rounded-xl"
            alt=""
          />
        ) : (
          "Image"
        )}
      </div>
      <div className="p-3 pt-1 flex flex-col flex-1 justify-between absolute bottom-0 w-full bg-[rgba(0,0,0,60%)] rounded-b-xl">
        <div className="flex justify-between font-semibold">
          <span
            className="truncate cursor-pointer hover:underline"
            onClick={setProductPage}
          >
            {product.name}
          </span>
          <span>{product.price} UAH</span>
        </div>

        <p className="text-gray-300 truncate mb-3">{product.dealer}</p>

        <div className={`flex justify-between`}>
          <div className="inline-flex bg-blue-500 dark:bg-blue-600 rounded">
            <button
              className={`w-[30px] rounded-l ${
                quantity > 1 && "hover:bg-blue-400 dark:hover:bg-blue-500"
              }`}
              onClick={decreaseQuantity}
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="px-3 w-fit pointer-events-none">{quantity}</span>
            <button
              className="w-[30px] rounded-r hover:bg-blue-400 dark:hover:bg-blue-500"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>

          <button
            className={`min-w-[100px] px-3 rounded bg-green-600 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600 shadow`}
            onClick={() => addToCart(product)}
          >
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
