import {
  Children,
  FunctionComponent,
  KeyboardEvent,
  ReactNode,
  RefObject,
  SetStateAction,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ComboboxContext } from "./useCombobox";
import { ComboboxItemProps } from "./types";

type CallbackProps = ComboboxItemObject & {
  nodeProps: ComboboxItemProps;
};

type ComboboxItemObject = {
  disabled?: boolean;
  value: string;
  title: string;
  heading?: string;
};
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
  elementName: string,
  callback: (props: CallbackProps) => void,
  heading?: string
): Array<ComboboxItemObject> => {
  return Children.toArray(children).flatMap(child => {
    if (isValidElement(child) && child && typeof child === "object") {
      const type = child.type as FunctionComponent;
      if (type.displayName === `${elementName}.Group`) {
        const groupChildren = child.props.children;
        return childrenToComboboxItemArray(
          groupChildren,
          elementName,
          callback,
          getTextFromNodes(child.props.heading)
        );
      } else if (type.displayName === `${elementName}.Item`) {
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
        return childrenToComboboxItemArray(
          child.props.children,
          elementName,
          callback,
          heading
        );
      }
    }
    return [];
  });
};
interface ComboboxProviderProps {
  children: ReactNode;
  onSelect: (props: Array<string>) => void;
  id: string;
  hasError: boolean;
  disabled?: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onCreateOption?: (search: string) => void;
  showCheck?: boolean;
}

interface MultiSelectProps extends ComboboxProviderProps {
  type: "MultiSelect";
  value?: Array<string>;
}

interface SingleSelectProps extends ComboboxProviderProps {
  type: "Select";
  value?: string;
}
export const ComboboxProvider = ({
  type,
  children,
  onSelect: onSelectProp,
  id,
  hasError,
  disabled,
  value: valueProp,
  inputRef,
  onCreateOption,
  showCheck,
}: MultiSelectProps | SingleSelectProps) => {
  const [highlighted, updateHighlighted] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedValues, setSelectedValues] = useState<Array<string>>(
    type === "MultiSelect" ? valueProp ?? [] : valueProp ? [valueProp] : []
  );
  const itemList = useRef<Array<ComboboxItemObject>>([]);
  const visibleList = useRef<Array<string>>([]);
  const navigatable = useRef<Array<string>>([]);
  const valueToElement = useRef<Record<string, ComboboxItemProps>>({});

  const updateValues = useCallback(
    (value: SetStateAction<Array<string>>) => {
      setSelectedValues(values => {
        const newValue = typeof value === "function" ? value(values) : value;

        if (inputRef.current) {
          inputRef.current.value = newValue.join(",");
        }
        return newValue;
      });
    },
    [inputRef]
  );

  useEffect(() => {
    updateValues(type === "MultiSelect" ? valueProp ?? [] : valueProp ? [valueProp] : []);
  }, [valueProp, type, updateValues]);

  const updateElements = ({
    disabled,
    value,
    title,
    heading,
    nodeProps,
  }: CallbackProps) => {
    if (title.includes(search) || heading?.includes(search)) {
      visibleList.current.push(value);
      if (!disabled) {
        navigatable.current.push(value);
      }
    }
    valueToElement.current[value] = nodeProps;
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
        updateHighlighted(nextHighlightedValue);
      }
    }
  };
  const updateChildren = (children: ReactNode) => {
    itemList.current = childrenToComboboxItemArray(children, type, updateElements);
  };
  const updateSearch = (search: string) => {
    setSearch(search);
    let hasHighlightedValue = false;
    const visibleItemsList: Array<string> = [];
    const navigatableList: Array<string> = [];
    const searchLowerCase = search.toLowerCase();
    itemList.current.forEach(item => {
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
      updateHighlighted(navigatableList[0] ?? null);
    }
  };

  const isHidden = (type: "empty" | "item", value?: string) => {
    if (type === "empty") {
      return visibleList.current.length > 0;
    }
    if (type === "item") {
      return visibleList.current.findIndex(item => item === value) === -1;
    }
    return true;
  };

  const onSelect = (newValue: string) => {
    let newSelectedArray = selectedValues;
    if (type === "MultiSelect") {
      const index = newSelectedArray.findIndex(value => value === newValue);

      if (index === -1) {
        newSelectedArray = [...newSelectedArray, newValue];
      } else {
        newSelectedArray = newSelectedArray.filter(value => value !== newValue);
      }
    } else {
      newSelectedArray = [newValue];
    }
    updateValues(newSelectedArray);
    onSelectProp(newSelectedArray);
  };

  const isSelected = (value: string) => {
    return selectedValues.includes(value);
  };
  const getValueProps = (value: string): ComboboxItemProps => {
    return valueToElement.current[value] ?? { children: value, value };
  };

  const value = {
    updateChildren,
    search,
    updateSearch,
    onSelect,
    highlighted,
    isHidden,
    onKeyDown,
    updateHighlighted,
    isSelected,
    id,
    hasError,
    disabled,
    selectedValues,
    setSelectedValues,
    onCreateOption,
    showCheck,
    updateValues,
    getValueProps,
  };
  return <ComboboxContext.Provider value={value}>{children}</ComboboxContext.Provider>;
};
