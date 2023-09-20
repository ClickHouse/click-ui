import { useContext } from "react";
import { SelectTriggerContext } from "./SelectTriggerContext";

export const useSelectTrigger = () => {
  const result = useContext(SelectTriggerContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};
