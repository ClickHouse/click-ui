import { createContext } from "react";

type OptionContextProps = {
  search: string;
  highlighted?: string;
  updateHighlighted: (value: string) => void;
  isHidden: (value?: string) => boolean;
  selectedValues: Array<string>;
  onSelect: (value: string) => void;
  showCheck?: boolean;
};

export const OptionContext = createContext<OptionContextProps>({
  search: "",
  selectedValues: [],
  updateHighlighted: () => null,
  onSelect: () => null,
  isHidden: () => true,
});
