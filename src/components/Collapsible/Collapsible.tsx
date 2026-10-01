import {
  createContext,
  useState,
  HTMLAttributes,
  useContext,
  useEffect,
  forwardRef,
} from 'react';

import { cn, cva } from '@/lib/cva';
import { Icon, type ImageName } from '@/components/Icon';
import type { HorizontalDirection } from '@/types';
import { EmptyButton } from '@/components/EmptyButton';

import { IconWrapper } from './IconWrapper';
import { CollapsibleProps } from './Collapsible.types';
import styles from './Collapsible.module.css';

type ContextProps = {
  open: boolean;
  onOpenChange: () => void;
};

const NavContext = createContext<ContextProps>({
  open: false,
  onOpenChange: () => null,
});

export const Collapsible = ({
  open: openProp,
  onOpenChange: onOpenChangeProp,
  children,
  className,
  ...props
}: CollapsibleProps) => {
  const [open, setOpen] = useState(openProp ?? false);
  const onOpenChange = () => {
    setOpen(open => {
      if (typeof onOpenChangeProp === 'function') {
        onOpenChangeProp(!open);
      }
      return !open;
    });
  };

  useEffect(() => {
    setOpen(open => openProp ?? open);
  }, [openProp]);

  const value = {
    open: openProp ?? open,
    onOpenChange,
  };
  return (
    <div
      {...props}
      className={cn(styles.collapsible, className)}
    >
      <NavContext.Provider value={value}>{children}</NavContext.Provider>
    </div>
  );
};

const headerVariants = cva(styles.collapsible__header, {
  variants: {
    indicatorDir: {
      start: styles['collapsible__header_indicator-dir_start'],
      end: styles['collapsible__header_indicator-dir_end'],
    },
  },
  defaultVariants: {
    indicatorDir: 'start',
  },
});

interface CollapsipleHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  indicatorDir?: HorizontalDirection;
  wrapInTrigger?: boolean;
}

const CollapsipleHeader = forwardRef<HTMLDivElement, CollapsipleHeaderProps>(
  (
    {
      indicatorDir = 'start',
      icon,
      iconDir,
      children,
      wrapInTrigger,
      onClick: onClickProp,
      className,
      ...props
    }: CollapsipleHeaderProps,
    ref
  ) => {
    const { onOpenChange } = useContext(NavContext);
    return (
      <div
        ref={ref}
        onClick={e => {
          if (wrapInTrigger && typeof onOpenChange === 'function') {
            onOpenChange();
          }
          if (typeof onClickProp === 'function') {
            onClickProp(e);
          }
        }}
        data-collapsible-header
        {...props}
        className={cn(headerVariants({ indicatorDir }), className)}
      >
        {indicatorDir === 'start' && <Collapsible.Trigger />}
        {children && (
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
          >
            {children}
          </IconWrapper>
        )}
        {indicatorDir === 'end' && <Collapsible.Trigger />}
      </div>
    );
  }
);

CollapsipleHeader.displayName = 'CollapsibleHeader';
Collapsible.Header = CollapsipleHeader;

interface CollapsipleTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  indicatorDir?: HorizontalDirection;
}

const CollapsipleTrigger = ({
  onClick: onClickProp,
  children,
  indicatorDir = 'start',
  icon,
  iconDir = 'start',
  className,
  ...props
}: CollapsipleTriggerProps) => {
  const { open, onOpenChange } = useContext(NavContext);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClickProp) {
      onClickProp(e);
    }
    onOpenChange();
  };

  return (
    <EmptyButton
      onClick={onClick}
      aria-label="trigger children"
      {...props}
      className={cn(styles.collapsible__trigger, className)}
    >
      {indicatorDir === 'start' && (
        <Icon
          data-trigger-icon
          name="chevron-right"
          data-open={open.toString()}
          size="sm"
        />
      )}
      {children && (
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
        >
          {children}
        </IconWrapper>
      )}
      {indicatorDir === 'end' && (
        <Icon
          data-trigger-icon
          name="chevron-right"
          data-open={open.toString()}
          size="sm"
        />
      )}
    </EmptyButton>
  );
};

CollapsipleTrigger.displayName = 'CollapsibleTrigger';
Collapsible.Trigger = CollapsipleTrigger;

const contentVariants = cva(styles.collapsible__content, {
  variants: {
    indicatorDir: {
      start: styles['collapsible__content_indicator-dir_start'],
      end: styles['collapsible__content_indicator-dir_end'],
    },
  },
});

const CollapsipleContent = ({
  indicatorDir,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { indicatorDir?: HorizontalDirection }) => {
  const { open } = useContext(NavContext);
  if (!open) {
    return;
  }
  return (
    <div
      {...props}
      className={cn(contentVariants({ indicatorDir }), className)}
    />
  );
};

CollapsipleContent.displayName = 'CollapsibleContent';
Collapsible.Content = CollapsipleContent;
