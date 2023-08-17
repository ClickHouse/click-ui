import { useContext } from "react";
import { SelectContext } from "./SelectContext";

export const useSelect = () => {
  const result = useContext(SelectContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};
