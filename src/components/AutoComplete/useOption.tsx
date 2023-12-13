import { useContext } from "react";
import { OptionContext } from "./OptionContext";

export const useOption = () => {
  const result = useContext(OptionContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};

export const useSearch = () => {
  const { search } = useOption();
  return search;
};
