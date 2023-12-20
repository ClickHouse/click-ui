import {
  Children,
  FunctionComponent,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Portal, PopoverProps, Content, Root, Trigger } from "@radix-ui/react-popover";
import {
  HorizontalDirection,
  Icon,
  IconName,
  SearchField,
  Separator,
} from "@/components";
import styled from "styled-components";
import { GenericMenuItem } from "../GenericMenu";
import { useOption, useSearch } from "./useOption";
import IconWrapper from "../IconWrapper/IconWrapper";
import { OptionContext } from "./OptionContext";
import { mergeRefs } from "@/utils/mergeRefs";
import { getTextFromNodes } from "@/lib/getTextFromNodes";
import AutoCompleteOptionList from "./AutoCompleteOptionList";

type DivProps = HTMLAttributes<HTMLDivElement>;
interface SelectItemComponentProps
  extends Omit<DivProps, "disabled" | "onSelect" | "value" | "children"> {
  separator?: boolean;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  value: string;
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

type SelectItemChildren = {
  children: ReactNode;
  label?: never;
};

type SelectItemLabel = {
  children?: never;
  label: ReactNode;
};
export interface SelectGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "heading"> {
  heading: ReactNode;
  value?: never;
  onSelect?: never;
}
export interface SelectOptionItem extends Omit<SelectItemProps, "children" | "label"> {
  heading?: never;
  label: ReactNode;
  [key: `data-${string}`]: string;
}

interface SelectGroupOptionItem extends Omit<SelectGroupProps, "children" | "label"> {
  options: Array<SelectOptionItem>;
  label?: never;
  [key: `data-${string}`]: string;
}

export type SelectOptionListItem = SelectGroupOptionItem | SelectOptionItem;

export type SelectItemProps = SelectItemComponentProps &
  (SelectItemChildren | SelectItemLabel);
type SelectOptionType = {
  options: Array<SelectOptionListItem>;
  children?: never;
};

type SelectChildrenType = {
  children: ReactNode;
  options?: never;
};

type SelectOptionProp = SelectOptionType | SelectChildrenType;

interface Props
  extends PopoverProps,
    Omit<DivProps, "onChange" | "dir" | "onSelect" | "children"> {
  onSelect?: (value: string) => void;
  value?: string;
  placeholder?: string;
  onOpenChange?: (open: boolean) => void;
  label?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  dir?: "start" | "end";
  orientation?: "horizontal" | "vertical";
  allowCreateOption?: boolean;
}
type SelectItemObject = {
  disabled?: boolean;
  value: string;
  title: string;
  heading?: string;
};

export type AutoCompleteProps = (SelectOptionType & Props) | (SelectChildrenType & Props);

export const SelectPopoverRoot = styled(Root)`
  width: 100%;
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

const PopoverContent = styled(Content)`
  width: var(--radix-popover-trigger-width);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;
const SelectGroupContainer = styled.div`
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
  &[hidden] {
    display: none;
  }
`;

const SelectGroupName = styled.div`
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
`;

const SelectGroupContent = styled.div`
  width: inherit;
`;

const SelectListContent = styled.div`
  width: inherit;
  overflow: overlay;
  flex: 1;
`;

type CallbackProps = SelectItemObject & {
  nodeProps: SelectItemProps;
};

const childrenToComboboxItemArray = (
  children: ReactNode,
  callback: (props: CallbackProps) => void,
  heading?: string
): Array<SelectItemObject> => {
  return Children.toArray(children).flatMap(child => {
    if (isValidElement(child) && child && typeof child === "object") {
      const type = child.type as FunctionComponent;
      if (type.displayName === "AutoComplete.Group") {
        const groupChildren = child.props.children;
        return childrenToComboboxItemArray(
          groupChildren,
          callback,
          getTextFromNodes(child.props.heading).toLowerCase()
        );
      } else if (type.displayName === "AutoComplete.Item") {
        const title = getTextFromNodes(child).toLowerCase();
        const value = child.props.value;
        const disabled = child.props.disabled;
        callback({
          disabled,
          value,
          title,
          heading,
          nodeProps: child.props,
        });
        return {
          disabled,
          value,
          title,
          heading,
        };
      } else if ("props" in child && child.props.children) {
        return childrenToComboboxItemArray(child.props.children, callback, heading);
      }
    }
    return [];
  });
};
const SelectNoDataContainer = styled.div`
  border: none;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  cursor: default;
  &[hidden="true"] {
    display: none;
  }
  ${({ theme }) => `
    font: ${theme.click.genericMenu.button.typography.label.default}
    padding: ${theme.click.genericMenu.button.space.y} ${theme.click.genericMenu.item.space.x};
    background: ${theme.click.genericMenu.button.color.background.default};
    color: ${theme.click.genericMenu.button.color.label.default};
  `}
`;

const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  max-height: var(--radix-popover-content-available-height);
  ${({ theme }) => `
    border: 1px solid ${theme.click.genericMenu.item.color.stroke.default};
    background: ${theme.click.genericMenu.item.color.background.default};
    box-shadow: ${theme.click.genericMenu.panel.shadow.default};
    border-radius: 0.25rem;
  `}
`;

export const AutoComplete = ({
  onSelect: onSelectProp,
  options,
  children,
  onOpenChange: onOpenChangeProp,
  disabled,
  value = "",
  placeholder = "Search",
  ...props
}: AutoCompleteProps) => {
  const defaultId = useId();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [highlighted, setHighlighted] = useState<string | undefined>();
  const visibleList = useRef<Array<string>>([]);
  const navigatable = useRef<Array<string>>([]);
  const valueNode = useRef<Map<string, SelectItemProps>>(new Map());
  const [list, setList] = useState<Array<SelectItemObject>>([]);
  const updateElements = useCallback(
    ({ disabled, value, title, heading, nodeProps }: CallbackProps) => {
      if (title.includes(search) || heading?.includes(search)) {
        visibleList.current.push(value);
        if (!disabled) {
          navigatable.current.push(value);
        }
      }
      valueNode.current.set(value, nodeProps);
    },
    [search]
  );

  const onFocus = () => {
    inputRef.current?.focus();
  };

  const onOpenChange = useCallback(
    (open: boolean) => {
      const newOpen = open && !disabled;
      setOpen(newOpen);
      if (typeof onOpenChangeProp === "function") {
        onOpenChangeProp(newOpen);
      }
    },
    [disabled, onOpenChangeProp]
  );

  const onSelect = useCallback(
    (value: string) => {
      onOpenChange(false);
      if (typeof onSelectProp === "function") {
        onSelectProp(value);
      }
    },
    [onSelectProp, onOpenChange]
  );

  const onUpdateSearch = useCallback(
    (search: string) => {
      setSearch(search);
      let hasHighlightedValue = false;
      const visibleItemsList: Array<string> = [];
      const navigatableList: Array<string> = [];
      const searchLowerCase = search.toLowerCase();
      list.forEach(item => {
        if (
          item.title.includes(searchLowerCase) ||
          item.heading?.includes(searchLowerCase)
        ) {
          if (item.value === highlighted) {
            hasHighlightedValue = true;
          }
          visibleItemsList.push(item.value);
          if (!item.disabled) {
            navigatableList.push(item.value);
          }
        }
      });
      navigatable.current = navigatableList;
      visibleList.current = visibleItemsList;
      if (!hasHighlightedValue) {
        setHighlighted(navigatableList[0] ?? null);
      }
    },
    [highlighted, list]
  );

  const updateList = useCallback(
    (children?: ReactNode, options?: Array<SelectOptionListItem>) => {
      const lowerCasedSearch = search.toLowerCase();
      if (options) {
        setList(
          options.flatMap(option => {
            if ("options" in option) {
              const heading = getTextFromNodes(option.heading).toLowerCase();
              return (option.options ?? []).map(item => {
                valueNode.current.set(item.value, item);
                const title = getTextFromNodes(item.label).toLowerCase();
                if (
                  title.includes(lowerCasedSearch) ||
                  heading?.includes(lowerCasedSearch)
                ) {
                  visibleList.current.push(item.value);
                  if (!disabled) {
                    navigatable.current.push(item.value);
                  }
                }
                return {
                  heading,
                  disabled: item.disabled,
                  value: item.value,
                  title,
                };
              });
            } else {
              valueNode.current.set(option.value, option);
              const title = getTextFromNodes(option.label).toLowerCase();
              if (title.includes(lowerCasedSearch)) {
                visibleList.current.push(option.value);
                if (!disabled) {
                  navigatable.current.push(option.value);
                }
              }
              return {
                disabled: option.disabled,
                value: option.value,
                title: getTextFromNodes(option.label),
              };
            }
          })
        );
      } else if (children) {
        setList(childrenToComboboxItemArray(children, updateElements));
      }
    },
    [disabled, search, updateElements]
  );

  useEffect(() => {
    updateList(children, options);
  }, [children, options, updateList]);

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (!e.defaultPrevented) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (highlighted) {
          onSelect(highlighted);
        }
      } else if (["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) {
        e.preventDefault();
        let nextHighlightedValue = highlighted;
        const highlightedIndex = navigatable.current.findIndex(
          value => value === highlighted
        );
        if (e.key === "ArrowUp") {
          if (highlightedIndex === 0) {
            nextHighlightedValue = navigatable.current[navigatable.current.length - 1];
          } else {
            nextHighlightedValue = navigatable.current[highlightedIndex - 1];
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (highlightedIndex === navigatable.current.length - 1) {
            nextHighlightedValue = navigatable.current[0];
          } else {
            nextHighlightedValue = navigatable.current[highlightedIndex + 1];
          }
        } else if (e.key === "End") {
          e.preventDefault();
          nextHighlightedValue = navigatable.current[navigatable.current.length - 1];
        } else if (e.key === "Home") {
          nextHighlightedValue = navigatable.current[0];
          e.preventDefault();
        }
        setHighlighted(nextHighlightedValue);
      }
    }
  };
  const isHidden = useCallback(
    (value?: string) => {
      return !visibleList.current.includes(value ?? "");
    },
    [visibleList]
  );

  const optionContextValue = useMemo(() => {
    return {
      search,
      updateHighlighted: setHighlighted,
      highlighted,
      isHidden,
      onSelect,
      selectedValue: value,
    };
  }, [search, highlighted, isHidden, onSelect, value]);

  const conditionalProps: Partial<SelectOptionProp> = {};
  if (options) {
    conditionalProps.options = options;
  } else {
    conditionalProps.children = children;
  }

  const onTriggerClick: MouseEventHandler<HTMLDivElement> = e => {
    if (open) {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  return (
    <SelectPopoverRoot
      open={open}
      onOpenChange={onOpenChange}
    >
      <Trigger
        asChild
        disabled={disabled}
        data-testid="autocomplete-trigger"
      >
        <div onClick={onTriggerClick}>
          <SearchField
            ref={inputRef}
            value={search}
            onChange={onUpdateSearch}
            onKeyDown={onKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </Trigger>
      <Portal>
        <PopoverContent
          sideOffset={5}
          onFocus={onFocus}
          onCloseAutoFocus={() => {
            onUpdateSearch("");
            inputRef.current?.focus();
          }}
          onOpenAutoFocus={e => {
            e.preventDefault();
            setHighlighted(visibleList.current[0]);
            inputRef.current?.focus();
          }}
          align="start"
        >
          <SelectList>
            <SelectListContent>
              <OptionContext.Provider value={optionContextValue}>
                {options && options.length > 0 ? (
                  <AutoCompleteOptionList
                    options={options}
                    id={defaultId}
                  />
                ) : (
                  children
                )}
              </OptionContext.Provider>
            </SelectListContent>
            {visibleList.current.length === 0 && (
              <SelectNoDataContainer {...props}>
                No Options found{search.length > 0 ? ` for "${search}" ` : ""}
              </SelectNoDataContainer>
            )}
          </SelectList>
        </PopoverContent>
      </Portal>
    </SelectPopoverRoot>
  );
};

export const Group = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, heading, ...props }, forwardedRef) => {
    useSearch();
    return (
      <SelectGroupContainer
        {...props}
        ref={mergeRefs([
          forwardedRef,
          node => {
            const hidden = node?.querySelectorAll("[cui-autocomplete-item]").length === 0;
            if (hidden) {
              node?.setAttribute("hidden", "");
            } else {
              node?.removeAttribute("hidden");
            }
            node?.setAttribute("aria-hidden", hidden.toString());
          },
        ])}
      >
        <SelectGroupName>{heading}</SelectGroupName>
        <SelectGroupContent>{children}</SelectGroupContent>
      </SelectGroupContainer>
    );
  }
);

Group.displayName = "AutoComplete.Group";

const CheckIcon = styled.svg<{ $showCheck: boolean }>`
  opacity: ${({ $showCheck }) => ($showCheck ? 1 : 0)};
`;

export const Item = forwardRef<HTMLDivElement, SelectItemProps>(
  (
    {
      disabled = false,
      children,
      label,
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
    const { highlighted, updateHighlighted, isHidden, selectedValue, onSelect } =
      useOption();
    const onSelectValue = () => {
      if (!disabled) {
        onSelect(value);
        if (typeof onSelectProp == "function") {
          onSelectProp(value);
        }
      }
    };
    const onMouseOver: MouseEventHandler<HTMLDivElement> = e => {
      if (onMouseOverProp) {
        onMouseOverProp(e);
      }
      if (!disabled) {
        updateHighlighted(value);
      }
    };

    if (isHidden(value)) {
      return null;
    }
    const isChecked = selectedValue === value;

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
          cui-autocomplete-item=""
        >
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
          >
            {label ?? children}
          </IconWrapper>
          <CheckIcon
            as={Icon}
            name="check"
            size="sm"
            $showCheck={isChecked}
          />
        </GenericMenuItem>
        {separator && <Separator size="sm" />}
      </>
    );
  }
);

Item.displayName = "AutoComplete.Item";

AutoComplete.Group = Group;
AutoComplete.Item = Item;
