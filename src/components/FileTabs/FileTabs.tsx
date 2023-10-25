import {
  HTMLAttributes,
  createContext,
  useContext,
  ReactElement,
  Children,
  useState,
  MouseEvent,
  useEffect,
  ReactNode,
  WheelEvent,
  useRef,
} from "react";
import styled from "styled-components";
import { Icon, IconButton } from "@/components";
import { IconName } from "../Icon/types";
import {
  ItemInterface,
  ReactSortable,
  ReactSortableProps,
  Sortable,
  Store,
} from "react-sortablejs";

export type FileTabStatusType =
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
const TabsSortableContainer = styled.div`
  display: flex;
  & > div {
    outline: none;
    min-width: 100px;
    width: clamp(100px, 100%, 200px);
    &.sortable-ghost {
      opacity: 0;
    }
  }
`;

interface ContextProps {
  selectedIndex?: number;
  onClose: (index: number) => void;
}

export const TabContext = createContext<ContextProps>({
  selectedIndex: undefined,
  onClose: () => null,
});

export interface FileTabProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  onClose?: () => void;
  index: number;
  status?: FileTabStatusType;
  icon?: IconName | ReactNode;
  text: string;
  testId?: string;
  preview?: boolean;
}
export interface FileTabsProps
  extends Omit<ReactSortableProps<ItemInterface>, "onSelect" | "list" | "setList"> {
  selectedIndex?: number;
  children: ReactElement<FileTabProps> | Array<ReactElement<FileTabProps>>;
  onReorderTab: (sourcePosition: number, destinationPosition: number) => void;
  onClose: (index: number) => void;
  onSelect: (index: number) => void;
  list?: Array<ItemInterface>;
  setList?: (
    newState: Array<ItemInterface>,
    sortable: Sortable | null,
    store: Store
  ) => void;
}

const useSelect = () => {
  const result = useContext(TabContext);
  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }
  return result;
};

export const FileTabs = ({
  selectedIndex,
  children,
  onReorderTab,
  onClose: onCloseProp,
  onSelect: onSelectProp,
  list: listProp,
  setList: setListProp,
  onEnd,
  direction,
  group,
  ...props
}: FileTabsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<Array<ItemInterface>>(
    Children.map(children, (_, index) => ({
      id: `tab-element-${index}`,
    }))
  );
  useEffect(() => {
    setList(
      Children.map(children, (_, index) => ({
        id: `tab-element-${index}`,
      }))
    );
  }, [children]);

  const onClose = (index: number) => {
    onCloseProp(index);
    setList(list => {
      list.splice(index, 1);
      return [...list];
    });
  };

  const onSelect = (index: number) => () => {
    onSelectProp(index);
  };

  const value = {
    selectedIndex,
    onClose,
  };

  const onWheel = (evt: WheelEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollLeft += evt.deltaY;
    }
  };
  return (
    <TabContext.Provider value={value}>
      <TabsContainer
        ref={ref}
        onWheel={onWheel}
        onScroll={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <TabsSortableContainer
          as={ReactSortable}
          direction={direction ?? "horizontal"}
          group={group ?? "tabbar"}
          list={listProp ?? list}
          setList={setListProp ?? setList}
          onEnd={(evt, sortable, store) => {
            const { newDraggableIndex, oldDraggableIndex } = evt;
            if (
              typeof newDraggableIndex === "number" &&
              typeof oldDraggableIndex === "number" &&
              oldDraggableIndex !== newDraggableIndex
            ) {
              onReorderTab(oldDraggableIndex, newDraggableIndex);
            }
            if (typeof onEnd === "function") {
              onEnd(evt, sortable, store);
            }
          }}
          revertOnSpill
          {...props}
        >
          {Children.map(children, (child, index) => (
            <div
              tabIndex={index}
              role="tab"
              onClick={onSelect(index)}
              key={`tab-element-${index}`}
            >
              {child}
            </div>
          ))}
        </TabsSortableContainer>
      </TabsContainer>
    </TabContext.Provider>
  );
};

const TabElement = styled.div<{
  $active: boolean;
  $preview?: boolean;
}>`
  display: grid;
  justify-content: flex-start;
  align-items: center;
  outline: none;
  width: 100%;
  max-width: 100%;
  max-width: -webkit-fill-available;
  max-width: fill-available;
  max-width: stretch;
  border: none;
  ${({ theme, $active, $preview }) => `
    grid-template-columns: 1fr ${theme.click.tabs.fileTabs.icon.size.width};
    padding: ${theme.click.tabs.fileTabs.space.y} ${theme.click.tabs.fileTabs.space.x};
    gap: ${theme.click.tabs.fileTabs.space.gap};
    border-radius: ${theme.click.tabs.fileTabs.radii.all};
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
    ${$preview === true ? "font-style: italic;" : ""}
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

const Indicator = styled.div<{ $status: FileTabStatusType }>`
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

const EmptyButton = styled.button`
  padding: 0;
`;

const Tab = ({
  text,
  index,
  icon,
  onMouseDown: onMouseDownProp,
  status = "default",
  testId,
  preview,
  ...props
}: FileTabProps) => {
  const { selectedIndex, onClose: onCloseProp } = useSelect();
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    if (typeof onMouseDownProp === "function") {
      onMouseDownProp(e);
    }
  };

  const onClose = () => {
    onCloseProp(index);
  };

  return (
    <TabElement
      $active={selectedIndex === index}
      onMouseDown={onMouseDown}
      data-testid={testId ? `${testId}-${index}` : undefined}
      $preview={preview}
      {...props}
    >
      <TabContent>
        {typeof icon === "string" ? <Icon name={icon as IconName} /> : icon}
        <TabContentText>{text}</TabContentText>
      </TabContent>
      <EmptyButton
        as={IconButton}
        icon="cross"
        onClick={onClose}
        data-type="close"
        data-testid={testId ? `${testId}-${index}-close` : undefined}
      />
      <Indicator
        $status={status}
        data-indicator={status}
        data-testid={testId ? `${testId}-${index}-status` : undefined}
      />
    </TabElement>
  );
};

Tab.displayName = "FileTab";

FileTabs.Tab = Tab;

interface FileTabElementProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconName | ReactNode;
  active?: boolean;
  preview?: boolean;
}
export const FileTabElement = ({
  icon,
  children,
  active = false,
  preview,
  ...props
}: FileTabElementProps) => {
  return (
    <TabElement
      $active={active}
      $preview={preview}
      {...props}
    >
      <TabContent>
        {typeof icon === "string" ? <Icon name={icon as IconName} /> : icon}
        {children && <TabContentText>{children}</TabContentText>}
      </TabContent>
    </TabElement>
  );
};
