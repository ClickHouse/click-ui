import clsx from "clsx";
import { IconName, IconProps, ImageType } from "./types";
import styles from "./Icon.module.scss";
import { ICONS_MAP } from "@/components/Icon/IconCommon";
import Flags, { FlagList, FlagName } from "@/components/icons/Flags";
import { Logo } from "@/components/Logos/Logo";
import LogosLight from "@/components/Logos/LogosLight";
import { LogoName } from "@/components/Logos/types";
import Payments, { PaymentList, PaymentName } from "@/components/icons/Payments";

const SVGIcon = ({
  name,
  color,
  width,
  height,
  state = "default",
  className,
  size = "md",
  disableDefaultSize = false,
  ...props
}: IconProps) => {
  const Component = ICONS_MAP[name];

  if (!Component) {
    return null;
  }

  // Create custom CSS properties for dynamic values
  const customStyles: React.CSSProperties & Record<string, string> = {};
  if (color) {
    customStyles["--icon-color"] = color;
  }
  if (width) {
    customStyles["--icon-custom-width"] =
      typeof width === "number" ? `${width}px` : width;
  }
  if (height) {
    customStyles["--icon-custom-height"] =
      typeof height === "number" ? `${height}px` : height;
  }

  const iconClasses = clsx(
    styles.cuiIconWrapper,
    {
      // Only apply size classes if not disabled (for custom sizing via className)
      [styles.cuiSizeXs]: !disableDefaultSize && size === "xs",
      [styles.cuiSizeSm]: !disableDefaultSize && size === "sm",
      [styles.cuiSizeMd]: !disableDefaultSize && size === "md",
      [styles.cuiSizeLg]: !disableDefaultSize && size === "lg",
      [styles.cuiSizeXl]: !disableDefaultSize && size === "xl",
      [styles.cuiSizeXxl]: !disableDefaultSize && size === "xxl",
      [styles.cuiStateDefault]: state === "default",
      [styles.cuiStateSuccess]: state === "success",
      [styles.cuiStateWarning]: state === "warning",
      [styles.cuiStateDanger]: state === "danger",
      [styles.cuiStateInfo]: state === "info",
      [styles.cuiHasCustomWidth]: !!width,
      [styles.cuiHasCustomHeight]: !!height,
    },
    className
  );

  return (
    <div
      className={iconClasses}
      style={customStyles}
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
