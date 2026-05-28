import { ComponentType, SVGAttributes } from 'react';
import { cn, cva } from '@/lib/cva';
import type { AssetSize } from '@/types';
import styles from './Icon.module.css';

const svgImageVariants = cva(styles['svg-image'], {
  variants: {
    size: {
      xs: styles['svg-image_size_xs'],
      sm: styles['svg-image_size_sm'],
      md: styles['svg-image_size_md'],
      lg: styles['svg-image_size_lg'],
      xl: styles['svg-image_size_xl'],
      xxl: styles['svg-image_size_xxl'],
    },
  },
});

export interface SvgImageElementProps extends SVGAttributes<SVGElement> {
  as?: ComponentType<SVGAttributes<SVGElement>>;
  size?: AssetSize;
}

export const SvgImageElement = ({
  as: Component,
  size,
  className,
  ...props
}: SvgImageElementProps) => {
  const mergedClassName = cn(svgImageVariants({ size }), className);
  if (Component) {
    return (
      <Component
        {...props}
        className={mergedClassName}
      />
    );
  }
  return (
    <svg
      {...props}
      className={mergedClassName}
    />
  );
};
