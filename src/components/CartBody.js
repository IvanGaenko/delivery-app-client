import { useState, useEffect } from "react";
import { useProducts, useProductsDispatch } from "../store/ProductsContext";
import CartService from "../services/cart.service";

import OrderCard from "./OrderCard";
import RecaptchaContainer from "./RecaptchaContainer";

const CartBody = ({ setOrderSuccess }) => {
  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  const [readyButton, setReadyButton] = useState(false);

  const {
    userData,
    totalprice,
    cart,
    couponValue,
    currentDiscount,
    discountprice,
    userLocation,
  } = useProducts();
  const dispatch = useProductsDispatch();

  useEffect(() => {
    const totalPriceCount = cart.reduce((sum, current) => {
      return sum + current.quantity * current.product.price;
    }, 0);

    dispatch({
      type: "updateTotalPrice",
      totalprice: totalPriceCount,
      discountprice: totalPriceCount * (1 - currentDiscount.value),
    });
  }, [cart, currentDiscount, dispatch]);

  useEffect(() => {
    if (couponValue.length < 15) {
      dispatch({
        type: "checkDiscountCode",
        code: couponValue,
      });
    }
  }, [couponValue, dispatch]);

  useEffect(() => {
    if (
      !!userLocation.address &&
      !!userData.email &&
      !!userData.phone &&
      !!userData.name &&
      isValidCaptcha &&
      cart.length > 0
    ) {
      setReadyButton(true);
    } else {
      if (readyButton !== false) setReadyButton(false);
    }
  }, [userData, userLocation, cart, readyButton, isValidCaptcha]);

  const onChangeHandler = (value) => {
    dispatch({
      type: "updateCouponValue",
      couponValue: value,
    });
  };

  const pasteFromClipboard = async () => {
    const pastedValue = await navigator.clipboard.readText();
    onChangeHandler(pastedValue);
  };

  const applyProductsOrder = async () => {
    const orderData = {
      couponid: currentDiscount.id ? currentDiscount.id : null,
      cart,
      totalprice,
      discount: currentDiscount.discount ? currentDiscount.discount : null,
      discountprice,
      email: userData.email.toLowerCase(),
      phone: userData.phone.toLowerCase(),
      name: userData.name.toLowerCase(),
    };

    const data = await CartService.sendCartData(orderData);
    setOrderSuccess({ status: true, id: data.data.orderid });
  };

  return (
    <div className="flex-1 flex flex-col mt-3 sm:mt-10 sm:ml-3 mb-3 relative rounded-xl sm:rounded-tr border border-black">
      <div className="flex flex-col overflow-x-hidden mb-[250px] min-[860px]:mb-[190px] px-3 pt-3">
        {cart.length > 0 ? (
          <>
            {cart.map((c) => {
              return (
                <OrderCard
                  key={c.product.id}
                  product={c.product}
                  count={c.quantity}
                  isLastProduct
                />
              );
            })}
          </>
        ) : (
          <p className="mb-3 flex w-full justify-center items-center font-semibold">
            Your cart is empty.
          </p>
        )}
      </div>
      <div className="absolute bottom-0 w-full text-white bg-[rgba(0,0,0,60%)] h-[250px] min-h-[250px] max-h-[250px] min-[860px]:h-[190px] min-[860px]:min-h-[190px] min-[860px]:max-h-[190px] flex flex-col p-3 rounded-b-xl">
        <div className="flex flex-col justify-between items-center min-[860px]:items-start mb-[95px] min-[860px]:mb-3 flex-1">
          <p className="font-semibold truncate mb-3">
            {cart.length > 0 && (
              <>
                <span className="">Total price: {totalprice}UAH</span>
                {currentDiscount.discount && (
                  <span>
                    {" "}
                    - {currentDiscount.discount} = {discountprice}UAH
                  </span>
                )}
              </>
            )}
          </p>
          <div className="flex bg-[rgba(0,0,0,45%)] rounded p-1 w-full max-w-[300px] min-w-[200px]">
            <input
              type="text"
              value={couponValue}
              onChange={(e) => onChangeHandler(e.target.value)}
              placeholder="Enter coupon code here"
              className="w-full bg-transparent text-gray-500 block leading-[1.6] outline-none px-3 py-[3px]"
            />
            <button
              className="rounded w-[70px] bg-gray-500 hover:bg-gray-400"
              onClick={pasteFromClipboard}
            >
              Paste
            </button>
          </div>
        </div>
        <div className="relative w-full flex flex-col items-center min-[860px]:flex-row justify-between min-[860px]:items-end">
          <div className="absolute bottom-[50px] min-[860px]:bottom-0 w-full min-[860px]:relative h-[80px] flex items-center min-[860px]:items-end justify-center min-[860px]:justify-start mb-1 min-[860px]:mb-0">
            <RecaptchaContainer setIsValidCaptcha={setIsValidCaptcha} />
          </div>

          <button
            className={`w-full max-w-[300px] min-[860px]:w-[150px] min-[860px]:min-w-[150px] min-[860px]:max-w-[150px] h-[50px] rounded  ${
              !readyButton
                ? "pointer-events-none bg-gray-500"
                : "pointer-events-auto bg-green-600 hover:bg-green-500"
            }`}
            onClick={applyProductsOrder}
            disabled={!readyButton}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartBody;
