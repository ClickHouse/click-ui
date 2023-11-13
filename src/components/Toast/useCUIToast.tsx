import { useContext } from "react";
import { ToastContext, ToastContextProps } from "./Toast";

export const useCUIToast = (): ToastContextProps => {
  const result = useContext(ToastContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};
