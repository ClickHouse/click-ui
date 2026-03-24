import { createContext } from 'react';

type OptionContextProps = {
  search: string;
  highlighted?: string;
  updateHighlighted: (value: string) => void;
  isHidden: (value?: string) => boolean;
  selectedValue: string;
  onSelect: (value: string) => void;
};

export const OptionContext = createContext<OptionContextProps>({
  search: '',
  selectedValue: '',
  updateHighlighted: () => null,
  onSelect: () => null,
  isHidden: () => true,
});
