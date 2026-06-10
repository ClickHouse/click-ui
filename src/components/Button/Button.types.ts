import type { IconName } from '@/components/Icon';

export type ButtonType = 'primary' | 'secondary' | 'empty' | 'danger';
export type Alignment = 'center' | 'left';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  // TODO: The type prop ('primary' | 'secondary' | 'empty' | 'danger') shadows the native <button type="submit|reset|button"> attribute. Since type is destructured before ...delegated, consumers can never pass type="submit" for form submission. Consider renaming the visual variant prop to variant (consistent with the CSS class names button_primary etc.). This is a public API problem!
  /** The visual style variant of the button */
  type?: ButtonType;
  // TODO: A workaround to fix native prop shadowing by the `type` prop. Refactor in the next major update.
  /** Used for native button type attribute  */
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  label?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  align?: Alignment;
  fillWidth?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
}
