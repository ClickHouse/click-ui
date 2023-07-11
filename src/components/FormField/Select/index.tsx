import React, { HTMLAttributes, ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Icon } from "../../Icon/Icon";
import {
  Error,
  FormElement,
  FormRoot,
  ItemSeparator,
  Label,
  OptionContainer,
} from "../commonElement";
import { uniqueId } from "lodash";
import styled from "styled-components";

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
  ${(props) =>
    props.error
      ? `
      border: 1px solid var(--click-field-color-stroke-error, #C10000) !important;
      background: var(--click-field-color-background-active, #FFF) !important;
      & > :not(.cui-select-icon) {
        color: var(--click-field-color-text-error, #C10000) !important;
      }`
      : ""}
`;
const SelectContent = styled(RadixSelect.Content)`
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  border-radius: 0.25rem;
  border: 1px solid var(--click-context-menu-stroke-default, #e6e7e9);
  background: var(--click-context-menu-color-background-default, #fff);
  box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.1),
    0px 1px 2px 0px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  display: flex;
  padding: 0.5rem 0rem;
  align-items: flex-start;
  gap: 0.625rem;
  .cui-select-scroll-button {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    height: 25px;
    background-color: white;
    color: var(--click-context-menu-color-text-default, #161517);
    &:hover {
      color: var(--click-context-menu-color-text-active, #161517);
    }
    cursor: default;
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
      {error && <Error>{error}</Error>}
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
  color: var(--click-context-menu-color-text-muted, #696e79);
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
