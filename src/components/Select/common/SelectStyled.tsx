import { Content, Root, Trigger } from "@radix-ui/react-popover";
import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./SelectStyled.module.scss";

export const SelectPopoverRoot: React.FC<React.ComponentPropsWithoutRef<typeof Root>> = ({
  ...props
}) => <Root {...props} />;

export const SelectValue = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(styles.cuiSelectValue, className)}
    {...props}
  />
));
SelectValue.displayName = "SelectValue";

export const StyledSelectTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger> & { $error: boolean }
>(({ className, $error, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={clsx(
      styles.cuiStyledSelectTrigger,
      {
        [styles.cuiError]: $error,
      },
      className
    )}
    {...props}
  />
));
StyledSelectTrigger.displayName = "StyledSelectTrigger";

export const SelectPopoverContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content> & {
    $useFullWidthItems: boolean;
    $itemCharacterLimit?: string;
  }
>(({ className, $useFullWidthItems, $itemCharacterLimit, style, ...props }, ref) => (
  <Content
    ref={ref}
    className={clsx(
      styles.cuiSelectPopoverContent,
      {
        [styles.cuiUseFullWidthItems]: $useFullWidthItems,
        [styles.cuiHasCharacterLimit]: $useFullWidthItems && $itemCharacterLimit,
      },
      className
    )}
    style={{
      ...style,
      ...($itemCharacterLimit &&
        ({ "--character-limit": $itemCharacterLimit } as React.CSSProperties)),
    }}
    {...props}
  />
));
SelectPopoverContent.displayName = "SelectPopoverContent";

export const SearchBarContainer = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { $showSearch: boolean }
>(({ className, $showSearch, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      styles.cuiSearchBarContainer,
      {
        [styles.cuiShowSearch]: $showSearch,
        [styles.cuiHideSearch]: !$showSearch,
      },
      className
    )}
    {...props}
  />
));
SearchBarContainer.displayName = "SearchBarContainer";

export const SearchBar = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & { $showSearch: boolean }
>(({ className, $showSearch, ...props }, ref) => (
  <input
    ref={ref}
    className={clsx(
      styles.cuiSearchBar,
      {
        [styles.cuiShowSearch]: $showSearch,
        [styles.cuiHideSearch]: !$showSearch,
      },
      className
    )}
    {...props}
  />
));
SearchBar.displayName = "SearchBar";

export const SearchClose = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & { $showClose: boolean }
>(({ className, $showClose, ...props }, ref) => (
  <button
    ref={ref}
    className={clsx(
      styles.cuiSearchClose,
      {
        [styles.cuiShowClose]: $showClose,
        [styles.cuiHideClose]: !$showClose,
      },
      className
    )}
    {...props}
  />
));
SearchClose.displayName = "SearchClose";

export const SelectList = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(styles.cuiSelectList, className)}
    {...props}
  />
));
SelectList.displayName = "SelectList";

export const SelectListContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { $maxHeight?: string }
>(({ className, $maxHeight, style, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      styles.cuiSelectListContent,
      {
        [styles.cuiHasMaxHeight]: !!$maxHeight,
      },
      className
    )}
    style={{
      ...style,
      ...($maxHeight && ({ "--max-height": $maxHeight } as React.CSSProperties)),
    }}
    {...props}
  />
));
SelectListContent.displayName = "SelectListContent";

export const HiddenSelectElement = forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<"select">
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={clsx(styles.cuiHiddenSelectElement, className)}
    {...props}
  />
));
HiddenSelectElement.displayName = "HiddenSelectElement";

export const SelectGroupContainer = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(styles.cuiSelectGroupContainer, className)}
    {...props}
  />
));
SelectGroupContainer.displayName = "SelectGroupContainer";

export const SelectGroupName = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(styles.cuiSelectGroupName, className)}
    {...props}
  />
));
SelectGroupName.displayName = "SelectGroupName";

export const SelectGroupContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(styles.cuiSelectGroupContent, className)}
    {...props}
  />
));
SelectGroupContent.displayName = "SelectGroupContent";

export const SelectNoDataContainer = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { $clickable: boolean }
>(({ className, $clickable, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      styles.cuiSelectNoDataContainer,
      {
        [styles.cuiClickable]: $clickable,
        [styles.cuiNonClickable]: !$clickable,
      },
      className
    )}
    {...props}
  />
));
SelectNoDataContainer.displayName = "SelectNoDataContainer";

export const SelectItemDescriptionText = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(styles.cuiSelectItemDescriptionText, className)}
    {...props}
  />
));
SelectItemDescriptionText.displayName = "SelectItemDescriptionText";
