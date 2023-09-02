import styled from "styled-components";
import { IconName, IconProps, IconSize, ImageType } from "./types";
import { ICONS_MAP } from "@/components/Icon/IconCommon";
import Flags, { FlagList, FlagName } from "../icons/Flags";
import { Logo } from "../Logos/Logo";
import LogosLight from "../Logos/LogosLight";
import { LogoName } from "../Logos/types";
import Payments, { PaymentList, PaymentName } from "../icons/Payments";

const SVGIcon = ({
  name,
  color,
  width,
  height,
  className,
  size,
  ...props
}: IconProps) => {
  const Component = ICONS_MAP[name];

  if (!Component) {
    return null;
  }

  return (
    <SvgWrapper
      $color={color}
      $width={width}
      $height={height}
      $size={size}
      className={className}
    >
      <Component {...props} />
    </SvgWrapper>
  );
};

const SvgWrapper = styled.div<{
  $color?: string;
  $width?: number | string;
  $height?: number | string;
  $size?: IconSize;
}>`
  display: flex;
  align-items: center;

  ${({ theme, $color = "currentColor", $width, $height, $size }) => `
    & path[stroke], & svg[stroke]:not([stroke="none"]) {
      stroke: ${$color};
    }

    & path[fill], & svg[fill]:not([fill="none"]) {
      fill: ${$color};
    }

    & svg {
      width: ${$width || theme.click.image[$size || "md"].size.width || "24px"};
      height: ${$height || theme.click.image[$size || "md"].size.height || "24px"};
    }
  `}
`;

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
      {...props}
    />
  );
};

SvgImage.displayName = "Icon";

export { SvgImage as Icon };
