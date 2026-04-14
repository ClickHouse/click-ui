import { useEffect, useRef, useState } from 'react';
import { cn, cva } from '@/lib/cva';
import { Dropdown } from '@/components/Dropdown';
import { BaseButton } from '@/components/Button/BaseButton';
import { IconWrapper } from '@/components/IconWrapper';
import { Icon } from '@/components/Icon';
import { SplitButtonProps, Menu } from './SplitButton.types';
import styles from './SplitButton.module.css';

const splitButtonVariants = cva(styles['split-button'], {
  variants: {
    type: {
      primary: styles['split-button_primary'],
      secondary: styles['split-button_secondary'],
    },
    fillWidth: {
      true: styles['split-button_fill-width'],
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

const primaryButtonVariants = cva(styles['split-button__primary-button'], {
  variants: {
    type: {
      primary: styles['split-button__primary-button_primary'],
      secondary: styles['split-button__primary-button_secondary'],
    },
    fillWidth: {
      true: styles['split-button__primary-button_fill-width'],
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

const secondaryButtonVariants = cva(styles['split-button__secondary-button'], {
  variants: {
    type: {
      primary: styles['split-button__secondary-button_primary'],
      secondary: styles['split-button__secondary-button_secondary'],
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

export const SplitButton = ({
  type = 'primary',
  disabled,
  menu,
  dir,
  open,
  defaultOpen,
  onOpenChange,
  modal,
  side,
  fillWidth,
  children,
  icon,
  iconDir = 'start',
  ...props
}: SplitButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const targetDiv = ref.current;
    if (!targetDiv) {
      return;
    }

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidth(entry.target.clientWidth);
      }
    });

    resizeObserver.observe(targetDiv);

    return () => {
      resizeObserver.unobserve(targetDiv);
    };
  }, []);

  return (
    <Dropdown
      dir={dir}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <div
        ref={ref}
        data-testid="split-button"
        className={cn(splitButtonVariants({ type, fillWidth }))}
        data-disabled={disabled ? '' : undefined}
      >
        <BaseButton
          type="button"
          disabled={disabled}
          aria-disabled={disabled || undefined}
          className={cn(primaryButtonVariants({ type, fillWidth }))}
          {...props}
        >
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
          >
            {children}
          </IconWrapper>
        </BaseButton>
        <Dropdown.Trigger
          asChild
          disabled={disabled}
          data-testid="split-button-dropdown"
        >
          <button
            type="button"
            className={cn(secondaryButtonVariants({ type }))}
            data-disabled={disabled ? '' : undefined}
            aria-disabled={disabled || undefined}
            aria-label="Open menu"
          >
            <span>
              <Icon
                name="chevron-down"
                size="sm"
                aria-hidden
              />
            </span>
          </button>
        </Dropdown.Trigger>
      </div>
      <Dropdown.Content
        side={side}
        style={{ minWidth: width }}
        sideOffset={4}
        align="end"
      >
        {menu.map((item: Menu, index: number) => (
          <MenuContentItem
            key={`split-menu-option-${index}`}
            parentKey={`split-menu-option-${index}`}
            {...item}
          />
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};

const MenuContentItem = ({
  items = [],
  type = 'item',
  label,
  icon,
  iconDir = 'start',
  parentKey,
  ...props
}: Menu & { parentKey: string }) => {
  if (type === 'item') {
    return (
      <Dropdown.Item {...props}>
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
        >
          {label}
        </IconWrapper>
      </Dropdown.Item>
    );
  }
  if (type === 'group') {
    return (
      <Dropdown.Group>
        {items.map((item, index) => (
          <MenuContentItem
            key={`${parentKey}-group-${index}`}
            parentKey={`${parentKey}-group-${index}`}
            {...item}
          />
        ))}
      </Dropdown.Group>
    );
  }
  if (type === 'sub-menu') {
    return (
      <Dropdown.Sub>
        <Dropdown.Trigger
          sub
          {...props}
        >
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
          >
            {label}
          </IconWrapper>
        </Dropdown.Trigger>
        <Dropdown.Content sub>
          {items.map((item, index) => (
            <MenuContentItem
              key={`${parentKey}-sub-menu-${index}`}
              parentKey={`${parentKey}-sub-menu-${index}`}
              {...item}
            />
          ))}
        </Dropdown.Content>
      </Dropdown.Sub>
    );
  }
};
