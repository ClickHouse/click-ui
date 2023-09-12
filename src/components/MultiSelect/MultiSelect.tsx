import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  forwardRef,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Badge, BadgeProps, Icon, Label } from "@/components";
import { Error, FormElementContainer, FormRoot } from "../commonElement";
import styled from "styled-components";
import {
  ComboboxGroup,
  ComboboxItem,
  ComboboxNoData,
  ComboboxTrigger,
  IconWrapper,
  ComboboxContent,
} from "../Combobox/ComboBoxElements";
import { useCombobox } from "../Combobox/useCombobox";
import { ComboboxProvider } from "../Combobox/ComboboxProvider";
import { DismissibleBadge, NonDismissibleBadge } from "../Badge/Badge";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir"> {
  label?: ReactNode;
  children?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  defaultValue?: Array<string>;
  onChange?: (value: Array<string>) => void;
  name?: string;
  required?: boolean;
  isFormControl?: boolean;
  value?: Array<string>;
  dir?: "start" | "end";
  orientation?: "horizontal" | "vertical";
  onCreateOption?: (search: string) => void;
  showCheck?: boolean;
  sortable?: true;
}

export type MultiSelectProps = RadixPopover.PopoverProps & Props;

const SelectPopoverRoot = styled(RadixPopover.Root)`
  width: 100%;
`;

export const MultiSelect = ({
  label,
  children,
  orientation,
  dir,
  disabled,
  id,
  error,
  value: valueProp,
  defaultValue,
  onChange,
  open: openProp,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  name,
  required,
  isFormControl,
  onCreateOption,
  showCheck,
  ...props
}: MultiSelectProps) => {
  const defaultId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(defaultOpen ?? openProp);
  const hasError = !!error && typeof error !== "undefined";

  const onSelect = (value: Array<string>) => {
    if (typeof onChange === "function") {
      onChange(value);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (typeof onOpenChangeProp === "function") {
      onOpenChangeProp(open);
    }
    setOpen(open);
  };

  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      {...props}
    >
      <FormElementContainer>
        {isFormControl && (
          <input
            ref={inputRef}
            type="hidden"
            name={name}
            required={required}
          />
        )}
        <SelectPopoverRoot
          open={openProp ?? open}
          onOpenChange={onOpenChange}
        >
          <ComboboxProvider
            type="MultiSelect"
            value={valueProp ?? defaultValue}
            onSelect={onSelect}
            id={id ?? defaultId}
            hasError={hasError}
            disabled={disabled}
            inputRef={inputRef}
            onCreateOption={onCreateOption}
            showCheck={showCheck}
          >
            {children}
          </ComboboxProvider>
        </SelectPopoverRoot>
        {hasError && <Error>{error}</Error>}
      </FormElementContainer>
      {label && (
        <Label
          htmlFor={id ?? defaultId}
          disabled={disabled}
          error={hasError}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

interface TriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  placeholder?: string;
}

const BadgeList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: inherit;
  //click-field-space-gap
`;

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ placeholder = "Select an option", onClick: onClickProp, ...props }, ref) => {
    const { disabled, id, hasError, selectedValueNodeProps, onSelect, updateSearch } =
      useCombobox();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (typeof onClickProp === "function") {
        onClickProp(e);
      }
      updateSearch("");
    };

    return (
      <ComboboxTrigger
        ref={ref}
        id={id}
        $error={hasError}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {selectedValueNodeProps.length > 0 ? (
          <BadgeList>
            {selectedValueNodeProps.map((nodeProps, index) => {
              let otherProps: BadgeProps = {
                text: (
                  <IconWrapper
                    icon={nodeProps.icon}
                    iconDir={nodeProps.iconDir}
                    size="xs"
                  >
                    {nodeProps.children}
                  </IconWrapper>
                ),
              } as NonDismissibleBadge;
              if (!disabled && !nodeProps.disabled) {
                otherProps = {
                  ...otherProps,
                  dismissible: true,
                  onClose: () => {
                    onSelect(nodeProps.value);
                  },
                } as DismissibleBadge;
              }
              return (
                <div key={`multi-select-${id}-${index}`}>
                  <Badge
                    size="sm"
                    state={disabled ? "disabled" : "default"}
                    {...otherProps}
                  />
                </div>
              );
            })}
          </BadgeList>
        ) : (
          placeholder
        )}
        <Icon
          name="sort"
          size="sm"
        />
      </ComboboxTrigger>
    );
  }
);

Trigger.displayName = "MultiSelect.Trigger";
MultiSelect.Trigger = Trigger;

ComboboxContent.displayName = "MultiSelect.Content";
MultiSelect.Content = ComboboxContent;

ComboboxGroup.displayName = "MultiSelect.Group";
MultiSelect.Group = ComboboxGroup;

ComboboxItem.displayName = "MultiSelect.Item";
MultiSelect.Item = ComboboxItem;

ComboboxNoData.displayName = "SelectNoData";
MultiSelect.NoData = ComboboxNoData;
