import HistoryContainer from "./HistoryContainer";

const HistoryBody = ({ cartHistory }) => {
  return (
    <div className="flex flex-col items-center flex-1 w-full max-w-[1350px] sm:overflow-y-auto border border-black dark:border-gray-700 rounded-xl sm:rounded-r pt-3 sm:mb-3 px-3 mb-3">
      {cartHistory.map((cart) => {
        return <HistoryContainer key={cart.id} cart={cart} />;
      })}
    </div>
  );
};

export default HistoryBody;
