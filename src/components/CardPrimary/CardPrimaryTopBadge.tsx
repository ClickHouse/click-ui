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
  const badgeClasses = clsx(styles.cuiCardPrimaryTopBadge, className);

  return (
    <Badge
      className={badgeClasses}
      data-cui-variant="card-top-badge"
      data-cui-selected={$isSelected ? "true" : undefined}
      {...props}
    />
  );
};
