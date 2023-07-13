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
} from "./commonElement";
import { uniqueId } from "lodash";
import styled from "styled-components";
import { CustomMatcher } from "@radix-ui/react-form";

interface SelectProps {
  placeholder?: ReactNode;
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
      & > :not(.cui-select-icon) {
        color:${theme.click.field.color.text.error} !important;
      }`
      : ""}
`;
const SelectContent = styled(RadixSelect.Content)`
  ${MenuContent};
  .cui-select-scroll-button {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    height: 25px;
    ${({ theme }) => `
      background-color: inherit;
      color: ${theme.click.contextMenu.color.text.default};
      &:hover {
        color: ${theme.click.contextMenu.color.text.hover};
        background: ${theme.click.contextMenu.color.background.hover};
      }
    `}
    cursor: default;
  }
  &[data-state="open"] ~ .cui-label,
  &:focus ~ .cui-label {
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
        <SelectTrigger
          className='cui-select-trigger'
          id={id}
          error={typeof error !== "undefined"}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className='cui-select-right-icon'>
            <Icon name='sort' />
          </RadixSelect.Icon>
        </SelectTrigger>
        <RadixSelect.Portal>
          <SelectContent
            className='cui-select-content'
            position='popper'
            sideOffset={5}
          >
            <RadixSelect.ScrollUpButton className='cui-select-scroll-up cui-select-scroll-button'>
              <Icon name='chevron-up' />
            </RadixSelect.ScrollUpButton>
            <SelectViewport className='cui-select-viewport'>
              {children}
            </SelectViewport>
            <RadixSelect.ScrollDownButton className='cui-select-scroll-down cui-select-scroll-button'>
              <Icon name='chevron-down' />
            </RadixSelect.ScrollDownButton>
          </SelectContent>
        </RadixSelect.Portal>
      </SelectRoot>
      {label && (
        <Label
          className='cui-label'
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
  ({ children, label, className, ...props }, forwardedRef) => {
    return (
      <SelectGroup
        className={`cui-select-group ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <SelectGroupLabel className='cui-select-group-label'>
          {label}
        </SelectGroupLabel>
        {children}
      </SelectGroup>
    );
  }
);
Group.displayName = "Group";

const SelectSeparator = styled(RadixSelect.Separator)`
  ${ItemSeparator};
`;
const Separator = () => <SelectSeparator className='cui-select-separator' />;
Separator.displayName = "Separator";

const SelectItem = styled(RadixSelect.Item)`
  ${OptionContainer};
`;

const Item = React.forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectItem
        className={`cui-select-item ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </SelectItem>
    );
  }
);
Item.displayName = "Item";

Select.Group = Group;
Select.Separator = Separator;
Select.Item = Item;

export default Select;
