import { useState } from "react";

const HistoryForm = ({ onSubmitHandler }) => {
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const onChangeHandler = (value, func) => {
    func(value);
  };

  return (
    <div className="flex justify-center w-full pb-3 mt-44 sm:mt-10">
      <div className="rounded-xl bg-gray-500 dark:bg-gray-700 text-white flex flex-col sm:flex-row justify-around items-center w-full  max-w-[1000px] p-3 shadow-xl">
        <div className="flex flex-col w-full sm:w-[300px] sm:mr-3">
          <label htmlFor="EmailInput" className="pl-3">
            Email:
          </label>
          <input
            type="text"
            maxLength="255"
            value={emailValue}
            onChange={(e) => onChangeHandler(e.target.value, setEmailValue)}
            placeholder="example@example.com"
            id="EmailInput"
            className="w-full block rounded text-black leading-[1.6] outline-none px-3 py-[0.32rem] shadow"
          />
        </div>
        <div className="flex flex-col w-full sm:w-[300px] mb-3 sm:mb-0 sm:mr-3">
          <label htmlFor="PhoneInput" className="pl-3">
            Phone:
          </label>
          <input
            type="tel"
            maxLength="20"
            value={phoneValue}
            onChange={(e) => onChangeHandler(e.target.value, setPhoneValue)}
            placeholder="+38 (0XX) XXX-XX-XX"
            id="PhoneInput"
            className="w-full block rounded text-black leading-[1.6] outline-none px-3 py-[0.32rem] shadow"
          />
        </div>
        <button
          className={`self-end w-full sm:min-w-[150px] sm:w-[180px] h-[36px] rounded shadow ${
            !(!!emailValue && !!phoneValue)
              ? "pointer-events-none bg-gray-400"
              : "pointer-events-auto bg-green-600 hover:bg-green-500"
          }`}
          onClick={() =>
            onSubmitHandler({
              email: emailValue.toLowerCase().trim(),
              phone: phoneValue.toLowerCase().trim(),
            })
          }
          disabled={!(!!emailValue && !!phoneValue)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default HistoryForm;
