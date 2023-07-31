import React, { HTMLAttributes, ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Icon } from "../Icon/Icon";
import { Error, FormRoot, ItemSeparator } from "./commonElement";
import { uniqueId } from "lodash";
import styled from "styled-components";
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import { Label } from "./Label";

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  span:first-of-type {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${({ theme, error }) => `
    border-radius: ${theme.click.field.radii.all};
    padding: ${theme.click.field.space.y} ${theme.click.field.space.x};
    gap: ${theme.click.field.space.gap};
    font: ${theme.click.field.typography.fieldText.default};
    color: ${theme.click.field.color.text.default};
    border: 1px solid ${theme.click.field.color.stroke.default};
    background: ${theme.click.field.color.background.default};
    &:hover {
      border: 1px solid ${theme.click.field.color.stroke.hover};
      background: ${theme.click.field.color.background.hover};
      color: ${theme.click.field.color.text.hover};
    }
    ${
      error
        ? `
      font: ${theme.click.field.typography.fieldText.error};
      border: 1px solid ${theme.click.field.color.stroke.error};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.error};
      &:hover {
      border: 1px solid ${theme.click.field.color.stroke.error};
      color: ${theme.click.field.color.text.error};
      }
    `
        : `
    &:focus,
    &[data-state="open"] {
      font: ${theme.click.field.typography.fieldText.active};
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.active};
      &~ label {
      color: ${theme.click.field.color.label.active};
      font: ${theme.click.field.typography.label.active};;
  }
    }
    `
    };
    &:disabled {
      font: ${theme.click.field.typography.fieldText.disabled};
      border: 1px solid ${theme.click.field.color.stroke.disabled};
      background: ${theme.click.field.color.background.disabled};
      color: ${theme.click.field.color.text.disabled};
    }
  `}
`;
const SelectContent = styled(RadixSelect.Content)`
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  border-radius: 0.25rem;

  ${({ theme }) => `
    border: 1px solid ${theme.click.genericMenu.item.color.stroke.default};
    background: ${theme.click.genericMenu.item.color.background.default};
    box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.1),
      0px 1px 2px 0px rgba(16, 24, 40, 0.06);
    border-radius: 0.25rem;
  `}

  overflow: hidden;
  display: flex;
  padding: 0.5rem 0rem;
  align-items: flex-start;
  gap: 0.625rem;
`;

const SelectViewport = styled(RadixSelect.Viewport)`
  width: 100%;
`;
const ScrollbarRoot = styled(ScrollArea)`
  width: 100%;
  height: 100%;
`;

const ScrollbarViewport = styled(ScrollAreaViewport)`
  width: 100%;
  max-height: var(--radix-popper-available-height);
`;

const Scrollbar = styled(ScrollAreaScrollbar)`
  width: 4px;
  padding: 5px 2px;
`;

const ScrollbarThumb = styled(ScrollAreaThumb)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
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
          id={id}
          error={typeof error !== "undefined"}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <Icon
              name="sort"
              size="small"
            />
          </RadixSelect.Icon>
        </SelectTrigger>
        <RadixSelect.Portal>
          <SelectContent
            position="popper"
            sideOffset={5}
          >
            <ScrollbarRoot type="auto">
              <SelectViewport>
                <ScrollbarViewport>{children}</ScrollbarViewport>
              </SelectViewport>
              <Scrollbar orientation="vertical">
                <ScrollbarThumb />
              </Scrollbar>
            </ScrollbarRoot>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: var(--radix-select-trigger-width);
  padding: 0;
  gap: 0.5rem;
  &[aria-selected] {
    outline: none;
  }
  & > span {
    max-width: calc(var(--radix-select-trigger-width) - 24px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${({ theme }) => `
    font: ${theme.click.genericMenu.item.typography.label.default};
    background: ${theme.click.genericMenu.item.color.background.default};
    color: ${theme.click.genericMenu.item.color.text.default};
    &[data-highlighted] {
      font: ${theme.click.genericMenu.item.typography.label.hover};
      background: ${theme.click.genericMenu.item.color.background.hover};
      color:${theme.click.genericMenu.item.color.text.hover};
    }
    &[data-state="checked"] {
      background:${theme.click.genericMenu.item.color.background.active};
      color:${theme.click.genericMenu.item.color.text.active};
      font: ${theme.click.genericMenu.item.typography.label.active};
    }
    &[data-disabled] {
      background:${theme.click.genericMenu.item.color.background.disabled};
      color:${theme.click.genericMenu.item.color.text.disabled};
      font: ${theme.click.genericMenu.item.typography.label.disabled};
      pointer-events: none;
    }
  `};
`;

const SelectGroupLabel = styled(RadixSelect.Label)`
  display: flex;
  flex-direction: column;
  font: ${({ theme }) => theme.click.genericMenu.item.typography.sectionHeader.default};
  color: ${({ theme }) => theme.click.genericMenu.item.color.text.muted};
  ${({ theme }) => `
    padding: ${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x};
    gap: ${theme.click.genericMenu.item.space.gap};
  `}
`;

const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  ({ children, label, ...props }, forwardedRef) => {
    return (
      <SelectGroup
        {...props}
        ref={forwardedRef}
      >
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
  display: flex;
  width: 100%;
  align-items: center;
  &[aria-selected] {
    outline: none;
  }
  & > span {
    max-width: calc(var(--radix-select-trigger-width) - 24px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${({ theme }) => `
    padding: ${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x};
    gap: ${theme.click.genericMenu.item.space.gap};
    font: ${theme.click.genericMenu.item.typography.label.default};
    background: ${theme.click.genericMenu.item.color.background.default};
    color: ${theme.click.genericMenu.item.color.text.default};
    &[data-highlighted] {
      font: ${theme.click.genericMenu.item.typography.label.hover};
      background: ${theme.click.genericMenu.item.color.background.hover};
      color:${theme.click.genericMenu.item.color.text.hover};
      cursor: pointer;
    }
    &[data-state="checked"] {
      background:${theme.click.genericMenu.item.color.background.active};
      color:${theme.click.genericMenu.item.color.text.active};
      font: ${theme.click.genericMenu.item.typography.label.active};
    }
    &[data-disabled] {
      background:${theme.click.genericMenu.item.color.background.default};
      color:${theme.click.genericMenu.item.color.text.disabled};
      font: ${theme.click.genericMenu.item.typography.label.disabled};
      pointer-events: none;
    }
  `};
`;

const Item = React.forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectItem
        {...props}
        ref={forwardedRef}
      >
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
