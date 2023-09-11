import {
  FocusEvent,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Badge, BadgeProps, Icon, Label } from "@/components";
import { Error, FormElementContainer, FormRoot } from "../commonElement";
import styled from "styled-components";
import {
  ComboboxContent,
  ComboboxGroup,
  ComboboxItem,
  ComboboxNoData,
  ComboboxTrigger,
  IconWrapper,
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
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  isFormControl?: boolean;
  value?: Array<string>;
  dir?: "start" | "end";
  orientation?: "horizontal" | "vertical";
}

export type SelectProps = RadixPopover.PopoverProps & Props;

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
  ...props
}: SelectProps) => {
  const defaultId = useId();
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
            isMultiSelect
            value={valueProp ?? defaultValue}
            onSelect={onSelect}
            id={id ?? defaultId}
            hasError={hasError}
            disabled={disabled}
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
  ({ placeholder = "Select an option", ...props }, ref) => {
    const {
      disabled,
      id,
      hasError,
      selectedValueNodeProps,
      search,
      onKeyDown: onKeyDownContext,
      updateSearch,
      onSelect,
    } = useCombobox();

    const valueList = useMemo(() => {
      return selectedValueNodeProps.map((nodeProps, index) => {
        let otherProps: BadgeProps = {
          text: (
            <IconWrapper
              icon={nodeProps.icon}
              iconDir={nodeProps.iconDir}
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
          <Badge
            key={`multi-select-${id}-${index}`}
            size="sm"
            state={disabled ? "disabled" : "default"}
            {...otherProps}
          />
        );
      });
    }, [selectedValueNodeProps, disabled, id, onSelect]);
    return (
      <ComboboxTrigger
        ref={ref}
        id={id}
        $error={hasError}
        disabled={disabled}
        cui-select-trigger=""
        {...props}
      >
        {valueList}
        <input
          value={search}
          onChange={e => updateSearch(e.target.value)}
          data-testid="select-search-input"
          onKeyDown={onKeyDownContext}
          placeholder={placeholder}
        />
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

const SelectList = styled.div`
  width: inherit;
`;

const Content = ({
  onFocus: onFocusProp,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { updateChildren, onKeyDown: onKeyDownContext } = useCombobox();

  useEffect(() => {
    updateChildren(children, "Select");
  }, [children, updateChildren]);

  const onFocus = (e: FocusEvent<HTMLDivElement, Element>) => {
    if (onFocusProp) {
      onFocusProp(e);
    }
  };

  return (
    <>
      <RadixPopover.Portal>
        <ComboboxContent
          sideOffset={5}
          onFocus={onFocus}
          {...props}
        >
          <SelectList onKeyDown={onKeyDownContext}>{children}</SelectList>
        </ComboboxContent>
      </RadixPopover.Portal>
    </>
  );
};

Content.displayName = "MultiSelect.Content";
MultiSelect.Content = Content;

ComboboxGroup.displayName = "MultiSelect.Group";
MultiSelect.Group = ComboboxGroup;

ComboboxItem.displayName = "MultiSelect.Item";
MultiSelect.Item = ComboboxItem;

ComboboxNoData.displayName = "SelectNoData";
MultiSelect.NoData = ComboboxNoData;
