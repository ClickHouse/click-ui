// ClickHouse Click-UI - Main Library Entry Point
// ================================================
// This is the primary entry point for the @clickhouse/click-ui package.
// All exports are organized by category for clarity.

// ================================================
// Components
// ================================================

// Accordion
export { Accordion } from './components/Accordion';

// Alert
export {
  Alert,
  DangerAlert,
  InfoAlert,
  SuccessAlert,
  WarningAlert,
} from './components/Alert';

// AutoComplete
export { AutoComplete } from './components/AutoComplete';

// Avatar
export { Avatar } from './components/Avatar';

// Badge
export { Badge } from './components/Badge';

// BigStat
export { BigStat } from './components/BigStat';

// Button
export { Button } from './components/Button';
export { ButtonGroup } from './components/ButtonGroup';
export { SplitButton } from './components/SplitButton';

// Cards
export { CardHorizontal } from './components/CardHorizontal';
export { CardPrimary } from './components/CardPrimary';
export { CardPromotion } from './components/CardPromotion';
export { CardSecondary } from './components/CardSecondary';

// Checkbox
export { Checkbox } from './components/Checkbox';

// Code
export { CodeBlock } from './components/CodeBlock';
export { InlineCodeBlock } from './components/CodeBlock/InlineCodeBlock';

// Confirmation Dialog
export { ConfirmationDialog } from './components/ConfirmationDialog';

// Container & Grid
export { Container } from './components/Container';
export { Grid } from './components/Grid';
export { GridContainer } from './components/GridContainer';

// Context Menu
export { ContextMenu } from './components/ContextMenu';

// Date Details
export { DateDetails } from './components/DateDetails';

// Date Picker
export { DatePicker } from './components/DatePicker';
export { DateRangePicker } from './components/DatePicker/DateRangePicker';
export { getPredefinedMonthsForDateRangePicker } from './components/DatePicker/utils';

// Dialog
export { Dialog } from './components/Dialog';

// Dropdown
export { Dropdown } from './components/Dropdown';

// Ellipsis Content
export { EllipsisContent } from './components/EllipsisContent';

// File Upload & Tabs
export { FileMultiUpload, FileUpload } from './components/FileUpload';
export { FileTabs, FileTabElement } from './components/FileTabs';

// Flyout
export { Flyout } from './components/Flyout';

// Form Container
export { FormContainer } from './components/FormContainer';

// Generic Label
export { GenericLabel } from './components/GenericLabel';

// HoverCard
export { HoverCard } from './components/HoverCard';

// Icon
export { Icon } from './components/Icon';
export { IconButton } from './components/IconButton';

// Assets (Flags, Logos, etc.)
export { Flag as Flags } from './components/Assets/Flags/system/Flag';
export { Logo } from './components/Assets/Logos/system/Logo';
export { User as ProfileIcon } from './components/Assets/Icons/User';

// Label & Link
export { Label } from './components/Label';
export { Link } from './components/Link';
// TODO: This linkStyles require investigation
export { linkStyles } from './components/Link/common';

// Multi Accordion
export { MultiAccordion } from './components/MultiAccordion';

// Navigation
export { SidebarCollapsibleItem } from './components/SidebarCollapsibleItem';
export { SidebarCollapsibleTitle } from './components/SidebarCollapsibleTitle';
export { SidebarNavigationItem } from './components/SidebarNavigationItem';
export { SidebarNavigationTitle } from './components/SidebarNavigationTitle';

// Pagination
export { Pagination } from './components/Pagination';

// Panel
export { Panel } from './components/Panel';

// Popover
export { Popover } from './components/Popover';

// Progress Bar
export { ProgressBar } from './components/ProgressBar';

// Radio Group
export { RadioGroup } from './components/RadioGroup';

// Select
export { CheckboxMultiSelect } from './components/Select/CheckboxMultiSelect';
export { MultiSelect } from './components/Select/MultiSelect';
export { Select } from './components/Select/SingleSelect';

// Separator
export { Separator } from './components/Separator';

// Spacer
export { Spacer } from './components/Spacer';

// Switch
export { Switch } from './components/Switch';

// Table
export { Table } from './components/Table';

// Tabs
export { Tabs, FullWidthTabs } from './components/Tabs';

// Text Area
export { TextAreaField } from './components/Input/TextArea';

// Text Field & Related
export { NumberField } from './components/Input/NumberField';
export { PasswordField } from './components/Input/PasswordField';
export { SearchField } from './components/Input/SearchField';
export { TextField } from './components/Input/TextField';

// Toast
export { Toast, ToastProvider } from './components/Toast';
export { createToast } from './components/Toast/toastEmitter';
export { useToast } from './components/Toast/useToast';

// Tooltip
export { Tooltip } from './components/Tooltip/Tooltip';

// Typography
export { Text, Title } from './components/Typography';

// Vertical Stepper
export { VerticalStepper } from './components/VerticalStepper';

// ================================================
// Providers
// ================================================

// TODO: Having both ClickUIProvider and ThemeProvider exported is confusing.
// Consider consolidating to a single public provider API. For example, have ThemeProvider only!
export { ClickUIProvider, ThemeProvider } from './providers';

// ================================================
// Theme
// ================================================

export { THEMES } from './theme/theme.types';
export type { ThemeName, Theme } from './theme/theme.types';
export { themes } from './theme/theme.core';
export {
  isValidThemeName,
  getFallbackThemeName,
  getDefaultThemeName,
  getAvailableThemeNames,
} from './theme/theme.utils';

// ================================================
// Types
// ================================================

// Global shared types
export type { HorizontalDirection, Orientation, States, AssetSize } from './types';

// Component Types
export type { AlertProps } from './components/Alert';
export type {
  AutoCompleteOptionListItem,
  AutoCompleteProps,
  SelectGroupProps,
  SelectItemProps,
  SelectOptionItem,
} from './components/AutoComplete';
export type { AvatarProps } from './components/Avatar';
export type { BadgeProps } from './components/Badge';
export type { BadgeState, CardSecondaryProps } from './components/CardSecondary';
export type { BigStatProps } from './components/BigStat';
export type { ButtonGroupProps } from './components/ButtonGroup';
export type { ButtonProps, ButtonType } from './components/Button';
export type { CardHorizontalProps } from './components/CardHorizontal';
export type { CardPrimaryProps } from './components/CardPrimary';
export type { CardPromotionProps } from './components/CardPromotion';
export type { CheckboxMultiSelectProps } from './components/Select/CheckboxMultiSelect';
export type { CheckboxProps, CheckboxVariants } from './components/Checkbox';
export type { ConfirmationDialogProps } from './components/ConfirmationDialog';
export type { ContainerProps } from './components/Container';
export type { ContextMenuItemProps } from './components/ContextMenu';
export type { DateRange } from './components/DatePicker/utils';
export type { DialogContentProps } from './components/Dialog';
export type { FileTabStatusType } from './components/FileTabs';
export type {
  FlyoutFooterProps,
  FlyoutHeaderProps,
  FlyoutProps,
} from './components/Flyout';
export type { FormContainerProps } from './components/FormContainer';
export type { GenericLabelProps } from './components/GenericLabel';
export type { GridContainerProps } from './components/GridContainer';
export type {
  CellProps,
  GridContextMenuItemProps,
  GridProps,
  Rectangle,
  SelectedRegion,
  SelectionAction,
  SelectionFocus,
  SelectionPos,
} from './components/Grid/types';
export type { IconButtonProps } from './components/IconButton';
export type { ImageName as IconName } from './components/Icon/Icon.types';
export type { LabelProps } from './components/Label';
export type { Menu, SplitButtonProps } from './components/SplitButton';
export type { MultiAccordionProps } from './components/MultiAccordion';
export type { MultiSelectProps } from './components/Select/MultiSelect';
export type { NumberFieldProps } from './components/Input/NumberField';
export type { PaginationProps } from './components/Pagination';
export type { PanelProps } from './components/Panel';
export type { PasswordFieldProps } from './components/Input/PasswordField';
export type { ProgressBarProps } from './components/ProgressBar';
export type { RadioGroupItemProps, RadioGroupProps } from './components/RadioGroup';
export type { SearchFieldProps } from './components/Input/SearchField';
export type {
  SelectGroupOptionItem,
  SelectOptionListItem,
} from './components/Select/common/types';
export type { SelectProps } from './components/Select/SingleSelect';
export type { SidebarCollapsibleItemProps } from './components/SidebarCollapsibleItem';
export type { SidebarCollapsibleTitleProps } from './components/SidebarCollapsibleTitle';
export type { SidebarNavigationItemProps } from './components/SidebarNavigationItem';
export type { SidebarNavigationTitleProps } from './components/SidebarNavigationTitle';
export type { SpacerProps } from './components/Spacer';
export type { StyledLinkProps } from './components/Link/common';
export type {
  TableColumnConfigProps,
  TableHeaderType,
  TableProps,
  TableRowType,
} from './components/Table';
export type { TabsProps } from './components/Tabs';
export type { TextAreaFieldProps } from './components/Input/TextArea';
export type { TextProps } from './components/Typography/Text/Text';
export type { TitleProps } from './components/Typography/Title/Title';
export type { ToastProps } from './components/Toast';
export type { TooltipProps } from './components/Tooltip';
export type {
  VerticalStepperProps,
  VerticalStepProps,
} from './components/VerticalStepper';

// Radix UI Types (Re-exported for convenience)
export type { ContextMenuProps } from '@radix-ui/react-context-menu';
export type { DialogProps, DialogTriggerProps } from '@radix-ui/react-dialog';
export type { HoverCardProps } from '@radix-ui/react-hover-card';
export type { PopoverProps } from '@radix-ui/react-popover';
