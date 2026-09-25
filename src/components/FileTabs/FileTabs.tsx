import {
  HTMLAttributes,
  createContext,
  useContext,
  Children,
  useState,
  MouseEvent,
  useEffect,
  ReactNode,
  WheelEvent,
  useRef,
  CSSProperties,
} from 'react';
import { cn, cva } from '@/lib/cva';
import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import type { IconName } from '@/components/Icon/Icon.types';
import type { FileTabProps, FileTabsProps } from './FileTabs.types';
import styles from './FileTabs.module.css';

// TODO: Check if react-sortablejs has ESM version
import ReactSortableModule from 'react-sortablejs/dist/index.js';
import type { ItemInterface } from 'react-sortablejs';
const { ReactSortable } = ReactSortableModule;

interface ContextProps {
  selectedIndex?: number;
  onClose: (index: number) => void;
}

export const TabContext = createContext<ContextProps>({
  selectedIndex: undefined,
  onClose: () => null,
});

const useSelect = () => {
  const result = useContext(TabContext);
  if (!result) {
    throw new Error('Context used outside of its Provider!');
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
  className,
  ...props
}: FileTabsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<ItemInterface[]>(
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
        className={styles.tabs}
        style={
          {
            '--file-tabs-count-width': `${(listProp ?? list).length * 200}px`,
          } as CSSProperties
        }
      >
        <ReactSortable
          direction={direction ?? 'horizontal'}
          group={group ?? 'tabbar'}
          list={listProp ?? list}
          setList={setListProp ?? setList}
          onEnd={(evt, sortable, store) => {
            const { newDraggableIndex, oldDraggableIndex } = evt;
            if (
              typeof newDraggableIndex === 'number' &&
              typeof oldDraggableIndex === 'number' &&
              oldDraggableIndex !== newDraggableIndex
            ) {
              onReorderTab(oldDraggableIndex, newDraggableIndex);
            }
            if (typeof onEnd === 'function') {
              onEnd(evt, sortable, store);
            }
          }}
          revertOnSpill
          {...props}
          className={cn(styles['tabs-sortable'], className)}
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

const tabVariants = cva(styles.tab, {
  variants: {
    active: {
      true: styles.tab_active,
      false: styles.tab_inactive,
    },
    fixed: {
      true: styles.tab_fixed,
      false: styles['tab_full-width'],
    },
    preview: {
      true: styles.tab_preview,
      false: '',
    },
    dismissable: {
      true: styles.tab_dismissable,
      false: '',
    },
  },
  defaultVariants: {
    fixed: false,
    preview: false,
    dismissable: false,
  },
});

const Tab = ({
  text,
  index,
  icon,
  onMouseDown: onMouseDownProp,
  status = 'default',
  testId,
  preview,
  className,
  ...props
}: FileTabProps) => {
  const { selectedIndex, onClose: onCloseProp } = useSelect();
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
    if (typeof onMouseDownProp === 'function') {
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
      onMouseDown={onMouseDown}
      data-testid={testId ? `${testId}-${index}` : undefined}
      {...props}
      className={cn(
        tabVariants({
          active: selectedIndex === index,
          preview,
          dismissable: true,
        }),
        className
      )}
    >
      <div className={styles['tab-content']}>
        {typeof icon === 'string' ? <Icon name={icon as IconName} /> : icon}
        <span className={styles['tab-content-text']}>{text}</span>
      </div>
      <IconButton
        className={styles['empty-button']}
        htmlType="button"
        icon="cross"
        onClick={onClose}
        data-type="close"
        data-testid={testId ? `${testId}-${index}-close` : undefined}
      />
      <div
        className={styles.indicator}
        data-indicator={status}
        data-testid={testId ? `${testId}-${index}-status` : undefined}
      />
    </div>
  );
};

Tab.displayName = 'FileTab';

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
  className,
  ...props
}: FileTabElementProps) => {
  return (
    <div
      {...props}
      className={cn(tabVariants({ active, preview, fixed: true }), className)}
    >
      {typeof icon === 'string' ? <Icon name={icon as IconName} /> : icon}
      {children && <span className={styles['tab-content-text']}>{children}</span>}
    </div>
  );
};
