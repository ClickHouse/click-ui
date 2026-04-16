import { forwardRef } from 'react';
import { Title } from '@/components/Title';
import { Text, type TextAlignment } from '@/components/Text';
import { withTopBadge } from './withTopBadge';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/components/Spacer';
import { cn, cva } from '@/lib/cva';
import styles from './CardPrimary.module.css';
import { CardPrimaryProps } from './CardPrimary.types';

type ContentAlignment = 'start' | 'center' | 'end';

const cardVariants = cva(styles['card-primary'], {
  variants: {
    size: {
      sm: styles['card-primary_size_sm'],
      md: styles['card-primary_size_md'],
    },
    align: {
      start: styles['card-primary_align_start'],
      center: styles['card-primary_align_center'],
      end: styles['card-primary_align_end'],
    },
    hasShadow: {
      true: styles['card-primary_has-shadow'],
    },
    isSelected: {
      true: styles['card-primary_is-selected'],
    },
    disabled: {
      true: undefined,
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'center',
  },
});

const convertCardAlignToTextAlign = (align: ContentAlignment): TextAlignment => {
  if (align === 'center') {
    return 'center';
  }
  return align === 'start' ? 'left' : 'right';
};

const Card = forwardRef<HTMLDivElement, CardPrimaryProps>(
  (
    {
      alignContent,
      title,
      icon,
      iconUrl,
      hasShadow = false,
      description,
      infoUrl,
      infoText,
      size = 'md',
      disabled = false,
      onButtonClick,
      isSelected,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      if (typeof onButtonClick === 'function') {
        onButtonClick(e);
      }
      if (infoUrl && infoUrl.length > 0) {
        window.open(infoUrl, '_blank');
      }
    };

    const hasAction = !!infoUrl || typeof onButtonClick === 'function';
    const Component = hasAction ? Button : 'div';
    const contentAlign = alignContent ?? 'center';
    const hasConsumerClick = typeof props.onClick === 'function';

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            size,
            align: contentAlign,
            hasShadow,
            isSelected,
          }),
          className
        )}
        aria-disabled={disabled || undefined}
        tabIndex={disabled || !hasConsumerClick ? -1 : 0}
        data-testid="card-primary"
        {...props}
      >
        {(icon || title) && (
          <div
            className={cn(
              styles['card-primary__header'],
              styles[`card-primary__header_align_${contentAlign}`],
              disabled && styles['card-primary__header_disabled']
            )}
          >
            {(icon || iconUrl) && (
              <div className={styles['card-primary__icon']}>
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt="card icon"
                    aria-hidden
                  />
                ) : (
                  icon && (
                    <Icon
                      name={icon}
                      aria-hidden
                    />
                  )
                )}
              </div>
            )}
            {title && (
              <div className={styles['card-primary__title']}>
                <Title type="h3">{title}</Title>
              </div>
            )}
          </div>
        )}

        {(description || children) && (
          <div
            className={cn(
              styles['card-primary__content'],
              styles[`card-primary__content_align_${contentAlign}`]
            )}
          >
            {description && (
              <div className={styles['card-primary__description']}>
                <Text
                  color="muted"
                  align={convertCardAlignToTextAlign(contentAlign)}
                >
                  {description}
                </Text>
              </div>
            )}
            {children}
          </div>
        )}

        {size === 'sm' && <Spacer size="sm" />}

        {infoText && (
          <div className={styles['card-primary__button']}>
            <Component
              onClick={handleClick}
              disabled={disabled}
              aria-disabled={disabled || undefined}
            >
              {infoText}
            </Component>
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'CardPrimary';

export const CardPrimary = withTopBadge<CardPrimaryProps>(Card);
