import { create } from "zustand";

interface ModalState {
  isShow: boolean;
  setShow: () => void;
  setClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isShow: false,
  setShow: () => set((state) => ({ ...state, isShow: true })),
  setClose: () => set((state) => ({ ...state, isShow: false })),
}));
