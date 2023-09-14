import { useContext } from "react";
import { ToastContext } from "./Toast";
export const useToast = () => {
  const result = useContext(ToastContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};
