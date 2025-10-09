import { Badge, BadgeProps } from "@/components";
import { DismissibleBadge, NonDismissibleBadge } from "@/components/Badge/Badge";
import { MouseEvent, useEffect, useId, useState } from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { SelectItemProps } from "./common/types";
import styles from "./MultiSelectValue.module.scss";

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
    <ReactSortable
      className={styles.cuiBadgeList}
      disabled={!sortable}
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
          <div
            className={styles.cuiMultiSelectBadge}
            key={`multi-select-${id}-${value}`}
          >
            <Badge
              size="sm"
              state={disabled ? "disabled" : "default"}
              {...otherProps}
            />
          </div>
        );
      })}
    </ReactSortable>
  );
};
