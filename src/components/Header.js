import { Link, useLocation } from "react-router-dom";

import routeName from "../routes/routeNames";

function Header() {
  const { pathname } = useLocation();

  return (
    <nav className="w-full flex flex-col sm:flex-row justify-between items-center absolute h-10 sm:px-10 text-lg sm:text-base">
      <ul className="flex flex-col justify-center items-center sm:flex-row">
        <li
          className={`sm:mr-5  ${
            pathname === routeName.shop ? "font-bold" : "font-normal"
          }`}
        >
          <Link to={routeName.shop}>Shop</Link>
        </li>
        <li
          className={`sm:mr-5 truncate ${
            pathname === routeName.cart ? "font-bold" : "font-normal"
          }`}
        >
          <Link to={routeName.cart}>Shopping Cart</Link>
        </li>
        <li
          className={`sm:mr-5 ${
            pathname === routeName.history ? "font-bold" : "font-normal"
          }`}
        >
          <Link to={routeName.history}>History</Link>
        </li>
        <li
          className={`${
            pathname === routeName.coupons ? "font-bold" : "font-normal"
          }`}
        >
          <Link to={routeName.coupons}>Coupons</Link>
        </li>
      </ul>
      <span className="flex justify-end items-center font-bold order-[-1] my-2 sm:order-[0] sm:my-0">
        <span className="truncate w-full sm:w-[150px]">
          Ivan's Delivery App
        </span>
      </span>
    </nav>
  );
}

export default Header;
