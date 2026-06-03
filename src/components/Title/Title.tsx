import { HTMLAttributes, forwardRef } from 'react';
import { cn, cva } from '@/lib/cva';
import styles from './Title.module.css';

export type TitleAlignment = 'left' | 'center' | 'right';
export type TitleColor = 'default' | 'muted';
export type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TitleFamily = 'product' | 'brand';
export type TitleType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The text alignment of the title */
  align?: TitleAlignment;
  /** The color variant of the title */
  color?: TitleColor;
  /** The font size of the title */
  size?: TitleSize;
  /** The font family to use - product or brand */
  family?: TitleFamily;
  /** The heading level (h1-h6) */
  type: TitleType;
}

const titleVariants = cva(styles.title, {
  variants: {
    color: {
      default: styles['title_color_default'],
      muted: styles['title_color_muted'],
    },
    align: {
      left: styles['title_align_left'],
      center: styles['title_align_center'],
      right: styles['title_align_right'],
    },
    family: {
      product: '',
      brand: '',
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [
    { family: 'product', size: 'xs', class: styles['title_font_product-xs'] },
    { family: 'product', size: 'sm', class: styles['title_font_product-sm'] },
    { family: 'product', size: 'md', class: styles['title_font_product-md'] },
    { family: 'product', size: 'lg', class: styles['title_font_product-lg'] },
    { family: 'product', size: 'xl', class: styles['title_font_product-xl'] },
    { family: 'brand', size: 'xs', class: styles['title_font_brand-xs'] },
    { family: 'brand', size: 'sm', class: styles['title_font_brand-sm'] },
    { family: 'brand', size: 'md', class: styles['title_font_brand-md'] },
    { family: 'brand', size: 'lg', class: styles['title_font_brand-lg'] },
    { family: 'brand', size: 'xl', class: styles['title_font_brand-xl'] },
  ],
  defaultVariants: {
    color: 'default',
    align: 'left',
    family: 'product',
    size: 'md',
  },
});

/** The `title` component allows you to easily add headings to your pages. They do not include built in margins. */
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ align, size, family, type, color, children, className, ...props }, ref) => {
    const Component = type;
    return (
      <Component
        ref={ref}
        {...props}
        className={cn(titleVariants({ color, align, family, size }), className)}
      >
        {children}
      </Component>
    );
  }
);
