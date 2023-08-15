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
  useEffect,
  ReactNode,
} from "react";
import { styled } from "styled-components";
import { Icon, IconButton } from "@/components";
import { IconName } from "../Icon/types";

export type StatusType =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "warning"
  | "info";

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
  onSelect: (value: string) => void;
  onClose: (value: string) => void;
}

export const TabContext = createContext<ContextProps>({
  selected: undefined,
  list: [],
  updateOrder: () => null,
  dragElementContainer: { current: null },
  onSelect: () => null,
  onClose: () => null,
});

interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  onClose?: () => void;
  value: string;
  status?: StatusType;
  icon?: IconName | ReactNode;
  text: string;
  testId?: string;
}
interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClose" | "onSelect"> {
  selected?: string;
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>;
  onReorderTab: (props: {
    sourcePosition: number;
    destinationPosition: number;
    sourceValue: string;
  }) => void;
  onClose: (value: string, index: number) => void;
  onSelect: (value: string, index: number) => void;
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
  onClose: onCloseProp,
  onSelect: onSelectProp,
  ...props
}: Props) => {
  const dragElement = useRef<DragElementType | null>(null);
  const dragElementContainer = useRef<HTMLDivElement>(null);
  const [orderList, setOrderList] = useState<Array<string>>(
    getOrderFromChildren(children)
  );

  useEffect(() => {
    setOrderList(getOrderFromChildren(children));
  }, [children]);
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

  const onClose = (value: string) => {
    const index = orderList.findIndex(option => option === value);
    onCloseProp(value, index);
    setOrderList((list: string[]) => {
      list.splice(index, 1);
      return [...list];
    });
  };

  const onSelect = (value: string) => {
    const index = orderList.findIndex(option => option === value);
    onSelectProp(value, index);
  };

  const value = {
    dragElementContainer,
    selected,
    list: orderList,
    updateOrder,
    onSelect,
    onClose,
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

const TabElement = styled.div<{
  $active: boolean;
  $order: number;
  $isDragging?: boolean;
}>`
  display: grid;
  justify-content: flex-start;
  align-items: center;
  outline: none;
  min-width: 100px;
  width: clamp(100px, 100%, 200px);
  border: none;
  ${({ theme, $active, $order, $isDragging }) => `
    grid-template-columns: 1fr ${theme.click.tabs.fileTabs.icon.size.width};
    padding: ${theme.click.tabs.fileTabs.space.y} ${theme.click.tabs.fileTabs.space.x};
    gap: ${theme.click.tabs.fileTabs.space.gap};
    border-radius: ${theme.click.tabs.fileTabs.radii.all};
    order: ${$order};
    opacity: ${$isDragging ? 0 : 1};
    border-right: 1px solid ${theme.click.tabs.fileTabs.color.stroke.default};
    background: ${theme.click.tabs.fileTabs.color.background.default};
    color: ${theme.click.tabs.fileTabs.color.text.default};
    font: ${theme.click.tabs.fileTabs.typography.label.default};
    svg,
    [data-indicator] {
      height: ${theme.click.tabs.fileTabs.icon.size.height};
      width: ${theme.click.tabs.fileTabs.icon.size.width};
    }
    ${
      $active
        ? `
          background: ${theme.click.tabs.fileTabs.color.background.active};
          color: ${theme.click.tabs.fileTabs.color.text.active};
          font: ${theme.click.tabs.fileTabs.typography.label.active};
          border-right: 1px solid ${theme.click.tabs.fileTabs.color.stroke.active};
        `
        : `
          &:hover {
            background: ${theme.click.tabs.fileTabs.color.background.hover};
            color: ${theme.click.tabs.fileTabs.color.text.hover};
            font: ${theme.click.tabs.fileTabs.typography.label.hover};
            border-right: 1px solid ${theme.click.tabs.fileTabs.color.stroke.hover};
          }
        `
    }
  `}
  [data-type="close"] {
    display: none;
  }
  [data-indicator] {
    display: block;
  }
  &:hover {
    [data-type="close"] {
      display: block;
    }
    [data-indicator] {
      display: none;
    }
  }
`;

const Indicator = styled.div<{ $status: StatusType }>`
  position: relative;
  &::after {
    position: absolute;
    left: 0.25rem;
    top: 0.25rem;
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    ${({ theme, $status }) => `
      background: ${
        $status === "default" ? "transparent" : theme.click.alert.color.text[$status]
      };
      border-radius: 50%;
  `}
  }
`;

const TabContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  gap: ${({ theme }) => theme.click.tabs.fileTabs.space.gap};
`;

const TabContentText = styled.span`
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const EmptyButton = styled(IconButton)`
  padding: 0;
`;

const Tab = ({
  text,
  value,
  icon,
  onMouseDown: onMouseDownProp,
  status = "default",
  testId,
  ...props
}: TabProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const {
    selected,
    updateOrder,
    list,
    dragElementContainer,
    onSelect,
    onClose: onCloseProp,
  } = useSelect();
  const order = list.findIndex(element => element === value) ?? 0;
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (typeof onMouseDownProp === "function") {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      onMouseDownProp(e);
      onSelect(value);
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

  const onClose = () => {
    onCloseProp(value);
  };

  return (
    <TabElement
      tabIndex={order}
      role="tab"
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
      data-testid={testId ? `${testId}-${value}` : undefined}
      {...props}
    >
      <TabContent>
        {typeof icon === "string" ? <Icon name={icon as IconName} /> : icon}
        <TabContentText>{text}</TabContentText>
      </TabContent>
      <EmptyButton
        icon="cross"
        onClick={onClose}
        data-type="close"
        data-testid={testId ? `${testId}-${value}-close` : undefined}
      />
      <Indicator
        $status={status}
        data-indicator={status}
        data-testid={testId ? `${testId}-${value}-status` : undefined}
      />
    </TabElement>
  );
};

Tab.displayName = "FileTab";

FileTabs.Tab = Tab;
