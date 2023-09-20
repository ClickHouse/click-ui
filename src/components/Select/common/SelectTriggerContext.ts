import { RefObject, createContext } from "react";

type TriggerContextProps = {
  id: string;
  hasError: boolean;
  disabled?: boolean;
  sortable?: boolean;
  name?: string;
  form?: string;
  triggerRef: RefObject<HTMLDivElement>;
};

export const SelectTriggerContext = createContext<TriggerContextProps>({
  id: "",
  hasError: false,
  disabled: false,
  sortable: false,
  triggerRef: {
    current: null,
  },
});
