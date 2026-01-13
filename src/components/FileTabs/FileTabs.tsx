"use client";

import {
  ComponentPropsWithoutRef,
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
import clsx from "clsx";
import { Icon, IconButton } from "@/components";
import { IconName } from "@/components/Icon/types";
import {
  ItemInterface,
  ReactSortable,
  ReactSortableProps,
  Sortable,
  Store,
} from "react-sortablejs";
import styles from "./FileTabs.module.scss";

export type FileTabStatusType =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "warning"
  | "info";

interface ContextProps {
  selectedIndex?: number;
  onClose: (index: number) => void;
}

export const TabContext = createContext<ContextProps>({
  selectedIndex: undefined,
  onClose: () => null,
});

export interface FileTabProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Callback when the tab is closed */
  onClose?: () => void;
  /** Index of the tab in the list */
  index: number;
  /** Status indicator for the tab */
  status?: FileTabStatusType;
  /** Icon to display in the tab */
  icon?: IconName | ReactNode;
  /** Text to display in the tab */
  text: string;
  /** Test ID for testing */
  testId?: string;
  /** Whether the tab is in preview mode (italic text) */
  preview?: boolean;
}
export interface FileTabsProps extends Omit<
  ReactSortableProps<ItemInterface>,
  "onSelect" | "list" | "setList"
> {
  /** Index of the currently selected tab */
  selectedIndex?: number;
  /** The tab elements to render */
  children: ReactElement<FileTabProps> | Array<ReactElement<FileTabProps>>;
  /** Callback when a tab is reordered via drag and drop */
  onReorderTab: (sourcePosition: number, destinationPosition: number) => void;
  /** Callback when a tab is closed */
  onClose: (index: number) => void;
  /** Callback when a tab is selected */
  onSelect: (index: number) => void;
  /** List of items for sortable functionality */
  list?: Array<ItemInterface>;
  /** Setter for the sortable list */
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
      <div
        ref={ref}
        onWheel={onWheel}
        role="tablist"
        onScroll={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={styles.cuiTabsContainer}
        style={
          {
            "--dynamic-max-width": `${(listProp ?? list).length * 200}px`,
          } as React.CSSProperties
        }
      >
        <ReactSortable
          className={styles.cuiTabsSortableContainer}
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
              tabIndex={index + 1}
              role="tab"
              onClick={onSelect(index)}
              key={`tab-element-${index}`}
            >
              {child}
            </div>
          ))}
        </ReactSortable>
      </div>
    </TabContext.Provider>
  );
};

const Tab = ({
  text,
  index,
  icon,
  onMouseDown: onMouseDownProp,
  status = "default",
  testId,
  preview,
  className,
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

  const onClose = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    onCloseProp(index);
  };

  return (
    <div
      className={clsx(
        styles.cuiTabElement,
        {
          [styles.cuiActive]: selectedIndex === index,
          [styles.cuiPreview]: preview,
          [styles.cuiDismissable]: true,
        },
        className
      )}
      onMouseDown={onMouseDown}
      data-testid={testId ? `${testId}-${index}` : undefined}
      {...props}
    >
      <div className={styles.cuiTabContent}>
        {typeof icon === "string" ? <Icon name={icon as IconName} /> : icon}
        <span className={styles.cuiTabContentText}>{text}</span>
      </div>
      <IconButton
        className={styles.cuiEmptyButton}
        icon="cross"
        onClick={onClose}
        data-type="close"
        data-testid={testId ? `${testId}-${index}-close` : undefined}
      />
      <div
        className={clsx(styles.cuiIndicator, styles[status])}
        data-indicator={status}
        data-testid={testId ? `${testId}-${index}-status` : undefined}
      />
    </div>
  );
};

Tab.displayName = "FileTab";

FileTabs.Tab = Tab;

interface FileTabElementProps extends ComponentPropsWithoutRef<"div"> {
  icon?: IconName | ReactNode;
  active?: boolean;
  preview?: boolean;
}
export const FileTabElement = ({
  icon,
  children,
  active = false,
  preview,
  className,
  ...props
}: FileTabElementProps) => {
  return (
    <div
      className={clsx(
        styles.cuiTabElement,
        {
          [styles.cuiActive]: active,
          [styles.cuiPreview]: preview,
          [styles.cuiFixedTabElement]: true,
        },
        className
      )}
      {...props}
    >
      {typeof icon === "string" ? <Icon name={icon as IconName} /> : icon}
      {children && <span className={styles.cuiTabContentText}>{children}</span>}
    </div>
  );
};
