import { HTMLAttributes } from 'react';
import type { ImageName } from '@/components/Icon';

export type IconButtonSize = 'default' | 'sm' | 'xs';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'xs';
  disabled?: boolean;
  // TODO: The type prop ('primary' | 'secondary' | 'ghost' | 'danger' | 'info') shadows the native <button type="submit|reset|button"> attribute. Since type is destructured before ...props, consumers can never pass type="submit" for form submission. Consider renaming the visual variant prop to variant (consistent with the CSS class names iconbutton_type_primary etc.). This is a public API problem!
  /** The visual style variant of the button */
  type?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'info';
  // TODO: A workaround to fix native prop shadowing by the `type` prop. Refactor in the next major update.
  /** Used for native button type attribute  */
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  // TODO: The consumer app seem to expect to use other assets
  // this needs to be investigated why it had type IconName
  // or why consumer was doing it wrong
  icon: ImageName;
}
