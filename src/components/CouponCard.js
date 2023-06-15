import { useState } from "react";

const CouponCard = ({ product }) => {
  const [buttonName, setButtonName] = useState("Copy");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(product.code);
    setButtonName("Copied!");
    setTimeout(() => {
      setButtonName("Copy");
    }, 1000);
  };

  return (
    <div className="bg-[rgba(0,0,0,60%)] dark:bg-gray-700 text-white rounded-xl flex flex-col h-[250px] max-h-[250px] min-h-[250px] shadow-xl">
      <div className="bg-green-400 dark:bg-green-500 text-gray-700 text-[20px] flex justify-center items-center h-[125px] w-[100%] rounded-t-xl">
        Coupon
      </div>
      <div className="px-3 pb-3 flex flex-col flex-1 justify-between">
        <p className="font-semibold">{product.name}</p>
        <p>Discount: - {product.discount}</p>
        <span>Code: {product.code}</span>
        {/* <div className="flex justify-end"> */}
        <button
          className="min-w-[100px] px-3 rounded bg-green-600 dark:bg-green-700 hover:bg-green-500 dark:hover:bg-green-600"
          onClick={copyToClipboard}
        >
          {buttonName}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CouponCard;
