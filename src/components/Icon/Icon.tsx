import clsx from "clsx";
import { IconName, IconProps, ImageType } from "./types";
import styles from "./Icon.module.scss";
import { ICONS_MAP } from "@/components/Icon/IconCommon";
import Flags, { FlagList, FlagName } from "@/components/icons/Flags";
import { Logo } from "@/components/Logos/Logo";
import LogosLight from "@/components/Logos/LogosLight";
import { LogoName } from "@/components/Logos/types";
import Payments, { PaymentList, PaymentName } from "@/components/icons/Payments";
import { capitalize } from "@/utils/capitalize";

const SVGIcon = ({
  name,
  color,
  width,
  height,
  state = "default",
  className,
  size = "md",
  ...props
}: IconProps) => {
  const Component = ICONS_MAP[name];

  if (!Component) {
    return null;
  }

  const style: React.CSSProperties = {};
  if (color) {
    style.color = color;
  }
  if (width) {
    style.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  const sizeClass = `cuiSize${capitalize(size)}`;
  const stateClass = `cuiState${capitalize(state)}`;

  const iconClasses = clsx(
    styles.cuiIconWrapper,
    styles[sizeClass],
    styles[stateClass],
    className
  );

  return (
    <div
      className={iconClasses}
      {...(Object.keys(style).length > 0 && { style })}
      data-cui-size={size}
      data-cui-state={state}
    >
      <Component {...props} />
    </div>
  );
};

const SvgImage = ({ name, size, theme, ...props }: ImageType) => {
  if (Object.keys(FlagList).includes(name)) {
    return (
      <Flags
        name={name as FlagName}
        size={size}
        {...props}
      />
    );
  }
  if (Object.keys(LogosLight).includes(name)) {
    return (
      <Logo
        name={name as LogoName}
        theme={theme}
        size={size}
        {...props}
      />
    );
  }
  if (Object.keys(PaymentList).includes(name)) {
    return (
      <Payments
        name={name as PaymentName}
        size={size}
        {...props}
      />
    );
  }
  return (
    <SVGIcon
      name={name as IconName}
      size={size}
      role="img"
      aria-label={name}
      {...props}
    />
  );
};

SvgImage.displayName = "Icon";

export { SvgImage as Icon };
