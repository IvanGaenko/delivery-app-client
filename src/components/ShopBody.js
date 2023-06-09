import { useProducts } from "../store/ProductsContext";

import ProductCard from "./ProductCard";

const ShopBody = () => {
  const { products } = useProducts();

  return (
    <div
      className={`flex-1 text-lg sm:text-base grid grid-rows-[250px_250px_250px] grid-cols-1 min-[800px]:grid-cols-2 min-[1100px]:grid-cols-3 gap-5 sm:overflow-y-scroll overflow-x-hidden border border-black rounded-l-xl rounded-r p-3 sm:mt-10 sm:mr-3 sm:mb-3`}
    >
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ShopBody;
