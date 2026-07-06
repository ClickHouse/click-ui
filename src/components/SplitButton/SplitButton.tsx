import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown } from '@/components/Dropdown';
import { BaseButton } from '@/components/Button/BaseButton';
import { IconWrapper } from '@/components/IconWrapper';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import { SplitButtonProps, Menu } from './SplitButton.types';
import styles from './SplitButton.module.css';

const triggerVariants = cva(styles['split-button'], {
  variants: {
    type: {
      primary: styles['split-button_type_primary'],
      secondary: styles['split-button_type_secondary'],
    },
    fillWidth: {
      true: styles['split-button_fill-width'],
    },
    disabled: {
      true: styles['split-button_disabled'],
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

const primaryVariants = cva(styles['split-button__primary'], {
  variants: {
    fillWidth: {
      true: styles['split-button__primary_fill-width'],
    },
  },
});

export const SplitButton = ({
  type = 'primary',
  htmlType,
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
  className,
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

  const contentStyle = useMemo(
    () =>
      ({
        '--split-button-dropdown-min-width': `${width}px`,
      }) as CSSProperties,
    [width]
  );

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
        className={cn(triggerVariants({ type, fillWidth, disabled }))}
      >
        <BaseButton
          disabled={disabled}
          {...props}
          type={htmlType}
          className={cn(primaryVariants({ fillWidth }), className)}
        >
          <IconWrapper
            className={styles['split-button__button-data']}
            icon={icon}
            iconDir={iconDir}
          >
            {children}
          </IconWrapper>
        </BaseButton>
        <Dropdown.Trigger
          disabled={disabled}
          asChild
          data-testid="split-button-dropdown"
          className={styles['split-button__secondary']}
        >
          <span>
            <Icon
              name="chevron-down"
              size="sm"
            />
          </span>
        </Dropdown.Trigger>
      </div>
      <Dropdown.Content
        side={side}
        sideOffset={4}
        align="end"
        className={styles['split-button__dropdown-content']}
        style={contentStyle}
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
