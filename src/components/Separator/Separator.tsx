import * as RadixSeparator from '@radix-ui/react-separator';
import { cn, cva } from '@/lib/cva';
import { SeparatorProps } from './Separator.types';
import styles from './Separator.module.css';

const separatorVariants = cva(styles.separator, {
  variants: {
    variant: {
      'horizontal-xs': styles['separator_variant_horizontal-xs'],
      'horizontal-sm': styles['separator_variant_horizontal-sm'],
      'horizontal-md': styles['separator_variant_horizontal-md'],
      'horizontal-lg': styles['separator_variant_horizontal-lg'],
      'horizontal-xl': styles['separator_variant_horizontal-xl'],
      'horizontal-xxl': styles['separator_variant_horizontal-xxl'],
      'vertical-xs': styles['separator_variant_vertical-xs'],
      'vertical-sm': styles['separator_variant_vertical-sm'],
      'vertical-md': styles['separator_variant_vertical-md'],
      'vertical-lg': styles['separator_variant_vertical-lg'],
      'vertical-xl': styles['separator_variant_vertical-xl'],
      'vertical-xxl': styles['separator_variant_vertical-xxl'],
    },
  },
});

export const Separator = ({
  orientation = 'horizontal',
  size,
  className,
  ...props
}: SeparatorProps) => (
  <RadixSeparator.Root
    orientation={orientation}
    {...props}
    className={cn(separatorVariants({ variant: `${orientation}-${size}` }), className)}
  />
);
