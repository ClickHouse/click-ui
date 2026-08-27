import { HTMLAttributes } from 'react';

export type CodeThemeType = 'light' | 'dark';

export interface CodeBlockProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onCopy'
> {
  language?: string;
  children: string;
  theme?: CodeThemeType;
  showLineNumbers?: boolean;
  showWrapButton?: boolean;
  wrapLines?: boolean;
  /**
   * Accessible name for the scrollable code region. The region is a keyboard
   * tab stop (so overflowing code can be scrolled), and a tab stop must be
   * announced. Defaults to the `language` plus "code block", or "Code block"
   * when no language is set. Override to localise it or to say which code this
   * is when a page has several blocks.
   */
  ariaLabel?: string;
  onCopy?: (value: string) => void | Promise<void>;
  onCopyError?: (error: string) => void | Promise<void>;
}
