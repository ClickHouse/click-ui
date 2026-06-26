import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { cn, cva } from '@/lib/cva';
import { PanelProps } from './Panel.types';
import styles from './Panel.module.css';

const panelVariants = cva(styles.panel, {
  variants: {
    orientation: {
      horizontal: styles.panel_orientation_horizontal,
      vertical: styles.panel_orientation_vertical,
    },
    alignItems: {
      start: styles['panel_align-items_start'],
      center: styles['panel_align-items_center'],
      end: styles['panel_align-items_end'],
    },
    color: {
      default: styles.panel_color_default,
      muted: styles.panel_color_muted,
      transparent: styles.panel_color_transparent,
    },
    radii: {
      none: styles.panel_radii_none,
      sm: styles.panel_radii_sm,
      md: styles.panel_radii_md,
      lg: styles.panel_radii_lg,
    },
    padding: {
      none: styles.panel_padding_none,
      xs: styles.panel_padding_xs,
      sm: styles.panel_padding_sm,
      md: styles.panel_padding_md,
      lg: styles.panel_padding_lg,
      xl: styles.panel_padding_xl,
    },
    gap: {
      none: styles.panel_gap_none,
      xs: styles.panel_gap_xs,
      sm: styles.panel_gap_sm,
      md: styles.panel_gap_md,
      lg: styles.panel_gap_lg,
      xl: styles.panel_gap_xl,
    },
    hasBorder: {
      true: styles.panel_border,
    },
    hasShadow: {
      true: styles.panel_shadow,
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    alignItems: 'center',
    color: 'default',
    radii: 'sm',
    padding: 'md',
    gap: 'sm',
  },
});

export const Panel = ({
  alignItems = 'center',
  children,
  color,
  cursor,
  fillHeight,
  fillWidth,
  gap,
  hasBorder,
  hasShadow,
  height,
  orientation = 'horizontal',
  padding,
  radii = 'sm',
  width,
  className,
  style,
  ...props
}: PanelProps) => {
  const mergedStyle = useMemo(
    () =>
      ({
        ...(cursor && { '--panel-cursor': cursor }),
        ...((fillWidth || width) && { '--panel-width': fillWidth ? '100%' : width }),
        ...((fillHeight || height) && {
          '--panel-height': fillHeight ? '100%' : height,
        }),
        ...style,
      }) as CSSProperties,
    [cursor, fillWidth, width, fillHeight, height, style]
  );

  return (
    <div
      {...props}
      style={mergedStyle}
      className={cn(
        panelVariants({
          orientation,
          alignItems,
          color,
          radii,
          padding,
          gap,
          hasBorder,
          hasShadow,
        }),
        className
      )}
    >
      {children}
    </div>
  );
};
