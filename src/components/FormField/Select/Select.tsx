import React, { ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Icon } from "../../Icon/Icon";
import {
  FormElement,
  FormRoot,
  Label,
  OptionContainer,
} from "../commonElement";
import { uniqueId } from "lodash";
import styled from "styled-components";

interface Props {
  placeholder?: ReactNode;
  label: ReactNode;
  children: ReactNode;
  id?: string;
}

const SelectRoot = styled(RadixSelect.Root)`
  width: 100%;
`;
const SelectTrigger = styled(RadixSelect.Trigger)`
  width: 100%;
  ${FormElement};
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
  id,
  ...props
}: Props) => {
  id = id ?? uniqueId("select");
  return (
    <FormRoot {...props}>
      {label && (
        <Label className='label' htmlFor={id}>
          {label}
        </Label>
      )}
      <SelectRoot>
        <SelectTrigger className='cui-select-trigger' id={id}>
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className='SelectIcon'>
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
            <SelectViewport className='SelectViewport'>
              {children}
            </SelectViewport>
            <RadixSelect.ScrollDownButton className='cui-select-scroll-down cui-select-scroll-button'>
              <Icon name='chevron-down' />
            </RadixSelect.ScrollDownButton>
          </SelectContent>
        </RadixSelect.Portal>
      </SelectRoot>
    </FormRoot>
  );
};
interface GroupProps extends RadixSelect.SelectGroupProps {
  label: ReactNode;
}
const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  ({ children, label, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Group {...props} ref={forwardedRef}>
        <RadixSelect.Label className='SelectLabel'>{label}</RadixSelect.Label>
        {children}
      </RadixSelect.Group>
    );
  }
);
Group.displayName = "Group";

const Separator = () => <RadixSelect.Separator className='SelectSeparator' />;
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
