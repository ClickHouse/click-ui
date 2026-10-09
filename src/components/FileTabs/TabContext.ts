import { createContext } from 'react';

interface ContextProps {
  selectedIndex?: number;
  onClose: (index: number) => void;
}

export const TabContext = createContext<ContextProps>({
  selectedIndex: undefined,
  onClose: () => null,
});
