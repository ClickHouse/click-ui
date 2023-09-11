import { KeyboardEvent, ReactNode, createContext, useContext } from "react";
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
  updateChildren: (children: ReactNode, type: string) => void;
  id: string;
  hasError: boolean;
  disabled?: boolean;
  selectedValueNodeProps: Array<ComboboxItemProps>;
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
  selectedValueNodeProps: [],
});

export const useCombobox = () => {
  const result = useContext(ComboboxContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};
