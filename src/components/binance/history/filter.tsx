import { useHistoryFilterStore } from "@/src/stores/history_filter";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaCalendar, FaCoins, FaSearchengin } from "react-icons/fa6";
import { symbols } from "../future_xgb_log/const";

interface FormData {
  symbol: string;
  monthYear: string;
}

export const Filter = () => {
  const [formData, setFormData] = useState<FormData>({
    symbol: "",
    monthYear: "",
  });
  const { symbol, monthYear, update } = useHistoryFilterStore();

  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update(formData);
  };

  useEffect(() => {
    setFormData({ symbol: symbol, monthYear: monthYear });
  }, [symbol, monthYear]);

  return (
    <div className="filterContainer">
      <Form onSubmit={(e) => handleSubmit(e)} className="filterForm">
        <Row className="g-3 align-items-end">
          <Col xs={12} sm={6} md={4}>
            <Form.Group className="filterGroup">
              <Form.Label className="filterLabel">
                <FaCalendar /> Month/Year
              </Form.Label>
              <Form.Control
                name="monthYear"
                type="month"
                value={formData.monthYear}
                required
                placeholder="Select month"
                onChange={handleChange}
                className="filterInput"
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <Form.Group className="filterGroup">
              <Form.Label className="filterLabel">
                <FaCoins /> Symbol
              </Form.Label>
              <Form.Select
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
                className="filterSelect"
              >
                <option key={1} value={""}>
                  Please select
                </option>
                {symbols.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
            <Button type="submit" className="filterBtn w-100">
              <FaSearchengin /> Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
