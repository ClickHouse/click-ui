import React, { HTMLAttributes, ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Icon } from "../Icon/Icon";
import {
  Error,
  FormElement,
  FormRoot,
  ItemSeparator,
  Label,
  MenuContent,
  OptionContainer,
  ScrollButton,
} from "./commonElement";
import { uniqueId } from "lodash";
import styled from "styled-components";

interface SelectProps {
  placeholder?: string;
  label: ReactNode;
  children: ReactNode;
  error?: ReactNode;
}

type Props = RadixSelect.SelectProps &
  Omit<HTMLAttributes<HTMLDivElement>, "children" | "placeholder"> &
  SelectProps;

const SelectRoot = styled(RadixSelect.Root)`
  width: 100%;
`;
const SelectTrigger = styled(RadixSelect.Trigger)<{ error: boolean }>`
  width: 100%;
  ${FormElement};
  ${({ error, theme }) =>
    error
      ? `
      border: 1px solid ${theme.click.field.color.stroke.error} !important;
      background: ${theme.click.field.color.background.active} !important;
       color:${theme.click.field.color.text.error} !important;`
      : ""}
`;
const SelectContent = styled(RadixSelect.Content)`
  ${MenuContent};
  &[data-state="open"] ~ label,
  &:focus ~ label {
    ${({ theme }) => `
      color: ${theme.click.field.color.label.active};
      font: ${theme.click.field.typography.label.active};
    `};
  }
`;

const SelectViewport = styled(RadixSelect.Viewport)`
  width: 100%;
`;

const Select = ({
  placeholder = "Select an option",
  label,
  children,
  disabled,
  id,
  error,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  dir,
  name,
  required,
  ...props
}: Props) => {
  id = id ?? uniqueId("select");
  return (
    <FormRoot {...props}>
      {error && <Error>{error}</Error>}
      <SelectRoot
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        dir={dir}
        name={name}
        required={required}
        disabled={disabled}
      >
        <SelectTrigger id={id} error={typeof error !== "undefined"}>
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <Icon name='sort' />
          </RadixSelect.Icon>
        </SelectTrigger>
        <RadixSelect.Portal>
          <SelectContent position='popper' sideOffset={5}>
            <RadixSelect.ScrollUpButton>
              <ScrollButton>
                <Icon name='chevron-up' />
              </ScrollButton>
            </RadixSelect.ScrollUpButton>
            <SelectViewport>{children}</SelectViewport>
            <RadixSelect.ScrollDownButton>
              <ScrollButton>
                <Icon name='chevron-down' />
              </ScrollButton>
            </RadixSelect.ScrollDownButton>
          </SelectContent>
        </RadixSelect.Portal>
      </SelectRoot>
      {label && (
        <Label
          htmlFor={id}
          disabled={disabled}
          error={typeof error !== "undefined"}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};
interface GroupProps extends RadixSelect.SelectGroupProps {
  label?: ReactNode;
}

const SelectGroup = styled(RadixSelect.Group)`
  ${OptionContainer};
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  justify-content: center;
`;

const SelectGroupLabel = styled(RadixSelect.Label)`
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  color: ${({ theme }) => theme.click.contextMenu.color.text.muted};
  padding: 0 0.75rem;
`;

const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  ({ children, label, ...props }, forwardedRef) => {
    return (
      <SelectGroup {...props} ref={forwardedRef}>
        <SelectGroupLabel>{label}</SelectGroupLabel>
        {children}
      </SelectGroup>
    );
  }
);
Group.displayName = "Select.Group";

const SelectSeparator = styled(RadixSelect.Separator)`
  ${ItemSeparator};
`;
const Separator = (props: RadixSelect.SelectSeparatorProps) => (
  <SelectSeparator {...props} />
);
Separator.displayName = "Select.Separator";

const SelectItem = styled(RadixSelect.Item)`
  ${OptionContainer};
`;

const Item = React.forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectItem {...props} ref={forwardedRef}>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </SelectItem>
    );
  }
);
Item.displayName = "Select.Item";

Select.Group = Group;
Select.Separator = Separator;
Select.Item = Item;

export default Select;
