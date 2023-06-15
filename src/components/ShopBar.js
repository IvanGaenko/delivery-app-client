import { useProducts, useProductsDispatch } from "../store/ProductsContext";

import DealerCard from "./DealerCard";

function ShopBar({ dealers }) {
  const { currentDealerId } = useProducts();
  const dispatch = useProductsDispatch();

  const selectCurrentDealer = (id) => {
    if (currentDealerId !== id) {
      dispatch({
        type: "setCurrentDealerId",
        id,
      });
    } else {
      dispatch({
        type: "resetProductList",
      });
    }
  };

  return (
    <div className="flex flex-col text-lg sm:text-base border border-black dark:border-gray-400 rounded-xl items-center w-full sm:w-[200px] min-[800px]:w-[250px] px-3 mb-3 sm:m-3 mt-44 sm:mt-10">
      <h2 className="my-3 font-semibold">Shops:</h2>
      {dealers.map((dealer) => {
        return (
          <DealerCard
            dealer={dealer}
            key={dealer.id}
            currentDealerId={currentDealerId}
            selectCurrentDealer={selectCurrentDealer}
          />
        );
      })}
    </div>
  );
}

export default ShopBar;
