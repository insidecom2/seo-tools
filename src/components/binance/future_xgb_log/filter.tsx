import { useFutureFilterStore } from "@/src/stores/future_filter";
import { entry, symbols } from "./const";

export const FutureXgbLogsFilter = () => {
  const {
    symbol,
    entry: entryValue,
    updateSymbol,
    updateEntry,
  } = useFutureFilterStore();

  return (
    <div className="d-flex align-items-center gap-4">
      <label className="mb-0">Symbol:</label>
      <select
        className="form-select"
        style={{ width: 160 }}
        value={symbol}
        onChange={(e) => updateSymbol({ symbol: e.target.value })}
      >
        {symbols.map((sym) => (
          <option key={sym} value={sym}>
            {sym}
          </option>
        ))}
      </select>
      <label className="mb-0">Entry: </label>
      <select
        className="form-select"
        style={{ width: 160 }}
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
    </div>
  );
};
