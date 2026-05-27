import { DateTimeConvert } from "@/src/utils/datetime";
import { DecimalFormat } from "@/src/utils/format";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { LoadingIcon } from "../../common/loading";
import useFutureLogs from "./hook/useLogs";

export const FutureLogsComm = () => {
  const { getLogs, isLoading, lists, pagination } = useFutureLogs();
  const [paginationTable, setPaginationTable] = useState({
    symbol: "BNBUSDT",
    page: 1,
    limit: 50,
  });

  const updatePage = (page: number) => {
    setPaginationTable((last) => ({ ...last, page }));
  };

  const changePageStep = (type: string) => {
    if (type === "left" && paginationTable.page > 1) {
      setPaginationTable((last) => ({
        ...last,
        page: paginationTable.page - 1,
      }));
      return;
    } else if (
      type === "right" &&
      paginationTable.page < parseInt(pagination?.page_all)
    ) {
      setPaginationTable((last) => ({
        ...last,
        page: paginationTable.page + 1,
      }));
      return;
    }
  };

  useEffect(() => {
    getLogs(paginationTable);
  }, [getLogs, paginationTable]);

  if (isLoading || !pagination) return <LoadingIcon />;

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between gap-3 pb-3">
        <div className="shrink-0">
          <Button
            onClick={() => changePageStep("left")}
            className="btnPagination"
            variant="outline"
            size="sm"
          >
            <FaChevronLeft />
          </Button>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-2 px-2">
          <h2 className="text-lg font-semibold">
              Future Logs ({paginationTable.page}/{pagination?.page_all})
          </h2>
          <h2 className="text-lg font-semibold">
            Total : {DecimalFormat(pagination?.all, 0)}
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <Button
            onClick={() => changePageStep("right")}
            className="btnPagination"
            variant="outline"
            size="sm"
          >
            <FaChevronRight />
          </Button>
        </div>
      </div>
      <div className="tableContainer overflow-x-auto">
        <Table className="customTable min-w-[1200px]">
          <TableHeader className="tableHead">
            <TableRow>
              <TableHead style={{ width: "50px" }}>#</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>DateTime</TableHead>
              <TableHead>Interval</TableHead>
              <TableHead>RSI</TableHead>
              <TableHead>ADX</TableHead>
              <TableHead>GAP</TableHead>
              <TableHead>EMA_S</TableHead>
              <TableHead>EMA_L</TableHead>
              <TableHead>LIMIT ORDER</TableHead>
              <TableHead>CURRENT PRICE</TableHead>
              <TableHead>VOLUME LAST 20</TableHead>
              <TableHead>VOLUME LASTED</TableHead>
              <TableHead>ATR</TableHead>
              <TableHead>SIGNAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lists &&
              lists.map((row, index) => {
                const body = JSON.parse(row.body_json);
                const isSignal =
                  body.signal === "BUY" || body.signal === "SELL";
                return (
                  <TableRow
                    key={row.time}
                    className={isSignal ? "tableRow signalRow" : "tableRow"}
                  >
                    <TableCell className="indexCell">{index + 1}</TableCell>
                    <TableCell className="symbolCell">{row.symbol}</TableCell>
                    <TableCell className="dateCell">
                      {DateTimeConvert(
                        row.timestamp as string,
                        "DD/MM/YYYY HH:mm:ss",
                      )}
                    </TableCell>
                    <TableCell>{body.interval}</TableCell>
                    <TableCell>{body.rsi.toFixed(2)}</TableCell>
                    <TableCell>{body.adx.toFixed(2)}</TableCell>
                    <TableCell>{body.gap.toFixed(6)}</TableCell>
                    <TableCell>{body.ema_s_last.toFixed(6)}</TableCell>
                    <TableCell>{body.ema_l_last.toFixed(6)}</TableCell>
                    <TableCell>{body.trend_order_limit}</TableCell>
                    <TableCell>{body.current_price.toFixed(6)}</TableCell>
                    <TableCell>{body?.volume_last_20?.toFixed(4)}</TableCell>
                    <TableCell>{body?.volume_lasted?.toFixed(4)}</TableCell>
                    <TableCell>{body?.atr_oder ? "Yes" : "No"}</TableCell>
                    <TableCell className="signalCell">
                      <span className={isSignal ? "signalBadge" : ""}>
                        {body.signal}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-3 pb-3 pt-3">
        <div className="shrink-0">
          <Button
            onClick={() => changePageStep("left")}
            className="btnPagination"
            variant="outline"
            size="sm"
          >
            <FaChevronLeft />
          </Button>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-2 px-2">
          <h2 className="text-lg font-semibold">
              Future Logs ({paginationTable.page}/{pagination?.page_all})
          </h2>
          <h2 className="text-lg font-semibold">
            Total : {DecimalFormat(pagination?.all, 0)}
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <Button
            onClick={() => changePageStep("right")}
            className="btnPagination"
            variant="outline"
            size="sm"
          >
            <FaChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
