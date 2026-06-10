import * as RadixAccordion from '@radix-ui/react-accordion';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/components/Spacer';
import { Text } from '@/components/Text';
import { cn, cva } from '@/lib/cva';
import styles from './Accordion.module.css';
import { AccordionProps } from './Accordion.types';

const rootVariants = cva(styles.accordion, {
  variants: {
    fillWidth: {
      true: styles['accordion_fill-width'],
      false: '',
    },
  },
  defaultVariants: {
    fillWidth: false,
  },
});

const triggerVariants = cva(styles.accordion__trigger, {
  variants: {
    size: {
      sm: styles.accordion__trigger_size_sm,
      md: styles.accordion__trigger_size_md,
      lg: styles.accordion__trigger_size_lg,
    },
    color: {
      default: styles.accordion__trigger_color_default,
      link: styles.accordion__trigger_color_link,
    },
    fillWidth: {
      true: styles['accordion__trigger_fill-width'],
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
    fillWidth: false,
  },
});

const Accordion = ({
  title,
  size = 'md',
  color = 'default',
  icon,
  iconSize,
  gap,
  children,
  fillWidth = false,
  className,
  ...delegated
}: AccordionProps) => (
  <RadixAccordion.Root
    type="single"
    collapsible
    {...delegated}
    className={cn(rootVariants({ fillWidth }), className)}
  >
    <RadixAccordion.Item value="item">
      <RadixAccordion.Trigger className={triggerVariants({ size, color, fillWidth })}>
        <div className={styles['accordion__icons-wrapper']}>
          <div className={styles['accordion__icon-wrapper']}>
            <Icon
              name="chevron-right"
              size={iconSize || size}
              aria-label="accordion icon"
            />
          </div>
          {icon ? (
            <Icon
              name={icon}
              size={iconSize || size}
            />
          ) : null}
        </div>
        <Text
          component="div"
          size={size}
          fillWidth={fillWidth}
        >
          {title}
        </Text>
      </RadixAccordion.Trigger>
      <RadixAccordion.Content>
        <Spacer size={gap} />
        {children}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  </RadixAccordion.Root>
);

const SidebarAccordion = ({ className, ...props }: AccordionProps) => (
  <Accordion
    className={cn(styles.accordion_sidebar, className)}
    {...props}
  />
);

export { Accordion, SidebarAccordion };
