import HistoryContainer from "./HistoryContainer";

const HistoryBody = ({ cartHistory }) => {
  return (
    <div className="flex flex-col flex-1 sm:overflow-y-scroll border border-black rounded-xl sm:rounded-r pt-3 sm:mb-3 px-3 mb-3">
      {cartHistory.map((cart) => {
        return <HistoryContainer key={cart.id} cart={cart} />;
      })}
    </div>
  );
};

export default HistoryBody;
