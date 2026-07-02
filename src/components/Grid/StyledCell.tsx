import { ComponentProps, CSSProperties, ElementType, ReactNode } from 'react';
import { cn, cva } from '@/lib/cva';
import styles from './StyledCell.module.css';
import { SelectionType } from './types';

interface StyledCellOwnProps {
  $isFocused: boolean;
  $selectionType: SelectionType;
  $isSelectedTop: boolean;
  $isSelectedLeft: boolean;
  $isLastRow: boolean;
  $isLastColumn: boolean;
  $height: number;
  $type?: 'body' | 'header';
  $showBorder: boolean;
  $rowAutoHeight?: boolean;
}

const cellVariants = cva(styles.cell, {
  variants: {
    type: {
      body: styles.cell_type_body,
      header: styles.cell_type_header,
    },
    selection: {
      default: null,
      selectDirect: styles['cell_selection_select-direct'],
      selectIndirect: styles['cell_selection_select-indirect'],
    },
    noBorder: { true: styles['cell_no-border'] },
    focused: { true: styles.cell_focused },
    lastRow: {
      true: styles['cell_last-row'],
      false: styles['cell_not-last-row'],
    },
    lastColumn: {
      true: styles['cell_last-column'],
      false: styles['cell_not-last-column'],
    },
    rowAutoHeight: { true: styles['cell_row-auto-height'] },
    overlay: { true: styles.cell__overlay },
    overlayTop: { true: styles['cell__overlay_selected-top'] },
    overlayLeft: { true: styles['cell__overlay_selected-left'] },
    overlayBottom: { true: styles['cell__overlay_selected-bottom'] },
    overlayRight: { true: styles['cell__overlay_selected-right'] },
    overlayAutoHeight: { true: styles['cell__overlay_row-auto-height'] },
  },
});

type StyledCellProps<T extends ElementType> = StyledCellOwnProps & {
  as?: T;
  children?: ReactNode;
} & Omit<ComponentProps<T>, keyof StyledCellOwnProps | 'as' | 'children'>;

export const StyledCell = <T extends ElementType = 'div'>({
  as,
  $isFocused,
  $selectionType,
  $isSelectedTop,
  $isSelectedLeft,
  $isLastRow,
  $isLastColumn,
  $height,
  $type = 'body',
  $showBorder,
  $rowAutoHeight,
  className,
  style,
  children,
  ...props
}: StyledCellProps<T>) => {
  const Component = (as ?? 'div') as ElementType;
  // A single overlay `::before` is drawn whenever any selection/focus edge or
  // auto-height needs to paint on top of the cell (see Grid.module.css).
  const hasOverlay =
    $isSelectedTop ||
    $isSelectedLeft ||
    ($selectionType === 'selectDirect' && ($isLastRow || $isLastColumn)) ||
    !!$rowAutoHeight;
  const mergedStyle = {
    height: $rowAutoHeight ? '100%' : `${$height}px`,
    ...style,
  } as CSSProperties;
  return (
    <Component
      className={cn(
        cellVariants({
          type: $type,
          selection: $selectionType,
          noBorder: $type === 'header' && !$showBorder,
          focused: $isFocused,
          lastRow: $isLastRow,
          lastColumn: $isLastColumn,
          rowAutoHeight: !!$rowAutoHeight,
          overlay: hasOverlay,
          overlayTop: $isSelectedTop,
          overlayLeft: $isSelectedLeft,
          overlayBottom: $selectionType === 'selectDirect' && $isLastRow,
          overlayRight: $selectionType === 'selectDirect' && $isLastColumn,
          overlayAutoHeight: !!$rowAutoHeight,
        }),
        className
      )}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Component>
  );
};
