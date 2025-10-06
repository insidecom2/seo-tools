import BinanceHistoryComm from "@/src/components/binance/history";
import NavbarTop from "@/src/components/nav";
import { Col, Container, Row } from "react-bootstrap";

const BinanceHistory = () => {
  return (
    <div>
      <NavbarTop></NavbarTop>
      <Container className="py-2 py-md-5  h-100">
        <Row className="row d-flex justify-content-center align-items-center h-100">
          <Col md={8}>
            <BinanceHistoryComm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BinanceHistory;
