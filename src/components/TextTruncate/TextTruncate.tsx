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
  useRef,
  useState,
} from 'react';
import { cn, cva } from '@/lib/cva';
import { mergeRefs } from '@/utils/mergeRefs';
import { useIsTruncated } from '@/hooks/useIsTruncated';
import { Tooltip } from '@/components/Tooltip';
import { TextTruncateProps } from './TextTruncate.types';
import visuallyHiddenStyles from '../../styles/visually-hidden.module.css';
import styles from './TextTruncate.module.css';

const NO_BREAK_SPACE = '\u00a0';

const INTERACTIVE_ELEMENT = [
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
  const endLength = Number.isFinite(trailingChars) ? Math.floor(trailingChars) : 0;
  if (endLength <= 0 || endLength > chars.length - endLength) {
    return [text, ''];
  }
  const start = chars.slice(0, -endLength).join('');
  const end = chars.slice(-endLength).join('');
  return [start.replace(/\s+$/, NO_BREAK_SPACE), end.replace(/^\s+/, NO_BREAK_SPACE)];
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
  const hasWarnedRef = useRef(false);
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
    () => rootElement?.parentElement?.closest(INTERACTIVE_ELEMENT) != null,
    [rootElement]
  );

  useEffect(() => {
    if (
      hasWarnedRef.current ||
      tooltipContent !== undefined ||
      !rootElement?.querySelector(INTERACTIVE_ELEMENT)
    ) {
      return;
    }
    hasWarnedRef.current = true;
    console.warn(
      '[Click UI] TextTruncate: `children` holds an interactive element such as a link or button, which the tooltip would copy. Pass plain text as `tooltipContent`, or, when the whole text is the link or button, render `TextTruncate` inside it.'
    );
  }, [rootElement, tooltipContent, children]);

  const mergedStyle = useMemo(
    () =>
      maxWidth === undefined
        ? style
        : ({ '--text-truncate-max-width': maxWidth, ...style } as CSSProperties),
    [maxWidth, style]
  );

  const [start, end] = isMiddle ? splitMiddle(middleText, trailingChars) : ['', ''];
  const hasTabStop = showTooltip && isTruncated && !isInsideControl;
  const hasGroupRole = hasTabStop && (Component === 'span' || Component === 'div');
  const isSelfLabelled =
    hasGroupRole && ariaLabel === undefined && ariaLabelledBy === undefined;
  const rootId = id ?? generatedId;

  const root = (
    <Component
      ref={rootRef}
      tabIndex={hasTabStop ? 0 : undefined}
      role={hasGroupRole ? 'group' : undefined}
      id={isSelfLabelled ? rootId : undefined}
      aria-labelledby={isSelfLabelled ? rootId : undefined}
      // Radix Slot lets a present `undefined` key win, so this key must stay absent unless the description is dropped.
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
            aria-hidden={end ? true : undefined}
          >
            {start}
          </span>
          {end && (
            <>
              <span
                className={styles['text-truncate__end']}
                aria-hidden
              >
                {end}
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
