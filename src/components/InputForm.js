import { useState } from "react";
import { useProducts, useProductsDispatch } from "../store/ProductsContext";

import CartService from "../services/cart.service";
import Map from "./Map";

const InputForm = () => {
  const { userData, userLocation } = useProducts();
  const dispatch = useProductsDispatch();

  const [userMarker, setUserMarker] = useState(null);
  const { address } = userLocation;

  const onChangeHandler = (value, param) => {
    const payload = {};
    payload[param] = value;
    dispatch({
      type: "updateUserData",
      payload,
    });
  };

  const setAddressMarker = async () => {
    const result = await CartService.getLatLngFromAddress(address);
    const { lat, lng } = result;

    if (lat !== null) {
      setUserMarker({ lat, lng });
    }
  };

  const updateUserLocation = (value, param) => {
    const payload = {};
    payload[param] = value;
    dispatch({
      type: "updateUserLocation",
      payload,
    });
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setAddressMarker();
    }
  };

  return (
    <div className="flex flex-col items-center w-full sm:w-[40%] mt-44 sm:mt-10 sm:mb-3 rounded-xl sm:rounded-br relative bg-gray-400 dark:bg-gray-700">
      <Map userMarker={userMarker} />
      <form className="w-full overflow-y-auto mt-[275px] px-3 text-white">
        <div className="flex flex-col w-full mb-5">
          <label htmlFor="address" className="pl-3 mb-1">
            Adress: <span className="text-gray-400">(required)</span>
          </label>
          <input
            type="text"
            maxLength="255"
            value={address}
            onChange={(e) => updateUserLocation(e.target.value, e.target.id)}
            onKeyDown={(e) => handleSubmit(e)}
            placeholder="Sumska street, 1, Kharkiv"
            id="address"
            className="w-full block rounded text-black leading-[1.6] outline-none px-3 py-[0.32rem] shadow dark:bg-gray-600"
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <label htmlFor="email" className="pl-3 mb-1">
            Email: <span className="text-gray-400">(required)</span>
          </label>
          <input
            type="text"
            maxLength="255"
            value={userData.email}
            onChange={(e) => onChangeHandler(e.target.value, e.target.id)}
            placeholder="example@example.com"
            id="email"
            className="w-full block rounded text-black leading-[1.6] outline-none px-3 py-[0.32rem] shadow dark:bg-gray-600"
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <label htmlFor="phone" className="pl-3 mb-1">
            Phone: <span className="text-gray-400">(required)</span>
          </label>
          <input
            type="tel"
            maxLength="20"
            value={userData.phone}
            onChange={(e) => onChangeHandler(e.target.value, e.target.id)}
            placeholder="+38 (0XX) XXX-XX-XX"
            id="phone"
            className="w-full block rounded text-black leading-[1.6] outline-none px-3 py-[0.32rem] shadow dark:bg-gray-600"
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <label htmlFor="name" className="pl-3 mb-1">
            Name: <span className="text-gray-400">(required)</span>
          </label>
          <input
            type="text"
            maxLength="255"
            value={userData.name}
            onChange={(e) => onChangeHandler(e.target.value, e.target.id)}
            placeholder="John"
            id="name"
            className="w-full block rounded text-black leading-[1.6] outline-none px-3 py-[0.32rem] shadow dark:bg-gray-600"
          />
        </div>
      </form>
    </div>
  );
};

export default InputForm;
