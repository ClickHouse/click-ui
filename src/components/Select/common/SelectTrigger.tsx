import { Trigger } from "@radix-ui/react-popover";
import { HTMLAttributes, forwardRef } from "react";
import styled from "styled-components";
import { Icon } from "@/components";
import { useSelectTrigger } from "./useSelectTrigger";

export const StyledSelectTrigger = styled(Trigger)<{ $error: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  span:first-of-type {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${({ theme, $error }) => `
    border-radius: ${theme.click.field.radii.all};
    padding: ${theme.click.field.space.y} ${theme.click.field.space.x};
    gap: ${theme.click.field.space.gap};
    font: ${theme.click.field.typography.fieldText.default};
    color: ${theme.click.field.color.text.default};
    border: 1px solid ${theme.click.field.color.stroke.default};
    background: ${theme.click.field.color.background.default};
    &:hover {
      border: 1px solid ${theme.click.field.color.stroke.hover};
      background: ${theme.click.field.color.background.hover};
      color: ${theme.click.field.color.text.hover};
    }
    ${
      $error
        ? `
      font: ${theme.click.field.typography.fieldText.error};
      border: 1px solid ${theme.click.field.color.stroke.error};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.error};
      &:hover {
      border: 1px solid ${theme.click.field.color.stroke.error};
      color: ${theme.click.field.color.text.error};
      }
    `
        : `
    &:focus,
    &[data-state="open"] {
      font: ${theme.click.field.typography.fieldText.active};
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.active};
      & ~ label {
        color: ${theme.click.field.color.label.active};
        font: ${theme.click.field.typography.label.active};;
      }
    }
    `
    };
    &:disabled {
      font: ${theme.click.field.typography.fieldText.disabled};
      border: 1px solid ${theme.click.field.color.stroke.disabled};
      background: ${theme.click.field.color.background.disabled};
      color: ${theme.click.field.color.text.disabled};
    }
  `}
`;

interface TriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  placeholder?: string;
}

const SelectValue = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: inherit;
  color: inherit;
  font: inherit;
`;

const PlaceHolder = styled.div`
  display: none;
  color: inherit;
  cursor: inherit;
  font: inherit;
  width: 100%;
`;
const ValueContainer = styled.div`
  font: inherit;
  color: inherit;
  cursor: inherit;
  width: 100%;
  gap: inherit;
  display: flex;
  &:empty {
    display: none;
    & ~ ${PlaceHolder} {
      display: flex;
    }
  }
`;
const SelectTrigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ placeholder = "Select an option", ...props }, ref) => {
    const { disabled, id, hasError, triggerRef } = useSelectTrigger();
    return (
      <StyledSelectTrigger
        ref={ref}
        id={id}
        $error={hasError}
        disabled={disabled}
        {...props}
      >
        <SelectValue>
          <ValueContainer ref={triggerRef}></ValueContainer>
          <PlaceHolder>{placeholder}</PlaceHolder>
        </SelectValue>
        <Icon
          name="sort"
          size="sm"
        />
      </StyledSelectTrigger>
    );
  }
);

export default SelectTrigger;
