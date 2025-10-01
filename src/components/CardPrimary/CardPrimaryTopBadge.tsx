import clsx from "clsx";
import { Badge, CommonBadgeProps } from "@/components/Badge/Badge";
import { Container, ContainerProps } from "@/components/Container/Container";
import styles from "./CardPrimaryTopBadge.module.scss";

interface TopBadgeWrapperProps extends ContainerProps {
  className?: string;
}

export const TopBadgeWrapper = ({ className, ...props }: TopBadgeWrapperProps) => (
  <Container
    className={clsx(styles.cuiTopBadgeWrapper, className)}
    {...props}
  />
);

interface CardPrimaryTopBadgeProps extends CommonBadgeProps {
  $isSelected?: boolean;
  className?: string;
  dismissible?: never;
  onClose?: never;
}

export const CardPrimaryTopBadge = ({
  $isSelected,
  className,
  ...props
}: CardPrimaryTopBadgeProps) => {
  const badgeClasses = clsx(
    styles.cuiCardPrimaryTopBadge,
    {
      [styles.cuiIsSelected]: $isSelected,
    },
    className
  );

  return (
    <Badge
      className={badgeClasses}
      {...props}
    />
  );
};
