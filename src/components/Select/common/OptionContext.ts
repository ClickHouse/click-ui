import { createContext, KeyboardEvent, MouseEvent } from "react";
import { SelectionType } from "./types";

type OptionContextProps = {
  search: string;
  highlighted?: string;
  updateHighlighted: (value: string) => void;
  isHidden: (value?: string) => boolean;
  selectedValues: Array<string>;
  onSelect: (
    value: string,
    type?: SelectionType,
    evt?: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>
  ) => void;
  showCheck?: boolean;
};

export const OptionContext = createContext<OptionContextProps>({
  search: "",
  selectedValues: [],
  updateHighlighted: () => null,
  onSelect: () => null,
  isHidden: () => true,
});
