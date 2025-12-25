import { DateTimeConvert } from "@/src/utils/datetime";
import { DecimalFormat } from "@/src/utils/format";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
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
      <Table bordered hover responsive style={{ fontSize: "14px" }}>
        <thead>
          <tr style={{ fontSize: "14px" }}>
            <th>#</th>
            <th>Symbol</th>
            <th>DateTime</th>
            <th>Label</th>
            <th>Confidence</th>
            <th>Price</th>
            <th>Expected Pct</th>
            <th>Trend</th>
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
                <tr key={row.timestamp} className={bgOrder}>
                  <td>{index + 1}</td>
                  <td>{row.symbol}</td>
                  <td>
                    {DateTimeConvert(
                      row.timestamp as string,
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </td>
                  <td>{body.label}</td>
                  <td>{body.confidence}</td>
                  <td>{body.price}</td>
                  <td>{body.expected_future_return_pct}</td>
                  <td>{body.trend}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
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
    </div>
  );
};
