import * as RadixAccordion from '@radix-ui/react-accordion';
import type { AssetSize } from '@/types';
import { Icon, type IconName } from '@/components/Icon';

import { Container } from '@/components/Container';
import { Spacer } from '@/components/Spacer';
import { Text } from '@/components/Text';
import {
  createContext,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useContext,
} from 'react';
import { GapOptions } from '@/components/Container';
import { SizeType as SpacerSizeType } from '@/components/Spacer';
import { cn, cva } from '@/lib/cva';
import styles from './MultiAccordion.module.css';

type Size = 'none' | 'sm' | 'md' | 'lg';
type Color = 'default' | 'link';

type MarkAsCompletedFunctionType = (value: string) => void | Promise<void>;

interface MultiAccordionCommonProps {
  /** The accordion items to render */
  children: React.ReactNode;
  /** The size variant of the accordion */
  size?: Size;
  /** Whether the accordion should fill the full width of its container */
  fillWidth?: boolean;
  /** The gap between accordion items */
  gap?: GapOptions;
  /** Whether to show a border around each accordion item */
  showBorder?: boolean;
  /** Whether to show a check/completion indicator on items */
  showCheck?: boolean;
  /** Callback function to mark an item as completed */
  markAsCompleted?: MarkAsCompletedFunctionType;
}

export type MultiAccordionProps = MultiAccordionCommonProps &
  (
    | Omit<RadixAccordion.AccordionMultipleProps, 'children'>
    | Omit<RadixAccordion.AccordionSingleProps, 'children'>
  );

interface MultiAccordionContextProps {
  size: Size;
  fillWidth: boolean;
  showBorder: boolean;
  showCheck: boolean;
  markAsCompleted?: MarkAsCompletedFunctionType;
}

const MultiAccordionContext = createContext<MultiAccordionContextProps>({
  size: 'md',
  fillWidth: true,
  showBorder: true,
  showCheck: false,
});

const rootVariants = cva(styles['multi-accordion'], {
  variants: {
    fillWidth: {
      true: styles['multi-accordion_fill-width'],
      false: '',
    },
    gap: {
      none: styles['multi-accordion_gap_none'],
      xxs: styles['multi-accordion_gap_xxs'],
      xs: styles['multi-accordion_gap_xs'],
      sm: styles['multi-accordion_gap_sm'],
      md: styles['multi-accordion_gap_md'],
      lg: styles['multi-accordion_gap_lg'],
      xl: styles['multi-accordion_gap_xl'],
      xxl: styles['multi-accordion_gap_xxl'],
    },
  },
  defaultVariants: {
    fillWidth: true,
    gap: 'md',
  },
});

export const MultiAccordion = ({
  size = 'md',
  children,
  fillWidth = true,
  showCheck = false,
  showBorder = true,
  gap = 'md',
  markAsCompleted,
  className,
  ...delegated
}: MultiAccordionProps) => {
  const contextValue = {
    size,
    fillWidth,
    showBorder,
    showCheck,
    markAsCompleted,
  };

  return (
    <RadixAccordion.Root
      {...delegated}
      className={cn(rootVariants({ fillWidth, gap }), className)}
    >
      <MultiAccordionContext.Provider value={contextValue}>
        {children}
      </MultiAccordionContext.Provider>
    </RadixAccordion.Root>
  );
};
interface MultiAccordionItemProps extends Omit<
  RadixAccordion.AccordionItemProps,
  'title'
> {
  /** The title text or element displayed in the accordion item header */
  title: ReactNode;
  /** The color variant of the item */
  color?: Color;
  /** Optional icon to display next to the title */
  icon?: IconName;
  /** Size of the optional icon */
  iconSize?: AssetSize;
  /** Gap size between the header and content */
  gap?: SpacerSizeType;
  /** Whether this item is marked as completed */
  isCompleted?: boolean;
}

const itemVariants = cva(styles['multi-accordion__item'], {
  variants: {
    showBorder: {
      true: '',
      false: styles['multi-accordion__item_no-border'],
    },
    fillWidth: {
      true: styles['multi-accordion__item_fill-width'],
      false: '',
    },
  },
  defaultVariants: {
    showBorder: true,
    fillWidth: true,
  },
});

const triggerVariants = cva(styles['multi-accordion__trigger'], {
  variants: {
    size: {
      none: styles['multi-accordion__trigger_size_none'],
      sm: styles['multi-accordion__trigger_size_sm'],
      md: styles['multi-accordion__trigger_size_md'],
      lg: styles['multi-accordion__trigger_size_lg'],
    },
    font: {
      sm: styles['multi-accordion__trigger_font_sm'],
      md: styles['multi-accordion__trigger_font_md'],
      lg: styles['multi-accordion__trigger_font_lg'],
    },
    color: {
      default: styles['multi-accordion__trigger_color_default'],
      link: styles['multi-accordion__trigger_color_link'],
    },
  },
  defaultVariants: {
    size: 'md',
    font: 'md',
    color: 'default',
  },
});

const contentVariants = cva(styles['multi-accordion__content'], {
  variants: {
    size: {
      none: styles['multi-accordion__content_padding_none'],
      sm: styles['multi-accordion__content_padding_sm'],
      md: styles['multi-accordion__content_padding_md'],
      lg: styles['multi-accordion__content_padding_lg'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const MultiAccordionItem = ({
  value,
  title,
  color,
  icon,
  iconSize,
  gap,
  children,
  isCompleted = false,
  className,
  ...props
}: MultiAccordionItemProps): ReactElement => {
  const { fillWidth, size, showBorder, showCheck, markAsCompleted } =
    useContext(MultiAccordionContext);

  const onClickStatus: MouseEventHandler<HTMLOrSVGElement> = e => {
    e.preventDefault();
    if (typeof markAsCompleted === 'function') {
      markAsCompleted(value);
    }
  };

  const customSize = size === 'none' ? 'sm' : size;

  return (
    <RadixAccordion.Item
      value={value}
      {...props}
      className={cn(itemVariants({ showBorder, fillWidth }), className)}
    >
      <RadixAccordion.Trigger
        className={triggerVariants({
          size,
          font: customSize,
          color: color ?? 'default',
        })}
      >
        <div className={styles['multi-accordion__icons-wrapper']}>
          <div className={styles['multi-accordion__icon-wrapper']}>
            <Icon
              name="chevron-right"
              size={iconSize ?? customSize}
              aria-label="accordion icon"
            />
          </div>
          {icon ? (
            <Icon
              name={icon}
              size={iconSize ?? customSize}
            />
          ) : null}
        </div>
        <Container
          isResponsive={false}
          gap="sm"
          alignItems="center"
          fillWidth
          justifyContent="space-between"
          component="span"
          overflow="hidden"
        >
          <Text
            className={styles['multi-accordion__title']}
            component="span"
            size={customSize}
            fillWidth={fillWidth}
          >
            {title}
          </Text>
          {showCheck && (
            <Icon
              className={cn(
                styles['multi-accordion__status-icon'],
                isCompleted && styles['multi-accordion__status-icon_completed']
              )}
              name={isCompleted ? 'check-in-circle' : 'circle'}
              size={iconSize ?? customSize}
              aria-label="accordion icon status"
              onClick={onClickStatus}
              data-icon="accordion-status"
              data-testid="accordion-status-icon"
            />
          )}
        </Container>
      </RadixAccordion.Trigger>
      <RadixAccordion.Content className={contentVariants({ size })}>
        <Spacer size={gap} />
        {children}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

MultiAccordionItem.displayName = 'MultiAccordion.Item';
MultiAccordion.Item = MultiAccordionItem;
