import {
  createContext,
  useState,
  HTMLAttributes,
  MouseEvent,
  useContext,
  useEffect,
  forwardRef,
} from 'react';
import { styled } from 'styled-components';
import { Icon, HorizontalDirection, IconName } from '@/components';
import { EmptyButton } from '../commonElement';
import { IconWrapper } from './IconWrapper';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

type ContextProps = {
  open: boolean;
  onOpenChange: () => void;
};

const NavContext = createContext<ContextProps>({
  open: false,
  onOpenChange: () => null,
});
const CollapsibleContainer = styled.div`
  width: 100%;
  [data-trigger-icon] {
    visibility: hidden;
    transition: transform 150ms cubic-bezier(0.87, 0, 0.13, 1);
    &[data-open='true'] {
      transform: rotate(90deg);
    }
  }
  [data-collapsible-header]:hover [data-trigger-icon] {
    visibility: visible;
  }
`;

export const Collapsible = ({
  open: openProp,
  onOpenChange: onOpenChangeProp,
  children,
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
    <CollapsibleContainer {...props}>
      <NavContext.Provider value={value}>{children}</NavContext.Provider>
    </CollapsibleContainer>
  );
};

const CollapsipleHeaderContainer = styled.div<{ $indicatorDir: HorizontalDirection }>`
  margin-left: ${({ theme, $indicatorDir }) =>
    $indicatorDir === 'start' ? 0 : theme.click.image.sm.size.width};
  user-select: none;
`;

interface CollapsipleHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconName;
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
      ...props
    }: CollapsipleHeaderProps,
    ref
  ) => {
    const { onOpenChange } = useContext(NavContext);
    return (
      <CollapsipleHeaderContainer
        $indicatorDir={indicatorDir}
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
      </CollapsipleHeaderContainer>
    );
  }
);

CollapsipleHeader.displayName = 'CollapsibleHeader';
Collapsible.Header = CollapsipleHeader;

const CollapsipleTriggerButton = styled(EmptyButton)<{
  $indicatorDir: HorizontalDirection;
}>`
  display: flex;
  align-items: center;
  font: inherit;
  color: inherit;
  cursor: inherit;
`;
interface CollapsipleTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  indicatorDir?: HorizontalDirection;
}

const CollapsipleTrigger = ({
  onClick: onClickProp,
  children,
  indicatorDir = 'start',
  icon,
  iconDir = 'start',
  ...props
}: CollapsipleTriggerProps) => {
  const { open, onOpenChange } = useContext(NavContext);
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClickProp) {
      onClickProp(e);
    }
    onOpenChange();
  };

  return (
    <CollapsipleTriggerButton
      onClick={onClick}
      $indicatorDir={indicatorDir}
      aria-label="trigger children"
      {...props}
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
    </CollapsipleTriggerButton>
  );
};

CollapsipleTrigger.displayName = 'CollapsibleTrigger';
Collapsible.Trigger = CollapsipleTrigger;

const CollapsibleContentWrapper = styled.div<{ $indicatorDir?: HorizontalDirection }>`
  ${({ theme, $indicatorDir }) =>
    $indicatorDir
      ? `${$indicatorDir === 'start' ? 'margin-left' : 'margin-right'}: ${
          theme.click.image.sm.size.width
        }`
      : ''}
`;

const CollapsipleContent = ({
  indicatorDir,
  ...props
}: HTMLAttributes<HTMLDivElement> & { indicatorDir?: HorizontalDirection }) => {
  const { open } = useContext(NavContext);
  if (!open) {
    return;
  }
  return (
    <CollapsibleContentWrapper
      $indicatorDir={indicatorDir}
      {...props}
    />
  );
};

CollapsipleContent.displayName = 'CollapsibleContent';
Collapsible.Content = CollapsipleContent;
