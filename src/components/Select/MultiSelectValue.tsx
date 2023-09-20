import { Badge, BadgeProps } from "@/components";
import { DismissibleBadge, NonDismissibleBadge } from "@/components/Badge/Badge";
import { MouseEvent, useEffect, useId, useState } from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import styled from "styled-components";
import { SelectItemProps } from "./common/types";

const BadgeList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: inherit;
  font: inherit;
  color: inherit;
`;

interface MultiSelectValueProps {
  selectedValues: Array<string>;
  valueNode: Map<string, SelectItemProps>;
  onChange: (selectedValues: Array<string>) => void;
  onSelect: (selectedValue: string) => void;
  sortable: boolean;
  disabled: boolean;
  onOpenChange: (open?: boolean) => void;
}

export const MultiSelectValue = ({
  selectedValues,
  valueNode,
  onChange,
  sortable,
  onSelect,
  disabled,
  onOpenChange,
}: MultiSelectValueProps) => {
  const id = useId();
  const [values, setValues] = useState<Array<ItemInterface>>(
    selectedValues.map(value => ({
      id: `multi-select-${id}-${value}`,
      value,
      filtered: sortable,
    }))
  );
  useEffect(() => {
    setValues(
      selectedValues.map(value => ({
        id: `multi-select-${id}-${value}`,
        value,
        filtered: sortable,
      }))
    );
  }, [id, selectedValues, sortable]);
  if (selectedValues.length === 0) {
    return null;
  }
  return (
    <BadgeList
      as={ReactSortable}
      list={values}
      setList={setValues}
      onEnd={e => {
        const { newDraggableIndex, oldDraggableIndex } = e;
        if (
          typeof newDraggableIndex === "number" &&
          typeof oldDraggableIndex === "number" &&
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
          text: nodeProps.children,
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
          <div key={`multi-select-${id}-${value}`}>
            <Badge
              size="sm"
              state={disabled ? "disabled" : "default"}
              onClick={() => onOpenChange()}
              {...otherProps}
            />
          </div>
        );
      })}
    </BadgeList>
  );
};
