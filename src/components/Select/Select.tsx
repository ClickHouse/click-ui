import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Icon, Label } from "@/components";
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

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir"> {
  label?: ReactNode;
  children?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  isFormControl?: boolean;
  value?: string;
  dir?: "start" | "end";
  orientation?: "horizontal" | "vertical";
  onCreateOption?: (search: string) => void;
  showCheck?: boolean;
}

export type SelectProps = RadixPopover.PopoverProps & Props;

const SelectPopoverRoot = styled(RadixPopover.Root)`
  width: 100%;
`;

const SelectValueContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: default;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &[aria-selected] {
    outline: none;
  }

  ${({ theme }) => `
    gap: ${theme.click.field.space.gap};
    font: ${theme.click.field.typography.fieldText.default};
    color: ${theme.click.field.color.text.default};
    &[data-selected="true"] {
      font: ${theme.click.field.typography.fieldText.hover};
      color:${theme.click.field.color.text.hover};
      cursor: pointer;
    }
    &[data-state="checked"] {
      color:${theme.click.field.color.text.active};
      font: ${theme.click.field.typography.fieldText.active};
    }
    &[data-disabled] {
      color:${theme.click.field.color.text.disabled};
      font: ${theme.click.field.typography.fieldText.disabled};
      pointer-events: none;
    }
  `};
`;

export const Select = ({
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
}: SelectProps) => {
  const defaultId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(defaultOpen ?? openProp);
  const hasError = !!error && typeof error !== "undefined";

  const onSelect = (value: Array<string>) => {
    if (typeof onChange === "function") {
      onChange(value[0]);
    }
    onOpenChange(false);
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
            value={valueProp ?? defaultValue}
            onSelect={onSelect}
            id={id ?? defaultId}
            hasError={hasError}
            disabled={disabled}
            inputRef={inputRef}
            onCreateOption={onCreateOption}
            showCheck={showCheck}
            type="Select"
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

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ placeholder = "Select an option", onClick: onClickProp, ...props }, ref) => {
    const [, forceUpate] = useState(0);
    const { disabled, id, hasError, selectedValues, updateSearch, getValueProps } =
      useCombobox();
    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (typeof onClickProp === "function") {
        onClickProp(e);
      }
      updateSearch("");
    };
    const nodeProps =
      selectedValues.length === 0 ? null : getValueProps(selectedValues[0]);
    useEffect(() => {
      forceUpate(n => n + 1);
    }, []);

    return (
      <ComboboxTrigger
        ref={ref}
        id={id}
        $error={hasError}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {nodeProps ? (
          <SelectValueContainer>
            <IconWrapper
              icon={nodeProps.icon}
              iconDir={nodeProps.iconDir}
            >
              {nodeProps.children}
            </IconWrapper>
          </SelectValueContainer>
        ) : (
          <SelectValueContainer>{placeholder}</SelectValueContainer>
        )}
        <Icon
          name="sort"
          size="sm"
        />
      </ComboboxTrigger>
    );
  }
);

Trigger.displayName = "Select.Trigger";
Select.Trigger = Trigger;

ComboboxContent.displayName = "Select.Content";
Select.Content = ComboboxContent;

ComboboxGroup.displayName = "Select.Group";
Select.Group = ComboboxGroup;

ComboboxItem.displayName = "Select.Item";
Select.Item = ComboboxItem;

ComboboxNoData.displayName = "SelectNoData";
Select.NoData = ComboboxNoData;
