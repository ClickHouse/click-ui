import { ComponentProps, CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cva';
import styles from './Grid.module.css';
import { SelectionType } from './types';

interface StyledCellOwnProps {
  $isFocused: boolean;
  $selectionType: SelectionType;
  $isSelectedTop: boolean;
  $isSelectedLeft: boolean;
  $isLastRow: boolean;
  $isLastColumn: boolean;
  $isFirstRow: boolean;
  $isFirstColumn: boolean;
  $height: number;
  $type?: 'body' | 'header';
  $showBorder: boolean;
  $rowAutoHeight?: boolean;
}

const cellClassName = (
  {
    $isFocused,
    $selectionType,
    $isSelectedTop,
    $isSelectedLeft,
    $isLastRow,
    $isLastColumn,
    $type = 'body',
    $showBorder,
    $rowAutoHeight,
  }: Omit<StyledCellOwnProps, '$height' | '$isFirstRow' | '$isFirstColumn'>,
  className?: string
): string => {
  const hasOverlay =
    $isSelectedTop ||
    $isSelectedLeft ||
    ($selectionType === 'selectDirect' && ($isLastRow || $isLastColumn)) ||
    !!$rowAutoHeight;
  return cn(
    styles.cell,
    $type === 'header' ? styles.cell_type_header : styles.cell_type_body,
    $selectionType === 'selectDirect' && styles['cell_selection_select-direct'],
    $selectionType === 'selectIndirect' && styles['cell_selection_select-indirect'],
    $type === 'header' && !$showBorder && styles['cell_no-border'],
    $isFocused && styles.cell_focused,
    $isLastRow ? styles['cell_last-row'] : styles['cell_not-last-row'],
    $isLastColumn ? styles['cell_last-column'] : styles['cell_not-last-column'],
    $rowAutoHeight && styles['cell_row-auto-height'],
    hasOverlay && styles.cell__overlay,
    hasOverlay && $isSelectedTop && styles['cell__overlay_selected-top'],
    hasOverlay && $isSelectedLeft && styles['cell__overlay_selected-left'],
    hasOverlay &&
      $selectionType === 'selectDirect' &&
      $isLastRow &&
      styles['cell__overlay_selected-bottom'],
    hasOverlay &&
      $selectionType === 'selectDirect' &&
      $isLastColumn &&
      styles['cell__overlay_selected-right'],
    hasOverlay && $rowAutoHeight && styles['cell__overlay_row-auto-height'],
    className
  );
};

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $isFirstRow,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $isFirstColumn,
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
  const mergedStyle = {
    height: $rowAutoHeight ? '100%' : `${$height}px`,
    ...style,
  } as CSSProperties;
  return (
    <Component
      className={cellClassName(
        {
          $isFocused,
          $selectionType,
          $isSelectedTop,
          $isSelectedLeft,
          $isLastRow,
          $isLastColumn,
          $type,
          $showBorder,
          $rowAutoHeight,
        },
        className
      )}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Component>
  );
};
