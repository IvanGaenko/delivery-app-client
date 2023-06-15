const DealerCard = ({ dealer, selectCurrentDealer, currentDealerId }) => {
  return (
    <div
      className={`flex justify-center w-full items-center h-10 min-h-[40px] mb-3 rounded shadow-xl hover:bg-gray-400 text-white ${
        currentDealerId === null || currentDealerId === dealer.id
          ? "cursor-pointer bg-gray-500"
          : "pointer-events-none bg-gray-700 dark:bg-gray-800"
      }`}
      onClick={() => selectCurrentDealer(dealer.id)}
    >
      {dealer.name}
    </div>
  );
};

export default DealerCard;
