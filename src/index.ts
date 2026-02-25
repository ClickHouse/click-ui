// ClickHouse Click-UI - Main Library Entry Point
// ================================================
// This is the primary entry point for the @clickhouse/click-ui package.
// All exports are organized by category for clarity.

// ================================================
// Components
// REQUEST: Please keep the types next to the component
// to make it easier to maintain
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
export type { AlertProps } from './components/Alert';

// Assets (Flags, Logos, Icons)
export { Flag as Flags } from './components/Assets/Flags/system/Flag';
export { Logo } from './components/Assets/Logos/system/Logo';
export { User as ProfileIcon } from './components/Assets/Icons/User';

// AutoComplete
export { AutoComplete } from './components/AutoComplete';
export type {
  AutoCompleteOptionListItem,
  AutoCompleteProps,
  SelectGroupProps,
  SelectItemProps,
  SelectOptionItem,
} from './components/AutoComplete';

// Avatar
export { Avatar } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

// Badge
export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

// BigStat
export { BigStat } from './components/BigStat';
export type { BigStatProps } from './components/BigStat';

// Button
export { Button } from './components/Button';
export { ButtonGroup } from './components/ButtonGroup';
export { SplitButton } from './components/SplitButton';
export type { ButtonGroupProps } from './components/ButtonGroup';
export type { ButtonProps, ButtonType } from './components/Button';
export type { Menu, SplitButtonProps } from './components/SplitButton';

// Cards
export { CardHorizontal } from './components/CardHorizontal';
export { CardPrimary } from './components/CardPrimary';
export { CardPromotion } from './components/CardPromotion';
export { CardSecondary } from './components/CardSecondary';
export type { CardHorizontalProps } from './components/CardHorizontal';
export type { CardPrimaryProps } from './components/CardPrimary';
export type { CardPromotionProps } from './components/CardPromotion';
export type { BadgeState, CardSecondaryProps } from './components/CardSecondary';

// Checkbox
export { Checkbox } from './components/Checkbox';
export type { CheckboxProps, CheckboxVariants } from './components/Checkbox';

// Code
export { CodeBlock } from './components/CodeBlock';
export { InlineCodeBlock } from './components/CodeBlock/InlineCodeBlock';
export type { CodeThemeType } from './components/CodeBlock';

// Confirmation Dialog
export { ConfirmationDialog } from './components/ConfirmationDialog';
export type { ConfirmationDialogProps } from './components/ConfirmationDialog';

// Container & Grid
export { Container } from './components/Container';
export { Grid } from './components/Grid';
export { GridContainer } from './components/GridContainer';
export type { ContainerProps } from './components/Container';
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
export type { GridContainerProps } from './components/GridContainer';

// Context Menu
export { ContextMenu } from './components/ContextMenu';
export type { ContextMenuItemProps } from './components/ContextMenu';

// Date Details
export { DateDetails } from './components/DateDetails';

// Date Picker
export { DatePicker } from './components/DatePicker';
export { DateRangePicker } from './components/DatePicker/DateRangePicker';
export { getPredefinedMonthsForDateRangePicker } from './components/DatePicker/utils';
export type { DateRange } from './components/DatePicker/utils';

// Dialog
export { Dialog } from './components/Dialog';
export type { DialogContentProps } from './components/Dialog';

// Dropdown
export { Dropdown } from './components/Dropdown';

// Ellipsis Content
export { EllipsisContent } from './components/EllipsisContent';

// File Upload & Tabs
export { FileMultiUpload, FileUpload } from './components/FileUpload';
export { FileTabs, FileTabElement } from './components/FileTabs';
export type { FileTabStatusType } from './components/FileTabs';

// Flyout
export { Flyout } from './components/Flyout';
export type {
  FlyoutFooterProps,
  FlyoutHeaderProps,
  FlyoutProps,
} from './components/Flyout';

// Form Container
export { FormContainer } from './components/FormContainer';
export type { FormContainerProps } from './components/FormContainer';

// Generic Label
export { GenericLabel } from './components/GenericLabel';
export type { GenericLabelProps } from './components/GenericLabel';

// HoverCard
export { HoverCard } from './components/HoverCard';

// Icon
export { Icon } from './components/Icon';
export { IconButton } from './components/IconButton';
export type { IconButtonProps } from './components/IconButton';
export type { ImageName as IconName } from './components/Icon/Icon.types';

// Label & Link
export { Label } from './components/Label';
export { Link } from './components/Link';
// TODO: This linkStyles require investigation
export { linkStyles } from './components/Link/common';
export type { LabelProps } from './components/Label';

// Multi Accordion
export { MultiAccordion } from './components/MultiAccordion';
export type { MultiAccordionProps } from './components/MultiAccordion';

// Navigation
export { SidebarCollapsibleItem } from './components/SidebarCollapsibleItem';
export { SidebarCollapsibleTitle } from './components/SidebarCollapsibleTitle';
export { SidebarNavigationItem } from './components/SidebarNavigationItem';
export { SidebarNavigationTitle } from './components/SidebarNavigationTitle';
export type { SidebarCollapsibleItemProps } from './components/SidebarCollapsibleItem';
export type { SidebarCollapsibleTitleProps } from './components/SidebarCollapsibleTitle';
export type { SidebarNavigationItemProps } from './components/SidebarNavigationItem';
export type { SidebarNavigationTitleProps } from './components/SidebarNavigationTitle';

// Pagination
export { Pagination } from './components/Pagination';
export type { PaginationProps } from './components/Pagination';

// Panel
export { Panel } from './components/Panel';
export type { PanelProps } from './components/Panel';

// Popover
export { Popover } from './components/Popover';

// Progress Bar
export { ProgressBar } from './components/ProgressBar';
export type { ProgressBarProps } from './components/ProgressBar';

// Radio Group
export { RadioGroup } from './components/RadioGroup';
export type { RadioGroupItemProps, RadioGroupProps } from './components/RadioGroup';

// Select
export { CheckboxMultiSelect } from './components/Select/CheckboxMultiSelect';
export { MultiSelect } from './components/Select/MultiSelect';
export { Select } from './components/Select/SingleSelect';
export type { CheckboxMultiSelectProps } from './components/Select/CheckboxMultiSelect';
export type { MultiSelectProps } from './components/Select/MultiSelect';
export type {
  SelectGroupOptionItem,
  SelectOptionListItem,
} from './components/Select/common/types';
export type { SelectProps } from './components/Select/SingleSelect';

// Separator
export { Separator } from './components/Separator';

// Spacer
export { Spacer } from './components/Spacer';
export type { SpacerProps } from './components/Spacer';

// Switch
export { Switch } from './components/Switch';

// Table
export { Table } from './components/Table';
export type {
  TableColumnConfigProps,
  TableHeaderType,
  TableProps,
  TableRowType,
} from './components/Table';

// Tabs
export { Tabs, FullWidthTabs } from './components/Tabs';
export type { TabsProps } from './components/Tabs';

// Text Field & Related Inputs
export { NumberField } from './components/Input/NumberField';
export { PasswordField } from './components/Input/PasswordField';
export { SearchField } from './components/Input/SearchField';
export { TextField } from './components/Input/TextField';
export { TextAreaField } from './components/Input/TextArea';
export type { NumberFieldProps } from './components/Input/NumberField';
export type { PasswordFieldProps } from './components/Input/PasswordField';
export type { SearchFieldProps } from './components/Input/SearchField';
export type { TextAreaFieldProps } from './components/Input/TextArea';

// Toast
export { Toast, ToastProvider } from './components/Toast';
export { createToast } from './components/Toast/toastEmitter';
export { useToast } from './components/Toast/useToast';
export type { ToastProps } from './components/Toast';

// Tooltip
export { Tooltip } from './components/Tooltip/Tooltip';
export type { TooltipProps } from './components/Tooltip';

// Typography
export { Text, Title } from './components/Typography';
export type { TextProps } from './components/Typography/Text/Text';
export type { TitleProps } from './components/Typography/Title/Title';

// Vertical Stepper
export { VerticalStepper } from './components/VerticalStepper';
export type {
  VerticalStepperProps,
  VerticalStepProps,
} from './components/VerticalStepper';

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
// Global Types
// ================================================

export type { HorizontalDirection, Orientation, States, AssetSize } from './types';

// TODO: These should NOT be exposed
// prefer click ui props instead

// ================================================
// Radix UI Types
// ================================================

export type { ContextMenuProps } from '@radix-ui/react-context-menu';
export type { DialogProps, DialogTriggerProps } from '@radix-ui/react-dialog';
export type { HoverCardProps } from '@radix-ui/react-hover-card';
export type { PopoverProps } from '@radix-ui/react-popover';
