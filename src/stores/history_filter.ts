// store.ts
import dayjs from "dayjs";
import { create } from "zustand";

interface HistoryFilterState {
  symbol: string;
  monthYear: string;
  update: (value: { symbol: string; monthYear: string }) => void;
}

export const useHistoryFilterStore = create<HistoryFilterState>((set) => ({
  symbol: "BNBUSDT",
  monthYear: dayjs().format("YYYY-MM"),
  update: (value) =>
    set(() => ({ symbol: value.symbol, monthYear: value.monthYear })),
}));
