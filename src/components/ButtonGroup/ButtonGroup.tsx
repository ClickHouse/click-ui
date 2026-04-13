import { useCallback, useState } from 'react';
import { cn, cva } from '@/lib/cva';
import { ButtonGroupProps, SelectionValue } from './ButtonGroup.types';
import styles from './ButtonGroup.module.css';

const wrapperVariants = cva(styles.buttongroup, {
  variants: {
    type: {
      default: styles['buttongroup_type_default'],
      borderless: styles['buttongroup_type_borderless'],
    },
    fillWidth: {
      true: styles['buttongroup_fillwidth'],
    },
  },
  defaultVariants: { type: 'default' },
});

const buttonVariants = cva(styles.button, {
  variants: {
    type: {
      default: styles['button_type_default'],
      borderless: styles['button_type_borderless'],
    },
    fillWidth: {
      true: styles['button_fillwidth'],
    },
  },
  defaultVariants: { type: 'default' },
});

const normalizeToSet = (value: SelectionValue | undefined): Set<string> => {
  if (value === undefined) {
    return new Set();
  }
  if (value instanceof Set) {
    return new Set(value);
  }
  return new Set([value]);
};

const isValueSelected = (value: string, selection: Set<string>): boolean => {
  return selection.has(value);
};

export const ButtonGroup = ({
  options,
  selected,
  defaultSelected,
  fillWidth = false,
  onClick,
  type = 'default',
  multiple = false,
  'aria-label': ariaLabel,
  className,
  ...props
}: ButtonGroupProps) => {
  const [internalSelection, setInternalSelection] = useState<Set<string>>(() =>
    normalizeToSet(defaultSelected)
  );

  // Use `selected` if the parent needs to own
  // or sync the selection state management (controlled
  // by consumer app)
  // Use `defaultSelected` if the component can manage
  // its own state independently (uncontrolled)
  const isControlled = selected !== undefined;
  const currentSelection = isControlled ? normalizeToSet(selected) : internalSelection;

  const onButtonGroupClickCommonHandler = useCallback(
    (value: string) => {
      let newSelection: Set<string>;

      if (multiple) {
        newSelection = new Set(currentSelection);
        if (newSelection.has(value)) {
          newSelection.delete(value);
        } else {
          newSelection.add(value);
        }
      } else {
        newSelection = new Set([value]);
      }

      if (!isControlled) {
        setInternalSelection(newSelection);
      }

      // WARN: Single mode returns string
      // while multiple mode returns Set (DS)
      onClick?.(value, multiple ? newSelection : value);
    },
    [currentSelection, multiple, isControlled, onClick]
  );

  const buttons = options.map(({ value, label, disabled, ...buttonProps }) => {
    const isActive = isValueSelected(value, currentSelection);

    return (
      <button
        key={value}
        className={cn(
          buttonVariants({ type, fillWidth }),
          isActive && styles['button_active']
        )}
        aria-pressed={isActive}
        disabled={disabled}
        aria-disabled={disabled ? true : undefined}
        onClick={() => onButtonGroupClickCommonHandler(value)}
        {...buttonProps}
      >
        {label}
      </button>
    );
  });

  return (
    <div
      {...props}
      className={cn(wrapperVariants({ type, fillWidth }), className)}
      role="group"
      aria-label={ariaLabel}
    >
      {buttons}
    </div>
  );
};
