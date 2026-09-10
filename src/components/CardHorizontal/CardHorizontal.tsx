import { KeyboardEvent, MouseEvent, SyntheticEvent } from 'react';
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
  const hasActionButton = Boolean(infoText);
  const wouldBeControl =
    !hasActionButton &&
    (isSelectable || typeof onButtonClick === 'function' || Boolean(infoUrl));
  const isCardControl = wouldBeControl && !disabled;

  const handleActivate = (e: SyntheticEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (typeof onButtonClick === 'function') {
      onButtonClick(e as MouseEvent<HTMLElement>);
    }
    if (infoUrl && infoUrl.length > 0) {
      window.open(infoUrl, '_blank');
    }
  };
  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleActivate(e);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isCardControl) {
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivate(e);
    }
  };
  return (
    <div
      role={isCardControl ? 'button' : undefined}
      tabIndex={isCardControl ? 0 : undefined}
      aria-disabled={wouldBeControl ? disabled : undefined}
      onClick={handleActivate}
      onKeyDown={isCardControl ? handleKeyDown : undefined}
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
              onClick={handleButtonClick}
              disabled={disabled}
              fillWidth
            />
          </Container>
        )}
      </div>
    </div>
  );
};
