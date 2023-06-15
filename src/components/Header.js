import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import routeName from "../routes/routeNames";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const { pathname } = useLocation();

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  return (
    <nav className="w-full flex flex-col sm:flex-row justify-between items-center absolute h-10 sm:px-10 text-lg sm:text-base">
      <ul className="flex flex-col flex-1 items-center sm:flex-row">
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

      <div className="flex justify-center items-center order-[-1] sm:order-[0] my-2 sm:my-0 w-full sm:w-fit relative">
        <button
          className="flex mx-3 absolute sm:relative right-0 hover:bg-gray-400 rounded-lg p-1"
          onClick={toggleDarkMode}
        >
          <svg
            aria-hidden="true"
            id="theme-toggle-dark-icon"
            className={`w-5 h-5 ${darkMode && "hidden"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            aria-hidden="true"
            id="theme-toggle-light-icon"
            className={`w-5 h-5 ${!darkMode && "hidden"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <span className="flex justify-end items-center font-bold ">
          <span className="truncate w-full sm:w-[150px]">
            Ivan's Delivery App
          </span>
        </span>
      </div>
    </nav>
  );
}

export default Header;
