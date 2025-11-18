// =============================================================================
// Component Types - Optimized Export Structure
// =============================================================================

// Common utility types
export type States = "default" | "active" | "disabled" | "error" | "hover";
export type HorizontalDirection = "start" | "end";
export type Orientation = "horizontal" | "vertical";

// =============================================================================
// Core Component Types
// =============================================================================

// Alert components
export type { AlertProps } from "@/components/Alert/Alert";

// Avatar
export type { AvatarProps } from "@/components/Avatar/Avatar";

// Badge
export type { BadgeProps } from "@/components/Badge/Badge";
export type { BadgeState } from "@/components/CardSecondary/CardSecondary";

// Buttons
export type { ButtonProps, ButtonType } from "@/components/Button/Button";
export type { ButtonGroupProps } from "@/components/ButtonGroup/ButtonGroup";
export type { IconButtonProps } from "@/components/IconButton/IconButton";

// Cards
export type { CardPrimaryProps } from "@/components/CardPrimary/CardPrimary";
export type { CardSecondaryProps } from "@/components/CardSecondary/CardSecondary";
export type { CardHorizontalProps } from "@/components/CardHorizontal/CardHorizontal";
export type { CardPromotionProps } from "@/components/CardPromotion/CardPromotion";

// Form Controls
export type { CheckboxProps, CheckboxVariants } from "@/components/Checkbox/Checkbox";
export type { LabelProps } from "@/components/Label/Label";
export type { GenericLabelProps } from "@/components/GenericLabel/GenericLabel";
export type {
  RadioGroupProps,
  RadioGroupItemProps,
} from "@/components/RadioGroup/RadioGroup";

// Input Fields
export type { NumberFieldProps } from "@/components/Input/NumberField";
export type { PasswordFieldProps } from "@/components/Input/PasswordField";
export type { SearchFieldProps } from "@/components/Input/SearchField";
export type { TextAreaFieldProps } from "@/components/Input/TextArea";

// Select Components
export type { SelectProps } from "@/components/Select/SingleSelect";
export type { MultiSelectProps } from "@/components/Select/MultiSelect";
export type { CheckboxMultiSelectProps } from "@/components/Select/CheckboxMultiSelect";
export type {
  SelectOptionListItem,
  SelectGroupOptionItem,
  SelectOptionItem,
} from "@/components/Select/common/types";

// Layout & Container Components
export type { ContainerProps } from "@/components/Container/Container";
export type { FormContainerProps } from "@/components/FormContainer/FormContainer";
export type { GridContainerProps } from "@/components/GridContainer/GridContainer";
export type { PanelProps } from "@/components/Panel/Panel";
export type { SpacerProps } from "@/components/Spacer/Spacer";

// Navigation & Sidebar
export type { SidebarNavigationItemProps } from "@/components/SidebarNavigationItem/SidebarNavigationItem";
export type { SidebarNavigationTitleProps } from "@/components/SidebarNavigationTitle/SidebarNavigationTitle";
export type { SidebarCollapsibleItemProps } from "@/components/SidebarCollapsibleItem/SidebarCollapsibleItem";
export type { SidebarCollapsibleTitleProps } from "@/components/SidebarCollapsibleTitle/SidebarCollapsibleTitle";
export type { PaginationProps } from "@/components/Pagination/Pagination";

// Typography
export type { TextProps } from "@/components/Typography/Text/Text";
export type { TitleProps } from "@/components/Typography/Title/Title";

// Interactive Components
export type { TabsProps } from "@/components/Tabs/Tabs";
export type { TooltipProps } from "@/components/Tooltip/Tooltip";
export type { MultiAccordionProps } from "@/components/MultiAccordion/MultiAccordion";

// =============================================================================
// Advanced Components
// =============================================================================

// AutoComplete
export type {
  AutoCompleteProps,
  AutoCompleteOptionListItem,
} from "@/components/AutoComplete/AutoComplete";

// BigStat
export type { BigStatProps } from "@/components/BigStat/BigStat";

// Context Menu
export type { ContextMenuItemProps } from "@/components/ContextMenu/ContextMenu";

// Dialogs & Modals
export type { DialogContentProps } from "@/components/Dialog/Dialog";
export type { ConfirmationDialogProps } from "@/components/ConfirmationDialog/ConfirmationDialog";
export type {
  FlyoutProps,
  FlyoutFooterProps,
  FlyoutHeaderProps,
} from "@/components/Flyout/Flyout";

// File & Media Components
export type { FileTabStatusType } from "@/components/FileTabs/FileTabs";

// Grid System
export type {
  GridProps,
  CellProps,
  SelectedRegion,
  SelectionFocus,
  SelectionPos,
  SelectionAction,
  GridContextMenuItemProps,
  Rectangle,
} from "@/components/Grid/types";

// Progress & Status
export type { ProgressBarProps } from "@/components/ProgressBar/ProgressBar";

// Split Button
export type { Menu, SplitButtonProps } from "@/components/SplitButton/SplitButton";

// Table
export type { TableHeaderType, TableRowType, TableProps } from "@/components/Table/Table";

// Toast
export type { ToastProps } from "@/components/Toast/Toast";

// Vertical Stepper
export type {
  VerticalStepperProps,
  VerticalStepProps,
} from "@/components/VerticalStepper/VerticalStepper";

// =============================================================================
// External Library Types (Radix UI)
// =============================================================================

export type { PopoverProps } from "@radix-ui/react-popover";
export type { HoverCardProps } from "@radix-ui/react-hover-card";
export type { ContextMenuProps } from "@radix-ui/react-context-menu";
export type { DialogProps, DialogTriggerProps } from "@radix-ui/react-dialog";

// =============================================================================
// Icon & Utility Types
// =============================================================================

export type { ImageName as IconName } from "@/components/Icon/types";
export type { CursorOptions } from "@/components/cursorOptions";
