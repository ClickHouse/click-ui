import {
  KeyboardEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { ComboboxItemProps } from "./types";

type ContextProps = {
  isSelected: (value: string) => boolean;
  isHidden: (type: "empty" | "item", value?: string) => boolean;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  onSelect: (value: string) => void;
  highlighted: string | null;
  search: string;
  updateSearch: (search: string) => void;
  updateHighlighted: (search: string) => void;
  updateChildren: (children: ReactNode) => void;
  id: string;
  hasError: boolean;
  disabled?: boolean;
  selectedValues: Array<string>;
  onCreateOption?: (search: string) => void;
  showCheck?: boolean;
  updateValues: (value: SetStateAction<Array<string>>) => void;
  getValueProps: (value: string) => ComboboxItemProps;
};

export const ComboboxContext = createContext<ContextProps>({
  updateChildren: () => null,
  search: "",
  updateSearch: () => null,
  onSelect: () => null,
  highlighted: null,
  isHidden: () => false,
  onKeyDown: () => null,
  updateHighlighted: () => null,
  isSelected: () => false,
  id: "",
  hasError: false,
  selectedValues: [],
  onCreateOption: () => null,
  updateValues: () => null,
  getValueProps: (value: string) => ({ children: value, value: value }),
});

export const useCombobox = () => {
  const result = useContext(ComboboxContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};
