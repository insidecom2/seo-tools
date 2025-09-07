import { useHistoryFilterStore } from "@/src/stores/history_filter";
import { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
interface FormData {
  symbol: string;
  monthYear: string;
}
export const Filter = () => {
  const symbolLists = ["BNBUSDT"];
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
    e.preventDefault(); // ✅ Prevent page refresh
    update(formData);
  };

  useEffect(() => {
    setFormData({ symbol: symbol, monthYear: monthYear });
  }, [symbol, monthYear]);
  return (
    <div className="pt-4">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row>
          <Col md={4}>
            <Form.Group
              className="form-outline mb-4"
              controlId="formBasicEmail"
            >
              <Form.Control
                name="monthYear"
                type="month"
                value={formData.monthYear}
                required
                placeholder="Enter symbol"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group
              className="form-outline mb-4"
              controlId="formBasicEmail"
            >
              <Form.Select
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
              >
                <option key={1} value={""}>
                  Please select
                </option>
                {symbolLists.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group
              className="form-outline mb-4"
              controlId="formBasicEmail"
            >
              <Button type="submit" className="w-100">
                Search
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
