import {
  Children,
  FocusEvent,
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import HiddenSelect from "./HiddenSelect";
import { Content, Portal } from "@radix-ui/react-popover";
import { useSelect } from "./useSelect";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { IconButton } from "@/components";
import { SelectItemObject } from "../types";
import { SelectItemProps } from "./types";
import { useSelectTrigger } from "./useSelectTrigger";
import { OptionContext } from "./OptionContext";
import { MultiSelectValue } from "../MultiSelectValue";
import SingleSelectValue from "../SingleSelectValue";

const PopoverContent = styled(Content)`
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

const SearchBarContainer = styled.div<{ $showSearch: boolean }>`
  width: auto;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${({ theme, $showSearch }) => `
    border-bottom: ${
      $showSearch ? `1px solid ${theme.click.genericMenu.button.color.stroke.default}` : 0
    };
    padding: ${
      $showSearch
        ? `${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x}`
        : 0
    };
    color: ${theme.click.genericMenu.autocomplete.color.searchTerm.default};
    font: ${theme.click.genericMenu.autocomplete.typography.search.term.default};
    height: ${$showSearch ? "auto" : " 0"};
  `}
`;

const SearchBar = styled.input<{ $showSearch: boolean }>`
  background: transparent;
  border: none;
  width: 100%;
  outline: none;
  ${({ theme, $showSearch }) => `
    min-height: ${$showSearch ? "21px" : 0};
    height: ${$showSearch ? "initial" : 0};
    ${$showSearch ? "padding-right: 24px" : "padding:0"};

    gap: ${theme.click.genericMenu.item.space.gap};
    font: ${theme.click.genericMenu.autocomplete.typography.search.term.default};
    border-bottom: ${
      $showSearch ? `2px solid ${theme.click.genericMenu.button.color.stroke.default}` : 0
    };
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
const SelectListContent = styled.div`
  width: inherit;
  overflow: overlay;
  flex: 1;
`;

const getTextFromNodes = (node: ReactNode): string => {
  if (node === null) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(getTextFromNodes).join(" ");
  }

  if (isValidElement(node)) {
    const children = Children.toArray(node.props.children);
    return children.map(getTextFromNodes).join(" ");
  }

  return "";
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
          getTextFromNodes(child.props.heading)
        );
      } else if (type.displayName === "Select.Item") {
        const title = getTextFromNodes(child);
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

type CallbackProps = SelectItemObject & {
  nodeProps: SelectItemProps;
};

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  showSearch?: boolean;
  type?: "MultiSelect" | "Select";
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (
    { type = "Select", showSearch = true, onFocus: onFocusProp, children, ...props },
    ref
  ) => {
    const [search, setSearch] = useState("");
    const [highlighted, setHighlighted] = useState<string | undefined>();
    const visibleList = useRef<Array<string>>([]);
    const navigatable = useRef<Array<string>>([]);
    const valueNode = useRef<Map<string, SelectItemProps>>(new Map());
    const [list, setList] = useState<Array<SelectItemObject>>([]);
    const { triggerRef, name, form, disabled, sortable } = useSelectTrigger();
    const { onSelect, onChange, onCreateOption, selectedValues, onOpenChange } =
      useSelect();
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
            item.title.toLowerCase().includes(searchLowerCase) ||
            item.heading?.toLowerCase()?.includes(searchLowerCase)
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

    useEffect(() => {
      setList(childrenToComboboxItemArray(children, updateElements));
    }, [children, updateElements]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onFocus = (e: FocusEvent<HTMLDivElement, Element>) => {
      inputRef.current?.focus();
      if (onFocusProp) {
        onFocusProp(e);
      }
    };

    const clearSearch = () => {
      onUpdateSearch("");
    };

    const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      if (!e.defaultPrevented) {
        if (e.key === "Enter") {
          e.preventDefault();
          if (highlighted) {
            onSelect(highlighted);
          } else if (
            visibleList.current.length === 0 &&
            typeof onCreateOption === "function"
          ) {
            onCreateOption(search);
            onSelect(search);
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
      (type: "empty" | "item", value?: string) => {
        if (type === "empty") {
          return visibleList.current.length > 0;
        }
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
      };
    }, [highlighted, search, isHidden]);

    return (
      <>
        {form && (
          <HiddenSelect
            form={form}
            name={name}
            options={list}
            selectedValues={selectedValues}
            multiple={type === "MultiSelect"}
          />
        )}
        {triggerRef.current &&
          createPortal(
            type === "MultiSelect" ? (
              <MultiSelectValue
                disabled={disabled ?? false}
                onSelect={onSelect}
                selectedValues={selectedValues}
                sortable={sortable ?? false}
                valueNode={valueNode.current}
                onChange={onChange}
                onOpenChange={onOpenChange}
              />
            ) : (
              <SingleSelectValue
                valueNode={valueNode.current.get(selectedValues[0])}
                value={selectedValues[0]}
                onOpenChange={onOpenChange}
              />
            ),
            triggerRef.current
          )}
        <Portal>
          <PopoverContent
            sideOffset={5}
            onFocus={onFocus}
            onCloseAutoFocus={() => {
              onUpdateSearch("");
            }}
            ref={ref}
            {...props}
          >
            <SelectList>
              <SearchBarContainer $showSearch={showSearch}>
                <SearchBar
                  ref={inputRef}
                  value={search}
                  onChange={e => onUpdateSearch(e.target.value)}
                  data-testid="combobox-search-input"
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
                  {children}
                </OptionContext.Provider>
              </SelectListContent>
            </SelectList>
          </PopoverContent>
        </Portal>
      </>
    );
  }
);

SelectContent.displayName = "Select.Content";
