import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextProps = {
  searchText: string;
  onSearchTextChange: Dispatch<SetStateAction<string>>;
  groupLabel?: ReactNode;
};

const SelectContext = createContext<ContextProps>({
  searchText: "",
  groupLabel: undefined,
  onSearchTextChange: () => null,
});

type Props = {
  children: ReactNode;
  value?: string;
};

export const SelectProvider = ({
  value,
  children,
}: {
  children: ReactNode;
  value: ContextProps;
}) => {
  return <SelectContext.Provider value={value}>{children}</SelectContext.Provider>;
};

export const SelectContextProvider = ({ children, value = "" }: Props) => {
  const [searchText, setSearchText] = useState<string>(value);

  const selectValue = {
    searchText,
    onSearchTextChange: setSearchText,
  };

  useEffect(() => {
    setSearchText(value);
  }, [value]);

  return <SelectProvider value={selectValue}>{children}</SelectProvider>;
};

export const useSelect = () => {
  const result = useContext(SelectContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};

const getNodeText = (node: ReactNode): string | undefined | null => {
  if (["string", "number", "boolean"].includes(typeof node)) {
    return node?.toString();
  }
  if (node instanceof Array) {
    return node.map(getNodeText).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    const label = node.props.label ?? "";
    return `${label} ${getNodeText(node.props.children)}`;
  }
};

export const useOptionVisible = (node: ReactNode, groupText?: ReactNode): boolean => {
  const { searchText } = useContext(SelectContext);
  if (searchText.length === 0) {
    return true;
  }
  const searchTextLower = searchText.toLowerCase();
  const groupNodeText = getNodeText(groupText) ?? "";
  const groupHasValue = groupNodeText.toLowerCase().includes(searchTextLower);

  if (groupHasValue) {
    return true;
  }

  return (getNodeText(node) ?? "").toLowerCase().includes(searchTextLower);
};
