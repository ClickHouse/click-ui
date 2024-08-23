import LogosLight from "../Logos/LogosLight";
import { FlagList } from "../icons/Flags";
import { PaymentList } from "../icons/Payments";
import { Icon } from "./Icon";
import { ICONS_MAP } from "./IconCommon";
import { IconProps } from "./types";
import { Container } from "../Container/Container";

const IconNames = Object.keys(ICONS_MAP);
const FlagNames = Object.keys(FlagList);
const LogoNames = Object.keys(LogosLight);
const PaymentNames = Object.keys(PaymentList);

const IconWrapper = (props: IconProps) => (
  <Container>
    <Icon {...props} />
  </Container>
);

export default {
  component: IconWrapper,
  title: "Display/Icon",
  tags: ["icon", "autodocs"],
  argTypes: {
    name: {
      options: [...IconNames, ...FlagNames, ...LogoNames, ...PaymentNames],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      control: { type: "select" },
    },
    state: {
      options: ["default", "info", "success", "warning", "danger", "neutral"],
      control: { type: "select" },
    },
  },
};

export const Playground = {
  args: {
    name: "users",
    size: "md",
    state: "default",
    width: "",
    height: "",
  },
};
