import {
  DragEvent,
  HTMLAttributes,
  createContext,
  useContext,
  useRef,
  ReactElement,
  Children,
  useState,
  WheelEvent,
  RefObject,
  MouseEvent,
} from "react";
import { styled } from "styled-components";
import { Icon } from "..";

const TabsContainer = styled.div`
  display: flex;
  position: relative;
  overflow: auto;
  overscroll-behavior: none;
  scrollbar-width: 0;
  &::-webkit-scrollbar {
    height: 0;
  }
`;

const DragElementContainer = styled.div`
  width: fit-content;
  position: absolute;
  visibility: hidden;
  left: 0;
  top: 0;
  z-index: -1;
`;

interface ContextProps {
  selected?: string;
  list: Array<string>;
  updateOrder: (order: number) => void;
  dragElementContainer: RefObject<HTMLDivElement>;
}

export const TabContext = createContext<ContextProps>({
  selected: undefined,
  list: [],
  updateOrder: (order: number) => null,
  dragElementContainer: { current: null },
});

interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
  value: string;
}
interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  selected?: string;
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>;
  onReorderTab: (props: {
    sourcePosition: number;
    destinationPosition: number;
    sourceValue: string;
  }) => void;
}

const useSelect = () => {
  const result = useContext(TabContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};
type DragElementType = {
  order: number;
  value: string;
};

const getOrderFromChildren = (
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>
) => {
  return Children.map(children, child => child.props.value);
};

export const FileTabs = ({
  selected,
  children,
  onReorderTab,
  onMouseLeave: onMouseLeaveProp,
  ...props
}: Props) => {
  const dragElement = useRef<DragElementType | null>(null);
  const dragElementContainer = useRef<HTMLDivElement>(null);
  const [orderList, setOrderList] = useState<Array<string>>(
    getOrderFromChildren(children)
  );

  const updateOrder = (order: number) => {
    if (dragElement.current) {
      const { value } = dragElement.current;
      setOrderList((list: string[]) => {
        const newList = list.filter(element => element !== value);
        newList.splice(order, 0, value);
        return newList;
      });
    }
  };

  const value = {
    dragElementContainer,
    selected,
    list: orderList,
    updateOrder,
  };

  const onDragEnd = (e: DragEvent) => {
    e.preventDefault();
    if (dragElement.current) {
      setOrderList(getOrderFromChildren(children));
      dragElement.current = null;
    }
    if (dragElementContainer.current) {
      dragElementContainer.current.innerHTML = "";
    }
  };

  const onDrop = () => {
    if (dragElement.current) {
      const { order, value } = dragElement.current;
      dragElement.current = null;
      const destinationPosition = orderList.findIndex(element => element === value);
      onReorderTab({ sourcePosition: order, destinationPosition, sourceValue: value });
    }
  };

  const onDragStart = (e: DragEvent) => {
    const order = +e.dataTransfer.getData("order");
    const value = e.dataTransfer.getData("value");
    dragElement.current = {
      order,
      value,
    };
  };

  const onWheel = (evt: WheelEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    evt.currentTarget.scrollLeft += evt.deltaY;
  };
  const onDragLeave = (e: MouseEvent<HTMLDivElement>) => {
    updateOrder(Children.count(children));
    if (typeof onMouseLeaveProp === "function") {
      onMouseLeaveProp(e);
    }
  };

  return (
    <TabContext.Provider value={value}>
      <TabsContainer
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onWheel={onWheel}
        onScroll={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        {...props}
      >
        <DragElementContainer ref={dragElementContainer} />
        {children}
      </TabsContainer>
    </TabContext.Provider>
  );
};

const TabElement = styled.button<{
  $active: boolean;
  $order: number;
  $isDragging?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  flex-shrink: 0;
  padding: 1.0625rem 1rem;
  gap: 0.75rem;
  border: none;
  ${({ theme, $active, $order, $isDragging }) => `
    order: ${$order};
    opacity: ${$isDragging ? 0 : 1};
    background: ${theme.click.tabs["file-tabs"].color.background.default};
    color: ${theme.click.tabs["file-tabs"].color.text.default};
    font: ${theme.click.tabs.typography.label.default};
    ${
      $active
        ? `
          background: ${theme.click.tabs["file-tabs"].color.background.active};
          color: ${theme.click.tabs["file-tabs"].color.text.active};
          font: ${theme.click.tabs.typography.label.active};
        `
        : `
          &:hover {
            background: ${theme.click.tabs["file-tabs"].color.background.default};
            color: ${theme.click.tabs["file-tabs"].color.text.default};
            font: ${theme.click.tabs.typography.label.default};
          }
        `
    }
  `}
`;

const Tab = ({
  children,
  onClose,
  value,
  onMouseDown: onMouseDownProp,
  ...props
}: TabProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { selected, updateOrder, list, dragElementContainer } = useSelect();
  const order = list.findIndex(element => element === value) ?? 0;
  const onMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    if (typeof onMouseDownProp === "function") {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      onMouseDownProp(e);
    }
  };
  const onDragStart = (event: DragEvent) => {
    if (dragElementContainer.current) {
      setIsDragging(true);
      event.dataTransfer.effectAllowed = "move";
      const node = event.currentTarget.cloneNode(true) as HTMLElement;
      node.style.opacity = "1";
      node.style.visibility = "visible";
      dragElementContainer.current.append(node);

      event.dataTransfer.setDragImage(dragElementContainer.current, 0, 0);

      event.dataTransfer.setData("order", order.toString());
      event.dataTransfer.setData("value", value);
    }
  };

  const preventDragEvent = (e: DragEvent) => {
    e.preventDefault();
  };

  const onDragEnter = (e: DragEvent) => {
    updateOrder(order);
    e.currentTarget.scrollIntoView(false);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <TabElement
      $active={selected === value}
      $isDragging={isDragging}
      $order={order}
      onDragStart={onDragStart}
      onDragOver={preventDragEvent}
      onDragLeave={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onMouseDown={onMouseDown}
      onDragExit={preventDragEvent}
      draggable={list.length > 1}
      {...props}
    >
      {children}
      {typeof onClose === "function" && (
        <button onClick={onClose}>
          <Icon name="cross" />
        </button>
      )}
    </TabElement>
  );
};

Tab.displayName = "FileTab";

FileTabs.Tab = Tab;
