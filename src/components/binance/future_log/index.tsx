import { useEffect, useState } from "react";
import useFutureLogs from "./hook/useLogs";
import { LoadingIcon } from "../../common/loading";
import { Button, Col, Pagination, Row, Table } from "react-bootstrap";
import { DateTimeConvert } from "@/src/utils/datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { DecimalFormat } from "@/src/utils/format";

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
  }, [paginationTable]);

  if (isLoading) return <LoadingIcon />;

  return (
    <div className="pt-2">
      <Row className="pb-3">
        <Col xs={1}>
          <Button onClick={() => changePageStep("left")}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Col>
        <Col xs={10}>
          <div className="px-2 d-flex gap-2 ">
            <h2>
              Future Logs ({paginationTable.page}/{pagination?.page_all})
            </h2>
            <h2>Total : {DecimalFormat(pagination?.all, 0)}</h2>
          </div>
        </Col>
        <Col xs={1} className="text-end">
          <Button onClick={() => changePageStep("right")}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Col>
      </Row>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>DateTime</th>
            <th>Interval</th>
            <th>RSI</th>
            <th>ADX</th>
            <th>GAP</th>
            <th>EMA_S</th>
            <th>EMA_L</th>
            <th>LIMIT ORDER</th>
            <th>CURRENT PRICE</th>
            <th>VOLUME LAST 20</th>
            <th>VOLUME LASTED</th>
            <th>SIGNAL</th>
          </tr>
        </thead>
        <tbody>
          {lists &&
            lists.map((row, index) => {
              const body = JSON.parse(row.body_json);
              const bgOrder =
                body.signal == "BUY" || body.signal == "SELL"
                  ? "bg-success text-white"
                  : "";
              return (
                <tr key={row.time} className={bgOrder}>
                  <td>{index + 1}</td>
                  <td>{row.symbol}</td>
                  <td>
                    {DateTimeConvert(
                      row.timestamp as string,
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </td>
                  <td>{body.interval}</td>
                  <td>{body.rsi.toFixed(2)}</td>
                  <td>{body.adx.toFixed(2)}</td>
                  <td>{body.gap.toFixed(6)}</td>
                  <td>{body.ema_s_last.toFixed(6)}</td>
                  <td>{body.ema_l_last.toFixed(6)}</td>
                  <td>{body.trend_order_limit}</td>
                  <td>{body.current_price.toFixed(6)}</td>
                  <td>{body?.volume_last_20?.toFixed(4)}</td>
                  <td>{body?.volume_lasted?.toFixed(4)}</td>
                  <td>{body.signal}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <Pagination>
          {Array.from({ length: pagination?.page_all }, (_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === pagination?.page}
              onClick={() => updatePage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};
