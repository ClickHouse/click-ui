import {
  ComponentProps,
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cn, cva } from '@/lib/cva';
import { mergeRefs } from '@/utils/mergeRefs';
import { useIsTruncated } from '@/hooks/internal';
import { Tooltip } from '@/components/Tooltip';
import { TextTruncateProps } from './TextTruncate.types';
import styles from './TextTruncate.module.css';

const NO_BREAK_SPACE = '\u00a0';

const textTruncateVariants = cva(styles['text-truncate'], {
  variants: {
    middle: { true: styles['text-truncate_ellipsis-position_middle'] },
  },
});

const splitMiddle = (text: string, trailingChars: number): [string, string] => {
  const chars = Array.from(text);
  const tailLength = Number.isFinite(trailingChars) ? Math.floor(trailingChars) : 0;
  if (tailLength <= 0 || tailLength > chars.length - tailLength) {
    return [text, ''];
  }
  const head = chars.slice(0, -tailLength).join('');
  const tail = chars.slice(-tailLength).join('');
  return [head.replace(/\s+$/, NO_BREAK_SPACE), tail.replace(/^\s+/, NO_BREAK_SPACE)];
};

type TextTruncatePolymorphicComponent = <T extends ElementType = 'span'>(
  props: Omit<ComponentProps<T>, keyof TextTruncateProps<T>> & TextTruncateProps<T>
) => ReactNode;

const TextTruncateComponent = <T extends ElementType = 'span'>(
  {
    component,
    ellipsisPosition,
    trailingChars = 8,
    maxWidth,
    showTooltip = true,
    tooltipContent,
    tooltipProps,
    className,
    style,
    children,
    ...props
  }: Omit<ComponentProps<T>, keyof TextTruncateProps<T>> & TextTruncateProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = component ?? 'span';
  const middleText =
    ellipsisPosition === 'middle' && typeof children === 'string' ? children : null;
  const isMiddle = middleText !== null;

  const { ref: measureRef, isTruncated } = useIsTruncated({ enabled: showTooltip });
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    if (!isTruncated) {
      setIsTooltipOpen(false);
    }
  }, [isTruncated]);

  const rootRef = useMemo(
    () => (isMiddle ? ref : mergeRefs([ref, measureRef])),
    [isMiddle, ref, measureRef]
  );

  const mergedStyle = useMemo(
    () =>
      maxWidth === undefined
        ? style
        : ({ '--text-truncate-max-width': maxWidth, ...style } as CSSProperties),
    [maxWidth, style]
  );

  const [head, tail] = isMiddle ? splitMiddle(middleText, trailingChars) : ['', ''];
  const hasTabStop = showTooltip && isTruncated;
  const hasGroupRole = hasTabStop && (Component === 'span' || Component === 'div');

  const root = (
    <Component
      ref={rootRef}
      {...(hasTabStop && { tabIndex: 0 })}
      {...(hasGroupRole && { role: 'group' })}
      {...props}
      style={mergedStyle}
      className={cn(textTruncateVariants({ middle: isMiddle }), className)}
    >
      {isMiddle ? (
        <>
          <span
            ref={measureRef}
            className={styles['text-truncate__start']}
          >
            {head}
          </span>
          {tail && <span className={styles['text-truncate__end']}>{tail}</span>}
        </>
      ) : (
        children
      )}
    </Component>
  );

  if (!showTooltip) {
    return root;
  }

  return (
    <Tooltip
      open={isTruncated && isTooltipOpen}
      onOpenChange={open => setIsTooltipOpen(open && isTruncated)}
      disableHoverableContent
    >
      <Tooltip.Trigger asChild>{root}</Tooltip.Trigger>
      <Tooltip.Content {...tooltipProps}>{tooltipContent ?? children}</Tooltip.Content>
    </Tooltip>
  );
};

TextTruncateComponent.displayName = 'TextTruncate';

export const TextTruncate: TextTruncatePolymorphicComponent =
  forwardRef(TextTruncateComponent);
