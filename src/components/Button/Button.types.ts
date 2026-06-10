import type { IconName } from '@/components/Icon';

export type ButtonType = 'primary' | 'secondary' | 'empty' | 'danger';
export type Alignment = 'center' | 'left';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  // TODO: The type prop ('primary' | 'secondary' | 'empty' | 'danger') shadows the native <button type="submit|reset|button"> attribute. Since type is destructured before ...delegated, consumers can never pass type="submit" for form submission. Consider renaming the visual variant prop to variant (consistent with the CSS class names button_primary etc.). This is a public API problem!
  /** The visual style variant of the button */
  type?: ButtonType;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** The text label to display in the button */
  label?: string;
  /** Icon to display on the left side of the label */
  iconLeft?: IconName;
  /** Icon to display on the right side of the label */
  iconRight?: IconName;
  /** Alignment of the button content */
  align?: Alignment;
  /** Whether the button should fill the full width of its container */
  fillWidth?: boolean;
  /** Whether to show a loading state */
  loading?: boolean;
  /** Whether the button should be focused on mount */
  autoFocus?: boolean;
}
