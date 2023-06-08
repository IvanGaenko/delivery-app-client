import { useProducts } from "../store/ProductsContext";

import CouponCard from "../components/CouponCard";

const Coupons = () => {
  const { coupons } = useProducts();
  return (
    <div className="flex flex-col sm:flex-row h-full mx-3">
      <div className="border border-black grid grid-cols-1 sm:overflow-y-auto sm:grid-cols-3 gap-5 w-full mt-36 sm:mt-10 p-3 mb-3 rounded-xl rounded-r sm:rounded-r-xl">
        {coupons.map((coupon) => {
          return <CouponCard key={coupon.id} product={coupon} coupon />;
        })}
      </div>
    </div>
  );
};

export default Coupons;
