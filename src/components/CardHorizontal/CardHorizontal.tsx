import { forwardRef, type KeyboardEvent, type MouseEvent } from 'react';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import { CardHorizontalProps } from './CardHorizontal.types';
import styles from './CardHorizontal.module.css';

const cardHorizontalVariants = cva(styles['card-horizontal'], {
  variants: {
    color: {
      default: styles['card-horizontal_default'],
      muted: styles['card-horizontal_muted'],
    },
    size: {
      sm: styles['card-horizontal_sm'],
      md: styles['card-horizontal_md'],
    },
    disabled: {
      true: styles['card-horizontal_disabled'],
    },
    selected: {
      true: styles['card-horizontal_selected'],
    },
    selectable: {
      true: styles['card-horizontal_selectable'],
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
  },
});

export const CardHorizontal = forwardRef<HTMLDivElement, CardHorizontalProps>(
  (
    {
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
      badgeText,
      badgeState,
      badgeIcon,
      badgeIconDir,
      onButtonClick,
      className,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: MouseEvent<HTMLElement>) => {
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

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      if (isSelectable && !disabled && e.key === ' ') {
        e.preventDefault();
        handleClick(e as unknown as MouseEvent<HTMLElement>);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          cardHorizontalVariants({
            color,
            size,
            disabled,
            selected: isSelected,
            selectable: isSelectable,
          }),
          className
        )}
        tabIndex={disabled ? -1 : 0}
        role={isSelectable ? 'button' : undefined}
        aria-disabled={disabled}
        aria-pressed={isSelectable ? (isSelected ?? false) : undefined}
        onClick={handleClick}
        onKeyDown={isSelectable ? handleKeyDown : undefined}
        data-testid="card-horizontal"
        {...props}
      >
        <div className={styles['card-horizontal__content']}>
          <div className={styles['card-horizontal__icon-text-content']}>
            {icon && (
              <Icon
                name={icon}
                aria-hidden
                className={styles['card-horizontal__icon']}
              />
            )}
            <Container
              padding="none"
              orientation="vertical"
              fillWidth
            >
              {title && (
                <div className={styles['card-horizontal__header']}>
                  <Container
                    orientation="horizontal"
                    gap="xs"
                    isResponsive={false}
                    fillWidth
                    justifyContent="space-between"
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
                </div>
              )}

              {description && (
                <div className={styles['card-horizontal__description']}>
                  {description}
                </div>
              )}
              {children && (
                <div className={styles['card-horizontal__description']}>{children}</div>
              )}
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
  }
);

CardHorizontal.displayName = 'CardHorizontal';
