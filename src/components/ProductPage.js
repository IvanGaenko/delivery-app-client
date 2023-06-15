import { useState, useEffect, useRef } from "react";
import { useProductsDispatch } from "../store/ProductsContext";

const ProductPage = ({ product, count = 1, isShopPage = false }) => {
  const dispatch = useProductsDispatch();
  const [quantity, setQuantity] = useState(count);
  const modalRef = useRef();

  useEffect(() => {
    const onCloseHandler = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const outsideHandler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", onCloseHandler);
    document.addEventListener("mousedown", outsideHandler);

    return () => {
      document.removeEventListener("keydown", onCloseHandler);
      document.removeEventListener("mousedown", outsideHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-enable-next-line react-hooks/exhaustive-deps

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
    onClose();
  };

  const onClose = () => {
    dispatch({
      type: "setProductPage",
      payload: null,
    });
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 backdrop-blur-[2px]">
      <div className="h-full w-full flex justify-center items-center">
        <div
          ref={modalRef}
          className={`bg-[rgba(0,0,0,70%)] relative min-[400px]:rounded-xl flex flex-col sm:flex-row h-full min-[400px]:h-[90%] sm:h-[80%] sm:min-h-[250px] sm:max-h-[700px] w-full min-[400px]:w-[90%] sm:w-[80%] sm:min-w-[500px] sm:max-w-[1100px] text-white shadow-xl z-10`}
        >
          <button
            className="absolute border top-3 z-10 right-3 border-gray-300 text-gray-300 min-w-fit px-2 rounded bg-transparent hover:bg-[hsla(0,0%,77%,.08)]"
            onClick={onClose}
          >
            X
          </button>
          <div
            className={`min-h-[50%] h-full w-full min-w-[60%] min-[400px]:rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none flex justify-center items-center`}
          >
            {product.image ? (
              <img
                src={product.image}
                className="w-full h-full object-cover min-[400px]:rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                alt=""
              />
            ) : (
              "Image"
            )}
          </div>

          <div className="p-3 flex flex-col justify-between relative w-full sm:max-w-[300px] h-full min-h-[200px] max-h-[700px] bg-[rgba(0,0,0,60%)] min-[400px]:rounded-b-xl sm:rounded-bl-none sm:rounded-r-xl">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center">
                <span className="break-words font-semibold text-lg">
                  {product.name}
                </span>
              </div>

              <p className="text-gray-300 min-h-[25px] truncate mb-3">
                {product.dealer}
              </p>

              <div
                className={`flex flex-col h-full break-words overflow-x-hidden overflow-y-auto ${
                  isShopPage ? "mb-[85px] sm:mb-[70px]" : "mb-0"
                }`}
              >
                <p className="mb-3">
                  {product.weight} g | {product.kcal} kcal
                </p>
                <p className="flex-1">{product.description}</p>
              </div>
            </div>

            {isShopPage && (
              <div
                className={`flex flex-col justify-between absolute bottom-3 left-3 right-3`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex bg-blue-500 dark:bg-blue-600 rounded">
                    <button
                      className={`w-[30px] min-w-[30px] rounded-l ${
                        quantity > 1 &&
                        "hover:bg-blue-400 dark:hover:bg-blue-500"
                      }`}
                      onClick={decreaseQuantity}
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <span className="px-3 w-fit pointer-events-none">
                      {quantity}
                    </span>
                    <button
                      className="w-[30px] min-w-[30px] rounded-r hover:bg-blue-400 dark:hover:bg-blue-500"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  <p className="flex justify-between font-semibold">
                    <span>{product.price} UAH</span>
                  </p>
                </div>

                <button
                  className={`min-w-[110px] h-[40px] sm:h-[24px] px-3 rounded bg-green-600 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600 shadow`}
                  onClick={() => addToCart(product)}
                >
                  Add to card
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
