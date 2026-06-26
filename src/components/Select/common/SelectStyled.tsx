import {
  ComponentProps,
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import { Content, Root, Trigger } from '@radix-ui/react-popover';
import { cn } from '@/lib/cva';
import styles from './SelectStyled.module.css';

export const SelectPopoverRoot = Root;

export const SelectValue = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(styles['select-value'], className)}
    />
  )
);
SelectValue.displayName = 'SelectValue';

type StyledSelectTriggerProps = ComponentProps<typeof Trigger> & {
  $error: boolean;
};

export const StyledSelectTrigger = forwardRef<
  HTMLButtonElement,
  StyledSelectTriggerProps
>(({ $error, className, ...props }, ref) => (
  <Trigger
    ref={ref}
    {...props}
    className={cn(
      styles['select-trigger'],
      $error && styles['select-trigger_error'],
      className
    )}
  />
));
StyledSelectTrigger.displayName = 'StyledSelectTrigger';

type SelectPopoverContentProps = ComponentProps<typeof Content> & {
  $useFullWidthItems: boolean;
  $itemCharacterLimit?: string;
};

export const SelectPopoverContent = forwardRef<HTMLDivElement, SelectPopoverContentProps>(
  ({ $useFullWidthItems, $itemCharacterLimit, className, style, ...props }, ref) => (
    <Content
      ref={ref}
      {...props}
      style={
        {
          ...style,
          '--select-item-character-limit': $itemCharacterLimit,
        } as CSSProperties
      }
      className={cn(
        styles['select-popover-content'],
        $useFullWidthItems && styles['select-popover-content_full-width'],
        className
      )}
    />
  )
);
SelectPopoverContent.displayName = 'SelectPopoverContent';

type SearchBarContainerProps = HTMLAttributes<HTMLDivElement> & {
  $showSearch: boolean;
};

export const SearchBarContainer = forwardRef<HTMLDivElement, SearchBarContainerProps>(
  ({ $showSearch, className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(
        styles['search-bar-container'],
        $showSearch && styles['search-bar-container_show-search'],
        className
      )}
    />
  )
);
SearchBarContainer.displayName = 'SearchBarContainer';

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  $showSearch: boolean;
};

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ $showSearch, className, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={cn(
        styles['search-bar'],
        $showSearch && styles['search-bar_show-search'],
        className
      )}
    />
  )
);
SearchBar.displayName = 'SearchBar';

export const SelectList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(styles['select-list'], className)}
    />
  )
);
SelectList.displayName = 'SelectList';

type SelectListContentProps = HTMLAttributes<HTMLDivElement> & {
  $maxHeight?: string;
};

export const SelectListContent = forwardRef<HTMLDivElement, SelectListContentProps>(
  ({ $maxHeight, className, style, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={
        {
          ...style,
          '--select-list-max-height': $maxHeight,
        } as CSSProperties
      }
      className={cn(styles['select-list-content'], className)}
    />
  )
);
SelectListContent.displayName = 'SelectListContent';

export const HiddenSelectElement = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    {...props}
    className={cn(styles['hidden-select-element'], className)}
  />
));
HiddenSelectElement.displayName = 'HiddenSelectElement';

export const SelectGroupContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn(styles['select-group-container'], className)}
  />
));
SelectGroupContainer.displayName = 'SelectGroupContainer';

export const SelectGroupName = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(styles['select-group-name'], className)}
    />
  )
);
SelectGroupName.displayName = 'SelectGroupName';

export const SelectGroupContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn(styles['select-group-content'], className)}
  />
));
SelectGroupContent.displayName = 'SelectGroupContent';

type SelectNoDataContainerProps = HTMLAttributes<HTMLDivElement> & {
  $clickable: boolean;
};

export const SelectNoDataContainer = forwardRef<
  HTMLDivElement,
  SelectNoDataContainerProps
>(({ $clickable, className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn(
      styles['select-no-data-container'],
      $clickable && styles['select-no-data-container_clickable'],
      className
    )}
  />
));
SelectNoDataContainer.displayName = 'SelectNoDataContainer';

export const SelectItemDescriptionText = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn(styles['select-item-description-text'], className)}
  />
));
SelectItemDescriptionText.displayName = 'SelectItemDescriptionText';

// Exposed for InternalSelect's `as`-rendered elements (the search close button
// rendered as IconButton, and the check icon rendered as Icon) which apply
// these scoped classes directly rather than through a wrapper component.
export const selectStyles = styles;
