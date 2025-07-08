import {
  Children,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
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
import {
  SelectContainerProps,
  SelectGroupProps,
  SelectItemObject,
  SelectItemProps,
  SelectOptionListItem,
} from "./types";
import { Error, FormElementContainer, FormRoot } from "@/components/commonElement";
import { Portal } from "@radix-ui/react-popover";
import {
  Checkbox,
  CheckboxVariants,
  Container,
  Icon,
  IconButton,
  Label,
  Separator,
  Text,
  TextProps,
} from "@/components";
import {
  SelectPopoverContent,
  SearchBar,
  SearchBarContainer,
  SearchClose,
  SelectList,
  SelectListContent,
  SelectPopoverRoot,
  StyledSelectTrigger,
  SelectValue,
  HiddenSelectElement,
  SelectGroupContainer,
  SelectGroupName,
  SelectGroupContent,
  SelectNoDataContainer,
  SelectItemDescriptionText,
} from "./SelectStyled";
import { OptionContext } from "./OptionContext";
import { MultiSelectValue } from "../MultiSelectValue";
import SingleSelectValue from "../SingleSelectValue";
import { useOption, useSearch } from "./useOption";
import { mergeRefs } from "@/utils/mergeRefs";
import { GenericMenuItem } from "@/components/GenericMenu";
import IconWrapper from "@/components/IconWrapper/IconWrapper";
import { styled } from "styled-components";
import { getTextFromNodes } from "@/lib/getTextFromNodes";

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
      if (type.displayName === "Select.Group") {
        const groupChildren = child.props.children;
        return childrenToComboboxItemArray(
          groupChildren,
          callback,
          getTextFromNodes(child.props.heading).toLowerCase()
        );
      } else if (type.displayName === "Select.Item") {
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

export const InternalSelect = ({
  label,
  children,
  orientation,
  dir,
  disabled,
  id,
  error,
  value: selectedValues,
  onChange,
  onSelect,
  open,
  onOpenChange,
  name,
  form,
  allowCreateOption = false,
  customText = "",
  options,
  sortable = false,
  placeholder = "Select an option",
  multiple,
  checkbox,
  selectLabel,
  showSearch = false,
  container,
  useFullWidthItems = false,
  itemCharacterLimit = "64ch",
  ...props
}: SelectContainerProps) => {
  const defaultId = useId();
  const [search, setSearch] = useState("");
  const [highlighted, setHighlighted] = useState<string | undefined>();
  const visibleList = useRef<Array<string>>([]);
  const navigatable = useRef<Array<string>>([]);
  const valueNode = useRef<Map<string, SelectItemProps>>(new Map());
  const [isInitialized, setInitialized] = useState(false);
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
    setInitialized(true);
  }, [children, options, updateList]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = () => {
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    onUpdateSearch("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!e.defaultPrevented) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (highlighted) {
          onSelect(highlighted, undefined, e);
        } else if (visibleList.current.length === 0 && allowCreateOption) {
          onSelect(search, "custom", e);
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
      selectedValues,
    };
  }, [search, highlighted, isHidden, onSelect, selectedValues]);

  const onCreateOption = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (allowCreateOption) {
      onSelect(search, "custom", e);
    }
  };

  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      $addLabelPadding
      {...props}
    >
      <FormElementContainer>
        <SelectPopoverRoot
          open={open}
          onOpenChange={onOpenChange}
          modal={true}
        >
          <StyledSelectTrigger
            id={id ?? defaultId}
            $error={!!error}
            disabled={disabled}
            data-testid="select-trigger"
          >
            {isInitialized && (
              <SelectValue>
                {selectedValues.length === 0 ? (
                  placeholder
                ) : multiple ? (
                  <MultiSelectValue
                    disabled={disabled ?? false}
                    onSelect={onSelect}
                    selectedValues={selectedValues}
                    sortable={!disabled && sortable}
                    valueNode={valueNode.current}
                    onChange={onChange}
                  />
                ) : (
                  <SingleSelectValue
                    valueNode={
                      checkbox && selectLabel
                        ? { label: selectLabel as string, value: selectLabel as string }
                        : valueNode.current.get(selectedValues[0])
                    }
                    value={selectedValues[0]}
                  />
                )}
              </SelectValue>
            )}
            <Icon
              name="sort"
              size="sm"
            />
          </StyledSelectTrigger>
          {form && (
            <HiddenSelectElement
              multiple={multiple}
              name={name}
              form={form}
              value={selectedValues}
              onChange={() => null}
            >
              {list.map(item => (
                <option
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.value}
                </option>
              ))}
            </HiddenSelectElement>
          )}
          <Portal container={container}>
            <SelectPopoverContent
              sideOffset={5}
              onFocus={onFocus}
              onCloseAutoFocus={() => {
                onUpdateSearch("");
              }}
              onOpenAutoFocus={() => {
                setHighlighted(visibleList.current[0]);
              }}
              align="start"
              $useFullWidthItems={useFullWidthItems}
              $itemCharacterLimit={itemCharacterLimit}
            >
              <SelectList>
                <SearchBarContainer $showSearch={showSearch}>
                  <SearchBar
                    ref={inputRef}
                    value={search}
                    onChange={e => onUpdateSearch(e.target.value)}
                    data-testid="select-search-input"
                    onKeyDown={onKeyDown}
                    $showSearch={showSearch}
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
                <SelectListContent>
                  <OptionContext.Provider value={optionContextValue}>
                    {options && options.length > 0
                      ? options.map((props, index) => {
                          if ("options" in props) {
                            const { options: itemList = [], ...groupProps } = props;
                            return (
                              <SelectGroup
                                key={`select-${id}-group-${index}`}
                                {...groupProps}
                              >
                                {itemList.map((itemProps, itemIndex) => {
                                  if (checkbox) {
                                    return (
                                      <MultiSelectCheckboxItem
                                        key={`select-${id}-group-${index}-item-${itemIndex}`}
                                        {...itemProps}
                                      />
                                    );
                                  }
                                  return (
                                    <SelectItem
                                      key={`select-${id}-group-${index}-item-${itemIndex}`}
                                      {...itemProps}
                                    />
                                  );
                                })}
                              </SelectGroup>
                            );
                          } else {
                            if (checkbox) {
                              return (
                                <MultiSelectCheckboxItem
                                  key={`select-${id}-item-${index}`}
                                  {...props}
                                />
                              );
                            }
                            return (
                              <SelectItem
                                key={`select-${id}-item-${index}`}
                                {...props}
                              />
                            );
                          }
                        })
                      : children}
                  </OptionContext.Provider>
                </SelectListContent>
                {visibleList.current.length === 0 && (
                  <SelectNoDataContainer
                    onClick={onCreateOption}
                    $clickable={allowCreateOption}
                    {...props}
                  >
                    {customText.length > 0
                      ? customText.replaceAll("{search}", search)
                      : allowCreateOption
                      ? `Add ${search}`
                      : `No Options found${search.length > 0 ? ` for "${search}" ` : ""}
                    `}
                  </SelectNoDataContainer>
                )}
              </SelectList>
            </SelectPopoverContent>
          </Portal>
        </SelectPopoverRoot>
        {!!error && error !== true && <Error>{error}</Error>}
      </FormElementContainer>
      {label && (
        <Label
          htmlFor={id ?? defaultId}
          disabled={disabled}
          error={!!error}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, heading, ...props }, forwardedRef) => {
    useSearch();
    return (
      <SelectGroupContainer
        {...props}
        ref={mergeRefs([
          forwardedRef,
          node => {
            const hidden = node?.querySelectorAll("[cui-select-item]").length === 0;
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

SelectGroup.displayName = "Select.Group";

const CheckIcon = styled.svg<{ $showCheck: boolean }>`
  opacity: ${({ $showCheck }) => ($showCheck ? 1 : 0)};
`;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  (
    {
      disabled = false,
      children,
      label,
      description,
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
    const { highlighted, updateHighlighted, isHidden, selectedValues, onSelect } =
      useOption();
    const onSelectValue = (evt: MouseEvent<HTMLElement>) => {
      if (!disabled) {
        onSelect(value, undefined, evt);
        if (typeof onSelectProp == "function") {
          onSelectProp(value, undefined, evt);
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

    if (isHidden(value)) {
      return null;
    }
    const isChecked = selectedValues.includes(value);

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
          cui-select-item=""
        >
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
            gap="xxs"
          >
            {label ? (
              <>
                {label}
                {description && (
                  <SelectItemDescription>{description}</SelectItemDescription>
                )}
              </>
            ) : (
              children
            )}
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

export type MultiSelectCheckboxItemProps = SelectItemProps & {
  variant?: CheckboxVariants;
};

SelectItem.displayName = "Select.Item";

export const MultiSelectCheckboxItem = forwardRef<
  HTMLDivElement,
  MultiSelectCheckboxItemProps
>(
  (
    {
      disabled = false,
      children,
      icon,
      iconDir = "end",
      label,
      description,
      onMouseOver: onMouseOverProp,
      onSelect: onSelectProp,
      separator,
      value = "",
      variant,
      ...props
    },
    forwardedRef
  ) => {
    const { highlighted, updateHighlighted, isHidden, selectedValues, onSelect } =
      useOption();

    const handleMenuItemClick = (evt: MouseEvent<HTMLElement>) => {
      if (!disabled) {
        onSelect(value, undefined, evt);

        if (typeof onSelectProp === "function") {
          onSelectProp(value, undefined, evt);
        }
      }
    };

    const handleMenuItemMouseOver = (e: MouseEvent<HTMLDivElement>) => {
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

    const isChecked = selectedValues.includes(value);

    return (
      <>
        <GenericMenuItem
          {...props}
          data-value={value}
          onClick={handleMenuItemClick}
          onMouseOver={handleMenuItemMouseOver}
          ref={forwardedRef}
          data-disabled={disabled ? true : undefined}
          data-highlighted={highlighted == value ? "true" : undefined}
          data-testid={`multi-select-checkbox-${value}`}
          cui-select-item=""
        >
          <Container
            orientation="horizontal"
            gap="xs"
            overflow="hidden"
          >
            <Checkbox
              checked={isChecked}
              data-testid="multi-select-checkbox"
              disabled={disabled}
              variant={variant ?? "default"}
            />
            <IconWrapper
              icon={icon}
              iconDir={iconDir}
              gap="xxs"
            >
              {label ? (
                <>
                  {label}
                  {description && (
                    <SelectItemDescription>{description}</SelectItemDescription>
                  )}
                </>
              ) : (
                children
              )}
            </IconWrapper>
          </Container>
        </GenericMenuItem>
        {separator && <Separator size="sm" />}
      </>
    );
  }
);

MultiSelectCheckboxItem.displayName = "Select.Item";

export const SelectItemDescription = forwardRef<HTMLDivElement, TextProps>(
  ({ children, ...props }) => {
    return (
      <Text
        component={SelectItemDescriptionText}
        color="muted"
        {...props}
      >
        {children}
      </Text>
    );
  }
);

SelectItemDescription.displayName = "Select.ItemDescription";
