import { createContext } from "react";

type SelectCommonContextProps = {
  onChange: (selectedValues: Array<string>) => void;
  onSelect: (selectedValue: string) => void;
  onCreateOption?: (search: string) => void;
  selectedValues: Array<string>;
  showCheck?: boolean;
  onOpenChange: (open?: boolean) => void;
};

export const SelectCommonContext = createContext<SelectCommonContextProps>({
  onChange: () => null,
  onSelect: () => null,
  onOpenChange: () => null,
  selectedValues: [],
  showCheck: false,
});
