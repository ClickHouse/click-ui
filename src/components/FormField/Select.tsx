import React, { ChangeEvent, HTMLAttributes, ReactNode, useRef, useState } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Icon } from "../Icon/Icon";
import { Error, FormRoot } from "./commonElement";
import { uniqueId } from "lodash";
import styled from "styled-components";
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import { Label } from "./Label";
import {
  SelectContextProvider,
  SelectProvider,
  useOptionVisible,
  useSelect,
} from "./SelectContext";
import Separator from "../Separator/Separator";

interface SelectProps {
  placeholder?: string;
  label: ReactNode;
  children: ReactNode;
  error?: ReactNode;
  search?: boolean;
  noOptionsRenderer?: ReactNode;
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
      & ~ label {
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

const ScrollbarViewport = styled(ScrollAreaViewport)<{ search: boolean }>`
  width: 100%;
  $a: var(--radix-popper-available-height);
  max-height: ${({ search }) =>
    search
      ? "calc(var(--radix-popper-available-height, 0) - 20px)"
      : "var(--radix-popper-available-height, 0)"};
`;

const Scrollbar = styled(ScrollAreaScrollbar)`
  width: 4px;
  padding: 5px 2px;
`;

const ScrollbarThumb = styled(ScrollAreaThumb)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`;
const SearchBarContainer = styled.div`
  width: fill-available;
  display: grid;
  grid-template-columns: 1fr auto;
  ${({ theme }) => `
    border-bottom: 1px solid ${theme.click.genericMenu.button.color.stroke.default};
    padding: ${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x};
    color: ${theme.click.genericMenu.autocomplete.color.searchTerm.default};
    font: ${theme.click.genericMenu.autocomplete.typography.searchTerm.default};
  `}
`;

const SearchBar = styled.input`
  background: transparent;
  border: none;
  width: 100%;
  outline: none;
  min-height: 21px;
  ${({ theme }) => `
    gap: ${theme.click.genericMenu.item.space.gap};
    font: ${theme.click.genericMenu.item.typography.label};
    border-bottom: 1px solid ${theme.click.genericMenu.button.color.stroke.default};
    color: inherit;
    font: inherit;
    &::placeholder {
      color: ${theme.click.genericMenu.autocomplete.color.placeholder.default};
      font: ${theme.click.genericMenu.autocomplete.typography.search.placeholder.default};
    }
  `}
`;

const SearchClose = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
  color: inherit;
`;

const NoDataContainer = styled.div`
  ${({ theme }) => `
    font: ${theme.click.genericMenu.button.typography.label.default}
    padding: ${theme.click.genericMenu.button.space.y} ${theme.click.genericMenu.item.space.x};
    background: ${theme.click.genericMenu.button.color.background.default};
    &:hover {
      font: ${theme.click.genericMenu.button.typography.label.hover};
    }
  `}
`;

const Viewport = ({
  search: showSearch,
  children,
  noOptionsRenderer,
}: {
  search: boolean;
  children: ReactNode;
  noOptionsRenderer?: ReactNode;
}) => {
  const show = useOptionVisible(children);
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const { onSearchTextChange } = useSelect();
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (showSearch) {
      e.preventDefault();
      const value = e.target.value;
      onSearchTextChange(value);
      setSearch(value);
    }
  };

  const clearSearch = () => {
    setSearch("");
    onSearchTextChange("");
  };

  const NoData = (): ReactNode => {
    if (noOptionsRenderer) {
      return noOptionsRenderer;
    }
    return <NoDataContainer>No Options found{` for "${search}"`}</NoDataContainer>;
  };

  return (
    <SelectViewport>
      {showSearch && (
        <SearchBarContainer>
          <SearchBar
            ref={inputRef}
            value={search}
            type="text"
            onChange={onSearchChange}
            placeholder="Type here to filter"
            autoFocus
          />
          {search.length > 0 && (
            <SearchClose onClick={clearSearch}>
              <Icon
                name="cross"
                size="small"
              />
            </SearchClose>
          )}
        </SearchBarContainer>
      )}
      <ScrollbarViewport search={showSearch}>
        {children}
        {!show && <NoData />}
      </ScrollbarViewport>
    </SelectViewport>
  );
};

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
  search = false,
  noOptionsRenderer,
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
            <SelectContextProvider>
              <ScrollbarRoot type="auto">
                <Viewport
                  search={search}
                  noOptionsRenderer={noOptionsRenderer}
                >
                  {children}
                </Viewport>
                <Scrollbar orientation="vertical">
                  <ScrollbarThumb />
                </Scrollbar>
              </ScrollbarRoot>
            </SelectContextProvider>
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

const SelectGroup = styled(RadixSelect.Group)<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
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
  ${({ theme }) => `
    font: ${theme.click.genericMenu.item.typography.sectionHeader.default};
    color: ${theme.click.genericMenu.item.color.text.muted};
    padding: ${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x};
    gap: ${theme.click.genericMenu.item.space.gap};
    border-bottom: 1px solid ${theme.click.genericMenu.item.color.stroke.default};

  `}
`;

const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  ({ children, label, ...props }, forwardedRef) => {
    const selectValue = useSelect();
    const show = useOptionVisible(children, label);

    return (
      <SelectGroup
        show={show}
        {...props}
        ref={forwardedRef}
      >
        <SelectProvider value={{ ...selectValue, groupLabel: label }}>
          <SelectGroupLabel>{label}</SelectGroupLabel>
          {children}
        </SelectProvider>
      </SelectGroup>
    );
  }
);
Group.displayName = "Select.Group";

const SelectItem = styled(RadixSelect.Item)<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  width: 100%;
  align-items: center;
  cursor: default;
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
      background:${theme.click.genericMenu.item.color.background.disabled};
      color:${theme.click.genericMenu.item.color.text.disabled};
      font: ${theme.click.genericMenu.item.typography.label.disabled};
      pointer-events: none;
    }
  `};
`;

interface ItemProps extends RadixSelect.SelectItemProps {
  separator?: boolean;
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, separator, ...props }, forwardedRef) => {
    const selectValue = useSelect();
    const show = useOptionVisible(children, selectValue?.groupLabel);
    return (
      <>
        <SelectItem
          show={show}
          {...props}
          ref={forwardedRef}
        >
          <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        </SelectItem>
        {separator && <Separator size="sm" />}
      </>
    );
  }
);
Item.displayName = "Select.Item";

Select.Group = Group;
Select.Item = Item;

export default Select;
