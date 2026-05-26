import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import { CardHorizontalProps } from './CardHorizontal.types';
import styles from './CardHorizontal.module.css';

const wrapperVariants = cva(styles.wrapper, {
  variants: {
    color: {
      default: styles['wrapper_color_default'],
      muted: styles['wrapper_color_muted'],
    },
    size: {
      sm: styles['wrapper_size_sm'],
      md: styles['wrapper_size_md'],
    },
    alignment: {
      center: styles['wrapper_alignment_center'],
      top: styles['wrapper_alignment_top'],
    },
    selectable: {
      true: styles['wrapper_selectable'],
    },
    selected: {
      true: styles['wrapper_selected'],
    },
    disabled: {
      true: styles['wrapper_disabled'],
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
    alignment: 'center',
  },
});

const contentWrapperVariants = cva(styles.contentwrapper, {
  variants: {
    size: {
      sm: styles['contentwrapper_size_sm'],
      md: styles['contentwrapper_size_md'],
    },
  },
  defaultVariants: { size: 'md' },
});

const iconTextContentWrapperVariants = cva(styles.icontextcontentwrapper, {
  variants: {
    size: {
      sm: styles['icontextcontentwrapper_size_sm'],
      md: styles['icontextcontentwrapper_size_md'],
    },
    alignment: {
      center: styles['icontextcontentwrapper_alignment_center'],
      top: styles['icontextcontentwrapper_alignment_top'],
    },
  },
  defaultVariants: { size: 'md', alignment: 'center' },
});

export const CardHorizontal = ({
  title,
  icon,
  description,
  disabled = false,
  infoText,
  infoUrl,
  isSelected,
  isSelectable = infoText ? false : true,
  children,
  color = 'default',
  size = 'md',
  alignment = 'center',
  badgeText,
  badgeState,
  badgeIcon,
  badgeIconDir,
  onButtonClick,
  className,
  ...props
}: CardHorizontalProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (typeof onButtonClick === 'function') {
      onButtonClick(e);
    }
    if (infoUrl && infoUrl.length > 0) {
      window.open(infoUrl, '_blank');
    }
  };
  return (
    <div
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      {...props}
      className={cn(
        wrapperVariants({
          color,
          size,
          alignment,
          selectable: isSelectable,
          selected: isSelected,
          disabled,
        }),
        className
      )}
    >
      <div className={cn(contentWrapperVariants({ size }))}>
        <div className={cn(iconTextContentWrapperVariants({ size, alignment }))}>
          {icon && (
            <Icon
              name={icon}
              aria-hidden
              className={styles.cardicon}
            />
          )}
          <Container
            padding="none"
            orientation="vertical"
          >
            {title && (
              <Container
                className={styles.header}
                isResponsive={false}
                gap="xs"
                justifyContent="space-between"
                fillWidth
              >
                <Container
                  orientation="horizontal"
                  gap="xs"
                  isResponsive={false}
                  fillWidth={false}
                  grow="1"
                >
                  {title}
                </Container>
                {badgeText && (
                  <Container
                    isResponsive={false}
                    justifyContent="end"
                    fillWidth={false}
                    data-testid="horizontal-card-badge"
                  >
                    <Badge
                      text={badgeText}
                      size="md"
                      state={badgeState}
                      icon={badgeIcon}
                      iconDir={badgeIconDir}
                    />
                  </Container>
                )}
              </Container>
            )}

            {description && <div className={styles.description}>{description}</div>}
            {children && <div className={styles.description}>{children}</div>}
          </Container>
        </div>
        {infoText && (
          <Container
            justifyContent="end"
            fillWidth={false}
            data-testid="horizontal-card-button"
          >
            <Button
              label={infoText}
              onClick={handleClick}
              disabled={disabled}
              fillWidth
            />
          </Container>
        )}
      </div>
    </div>
  );
};
