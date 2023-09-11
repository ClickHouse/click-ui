import {
  FocusEvent,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Icon, IconButton, Label } from "@/components";
import { Error, FormElementContainer, FormRoot } from "../commonElement";
import styled from "styled-components";
import {
  ComboboxContent,
  ComboboxGroup,
  ComboboxItem,
  ComboboxNoData,
  ComboboxTrigger,
  IconWrapper,
} from "../Combobox/ComboBoxElements";
import { useCombobox } from "../Combobox/useCombobox";
import { ComboboxProvider } from "../Combobox/ComboboxProvider";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir"> {
  label?: ReactNode;
  children?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  isFormControl?: boolean;
  value?: string;
  dir?: "start" | "end";
  orientation?: "horizontal" | "vertical";
}

export type SelectProps = RadixPopover.PopoverProps & Props;

const SelectPopoverRoot = styled(RadixPopover.Root)`
  width: 100%;
`;

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

export const Select = ({
  label,
  children,
  orientation,
  dir,
  disabled,
  id,
  error,
  value: valueProp,
  defaultValue,
  onChange,
  open: openProp,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  name,
  required,
  isFormControl,
  ...props
}: SelectProps) => {
  const defaultId = useId();
  const [open, setOpen] = useState(defaultOpen ?? openProp);
  const hasError = !!error && typeof error !== "undefined";

  const onSelect = (value: Array<string>) => {
    if (typeof onChange === "function") {
      onChange(value[0]);
    }
    onOpenChange(false);
  };

  const onOpenChange = (open: boolean) => {
    if (typeof onOpenChangeProp === "function") {
      onOpenChangeProp(open);
    }
    setOpen(open);
  };

  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      {...props}
    >
      <FormElementContainer>
        {isFormControl && (
          <input
            type="hidden"
            name={name}
            required={required}
          />
        )}
        <SelectPopoverRoot
          open={openProp ?? open}
          onOpenChange={onOpenChange}
        >
          <ComboboxProvider
            value={valueProp ?? defaultValue}
            onSelect={onSelect}
            id={id ?? defaultId}
            hasError={hasError}
            disabled={disabled}
          >
            {children}
          </ComboboxProvider>
        </SelectPopoverRoot>
        {hasError && <Error>{error}</Error>}
      </FormElementContainer>
      {label && (
        <Label
          htmlFor={id ?? defaultId}
          disabled={disabled}
          error={hasError}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

interface TriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  placeholder?: string;
}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ placeholder = "Select an option", ...props }, ref) => {
    const { disabled, id, hasError, selectedValueNodeProps } = useCombobox();
    return (
      <ComboboxTrigger
        ref={ref}
        id={id}
        $error={hasError}
        disabled={disabled}
        cui-select-trigger=""
        {...props}
      >
        {selectedValueNodeProps.length === 0 ? (
          <SelectValueContainer>{placeholder}</SelectValueContainer>
        ) : (
          <SelectValueContainer>
            <IconWrapper
              icon={selectedValueNodeProps[0].icon}
              iconDir={selectedValueNodeProps[0].iconDir}
            >
              {selectedValueNodeProps[0].children}
            </IconWrapper>
          </SelectValueContainer>
        )}
        <Icon
          name="sort"
          size="sm"
        />
      </ComboboxTrigger>
    );
  }
);

Trigger.displayName = "Select.Trigger";
Select.Trigger = Trigger;

const SearchBarContainer = styled.div`
  width: auto;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${({ theme }) => `
    border-bottom: 1px solid ${theme.click.genericMenu.button.color.stroke.default};
    padding: ${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x};
    color: ${theme.click.genericMenu.autocomplete.color.searchTerm.default};
    font: ${theme.click.genericMenu.autocomplete.typography.search.term.default};
  `}
`;

const SearchBar = styled.input`
  background: transparent;
  border: none;
  width: 100%;
  outline: none;
  ${({ theme }) => `
    min-height: 21px;
    padding-right: 24px;
    gap: ${theme.click.genericMenu.item.space.gap};
    font: ${theme.click.genericMenu.autocomplete.typography.search.term.default};
    border-bottom: 2px solid ${theme.click.genericMenu.button.color.stroke.default};
    color: ${theme.click.genericMenu.autocomplete.color.searchTerm.default};
    &::placeholder {
      color: ${theme.click.genericMenu.autocomplete.color.placeholder.default};
      font: ${theme.click.genericMenu.autocomplete.typography.search.placeholder.default};
    }
  `}
`;

const SearchClose = styled.button<{ $showClose: boolean }>`
  position: absolute;
  ${({ theme }) => `
    top: ${theme.click.genericMenu.item.space.y};
    right: ${theme.click.genericMenu.item.space.x};
  `}
  visibility: ${({ $showClose }) => ($showClose ? "visible" : "hidden")};
`;

const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  max-height: var(--radix-popover-content-available-height);
`;
const SelectContent = styled.div`
  width: inherit;
  overflow: overlay;
  flex: 1;
`;
interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  showSearch?: boolean;
}
const Content = ({
  showSearch = true,
  onFocus: onFocusProp,
  children,
  ...props
}: ContentProps) => {
  const {
    updateChildren,
    search,
    updateSearch,
    onKeyDown: onKeyDownContext,
  } = useCombobox();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateChildren(children, "Select");
  }, [children, updateChildren]);

  const onFocus = (e: FocusEvent<HTMLDivElement, Element>) => {
    inputRef.current?.focus();
    if (onFocusProp) {
      onFocusProp(e);
    }
  };

  const clearSearch = () => {
    updateSearch("");
  };

  return (
    <>
      <RadixPopover.Portal>
        <ComboboxContent
          sideOffset={5}
          onFocus={onFocus}
          {...props}
        >
          <SelectList onKeyDown={onKeyDownContext}>
            {showSearch && (
              <SearchBarContainer>
                <SearchBar
                  ref={inputRef}
                  value={search}
                  onChange={e => updateSearch(e.target.value)}
                  data-testid="select-search-input"
                  onKeyDown={onKeyDownContext}
                />
                <SearchClose
                  as={IconButton}
                  icon="cross"
                  onClick={clearSearch}
                  data-testid="select-search-close"
                  $showClose={search.length > 0}
                  size="xs"
                />
              </SearchBarContainer>
            )}
            <SelectContent>{children}</SelectContent>
          </SelectList>
        </ComboboxContent>
      </RadixPopover.Portal>
    </>
  );
};

Content.displayName = "Select.Content";
Select.Content = Content;

ComboboxGroup.displayName = "Select.Group";
Select.Group = ComboboxGroup;

ComboboxItem.displayName = "Select.Item";
Select.Item = ComboboxItem;

ComboboxNoData.displayName = "SelectNoData";
Select.NoData = ComboboxNoData;
