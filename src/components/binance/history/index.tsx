import { useHistoryFilterStore } from "@/src/stores/history_filter";
import { CurrencyFormat, DecimalFormat } from "@/src/utils/format";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaArrowUp, FaCheck, FaWallet } from "react-icons/fa6";
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
  const winRate = DecimalFormat(lists?.winRatePercentage ?? 0);
  const loseRate = DecimalFormat(lists?.loseRatePercentage ?? 0);
  const displayPerTP = balance > funding ? "positive" : "negative";

  return (
    <div className="pt-3">
      <div className="historyHeader">
        <h2 className="historyTitle">📈 Trading History</h2>
        <Filter />
      </div>

      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <Row className="mb-4 g-3">
            <Col xs={12} md={6} lg={3}>
              <Card className="statCard">
                <Card.Body>
                  <div className="statContent">
                    <div className="statIcon balance">
                      <FaWallet />
                    </div>
                    <div className="statInfo">
                      <div className="statLabel">Balance</div>
                      <div className={`statValue ${displayPerTP}`}>
                        {CurrencyFormat(balance)}
                      </div>
                      <div className={`statPercent ${displayPerTP}`}>
                        {percentTP}%
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="statCard">
                <Card.Body>
                  <div className="statContent">
                    <div className="statIcon funding">
                      <FaArrowUp />
                    </div>
                    <div className="statInfo">
                      <div className="statLabel">Funding</div>
                      <div className="statValue">{CurrencyFormat(funding)}</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="statCard">
                <Card.Body>
                  <div className="statContent">
                    <div className="statIcon profit">
                      <FaArrowUp />
                    </div>
                    <div className="statInfo">
                      <div className="statLabel">Profit</div>
                      <div
                        className={`statValue ${totalPnl > 0 ? "positive" : "negative"}`}
                      >
                        {CurrencyFormat(totalPnl)}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="statCard">
                <Card.Body>
                  <div className="statContent twoStats">
                    <div className="twoStatItem">
                      <div className="statIcon winRate">
                        <FaCheck />
                      </div>
                      <div className="twoStatInfo">
                        <div className="twoStatLabel">Win</div>
                        <div className="twoStatValue">{winRate}%</div>
                      </div>
                    </div>
                    <div className="twoStatItem">
                      <div className="statIcon loseRate">
                        <FaCheck />
                      </div>
                      <div className="twoStatInfo">
                        <div className="twoStatLabel">Lose</div>
                        <div className="twoStatValue">{loseRate}%</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <TableLists currentData={lists?.histories} />
        </>
      )}
    </div>
  );
};

export default BinanceHistoryComm;
