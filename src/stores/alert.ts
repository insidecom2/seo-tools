import {Variant} from "react-bootstrap/esm/types";
import {create} from "zustand";

interface AlertState {
    isShow: boolean;
    message: string;
    variant: Variant;
    setShow: (status: boolean) => void;
    setMessage: (message: string) => void;
    setVariant: (variant: Variant) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
    isShow: false,
    message: "Update successfully.",
    variant: "success",
    setShow: (status) => set((state) => ({...state, isShow: status})),
    setMessage: (message: string) => set((state) => ({...state, message: message})),
    setVariant: (variant: Variant) => set((state) => ({...state, variant: variant})),
}));
