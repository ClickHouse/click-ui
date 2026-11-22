import { createContext, KeyboardEvent, MouseEvent } from 'react';
import { SelectionType } from './types';

type OptionContextProps = {
  search: string;
  highlighted?: string;
  updateHighlighted: (value: string) => void;
  isHidden: (value?: string) => boolean;
  selectedValues: readonly string[];
  onSelect: (
    value: string,
    type?: SelectionType,
    evt?: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>
  ) => void;
  showCheck?: boolean;
  /** Id of the option element for `value`, referenced by `aria-activedescendant`. */
  getOptionId: (value: string) => string | undefined;
};

export const OptionContext = createContext<OptionContextProps>({
  search: '',
  selectedValues: [],
  updateHighlighted: () => null,
  onSelect: () => null,
  isHidden: () => true,
  getOptionId: () => undefined,
});
