import { useId, useMemo, useRef } from "react";
import { SelectContainerProps } from "./types";
import { Error, FormElementContainer, FormRoot } from "@/components/commonElement";
import { Root } from "@radix-ui/react-popover";
import styled from "styled-components";
import { Label } from "@/components";
import { SelectCommonContext } from "./SelectCommonContext";
import { SelectTriggerContext } from "./SelectTriggerContext";

const SelectPopoverRoot = styled(Root)`
  width: 100%;
`;

const SelectContainer = ({
  label,
  children,
  orientation,
  dir,
  disabled,
  id,
  error,
  value: selectedValues,
  onChange,
  onSelect,
  open,
  onOpenChange,
  name,
  required,
  form,
  onCreateOption,
  showCheck,
  sortable = false,
  ...props
}: SelectContainerProps) => {
  const defaultId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const triggerContextValue = useMemo(() => {
    return {
      id: id ?? defaultId,
      hasError: !!error && typeof error !== "undefined",
      disabled,
      form,
      name,
      required,
      triggerRef,
      sortable,
    };
  }, [id, defaultId, error, disabled, form, name, required, sortable]);

  const commonValue = useMemo(() => {
    return {
      selectedValues,
      onChange,
      onCreateOption,
      onSelect,
      showCheck,
      onOpenChange,
    };
  }, [onChange, onCreateOption, onOpenChange, onSelect, selectedValues, showCheck]);

  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      {...props}
    >
      <FormElementContainer>
        <SelectPopoverRoot
          open={open}
          onOpenChange={onOpenChange}
        >
          <SelectCommonContext.Provider value={commonValue}>
            <SelectTriggerContext.Provider value={triggerContextValue}>
              {children}
            </SelectTriggerContext.Provider>
          </SelectCommonContext.Provider>
        </SelectPopoverRoot>
        {triggerContextValue.hasError && <Error>{error}</Error>}
      </FormElementContainer>
      {label && (
        <Label
          htmlFor={id ?? defaultId}
          disabled={disabled}
          error={triggerContextValue.hasError}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};
export default SelectContainer;
