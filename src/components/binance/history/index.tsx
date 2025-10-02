import { useHistoryFilterStore } from "@/src/stores/history_filter";
import { CurrencyFormat, DecimalFormat } from "@/src/utils/format";
import { useEffect } from "react";
import { LoadingIcon } from "../../common/loading";
import { Filter } from "./filter";
import useHistory from "./hook/useHistory";
import { TableLists } from "./list";

const BinanceHistoryComm = () => {
  const { isLoading, getPositionHistory, lists } = useHistory();
  const { symbol, monthYear } = useHistoryFilterStore();

  useEffect(() => {
    if (symbol && monthYear)
      getPositionHistory({ symbol: symbol, monthYear: monthYear });
  }, [symbol, monthYear]);

  const balance = lists?.funding + lists?.totalPnL;
  const funding = lists?.funding ?? 0;
  const totalPnl = lists?.totalPnL ?? 0;
  const percentTP = DecimalFormat((totalPnl / funding) * 100);
  const displayPerTP = balance > funding ? "text-success" : "text-danger";
  return (
    <div>
      <h2>History </h2>
      <Filter />
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <div>
            Balance current: {CurrencyFormat(balance)} (
            <span className={displayPerTP}>{percentTP}%</span>)
          </div>
          <div>
            Funding:
            {CurrencyFormat(funding)}
          </div>
          <div>Profit: {CurrencyFormat(lists?.totalPnL ?? 0)}</div>
          <div>Win rate: {DecimalFormat(lists?.winRatePercentage ?? 0)}%</div>
          <div>Lose rate: {DecimalFormat(lists?.loseRatePercentage ?? 0)}%</div>
          <TableLists currentData={lists?.histories} />
        </>
      )}
    </div>
  );
};

export default BinanceHistoryComm;
