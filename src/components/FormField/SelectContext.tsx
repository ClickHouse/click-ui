import {
  createContext,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

const SelectValue = (props: HTMLAttributes<HTMLDivElement>) => <div {...props} />;

type ContextProps = {
  selectedValue?: string | null;
  onSelect: (value: string) => void;
  popperOpen: boolean;
  valueNode: ReactNode | null;
  onOpenChange: (value: boolean) => void;
};

export const SelectContext = createContext<ContextProps>({
  selectedValue: undefined,
  onSelect: () => null,
  popperOpen: false,
  valueNode: null,
  onOpenChange: () => null,
});

type Props = {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  updateValueNode: (value?: string) => ReactElement | null;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
  onChange?: (value: string) => void;
};

export const SelectProvider = ({
  value,
  children,
}: {
  children: ReactNode;
  value: ContextProps;
}) => {
  return <SelectContext.Provider value={value}>{children}</SelectContext.Provider>;
};

export const SelectContextProvider = ({
  children,
  value,
  defaultValue,
  updateValueNode,
  defaultOpen = false,
  onOpenChange: onOpenChangeProp,
  onChange,
}: Props) => {
  const [popperOpen, setPopperOpen] = useState<boolean>(defaultOpen);
  const [valueNode, setValueNode] = useState<JSX.Element | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    value ?? defaultValue
  );

  const onSelect = (value: string) => {
    setSelectedValue(value);
    onOpenChange(false);
    if (typeof onChange === "function") {
      onChange(value);
    }
  };

  const onOpenChange = (open: boolean) => {
    setPopperOpen(open);
    if (typeof onOpenChangeProp === "function") {
      onOpenChangeProp(open);
    }
  };

  const selectValue = {
    selectedValue,
    valueNode,
    onSelect,
    popperOpen,
    onOpenChange,
  };

  useEffect(() => {
    const element = updateValueNode(selectedValue);
    setValueNode(element ? <SelectValue {...element.props} /> : null);
  }, [selectedValue, updateValueNode]);

  return <SelectProvider value={selectValue}>{children}</SelectProvider>;
};
