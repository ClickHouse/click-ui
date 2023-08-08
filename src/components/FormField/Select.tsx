import {
  Children,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  forwardRef,
  useId,
  useRef,
  useState,
} from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Command, useCommandState } from "cmdk";
import { Icon } from "../Icon/Icon";
import { Error, FormRoot } from "./commonElement";
import styled from "styled-components";
import { Label } from "./Label";
import { SelectContextProvider } from "./SelectContext";
import Separator from "../Separator/Separator";
import { useSelect } from "@/components/FormField/useSelect";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  placeholder?: string;
  label?: ReactNode;
  children: ReactNode;
  error?: ReactNode;
  showSearch?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  isFormControl?: boolean;
  value?: string;
}

declare type DivProps = HTMLAttributes<HTMLDivElement>;
export type SelectProps = RadixPopover.PopoverProps & Props;

const SelectPopoverRoot = styled(RadixPopover.Root)`
  width: 100%;
`;

const SelectTrigger = styled(RadixPopover.Trigger)<{ $error: boolean }>`
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

  ${({ theme, $error }) => `
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
      $error
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

const SelectContent = styled(RadixPopover.Content)`
  width: var(--radix-popover-trigger-width);
  max-height: var(--radix-popover-content-available-height);
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
  [cmdk-root] {
    width: 100%;
  }
`;

const SearchBarContainer = styled.div<{ $showSearch: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  ${({ theme }) => `
    border-bottom: 1px solid ${theme.click.genericMenu.button.color.stroke.default};
    padding: ${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x};
    color: ${theme.click.genericMenu.autocomplete.color.searchTerm.default};
    font: ${theme.click.genericMenu.autocomplete.typography.search.term.default};
  `}
  ${({ $showSearch }) =>
    $showSearch
      ? undefined
      : `
    border: none;
    height: 0;
    padding:0;
  `}
`;

const SearchBar = styled(Command.Input)<{ $showSearch: boolean }>`
  background: transparent;
  border: none;
  width: 100%;
  outline: none;
  ${({ theme, $showSearch }) => `
    min-height: ${$showSearch ? "21px" : "0"};
    gap: ${theme.click.genericMenu.item.space.gap};
    font: ${theme.click.genericMenu.item.typography.label};
    border-bottom: 1px solid ${theme.click.genericMenu.button.color.stroke.default};
    color: inherit;
    font: inherit;
    &::placeholder {
      color: ${theme.click.genericMenu.autocomplete.color.placeholder.default};
      font: ${theme.click.genericMenu.autocomplete.typography.search.placeholder.default};
    }
    ${
      $showSearch
        ? undefined
        : `
    height: 0;
    opacity: 0;
    `
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

const NoDataContainer = styled.button<{ $clickable: boolean }>`
  border: none;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  ${({ theme, $clickable }) => `
    font: ${theme.click.genericMenu.button.typography.label.default}
    padding: ${theme.click.genericMenu.button.space.y} ${
    theme.click.genericMenu.item.space.x
  };
    background: ${theme.click.genericMenu.button.color.background.default};
    color: ${theme.click.genericMenu.button.color.label.default};
    &:hover {
      font: ${theme.click.genericMenu.button.typography.label.hover};
    }
    cursor: ${$clickable ? "pointer" : "default"}
  `}
`;
declare type State = {
  search: string;
  value: string;
  filtered: {
    count: number;
    items: Map<string, number>;
    groups: Set<string>;
  };
};

interface SelectRootProps {
  open?: boolean;
  id: string;
  placeholder: string;
  disabled?: boolean;
  children: ReactNode;
  hasError: boolean;
  showSearch?: boolean;
}

const SelectRoot = ({
  open,
  id,
  placeholder,
  disabled,
  children,
  hasError,
  showSearch = false,
}: SelectRootProps) => {
  const { valueNode, popperOpen, onOpenChange } = useSelect();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const onFocus = () => {
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <SelectPopoverRoot
      open={open ?? popperOpen}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger
        id={id}
        $error={hasError}
        disabled={disabled}
      >
        {valueNode ?? placeholder}
        <Icon
          name="sort"
          size="small"
        />
      </SelectTrigger>
      <RadixPopover.Portal>
        <SelectContent
          sideOffset={5}
          onFocus={onFocus}
        >
          <Command
            onValueChange={setSearch}
            loop
          >
            <SearchBarContainer $showSearch={showSearch}>
              <SearchBar
                ref={inputRef}
                value={search}
                onValueChange={setSearch}
                $showSearch={showSearch}
                data-testid="select-search-input"
              />
              {search.length > 0 && (
                <SearchClose
                  onClick={clearSearch}
                  data-testid="select-search-close"
                >
                  <Icon
                    name="cross"
                    size="small"
                  />
                </SearchClose>
              )}
            </SearchBarContainer>
            <Command.List>{children}</Command.List>
          </Command>
        </SelectContent>
      </RadixPopover.Portal>
    </SelectPopoverRoot>
  );
};

const findChildWithSpecificProp =
  (children: ReactNode): ((value?: string) => ReactElement | null) =>
  (value?: string): ReactElement | null => {
    if (!value) {
      return null;
    }

    let foundChild: ReactNode | null = null;

    Children.forEach(children, (child: ReactNode) => {
      const childProps =
        child && typeof child === "object" && "props" in child ? child.props : null;
      if (childProps?.value === value) {
        foundChild = child;
        return; // Break the loop if the child is found
      }

      if (childProps?.children) {
        const nestedChild = findChildWithSpecificProp(childProps.children)(value);
        if (nestedChild) {
          foundChild = nestedChild;
          return; // Break the loop if the nested child is found
        }
      }
    });

    return foundChild;
  };

export const Select = ({
  placeholder = "Select an option",
  label,
  children,
  disabled,
  id,
  error,
  value,
  defaultValue,
  onChange,
  open,
  defaultOpen,
  onOpenChange,
  name,
  required,
  isFormControl,
  showSearch = false,
  ...props
}: SelectProps) => {
  const defaultId = useId();
  return (
    <FormRoot {...props}>
      {error && <Error>{error}</Error>}
      {isFormControl && (
        <input
          type="hidden"
          name={name}
          required={required}
        />
      )}
      <SelectContextProvider
        value={value}
        defaultValue={defaultValue}
        updateValueNode={findChildWithSpecificProp(children)}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        onChange={onChange}
      >
        <SelectRoot
          hasError={typeof error !== "undefined"}
          open={open}
          id={id ?? defaultId}
          placeholder={placeholder}
          disabled={disabled}
          showSearch={showSearch}
        >
          {children}
        </SelectRoot>
      </SelectContextProvider>
      {label && (
        <Label
          htmlFor={id ?? defaultId}
          disabled={disabled}
          error={typeof error !== "undefined"}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};
interface GroupProps extends Omit<DivProps, "value" | "heading"> {
  heading?: ReactNode;
  value?: string;
}

const SelectGroup = styled(Command.Group)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: var(--radix-popover-trigger-width);
  padding: 0;
  gap: 0.5rem;
  &[aria-selected] {
    outline: none;
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
  [cmdk-group-heading] {
    display: flex;
    width: 100%;
    flex-direction: column;
    max-width: calc(var(--radix-popover-trigger-width) - 24px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${({ theme }) => `
     font: ${theme.click.genericMenu.item.typography.sectionHeader.default};
     color: ${theme.click.genericMenu.item.color.text.muted};
     padding: ${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x};
     gap: ${theme.click.genericMenu.item.space.gap};
     border-bottom: 1px solid ${theme.click.genericMenu.item.color.stroke.default};
   `}
  }
  [cmdk-group-items] {
    width: 100%;
  }
  &[hidden] {
    display: none;
    [cmdk-group-heading] {
      display: none;
    }
  }
`;

const Group = forwardRef<HTMLDivElement, GroupProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectGroup
        {...props}
        ref={forwardedRef}
      >
        {children}
      </SelectGroup>
    );
  }
);
Group.displayName = "Select.Group";

const SelectItem = styled(Command.Item)`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: default;
  max-width: calc(var(--radix-popover-trigger-width) - 24px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &[aria-selected] {
    outline: none;
  }

  ${({ theme }) => `
    padding: ${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x};
    gap: ${theme.click.genericMenu.item.space.gap};
    font: ${theme.click.genericMenu.item.typography.label.default};
    background: ${theme.click.genericMenu.item.color.background.default};
    color: ${theme.click.genericMenu.item.color.text.default};
    &[data-selected="true"] {
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

interface ItemProps extends Omit<DivProps, "disabled" | "onSelect" | "value"> {
  separator?: boolean;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  value?: string;
}

const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    { children, separator, onSelect: onSelectProp, value = "", ...props },
    forwardedRef
  ) => {
    const { selectedValue, onSelect } = useSelect();
    const onSelectValue = () => {
      onSelect(value);
      if (typeof onSelectProp == "function") {
        onSelectProp(value);
      }
    };
    return (
      <>
        <SelectItem
          {...props}
          onSelect={onSelectValue}
          ref={forwardedRef}
          data-state={selectedValue == value ? "checked" : "unchecked"}
        >
          {children}
        </SelectItem>
        {separator && <Separator size="sm" />}
      </>
    );
  }
);
Item.displayName = "Select.Item";

Select.Group = Group;
Select.Item = Item;

type SelectNoDataProps = Omit<HTMLAttributes<HTMLButtonElement>, "children"> & {
  children?: (props: { search: string }) => ReactNode;
};
const SelectNoData = ({ children, onClick, ...props }: SelectNoDataProps): ReactNode => {
  const clickable = typeof onClick === "function";
  const search = useCommandState((state: State) => state.search);
  const { onOpenChange } = useSelect();
  const onSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (clickable) {
      onClick(e);
      onOpenChange(false);
    }
  };
  return (
    <Command.Empty>
      <NoDataContainer
        onClick={onSelect}
        $clickable={clickable}
        {...props}
      >
        {typeof children === "function"
          ? children({ search })
          : `
          No Options found${search.length > 0 ? ` for "${search}" ` : ""}
        `}
      </NoDataContainer>
    </Command.Empty>
  );
};

SelectNoData.displayName = "SelectNoData";
Select.NoData = SelectNoData;
