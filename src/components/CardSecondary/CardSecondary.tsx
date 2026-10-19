import { Badge } from '@/components/Badge';
import { Icon } from '@/components/Icon';
import { Title } from '@/components/Title';
import { Text } from '@/components/Text';
import { cn, cva } from '@/lib/cva';
import { clickOnActivationKey } from '@/utils/keyboard';
import { CardSecondaryProps } from './CardSecondary.types';
import styles from './CardSecondary.module.css';

const wrapperVariants = cva(styles.wrapper, {
  variants: {
    shadow: {
      true: styles['wrapper_shadow'],
    },
  },
});

const headerLeftVariants = cva(styles.headerleft, {
  variants: {
    disabled: {
      true: styles['headerleft_disabled'],
    },
  },
});

export const CardSecondary = ({
  title,
  icon,
  iconUrl,
  badgeState,
  badgeText = '',
  hasShadow = false,
  disabled = false,
  description,
  infoUrl,
  infoText,
  infoIcon = 'chevron-right',
  infoAssetSize = 'md',
  onClick,
  onKeyDown,
  className,
  ...props
}: CardSecondaryProps) => {
  const isInfoLink = !disabled && !!infoUrl && infoUrl.length > 0;
  const InfoComponent = isInfoLink ? 'a' : 'div';
  // With an info link, that link is the keyboard action, so the card leaves Enter and Space alone.
  const isButton = typeof onClick === 'function' && !infoUrl;
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };
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
      className={cn(wrapperVariants({ shadow: hasShadow }), className)}
    >
      <div className={styles.header}>
        <div className={cn(headerLeftVariants({ disabled }))}>
          {iconUrl ? (
            <img
              className={styles.customicon}
              src={iconUrl}
              alt="card icon"
              aria-hidden
            />
          ) : (
            icon && (
              <Icon
                name={icon}
                aria-hidden
                size="lg"
              />
            )
          )}
          <Title type="h3">{title}</Title>
        </div>
        {badgeText && (
          <Badge
            text={badgeText}
            state={disabled == true ? 'disabled' : badgeState}
          />
        )}
      </div>

      <div className={styles.content}>
        <Text color="muted">{description}</Text>
      </div>
      {(infoUrl || infoText) && (
        <InfoComponent
          className={styles.infolink}
          {...(isInfoLink ? { href: infoUrl } : {})}
        >
          <Text className={styles.infolink__text}>{infoText}</Text>
          <Icon
            className={styles.infolink__icon}
            size={infoAssetSize}
            name={infoIcon}
            aria-hidden={infoText ? true : undefined}
          />
        </InfoComponent>
      )}
    </div>
  );
};
