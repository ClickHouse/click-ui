"use client";

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
import clsx from "clsx";
import { GenericMenuItem } from "@/components/GenericMenu";
import { useOption, useSearch } from "./useOption";
import { IconWrapper } from "@/components";
import { OptionContext } from "./OptionContext";
import { mergeRefs } from "@/utils/mergeRefs";
import { getTextFromNodes } from "@/lib/getTextFromNodes";
import AutoCompleteOptionList from "./AutoCompleteOptionList";
import styles from "./AutoComplete.module.scss";

type DivProps = HTMLAttributes<HTMLDivElement>;
interface SelectItemComponentProps extends Omit<
  DivProps,
  "disabled" | "onSelect" | "value" | "children"
> {
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
export interface SelectGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "heading"
> {
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

export type AutoCompleteOptionListItem = SelectGroupOptionItem | SelectOptionItem;

export type SelectItemProps = SelectItemComponentProps &
  (SelectItemChildren | SelectItemLabel);
type SelectOptionType = {
  options: Array<AutoCompleteOptionListItem>;
  children?: never;
};

type SelectChildrenType = {
  children: ReactNode;
  options?: never;
};

type SelectOptionProp = SelectOptionType | SelectChildrenType;

interface Props
  extends PopoverProps, Omit<DivProps, "onChange" | "dir" | "onSelect" | "children"> {
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
    (children?: ReactNode, options?: Array<AutoCompleteOptionListItem>) => {
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

  const onFocusOutside = (
    e: CustomEvent<{
      originalEvent: FocusEvent;
    }>
  ) => {
    const contentElement = (e.target as HTMLElement)?.closest("[aria-haspopup=dialog]");
    const triggerElement = (e.target as HTMLElement)?.closest(
      "[data-radix-popper-content-wrapper]"
    );

    if (contentElement || triggerElement) {
      e.preventDefault();
    }
  };

  return (
    <Root
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
        <Content
          className={styles.cuiPopoverContent}
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
          onPointerDownOutside={() => {
            onOpenChange(false);
          }}
          onFocusOutside={onFocusOutside}
        >
          <div className={styles.cuiSelectList}>
            <div className={styles.cuiSelectListContent}>
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
            </div>
            {visibleList.current.length === 0 && (
              <div
                className={styles.cuiSelectNoDataContainer}
                {...props}
              >
                No Options found{search.length > 0 ? ` for "${search}" ` : ""}
              </div>
            )}
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export const Group = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, heading, ...props }, forwardedRef) => {
    useSearch();
    return (
      <div
        className={styles.cuiSelectGroupContainer}
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
        <div className={styles.cuiSelectGroupName}>{heading}</div>
        <div className={styles.cuiSelectGroupContent}>{children}</div>
      </div>
    );
  }
);

Group.displayName = "AutoComplete.Group";

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
          <Icon
            name="check"
            size="sm"
            className={clsx(styles.cuiCheckIcon, { [styles.cuiShowCheck]: isChecked })}
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
