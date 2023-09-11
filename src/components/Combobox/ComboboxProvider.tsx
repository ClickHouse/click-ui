import {
  Children,
  FunctionComponent,
  KeyboardEvent,
  ReactNode,
  isValidElement,
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
}

interface MultiSelectProps extends ComboboxProviderProps {
  isMultiSelect: true;
  value?: Array<string>;
}

interface SingleSelectProps extends ComboboxProviderProps {
  isMultiSelect?: never;
  value?: string;
}
export const ComboboxProvider = ({
  isMultiSelect,
  children,
  onSelect: onSelectProp,
  id,
  hasError,
  disabled,
  value: valueProp,
}: MultiSelectProps | SingleSelectProps) => {
  const [highlighted, updateHighlighted] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const selectedValues = useRef<Array<string>>(
    isMultiSelect ? valueProp ?? [] : valueProp ? [valueProp] : []
  );
  const [selectedValueNodeProps, setSelectedValueNodeProps] = useState<
    Array<ComboboxItemProps>
  >([]);
  const itemList = useRef<Array<ComboboxItemObject>>([]);
  const visibleList = useRef<Array<string>>([]);
  const navigatable = useRef<Array<string>>([]);
  const valueToElement = useRef<Record<string, ComboboxItemProps>>({});

  useEffect(() => {
    selectedValues.current = isMultiSelect
      ? valueProp ?? []
      : valueProp
      ? [valueProp]
      : [];
  }, [valueProp, isMultiSelect]);

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
  const updateChildren = (children: ReactNode, type: string) => {
    itemList.current = childrenToComboboxItemArray(children, type, updateElements);
  };
  const updateSearch = (search: string) => {
    setSearch(search);
    let hasHighlightedValue = false;
    const visibleItemsList: Array<string> = [];
    const navigatableList: Array<string> = [];
    itemList.current.forEach(item => {
      if (item.title.includes(search) || item.heading?.includes(search)) {
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
    if (isMultiSelect) {
      const index = selectedValues.current.findIndex(value => value === newValue);
      if (index === -1) {
        selectedValues.current = [...selectedValues.current, newValue];
        setSelectedValueNodeProps(values => [
          ...values,
          valueToElement.current[newValue],
        ]);
      } else {
        selectedValues.current = selectedValues.current.filter(
          value => value !== newValue
        );
        setSelectedValueNodeProps(values => values.splice(index, 1));
      }
    } else {
      selectedValues.current = [newValue];
      setSelectedValueNodeProps([valueToElement.current[newValue]]);
    }
    onSelectProp(selectedValues.current);
  };

  const isSelected = (value: string) => {
    return selectedValues.current.includes(value);
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
    selectedValueNodeProps,
  };
  return <ComboboxContext.Provider value={value}>{children}</ComboboxContext.Provider>;
};
