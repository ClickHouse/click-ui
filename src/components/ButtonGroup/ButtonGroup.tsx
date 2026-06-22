import { forwardRef, useCallback, useState } from 'react';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import { ButtonGroupProps, SelectionValue } from './ButtonGroup.types';
import styles from './ButtonGroup.module.css';

const wrapperVariants = cva(styles.buttongroup, {
  variants: {
    type: {
      default: styles['buttongroup_type_default'],
      borderless: styles['buttongroup_type_borderless'],
      iconOnly: styles['buttongroup_type_iconOnly'],
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
      iconOnly: styles['button_type_iconOnly'],
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

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      options,
      selected,
      defaultSelected,
      fillWidth = false,
      onClick,
      type = 'default',
      multiple = false,
      className,
      ...props
    },
    ref
  ) => {
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

    const buttons = options.map(
      ({
        value,
        label,
        icon,
        className: optionClassName,
        'aria-label': ariaLabel,
        ...buttonProps
      }) => {
        const isActive = isValueSelected(value, currentSelection);
        const isIconOnly = type === 'iconOnly';

        return (
          <button
            key={value}
            className={cn(buttonVariants({ type, fillWidth }), optionClassName)}
            aria-pressed={isActive}
            onClick={() => onButtonGroupClickCommonHandler(value)}
            role="button"
            {...buttonProps}
            aria-label={ariaLabel ?? (isIconOnly && icon ? icon.toString() : undefined)}
          >
            {isIconOnly && icon ? (
              <span className={styles.button__icon}>
                <Icon
                  name={icon}
                  aria-hidden
                />
              </span>
            ) : (
              label
            )}
          </button>
        );
      }
    );

    return (
      <div
        ref={ref}
        {...props}
        className={cn(wrapperVariants({ type, fillWidth }), className)}
        role="group"
      >
        {buttons}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
