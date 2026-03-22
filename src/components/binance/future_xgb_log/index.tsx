import { DateTimeConvert } from "@/src/utils/datetime";
import { DecimalFormat } from "@/src/utils/format";

import { useFutureFilterStore } from "@/src/stores/future_filter";
import { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LoadingIcon } from "../../common/loading";
import { FutureXgbLogsFilter } from "./filter";
import useFutureLogs from "./hook/useLogs";

export const FutureXgbLogsComm = () => {
  const { getLogs, isLoading, lists, pagination } = useFutureLogs();
  const { page, symbol, limit, type, entry, updatePage } =
    useFutureFilterStore();

  const changePageStep = (type: string) => {
    if (type === "left" && page > 1) {
      updatePage({ page: page - 1 });
      return;
    } else if (type === "right" && page < parseInt(pagination?.page_all)) {
      updatePage({ page: page + 1 });
      return;
    }
  };

  useEffect(() => {
    getLogs({ symbol, page, limit, type, entry });
  }, [symbol, page, limit, type, entry]);

  if (isLoading || !pagination) return <LoadingIcon />;

  return (
    <div className="pt-2">
      <Row className="pb-3">
        <Col xs={1}>
          <Button
            onClick={() => changePageStep("left")}
            className="btnPagination"
          >
            <FaChevronLeft />
          </Button>
        </Col>
        <Col xs={10}>
          <div className="px-2 d-flex gap-2">
            <h2>
              Future Logs ({page}/{pagination?.page_all})
            </h2>
            <h2>Total : {DecimalFormat(pagination?.all, 0)}</h2>
          </div>
        </Col>
        <Col xs={1} className="text-end">
          <Button
            onClick={() => changePageStep("right")}
            className="btnPagination"
          >
            <FaChevronRight />
          </Button>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col xs={12}>
          <FutureXgbLogsFilter />
        </Col>
      </Row>
      <div className="tableContainer">
        <Table bordered hover responsive className="customTable">
          <thead className="tableHead">
            <tr>
              <th style={{ width: "50px" }}>#</th>
              <th>Symbol</th>
              <th>DateTime</th>
              <th>Label</th>
              <th>Confidence</th>
              <th>Price</th>
              <th>Exp Pct</th>
              <th>Trend</th>
              <th>Entry</th>
              <th>Adx</th>
              <th>RSI</th>
            </tr>
          </thead>
          <tbody>
            {lists &&
              lists.map((row, index) => {
                const body = JSON.parse(row.body_json);
                const labelExpected = ["BUY", "SELL"].includes(body.label);
                const isHighConfidence = labelExpected;
                return (
                  <tr
                    key={row.timestamp}
                    className={
                      isHighConfidence ? "tableRow xgbSignalRow" : "tableRow"
                    }
                  >
                    <td className="indexCell">
                      {(page - 1) * limit + (index + 1)}
                    </td>
                    <td className="symbolCell">
                      <a
                        href={`https://www.binance.com/en/futures/${row.symbol}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.symbol}
                      </a>
                    </td>
                    <td className="dateCell">
                      {DateTimeConvert(
                        row.timestamp as string,
                        "DD/MM/YYYY HH:mm:ss",
                      )}
                    </td>
                    <td className="labelCell">
                      <span
                        className={`labelBadge ${body.label.toLowerCase()}`}
                      >
                        {body.label}
                      </span>
                    </td>
                    <td className="confidenceCell">
                      <span
                        className={`confidenceBadge ${
                          parseFloat(body.confidence) >= 0.8 ? "high" : "low"
                        }`}
                      >
                        {(parseFloat(body.confidence) * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td>{body.price}</td>
                    <td className="returnCell">
                      <span
                        className={`returnValue ${
                          parseFloat(body.expected_future_return_pct) >= 0
                            ? "positive"
                            : "negative"
                        }`}
                      >
                        {parseFloat(body.expected_future_return_pct).toFixed(2)}
                        %
                      </span>
                    </td>
                    <td className="trendCell">{body.trend}</td>
                    <td className="trendCell">
                      {body.entry_type == "None" ? (
                        "-"
                      ) : (
                        <span className={`labelBadge buy`}>
                          {body.entry_type}
                        </span>
                      )}
                    </td>
                    <td className="trendCell">
                      {DecimalFormat(body.adx) ?? "-"}
                    </td>
                    <td className="trendCell">
                      {DecimalFormat(body.rsi) ?? "-"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <Row className="py-3">
        <Col xs={1}>
          <Button
            onClick={() => changePageStep("left")}
            className="btnPagination"
          >
            <FaChevronLeft />
          </Button>
        </Col>
        <Col xs={10}>
          <div className="px-2 d-flex gap-2">
            <h2>
              Future Logs ({page}/{pagination?.page_all})
            </h2>
            <h2>Total : {DecimalFormat(pagination?.all, 0)}</h2>
          </div>
        </Col>
        <Col xs={1} className="text-end">
          <Button
            onClick={() => changePageStep("right")}
            className="btnPagination"
          >
            <FaChevronRight />
          </Button>
        </Col>
      </Row>
    </div>
  );
};
