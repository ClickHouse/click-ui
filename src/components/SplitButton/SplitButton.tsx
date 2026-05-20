import { useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown } from '@/components/Dropdown';
import { BaseButton } from '@/components/Button/BaseButton';
import { IconWrapper } from '@/components/IconWrapper';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import { SplitButtonProps, Menu } from './SplitButton.types';
import styles from './SplitButton.module.css';

const triggerVariants = cva(styles.splitbutton__trigger, {
  variants: {
    type: {
      primary: styles.splitbutton__trigger_type_primary,
      secondary: styles.splitbutton__trigger_type_secondary,
    },
    fillWidth: {
      true: styles.splitbutton__trigger_fillwidth,
    },
    disabled: {
      true: styles.splitbutton__trigger_disabled,
    },
    interactive: {
      true: styles.splitbutton__trigger_interactive,
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

const primaryButtonVariants = cva(styles.splitbutton__primary, {
  variants: {
    type: {
      primary: styles.splitbutton__primary_type_primary,
      secondary: styles.splitbutton__primary_type_secondary,
    },
    fillWidth: {
      true: styles.splitbutton__primary_fillwidth,
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

const secondaryButtonVariants = cva(styles.splitbutton__secondary, {
  variants: {
    type: {
      primary: styles.splitbutton__secondary_type_primary,
      secondary: styles.splitbutton__secondary_type_secondary,
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

const iconWrapperWidthProps = { fillWidth: false } as const;

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
  className,
  ...props
}: SplitButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const dropdownContentStyle = useMemo(() => ({ minWidth: `${width}px` }), [width]);

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
        className={triggerVariants({ type, fillWidth, disabled, interactive: !disabled })}
        ref={ref}
      >
        <BaseButton
          className={cn(primaryButtonVariants({ type, fillWidth }), className)}
          disabled={disabled}
          {...props}
        >
          <IconWrapper
            {...iconWrapperWidthProps}
            icon={icon}
            iconDir={iconDir}
          >
            {children}
          </IconWrapper>
        </BaseButton>
        <BaseButton
          className={secondaryButtonVariants({ type })}
          as={Dropdown.Trigger}
          disabled={disabled}
          asChild
          data-testid="split-button-dropdown"
        >
          <span>
            <Icon
              name="chevron-down"
              size="sm"
            />
          </span>
        </BaseButton>
      </div>
      <Dropdown.Content
        style={dropdownContentStyle}
        side={side}
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
