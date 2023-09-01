import {
  createContext,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

const SelectValueContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: default;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &[aria-selected] {
    outline: none;
  }

  ${({ theme }) => `
    gap: ${theme.click.field.space.gap};
    font: ${theme.click.field.typography.fieldText.default};
    color: ${theme.click.field.color.text.default};
    &[data-selected="true"] {
      font: ${theme.click.field.typography.fieldText.hover};
      color:${theme.click.field.color.text.hover};
      cursor: pointer;
    }
    &[data-state="checked"] {
      color:${theme.click.field.color.text.active};
      font: ${theme.click.field.typography.fieldText.active};
    }
    &[data-disabled] {
      color:${theme.click.field.color.text.disabled};
      font: ${theme.click.field.typography.fieldText.disabled};
      pointer-events: none;
    }
  `};
`;
const SelectValue = (props: HTMLAttributes<HTMLDivElement>) => (
  <SelectValueContainer {...props} />
);

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
