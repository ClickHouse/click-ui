import { Icon, Separator } from "@/components";
import { GenericMenuItem } from "@/components/GenericMenu";
import IconWrapper from "@/components/IconWrapper/IconWrapper";
import { HTMLAttributes, MouseEvent, ReactNode, forwardRef } from "react";
import { SelectItemProps } from "./types";
import { mergeRefs } from "@/utils/mergeRefs";
import styled from "styled-components";
import { useOption, useSearch } from "./useOption";
import { useSelect } from "./useSelect";

interface GroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "value" | "heading"> {
  heading?: ReactNode;
  value?: string;
}

const ComboboxGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  overflow: hidden;
  background: transparent;
  &[aria-selected] {
    outline: none;
  }

  ${({ theme }) => `
    font: ${theme.click.genericMenu.item.typography.sectionHeader.default};
    color: ${theme.click.genericMenu.item.color.text.muted};
  `};
  [cui-combobox-group-heading] {
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${({ theme }) => `
     font: ${theme.click.genericMenu.item.typography.sectionHeader.default};
     color: ${theme.click.genericMenu.item.color.text.muted};
     padding: ${theme.click.genericMenu.sectionHeader.space.top} ${theme.click.genericMenu.item.space.x} ${theme.click.genericMenu.sectionHeader.space.bottom};
     gap: ${theme.click.genericMenu.item.space.gap};
     border-bottom: 1px solid ${theme.click.genericMenu.item.color.stroke.default};
   `}
  }
  &[hidden] {
    display: none;
  }
`;

const ComboboxGroupContent = styled.div`
  width: inherit;
`;

export const SelectGroup = forwardRef<HTMLDivElement, GroupProps>(
  ({ children, heading, ...props }, forwardedRef) => {
    useSearch();
    return (
      <ComboboxGroupContainer
        {...props}
        ref={mergeRefs([
          forwardedRef,
          node => {
            const hidden = node?.querySelectorAll("[cui-combobox-item]").length === 0;
            if (hidden) {
              node?.setAttribute("hidden", "");
            } else {
              node?.removeAttribute("hidden");
            }
          },
        ])}
      >
        <div cui-combobox-group-heading="">{heading}</div>
        <ComboboxGroupContent>{children}</ComboboxGroupContent>
      </ComboboxGroupContainer>
    );
  }
);

SelectGroup.displayName = "Select.Group";

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  (
    {
      disabled = false,
      children,
      separator,
      onSelect: onSelectProp,
      value = "",
      icon,
      iconDir,
      onMouseOver: onMouseOverProp,
      ...props
    },
    forwardedRef
  ) => {
    const { selectedValues, onSelect, showCheck } = useSelect();
    const { highlighted, updateHighlighted, isHidden } = useOption();
    const onSelectValue = () => {
      if (!disabled) {
        onSelect(value);
        if (typeof onSelectProp == "function") {
          onSelectProp(value);
        }
      }
    };
    const onMouseOver = (e: MouseEvent<HTMLDivElement>) => {
      if (onMouseOverProp) {
        onMouseOverProp(e);
      }
      if (!disabled) {
        updateHighlighted(value);
      }
    };

    if (isHidden("item", value)) {
      return null;
    }
    const isChecked = selectedValues.includes(value);

    return (
      <>
        <GenericMenuItem
          {...props}
          data-value={value}
          onClick={onSelectValue}
          onMouseOver={onMouseOver}
          ref={forwardedRef}
          data-state={isChecked ? "checked" : "unchecked"}
          data-disabled={disabled ? true : undefined}
          data-highlighted={highlighted == value ? "true" : undefined}
          cui-combobox-item=""
        >
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
          >
            {children}
          </IconWrapper>
          {showCheck && isChecked && (
            <Icon
              name="check"
              size="sm"
            />
          )}
        </GenericMenuItem>
        {separator && <Separator size="sm" />}
      </>
    );
  }
);

SelectItem.displayName = "Select.Item";

const SelectNoDataContainer = styled.button<{ $clickable: boolean }>`
  border: none;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;

  &[hidden="true"] {
    display: none;
  }
  ${({ theme, $clickable }) => `
    font: ${theme.click.genericMenu.button.typography.label.default}
    padding: ${theme.click.genericMenu.button.space.y} ${
    theme.click.genericMenu.item.space.x
  };
    background: ${theme.click.genericMenu.button.color.background.default};
    color: ${theme.click.genericMenu.button.color.label.default};
    &:hover {
      font: ${theme.click.genericMenu.button.typography.label.hover};
    }
    cursor: ${$clickable ? "pointer" : "default"}
  `}
`;

type SelectNoDataProps = Omit<HTMLAttributes<HTMLButtonElement>, "children"> & {
  children?: string;
};

export const SelectNoData = forwardRef<HTMLButtonElement, SelectNoDataProps>(
  ({ children, onClick: onClickProp, ...props }, ref): ReactNode => {
    const { onSelect, onCreateOption } = useSelect();
    const { search, isHidden } = useOption();
    if (isHidden("empty")) {
      return null;
    }
    const clickable = typeof onCreateOption === "function";
    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (typeof onClickProp === "function") {
        onClickProp(e);
      }
      if (clickable && !e.defaultPrevented) {
        onCreateOption(search);
        onSelect(search);
      }
    };
    return (
      <SelectNoDataContainer
        onClick={onClick}
        $clickable={clickable}
        ref={ref}
        {...props}
      >
        {typeof children === "string"
          ? children.replaceAll("{search}", search)
          : `
          No Options found${search.length > 0 ? ` for "${search}" ` : ""}
        `}
      </SelectNoDataContainer>
    );
  }
);
