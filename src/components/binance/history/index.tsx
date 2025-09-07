import { useEffect } from "react";
import useHistory from "./hook/useHistory";
import { CurrencyFormat, DecimalFormat } from "@/src/utils/format";
import { LoadingIcon } from "../../common/loading";
import { TableLists } from "./list";
import { Filter } from "./filter";
import { useHistoryFilterStore } from "@/src/stores/history_filter";

const BinanceHistoryComm = () => {
  const { isLoading, getPositionHistory, lists } = useHistory();
  const { symbol, monthYear } = useHistoryFilterStore();

  useEffect(() => {
    if (symbol && monthYear)
      getPositionHistory({ symbol: symbol, monthYear: monthYear });
  }, [symbol, monthYear]);

  return (
    <div>
      <h2>History </h2>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <div>Profit: {CurrencyFormat(lists?.totalPnL ?? 0)}</div>
          <div>Win rate: {DecimalFormat(lists?.winRatePercentage ?? 0)}%</div>
          <div>Lose rate: {DecimalFormat(lists?.loseRatePercentage ?? 0)}%</div>
        </>
      )}
      <Filter />
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <TableLists currentData={lists?.histories} />
      )}
    </div>
  );
};

export default BinanceHistoryComm;
