import { mergeRefs } from "@/utils/mergeRefs";
import {
  FocusEvent,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
import { GenericMenuItem } from "../GenericMenu";
import { Icon, HorizontalDirection, IconName, Separator, IconButton } from "@/components";
import { useCombobox } from "./useCombobox";
import { ComboboxItemProps } from "./types";

import * as RadixPopover from "@radix-ui/react-popover";
import { IconSize } from "../Icon/types";
import { EllipsisContainer } from "../commonElement";

declare type DivProps = HTMLAttributes<HTMLDivElement>;
interface GroupProps extends Omit<DivProps, "value" | "heading"> {
  heading?: ReactNode;
  value?: string;
}

const ComboboxGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  overflow: hidden;
  background: transparent;
  &[aria-selected] {
    outline: none;
  }

  ${({ theme }) => `
    font: ${theme.click.genericMenu.item.typography.sectionHeader.default};
    color: ${theme.click.genericMenu.item.color.text.muted};
  `};
  [cui-combobox-group-heading] {
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${({ theme }) => `
     font: ${theme.click.genericMenu.item.typography.sectionHeader.default};
     color: ${theme.click.genericMenu.item.color.text.muted};
     padding: ${theme.click.genericMenu.sectionHeader.space.top} ${theme.click.genericMenu.item.space.x} ${theme.click.genericMenu.sectionHeader.space.bottom};
     gap: ${theme.click.genericMenu.item.space.gap};
     border-bottom: 1px solid ${theme.click.genericMenu.item.color.stroke.default};
   `}
  }
  &[hidden] {
    display: none;
  }
`;

const ComboboxGroupContent = styled.div`
  width: inherit;
`;

export const ComboboxGroup = forwardRef<HTMLDivElement, GroupProps>(
  ({ children, heading, ...props }, forwardedRef) => {
    useCombobox(); // inorder to refresh the content on search
    return (
      <ComboboxGroupContainer
        {...props}
        ref={mergeRefs([
          forwardedRef,
          node => {
            const hidden = node?.querySelectorAll("[cui-combobox-item]").length === 0;
            if (hidden) {
              node?.setAttribute("hidden", "");
            } else {
              node?.removeAttribute("hidden");
            }
          },
        ])}
      >
        <div cui-combobox-group-heading="">{heading}</div>
        <ComboboxGroupContent>{children}</ComboboxGroupContent>
      </ComboboxGroupContainer>
    );
  }
);

type ComboboxNoDataProps = Omit<HTMLAttributes<HTMLButtonElement>, "children"> & {
  children?: string;
};

const ComboboxNoDataContainer = styled.button<{ $clickable: boolean }>`
  border: none;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;

  &[hidden="true"] {
    display: none;
  }
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

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
  (
    {
      disabled = false,
      children,
      separator,
      onSelect: onSelectProp,
      value = "",
      icon,
      iconDir,
      onMouseOver: onMouseOverProp,
      ...props
    },
    forwardedRef
  ) => {
    const { highlighted, isSelected, onSelect, isHidden, updateHighlighted, showCheck } =
      useCombobox();
    const onSelectValue = () => {
      if (!disabled) {
        onSelect(value);
        if (typeof onSelectProp == "function") {
          onSelectProp(value);
        }
      }
    };
    const onMouseOver = (e: MouseEvent<HTMLDivElement>) => {
      if (onMouseOverProp) {
        onMouseOverProp(e);
      }
      if (!disabled) {
        updateHighlighted(value);
      }
    };

    if (isHidden("item", value)) {
      return null;
    }
    const isChecked = isSelected(value);

    return (
      <>
        <GenericMenuItem
          {...props}
          data-value={value}
          onClick={onSelectValue}
          onMouseOver={onMouseOver}
          ref={forwardedRef}
          data-state={isChecked ? "checked" : "unchecked"}
          data-disabled={disabled ? true : undefined}
          data-highlighted={highlighted == value ? "true" : undefined}
          cui-combobox-item=""
        >
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
          >
            {children}
          </IconWrapper>
          {showCheck && isChecked && (
            <Icon
              name="check"
              size="sm"
            />
          )}
        </GenericMenuItem>
        {separator && <Separator size="sm" />}
      </>
    );
  }
);
export const ComboboxNoData = forwardRef<HTMLButtonElement, ComboboxNoDataProps>(
  ({ children, onClick: onClickProp, ...props }, ref): ReactNode => {
    const { search, onSelect, isHidden, onCreateOption } = useCombobox();
    if (isHidden("empty")) {
      return null;
    }
    const clickable = typeof onCreateOption === "function";
    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (typeof onClickProp === "function") {
        onClickProp(e);
      }
      if (clickable && !e.defaultPrevented) {
        onCreateOption(search);
        onSelect(search);
      }
    };
    return (
      <ComboboxNoDataContainer
        onClick={onClick}
        $clickable={clickable}
        ref={ref}
        {...props}
      >
        {typeof children === "string"
          ? children.replaceAll("{search}", search)
          : `
          No Options found${search.length > 0 ? ` for "${search}" ` : ""}
        `}
      </ComboboxNoDataContainer>
    );
  }
);

const LabelContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  gap: ${({ theme }) => theme.click.sidebar.navigation.item.default.space.gap};
`;

export const IconWrapper = ({
  icon,
  iconDir = "start",
  size = "sm",
  width,
  height,
  children,
}: {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  children: ReactNode;
  size?: IconSize;
  width?: number | string;
  height?: number | string;
}) => {
  return (
    <LabelContainer>
      {icon && iconDir === "start" && (
        <Icon
          name={icon}
          size={size}
          width={width}
          height={height}
        />
      )}
      <EllipsisContainer>{children}</EllipsisContainer>
      {icon && iconDir === "end" && (
        <Icon
          name={icon}
          size={size}
          width={width}
          height={height}
        />
      )}
    </LabelContainer>
  );
};
export const ComboboxTrigger = styled(RadixPopover.Trigger)<{ $error: boolean }>`
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

export const PopoverContent = styled(RadixPopover.Content)`
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
`;

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
export const ComboboxContent = forwardRef<HTMLDivElement, ContentProps>(
  ({ showSearch = true, onFocus: onFocusProp, children, ...props }, ref) => {
    const {
      updateChildren,
      search,
      updateSearch,
      onKeyDown: onKeyDownContext,
    } = useCombobox();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      updateChildren(children);
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
      <RadixPopover.Portal>
        <PopoverContent
          sideOffset={5}
          onFocus={onFocus}
          ref={ref}
          {...props}
        >
          <SelectList onKeyDown={onKeyDownContext}>
            {showSearch && (
              <SearchBarContainer>
                <SearchBar
                  ref={inputRef}
                  value={search}
                  onChange={e => updateSearch(e.target.value)}
                  data-testid="combobox-search-input"
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
        </PopoverContent>
      </RadixPopover.Portal>
    );
  }
);
