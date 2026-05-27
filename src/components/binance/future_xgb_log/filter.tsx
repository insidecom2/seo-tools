import { useFutureFilterStore } from '@/src/stores/future_filter';
import { Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
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
    <div className="flex justify-start">
      <div className="w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600">
            <Filter className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-medium text-slate-900">Filters</div>
            <div className="text-xs text-slate-500">
              Narrow model output by symbol and entry type
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,12rem)_minmax(0,12rem)_auto] md:items-end md:justify-start">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Symbol
          </label>
          <select
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10"
            value={symbol}
            onChange={(e) => updateSymbol({ symbol: e.target.value })}
          >
            {symbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Entry
          </label>
          <select
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10"
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
        <div className="flex items-end justify-start">
          <Button
            className="min-w-[7.5rem]"
            onClick={handlerReload}
            variant="outline"
          >
            <RefreshCw className="h-4 w-4" />
            Reload
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};
