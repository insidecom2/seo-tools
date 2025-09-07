import { FutureLogsComm } from "@/src/components/binance/future_log";
import NavbarTop from "@/src/components/nav";
import { Col, Container, Row } from "react-bootstrap";

const FutureLogs = () => {
  return (
    <div>
      <NavbarTop></NavbarTop>
      <Container className=" py-4 h-100">
        <Row>
          <Col md="12">
            <FutureLogsComm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FutureLogs;
