import { DateTimeConvert } from "@/src/utils/datetime";
import { DecimalFormat } from "@/src/utils/format";

import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LoadingIcon } from "../../common/loading";
import useFutureLogs from "./hook/useLogs";

export const FutureXgbLogsComm = () => {
  const { getLogs, isLoading, lists, pagination } = useFutureLogs();
  const [paginationTable, setPaginationTable] = useState({
    symbol: "BNBUSDT",
    page: 1,
    limit: 50,
    type: "XGB",
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
              Future Logs ({paginationTable.page}/{pagination?.page_all})
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
              <th>Expected Pct</th>
              <th>Trend</th>
              <th>Entry</th>
            </tr>
          </thead>
          <tbody>
            {lists &&
              lists.map((row, index) => {
                const body = JSON.parse(row.body_json);
                const labelExpected = ["BUY", "SELL"].includes(body.label);
                const isHighConfidence =
                  parseFloat(body.confidence) >= 0.8 &&
                  Math.abs(parseFloat(body.expected_future_return_pct)) >=
                    0.45 &&
                  labelExpected;
                return (
                  <tr
                    key={row.timestamp}
                    className={
                      isHighConfidence ? "tableRow xgbSignalRow" : "tableRow"
                    }
                  >
                    <td className="indexCell">
                      {(paginationTable.page - 1) * paginationTable.limit +
                        (index + 1)}
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
                    <td className="trendCell">{body.entry_type ?? "-"}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
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
              Future Logs ({paginationTable.page}/{pagination?.page_all})
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
