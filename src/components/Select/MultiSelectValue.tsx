import { Badge, BadgeProps, DismissibleBadge, NonDismissibleBadge } from '@/components/Badge';
import { MouseEvent, useEffect, useId, useState } from 'react';
// import { ItemInterface, ReactSortable } from "react-sortablejs";
import ReactSortableModule from 'react-sortablejs/dist/index.js';
import type { ItemInterface } from 'react-sortablejs';
const { ReactSortable } = ReactSortableModule;

import { styled } from 'styled-components';
import { SelectItemProps } from './common/types';

const BadgeList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: inherit;
  font: inherit;
  color: inherit;
`;

const MultiSelectBadge = styled(Badge)`
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  max-width: fit-content;
`;

interface MultiSelectValueProps {
  selectedValues: Array<string>;
  valueNode: Map<string, SelectItemProps>;
  onChange: (selectedValues: Array<string>) => void;
  onSelect: (selectedValue: string) => void;
  sortable: boolean;
  disabled: boolean;
}

export const MultiSelectValue = ({
  selectedValues,
  valueNode,
  onChange,
  sortable,
  onSelect,
  disabled,
}: MultiSelectValueProps) => {
  const id = useId();
  const [values, setValues] = useState<Array<ItemInterface>>(
    selectedValues.map(value => ({
      id: `multi-select-${id}-${value}`,
      value,
    }))
  );
  useEffect(() => {
    setValues(
      selectedValues.map(value => ({
        id: `multi-select-${id}-${value}`,
        value,
      }))
    );
  }, [id, selectedValues]);
  if (selectedValues.length === 0) {
    return null;
  }

  return (
    <BadgeList
      as={ReactSortable}
      disabled={!sortable}
      list={values}
      setList={setValues}
      onEnd={e => {
        const { newDraggableIndex, oldDraggableIndex } = e;
        if (
          typeof newDraggableIndex === 'number' &&
          typeof oldDraggableIndex === 'number' &&
          oldDraggableIndex !== newDraggableIndex
        ) {
          const temp = selectedValues[oldDraggableIndex];
          selectedValues[oldDraggableIndex] = selectedValues[newDraggableIndex];
          selectedValues[newDraggableIndex] = temp;
          onChange(selectedValues);
        }
      }}
      revertOnSpill
    >
      {selectedValues.map(value => {
        const nodeProps = valueNode.get(value) ?? { children: value, value: value };
        let otherProps: BadgeProps = {
          text: nodeProps.label ?? nodeProps.children,
          icon: nodeProps?.icon,
          iconDir: nodeProps?.iconDir,
        } as NonDismissibleBadge;
        if (!disabled && !nodeProps.disabled) {
          otherProps = {
            ...otherProps,
            dismissible: true,
            onClose: (e: MouseEvent<HTMLOrSVGElement>) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(nodeProps.value);
            },
          } as DismissibleBadge;
        }
        return (
          <MultiSelectBadge
            key={`multi-select-${id}-${value}`}
            size="sm"
            state={disabled ? 'disabled' : 'default'}
            {...otherProps}
          />
        );
      })}
    </BadgeList>
  );
};
