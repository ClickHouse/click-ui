import { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { ButtonGroupProps, SelectionValue } from './ButtonGroup.types';

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

  const buttons = options.map(({ value, label, ...buttonProps }) => {
    const isActive = isValueSelected(value, currentSelection);

    return (
      <Button
        key={value}
        $active={isActive}
        aria-pressed={isActive}
        $fillWidth={fillWidth}
        $type={type}
        onClick={() => onButtonGroupClickCommonHandler(value)}
        role="button"
        {...buttonProps}
      >
        {label}
      </Button>
    );
  });

  return (
    <ButtonGroupWrapper
      {...props}
      $fillWidth={fillWidth}
      $type={type}
      role="group"
    >
      {buttons}
    </ButtonGroupWrapper>
  );
};

import { ButtonGroupType } from './ButtonGroup.types';

const ButtonGroupWrapper = styled.div<{ $fillWidth: boolean; $type: ButtonGroupType }>`
  display: inline-flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme, $type }) =>
    `${theme.click.button.group.space.panel[$type].x} ${theme.click.button.group.space.panel[$type].y}`};
  gap: ${({ theme, $type }) => theme.click.button.group.space.panel[$type].gap};
  border: ${({ theme, $type }) =>
    $type === 'default'
      ? `1px solid ${theme.click.button.group.color.panel.stroke[$type]}`
      : 'none'};
  background: ${({ theme }) => theme.click.button.group.color.background.panel};
  border-radius: ${({ theme }) => theme.click.button.group.radii.panel.all};
  width: ${({ $fillWidth }) => ($fillWidth ? '100%' : 'auto')};
`;

const Button = styled.button<{
  $active: boolean;
  $fillWidth: boolean;
  $type: ButtonGroupType;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ $active, theme }) =>
    $active
      ? theme.click.button.group.color.background.active
      : theme.click.button.group.color.background.default};
  color: ${({ theme }) => theme.click.button.group.color.text.default};
  font: ${({ theme }) => theme.click.button.group.typography.label.default};
  padding: ${({ theme, $type }) =>
    `${theme.click.button.group.space.button[$type].y} ${theme.click.button.group.space.button[$type].x}`};
  ${({ $fillWidth }) => ($fillWidth ? 'flex: 1;' : '')};
  border-radius: ${({ theme, $type }) =>
    theme.click.button.group.radii.button[$type].all};
  cursor: pointer;
  border: none;

  &[aria-pressed='true'] {
    background: ${({ theme }) => theme.click.button.group.color.background.active};
    font: ${({ theme }) => theme.click.button.group.typography.label.active};
    color: ${({ theme }) => theme.click.button.group.color.text.active};
  }

  &:hover {
    background: ${({ theme }) => theme.click.button.group.color.background.hover};
    font: ${({ theme }) => theme.click.button.group.typography.label.hover};
    color: ${({ theme }) => theme.click.button.group.color.text.hover};
  }

  &:disabled {
    cursor: not-allowed;
    font: ${({ theme }) => theme.click.button.group.typography.label.disabled};
    color: ${({ theme }) => theme.click.button.group.color.text.disabled};
    background: ${({ theme, $active }) =>
      theme.click.button.group.color.background[
        $active ? 'disabled-active' : 'disabled'
      ]};

    &:active,
    &:focus,
    &[aria-pressed='true'] {
      color: ${({ theme }) => theme.click.button.group.color.text.disabled};
    }
  }

  &[aria-pressed='true'] {
    background: ${({ theme }) => theme.click.button.group.color.background.active};
    font: ${({ theme }) => theme.click.button.group.typography.label.active};
    color: ${({ theme }) => theme.click.button.group.color.text.active};
    &:disabled {
      background: ${({ theme }) =>
        theme.click.button.group.color.background['disabled-active']};
    }
  }
`;
