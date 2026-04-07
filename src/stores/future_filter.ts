import { create } from 'zustand';

interface FutureFilterState {
  symbol: string;
  page: number;
  limit: number;
  type: string;
  entry: string;
  reload: boolean;
  updateSymbol(value: { symbol: string }): void;
  updatePage(value: { page: number }): void;
  updateEntry(value: { entry: string }): void;
  setReload(value: boolean): void;
}

export const useFutureFilterStore = create<FutureFilterState>((set) => ({
  symbol: 'BNBUSDT',
  page: 1,
  limit: 50,
  type: 'XGB',
  entry: '',
  reload: false,
  updateSymbol: (value) => set(() => ({ symbol: value.symbol })),
  updatePage: (value) => set(() => ({ page: value.page })),
  updateEntry: (value) => set(() => ({ entry: value.entry })),
  setReload: (value) => set(() => ({ reload: value })),
}));
