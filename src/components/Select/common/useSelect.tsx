import { useContext } from "react";
import { SelectCommonContext } from "./SelectCommonContext";

export const useSelect = () => {
  const result = useContext(SelectCommonContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};
