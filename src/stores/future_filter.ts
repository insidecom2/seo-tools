import { create } from "zustand";

interface FutureFilterState {
  symbol: string;
  page: number;
  limit: number;
  type: string;
  entry: string;
  updateSymbol(value: { symbol: string }): void;
  updatePage(value: { page: number }): void;
  updateEntry(value: { entry: string }): void;
}

export const useFutureFilterStore = create<FutureFilterState>((set) => ({
  symbol: "BNBUSDT",
  page: 1,
  limit: 50,
  type: "XGB",
  entry: "",
  updateSymbol: (value) => set(() => ({ symbol: value.symbol })),
  updatePage: (value) => set(() => ({ page: value.page })),
  updateEntry: (value) => set(() => ({ entry: value.entry })),
}));
