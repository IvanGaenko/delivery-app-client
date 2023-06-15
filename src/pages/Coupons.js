import { useProducts } from "../store/ProductsContext";

import CouponCard from "../components/CouponCard";

const Coupons = () => {
  const { coupons } = useProducts();
  return (
    <div className="flex flex-col sm:justify-center sm:flex-row h-full mx-3">
      <div className="border border-black dark:border-gray-700 grid grid-cols-1 sm:overflow-y-auto sm:grid-cols-3 gap-5 w-full max-w-[1350px] mt-44 sm:mt-10 p-3 mb-3 rounded-xl sm:rounded-r">
        {coupons.map((coupon) => {
          return <CouponCard key={coupon.id} product={coupon} coupon />;
        })}
      </div>
    </div>
  );
};

export default Coupons;
