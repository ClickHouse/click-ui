import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import { cn, cva } from '@/lib/cva';
import styles from './Text.module.css';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'mono';
export type TextAlignment = 'left' | 'center' | 'right';
export type TextColor = 'default' | 'muted' | 'danger' | 'disabled' | 'warning';

export interface TextProps<T extends ElementType = 'p'> {
  /** The text content to display */
  children: ReactNode;
  /** The text alignment */
  align?: TextAlignment;
  /** The text color variant */
  color?: TextColor;
  /** The font size of the text */
  size?: TextSize;
  /** The font weight of the text */
  weight?: TextWeight;
  /** Additional CSS class name */
  className?: string;
  /** Custom component to render as */
  component?: T;
  /** Whether the text should fill the full width of its container */
  fillWidth?: boolean;
}

type TextPolymorphicComponent = <T extends ElementType = 'p'>(
  props: Omit<ComponentProps<T>, keyof TextProps<T>> & TextProps<T>
) => ReactNode;

const textVariants = cva(styles.text, {
  variants: {
    color: {
      default: styles['text_color_default'],
      muted: styles['text_color_muted'],
      danger: styles['text_color_danger'],
      disabled: styles['text_color_disabled'],
      warning: styles['text_color_warning'],
    },
    align: {
      left: styles['text_align_left'],
      center: styles['text_align_center'],
      right: styles['text_align_right'],
    },
    fillWidth: {
      true: styles['text_fill-width'],
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
    },
    weight: {
      normal: '',
      medium: '',
      semibold: '',
      bold: '',
      mono: '',
    },
  },
  compoundVariants: [
    { weight: 'normal', size: 'xs', class: styles['text_font_normal-xs'] },
    { weight: 'normal', size: 'sm', class: styles['text_font_normal-sm'] },
    { weight: 'normal', size: 'md', class: styles['text_font_normal-md'] },
    { weight: 'normal', size: 'lg', class: styles['text_font_normal-lg'] },
    { weight: 'medium', size: 'xs', class: styles['text_font_medium-xs'] },
    { weight: 'medium', size: 'sm', class: styles['text_font_medium-sm'] },
    { weight: 'medium', size: 'md', class: styles['text_font_medium-md'] },
    { weight: 'medium', size: 'lg', class: styles['text_font_medium-lg'] },
    { weight: 'semibold', size: 'xs', class: styles['text_font_semibold-xs'] },
    { weight: 'semibold', size: 'sm', class: styles['text_font_semibold-sm'] },
    { weight: 'semibold', size: 'md', class: styles['text_font_semibold-md'] },
    { weight: 'semibold', size: 'lg', class: styles['text_font_semibold-lg'] },
    { weight: 'bold', size: 'xs', class: styles['text_font_bold-xs'] },
    { weight: 'bold', size: 'sm', class: styles['text_font_bold-sm'] },
    { weight: 'bold', size: 'md', class: styles['text_font_bold-md'] },
    { weight: 'bold', size: 'lg', class: styles['text_font_bold-lg'] },
    { weight: 'mono', size: 'xs', class: styles['text_font_mono-xs'] },
    { weight: 'mono', size: 'sm', class: styles['text_font_mono-sm'] },
    { weight: 'mono', size: 'md', class: styles['text_font_mono-md'] },
    { weight: 'mono', size: 'lg', class: styles['text_font_mono-lg'] },
  ],
  defaultVariants: {
    color: 'default',
    align: 'left',
    size: 'md',
    weight: 'normal',
  },
});

const _Text = <T extends ElementType = 'p'>(
  {
    align,
    color,
    size,
    weight,
    className,
    children,
    component,
    fillWidth,
    ...props
  }: Omit<ComponentProps<T>, keyof TextProps<T>> & TextProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = component ?? 'p';
  return (
    <Component
      ref={ref}
      {...props}
      className={cn(textVariants({ color, align, size, weight, fillWidth }), className)}
    >
      {children}
    </Component>
  );
};

_Text.displayName = 'Text';

export const Text: TextPolymorphicComponent = forwardRef(_Text);
