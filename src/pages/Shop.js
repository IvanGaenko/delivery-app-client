import { useProducts } from "../store/ProductsContext";

import Loading from "../components/Loading";
import ShopBar from "../components/ShopBar";
import ShopBody from "../components/ShopBody";

function Shop() {
  const data = useProducts();

  return (
    <div className="flex-1 flex flex-col sm:flex-row sm:h-full p-3 pt-0 sm:p-0">
      {data.products.length > 0 ? (
        <>
          <ShopBar dealers={data.dealers} />
          <ShopBody products={data.products} activeDealerId={null} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Shop;
