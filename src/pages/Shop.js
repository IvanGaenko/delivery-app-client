import { useProducts } from "../store/ProductsContext";

import Loading from "../components/Loading";
import ShopBar from "../components/ShopBar";
import ShopBody from "../components/ShopBody";

function Shop() {
  const { dealers, products } = useProducts();

  return (
    <div className="flex-1 flex flex-col sm:flex-row sm:h-full mx-3 sm:mx-0">
      {products.length > 0 ? (
        <>
          <ShopBar dealers={dealers} />
          <ShopBody products={products} activeDealerId={null} />
        </>
      ) : (
        <div className="w-full h-full mt-44 sm:mt-10">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default Shop;
