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
export type {
  FlagName,
  FlagProps,
  LogoName,
  LogoProps,
  IconName,
  PaymentName,
} from '@clickhouse/icons';

// Re-export from @clickhouse/icons
export {
  IconsLight,
  IconsDark,
  LogosLight,
  LogosDark,
  FlagsLight,
  FlagsDark,
  PaymentsLight,
  PaymentsDark,
  resolveAssetName,
  createAssetResolver,
  ASSET_NAME_MAPPINGS,
} from '@clickhouse/icons';
export type {
  ThemeName,
  AssetSize,
  SVGAssetProps,
  AssetAlias,
  AssetDeprecatedName,
} from '@clickhouse/icons';

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
export type { DatePickerProps } from './components/DatePicker';
export { DateRangePicker } from './components/DatePicker/DateRangePicker';
export type { DateRangePickerProps } from './components/DatePicker/DateRangePicker';
export { DateTimeRangePicker } from './components/DatePicker/DateTimeRangePicker';
export type { DateTimeRangePickerProps } from './components/DatePicker/DateTimeRangePicker';
export { getPredefinedMonthsForDateRangePicker } from './components/DatePicker/utils';
export type { DateRange } from './components/DatePicker/utils';

// Dialog
export { Dialog } from './components/Dialog';
export type {
  DialogContentProps,
  DialogProps,
  DialogTriggerProps,
} from './components/Dialog';

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
  FlyoutAlignmentType,
  FlyoutContentProps,
  FlyoutFooterProps,
  FlyoutHeaderProps,
  FlyoutProps,
  FlyoutSizeType,
  FlyoutStrategy,
  FlyoutTriggerProps,
  FlyoutType,
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
export type { ImageName } from './components/Icon/Icon.types';

// Label & Link
export { Label } from './components/Label';
export { Link } from './components/Link';
export type { LabelProps } from './components/Label';
export type { LinkProps } from './components/Link';

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
export { Select } from './components/Select';
export { MultiSelect } from './components/MultiSelect';
export { CheckboxMultiSelect } from './components/CheckboxMultiSelect';
export type {
  SelectGroupOptionItem,
  SelectOptionListItem,
  SelectProps,
  SelectionType,
} from './components/Select';
export type { MultiSelectProps } from './components/MultiSelect';
export type { CheckboxMultiSelectProps } from './components/CheckboxMultiSelect';

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
  MobileLayoutProp,
  TableColumnConfigProps,
  TableHeaderType,
  TableProps,
  TableRowType,
} from './components/Table';

// Tabs
export { Tabs, FullWidthTabs } from './components/Tabs';
export type { TabsProps } from './components/Tabs';

// Text Field & Related Inputs
export { InputWrapper } from './components/InputWrapper';
export { NumberField } from './components/NumberField';
export { PasswordField } from './components/PasswordField';
export { SearchField } from './components/SearchField';
export { TextAreaField } from './components/TextAreaField';
export { TextField } from './components/TextField';
export type { NumberFieldProps } from './components/NumberField';
export type { PasswordFieldProps } from './components/PasswordField';
export type { SearchFieldProps } from './components/SearchField';
export type { TextAreaFieldProps } from './components/TextAreaField';
export type { TextFieldProps } from './components/TextField';

// Toast
export { Toast, ToastProvider } from './components/Toast';
export { createToast } from './components/Toast/toastEmitter';
export type { ToastProps } from './components/Toast';

// ================================================
// Hooks
// ================================================

export { useInitialTheme, useToast, useCUITheme } from './hooks';
export type { CUIThemeType, UseThemeParams } from './hooks';

// Tooltip
export { Tooltip } from './components/Tooltip/Tooltip';
export type { TooltipProps } from './components/Tooltip';

// Text
export { Text } from './components/Text';
export type { TextProps } from './components/Text';

// Title
export { Title } from './components/Title';
export type { TitleProps } from './components/Title';

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

export { THEMES, themes } from './theme/theme.core';
export type { Theme } from './theme/theme.types';
export {
  isValidThemeName,
  getFallbackThemeName,
  getDefaultThemeName,
  getAvailableThemeNames,
} from './theme/theme.utils';
export { InitCUIThemeScript } from './theme/InitCUIThemeScript/InitCUIThemeScript';
export type { InitCUIThemeScriptProps } from './theme/InitCUIThemeScript/InitCUIThemeScript';

// ================================================
// Global Types
// ================================================

export type { HorizontalDirection, Orientation, States } from './types';

// ================================================
// Deprecated Radix UI Types
// These re-export third-party types directly. Use click-ui's own types instead.
// ================================================

/**
 * @deprecated Import from '@radix-ui/react-context-menu' directly if needed.
 * Consider using click-ui's ContextMenu component API instead.
 */
export type { ContextMenuProps } from '@radix-ui/react-context-menu';

/**
 * @deprecated Use click-ui's DialogProps from './components/Dialog' instead.
 * This re-export will be removed in a future version.
 */
export type { DialogProps as RadixDialogProps } from '@radix-ui/react-dialog';

/**
 * @deprecated Use click-ui's DialogTriggerProps from './components/Dialog' instead.
 * This re-export will be removed in a future version.
 */
export type { DialogTriggerProps as RadixDialogTriggerProps } from '@radix-ui/react-dialog';

/**
 * @deprecated Import from '@radix-ui/react-hover-card' directly if needed.
 * Consider using click-ui's HoverCard component API instead.
 */
export type { HoverCardProps } from '@radix-ui/react-hover-card';

/**
 * @deprecated Import from '@radix-ui/react-popover' directly if needed.
 * Consider using click-ui's Popover component API instead.
 */
export type { PopoverProps } from '@radix-ui/react-popover';

// ================================================
// Deprecated Exports
// These exports are deprecated and will be removed in a future version.
// They are kept here temporarily for backward compatibility.
// ================================================

/**
 * @deprecated Use the `Link` component with the `component` prop instead.
 * Example: `<Link component={RouterLink} size="md" weight="normal" to="/path">text</Link>`
 */
export { linkStyles } from './components/Link/common';

/**
 * @deprecated Use the `Link` component with the `component` prop instead.
 * This type exposes internal styled-components implementation details.
 * Example: `<Link component={RouterLink} size="md" weight="normal" to="/path">text</Link>`
 */
export type { StyledLinkProps } from './components/Link/common';
