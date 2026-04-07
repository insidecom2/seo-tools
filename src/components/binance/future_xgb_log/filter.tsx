import { useFutureFilterStore } from '@/src/stores/future_filter';
import { Button, Col, Row } from 'react-bootstrap';
import { FaRotate } from 'react-icons/fa6';
import { entry, symbols } from './const';

export const FutureXgbLogsFilter = () => {
  const {
    symbol,
    entry: entryValue,
    updateSymbol,
    updateEntry,
    setReload,
  } = useFutureFilterStore();

  const handlerReload = () => {
    setReload(true);
  };
  return (
    <div className="d-flex align-items-center gap-4">
      <Row className="pb-3" width="100%">
        <Col xs={5} md={5} className="pb-3">
          <label className="mb-0">Symbol:</label>
          <select
            className="form-select"
            style={{ width: 140 }}
            value={symbol}
            onChange={(e) => updateSymbol({ symbol: e.target.value })}
          >
            {symbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>
        </Col>
        <Col xs={5} md={5} className="pb-1">
          <label className="mb-0">Entry: </label>
          <select
            className="form-select"
            style={{ width: 140 }}
            value={entryValue}
            onChange={(e) => updateEntry({ entry: e.target.value })}
          >
            <option value="">-- No Entry --</option>
            {entry.map((ent) => (
              <option key={ent} value={ent}>
                {ent}
              </option>
            ))}
          </select>
        </Col>
        <Col
          xs={2}
          md={2}
          className="pb-1 d-flex align-items-center justify-content-center"
        >
          <Button className="btnFilter" onClick={handlerReload}>
            <FaRotate />
          </Button>
        </Col>
      </Row>
    </div>
  );
};
