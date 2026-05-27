import { create } from 'zustand';

export type AlertVariant = 'success' | 'info' | 'warning' | 'destructive' | 'danger';

interface AlertState {
  isShow: boolean;
  message: string;
  variant: AlertVariant;
  setShow: (status: boolean) => void;
  setMessage: (message: string) => void;
  setVariant: (variant: AlertVariant) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  isShow: false,
  message: 'Update successfully.',
  variant: 'success',
  setShow: (status) => set((state) => ({ ...state, isShow: status })),
  setMessage: (message: string) =>
    set((state) => ({ ...state, message: message })),
  setVariant: (variant: AlertVariant) =>
    set((state) => ({
      ...state,
      variant: variant === 'danger' ? 'destructive' : variant,
    })),
}));
