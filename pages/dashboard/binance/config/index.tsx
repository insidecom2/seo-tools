import { BinanceSetting } from "@/src/components/binance/config/Setting";
import NavbarTop from "@/src/components/nav";
import { Col, Container, Row } from "react-bootstrap";

const BinanceConfig = () => {
  return (
    <div>
      <NavbarTop />
      <Container className=" py-5 h-100">
        <Row className="row d-flex justify-content-center align-items-center h-100">
          <Col md={8}>
            <BinanceSetting />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BinanceConfig;
