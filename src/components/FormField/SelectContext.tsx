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
};

const SelectContext = createContext<ContextProps>({
  searchText: "",
  onSearchTextChange: () => null,
});

type Props = {
  children: ReactNode;
  value?: string;
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

  return (
    <SelectContext.Provider value={selectValue}>
      {children}
    </SelectContext.Provider>
  );
};

export const useSelect = () => {
  const result = useContext(SelectContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};

const getNodeText = (node: ReactNode) => {
  if (["string", "number", "boolean"].includes(typeof node)) {
    return node;
  }
  if (node instanceof Array) {
    return node.map(getNodeText).join("");
  }
  if (node && typeof node === "object" && "props" in node)
    return getNodeText(node.props.children);
};

export const useOptionVisible = (node: ReactNode): boolean => {
  const { searchText } = useContext(SelectContext);
  if (searchText.length === 0) {
    return true;
  }

  return (getNodeText(node) ?? "")
    .toLowerCase()
    .includes(searchText.toLowerCase());
};
