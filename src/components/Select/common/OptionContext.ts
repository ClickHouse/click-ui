import { createContext } from "react";

type OptionContextProps = {
  search: string;
  highlighted?: string;
  updateHighlighted: (value: string) => void;
  isHidden: (type: "empty" | "item", value?: string) => boolean;
};

export const OptionContext = createContext<OptionContextProps>({
  search: "",
  updateHighlighted: () => null,
  isHidden: () => true,
});
