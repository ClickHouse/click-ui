import { Title } from '@/components/Title';
import { Text, type TextAlignment } from '@/components/Text';
import { withTopBadge } from './withTopBadge';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/components/Spacer';
import { cn, cva } from '@/lib/cva';
import { clickOnActivationKey } from '@/utils/keyboard';
import { openInNewTab } from '@/utils/url';
import { CardPrimaryProps } from './CardPrimary.types';
import styles from './CardPrimary.module.css';

type ContentAlignment = 'start' | 'center' | 'end';

const wrapperVariants = cva(styles.wrapper, {
  variants: {
    size: {
      sm: styles['wrapper_size_sm'],
      md: styles['wrapper_size_md'],
    },
    align: {
      start: styles['wrapper_align_start'],
      center: styles['wrapper_align_center'],
      end: styles['wrapper_align_end'],
    },
    hasShadow: {
      true: styles['wrapper_shadow'],
    },
    isSelected: {
      true: styles['wrapper_selected'],
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'center',
  },
});

const headerVariants = cva(styles.header, {
  variants: {
    size: {
      sm: styles['header_size_sm'],
      md: styles['header_size_md'],
    },
    align: {
      start: styles['header_align_start'],
      center: styles['header_align_center'],
      end: styles['header_align_end'],
    },
    disabled: {
      true: styles['header_disabled'],
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'center',
  },
});

const contentVariants = cva(styles.content, {
  variants: {
    size: {
      sm: styles['content_size_sm'],
      md: styles['content_size_md'],
    },
    align: {
      start: styles['content_align_start'],
      center: styles['content_align_center'],
      end: styles['content_align_end'],
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

const Card = ({
  alignContent,
  title,
  icon,
  iconUrl,
  hasShadow = false,
  description,
  infoUrl,
  infoText,
  size,
  disabled = false,
  onButtonClick,
  isSelected,
  children,
  onClick,
  onKeyDown,
  className,
  ...props
}: CardPrimaryProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof onButtonClick === 'function') {
      onButtonClick(e);
    }
    if (infoUrl) {
      openInNewTab(infoUrl);
    }
  };
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const hasInnerButton = !!infoUrl || typeof onButtonClick === 'function';
  const Component = hasInnerButton ? Button : 'div';
  // With an inner info button, that button is the keyboard action, so the card leaves Enter and Space alone.
  const isButton = typeof onClick === 'function' && !(infoText && hasInnerButton);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (isButton && !disabled) {
      clickOnActivationKey(e);
    }
  };
  return (
    <div
      aria-disabled={disabled}
      tabIndex={0}
      role={isButton ? 'button' : undefined}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      {...props}
      className={cn(
        wrapperVariants({ size, align: alignContent, hasShadow, isSelected }),
        className
      )}
    >
      {(icon || title) && (
        <div className={cn(headerVariants({ size, align: alignContent, disabled }))}>
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
          {title && <Title type="h3">{title}</Title>}
        </div>
      )}

      {(description || children) && (
        <div className={cn(contentVariants({ size, align: alignContent }))}>
          {description && (
            <Text
              color="muted"
              align={convertCardAlignToTextAlign(alignContent ?? 'start')}
            >
              {description}
            </Text>
          )}
          {children}
        </div>
      )}

      {size === 'sm' && <Spacer size="sm" />}

      {infoText && (
        <Component
          onClick={handleClick}
          disabled={disabled}
        >
          {infoText}
        </Component>
      )}
    </div>
  );
};

export const CardPrimary = withTopBadge<CardPrimaryProps>(Card);
