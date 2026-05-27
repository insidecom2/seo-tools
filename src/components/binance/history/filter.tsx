import { useHistoryFilterStore } from "@/src/stores/history_filter";
import { useEffect, useState } from "react";
import { Calendar, Coins, Filter as FilterIcon, Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
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
    <div className="flex justify-start">
      <div className="w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600">
            <FilterIcon className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-medium text-slate-900">Filters</div>
            <div className="text-xs text-slate-500">
              Narrow trading history by period and symbol
            </div>
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <div className="grid gap-3 md:grid-cols-[minmax(0,12rem)_minmax(0,12rem)_auto] md:items-end md:justify-start">
            <div className="space-y-1">
              <label
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
                htmlFor="monthYear"
              >
                <Calendar className="h-3.5 w-3.5" />
                Month/Year
              </label>
              <Input
                id="monthYear"
                name="monthYear"
                type="month"
                value={formData.monthYear}
                required
                placeholder="Select month"
                onChange={handleChange}
                className="filterInput"
              />
            </div>

            <div className="space-y-1">
              <label
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
                htmlFor="symbol"
              >
                <Coins className="h-3.5 w-3.5" />
                Symbol
              </label>
              <select
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10"
              >
                <option key={1} value={""}>
                  Please select
                </option>
                {symbols.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end justify-start">
              <Button type="submit" className="min-w-[7.5rem]">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
