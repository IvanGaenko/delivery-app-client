import { useProducts } from "../store/ProductsContext";

import ShopBar from "../components/ShopBar";
import ShopBody from "../components/ShopBody";

function Shop() {
  const data = useProducts();

  return (
    <div className="flex flex-col sm:flex-row sm:h-full p-3 sm:p-0">
      <ShopBar dealers={data.dealers} />
      <ShopBody products={data.products} activeDealerId={null} />
    </div>
  );
}

export default Shop;
