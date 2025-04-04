import { styled } from "styled-components";
import { IconName, IconProps, IconSize, IconState, IconWeight, ImageType } from "./types";
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
  state,
  weight,
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
      $weight={weight}
      className={className}
      state={state}
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
  $weight?: IconWeight;
  state?: IconState;
}>`
  display: flex;
  align-items: center;

  ${({ theme, $color = "currentColor", $width, $height, $size, $weight = "default" }) => `
    & svg[stroke]:not([stroke="none"]),
    & g[stroke]:not([stroke="none"]),
    & path[stroke]:not([stroke="none"]),
    & rect[stroke]:not([stroke="none"]),
    & circle[stroke]:not([stroke="none"]),
    & ellipse[stroke]:not([stroke="none"]),
    & line[stroke]:not([stroke="none"]),
    & polyline[stroke]:not([stroke="none"]),
    & polygon[stroke]:not([stroke="none"]) {
      stroke: ${$color};
    }

    & svg[fill]:not([fill="none"]),
    & g[fill]:not([fill="none"]),
    & path[fill]:not([fill="none"]),
    & rect[fill]:not([fill="none"]),
    & circle[fill]:not([fill="none"]),
    & ellipse[fill]:not([fill="none"]),
    & line[fill]:not([fill="none"]),
    & polyline[fill]:not([fill="none"]),
    & polygon[fill]:not([fill="none"]) {
      fill: ${$color};
    }


    & svg[stroke-width],
    & g[stroke-width],
    & path[stroke-width],
    & rect[stroke-width],
    & circle[stroke-width],
    & ellipse[stroke-width],
    & line[stroke-width],
    & polyline[stroke-width],
    & polygon[stroke-width] {
      stroke-width: ${theme.click.image.borderWidth[$weight]}
    }

    & svg {
      width: ${$width || theme.click.image[$size || "md"].size.width || "24px"};
      height: ${$height || theme.click.image[$size || "md"].size.height || "24px"};
    }
  `}

  ${({ theme, $color = "currentColor", state = "default", $size = "md" }) => `
    background: ${theme.click.icon.color.background[state]};
    border-radius: ${theme.border.radii.full};
    padding: ${state === "default" ? "none" : theme.click.icon.space[$size].all};
    color: ${state === "default" ? $color : theme.click.icon.color.text[state]};
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
      role="img"
      aria-label={name}
      {...props}
    />
  );
};

SvgImage.displayName = "Icon";

export { SvgImage as Icon };
