import {
  ComponentProps,
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { cn, cva } from '@/lib/cva';
import { mergeRefs } from '@/utils/mergeRefs';
import { useIsTruncated } from '@/hooks/internal';
import { Tooltip } from '@/components/Tooltip';
import { TextTruncateProps } from './TextTruncate.types';
import visuallyHiddenStyles from '../../styles/visually-hidden.module.css';
import styles from './TextTruncate.module.css';

const NO_BREAK_SPACE = '\u00a0';

const INTERACTIVE_ANCESTOR = [
  'a[href]',
  'button',
  'summary',
  '[role="button"]',
  '[role="link"]',
  '[role="tab"]',
  '[role="option"]',
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="treeitem"]',
  '[cui-select-item]',
].join(', ');

const textTruncateVariants = cva(styles['text-truncate'], {
  variants: {
    middle: { true: styles['text-truncate_pos-middle'] },
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
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const generatedId = useId();
  const {
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  } = props as Pick<HTMLAttributes<HTMLElement>, 'id' | 'aria-label' | 'aria-labelledby'>;

  useEffect(() => {
    if (!isTruncated) {
      setIsTooltipOpen(false);
    }
  }, [isTruncated]);

  const rootRef = useMemo(
    () =>
      !showTooltip
        ? ref
        : isMiddle
          ? mergeRefs([ref, setRootElement])
          : mergeRefs([ref, setRootElement, measureRef]),
    [showTooltip, isMiddle, ref, measureRef]
  );

  const isInsideControl = useMemo(
    () => rootElement?.parentElement?.closest(INTERACTIVE_ANCESTOR) != null,
    [rootElement]
  );

  const mergedStyle = useMemo(
    () =>
      maxWidth === undefined
        ? style
        : ({ '--text-truncate-max-width': maxWidth, ...style } as CSSProperties),
    [maxWidth, style]
  );

  const [head, tail] = isMiddle ? splitMiddle(middleText, trailingChars) : ['', ''];
  const hasTabStop = showTooltip && isTruncated && !isInsideControl;
  const hasGroupRole = hasTabStop && (Component === 'span' || Component === 'div');
  const isSelfLabelled =
    hasGroupRole && ariaLabel === undefined && ariaLabelledBy === undefined;
  const rootId = id ?? generatedId;

  const root = (
    <Component
      ref={rootRef}
      {...(hasTabStop && { tabIndex: 0 })}
      {...(hasGroupRole && { role: 'group' })}
      {...(isSelfLabelled && { id: rootId, 'aria-labelledby': rootId })}
      {...(isSelfLabelled &&
        tooltipContent === undefined && { 'aria-describedby': undefined })}
      {...props}
      style={mergedStyle}
      className={cn(textTruncateVariants({ middle: isMiddle }), className)}
    >
      {isMiddle ? (
        <>
          <span
            ref={measureRef}
            className={styles['text-truncate__start']}
            aria-hidden={tail ? true : undefined}
          >
            {head}
          </span>
          {tail && (
            <>
              <span
                className={styles['text-truncate__end']}
                aria-hidden
              >
                {tail}
              </span>
              <span
                className={cn(
                  visuallyHiddenStyles['sr-only'],
                  styles['text-truncate__label']
                )}
              >
                {middleText}
              </span>
            </>
          )}
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
    >
      <Tooltip.Trigger asChild>{root}</Tooltip.Trigger>
      <Tooltip.Content {...tooltipProps}>{tooltipContent ?? children}</Tooltip.Content>
    </Tooltip>
  );
};

TextTruncateComponent.displayName = 'TextTruncate';

export const TextTruncate: TextTruncatePolymorphicComponent =
  forwardRef(TextTruncateComponent);
