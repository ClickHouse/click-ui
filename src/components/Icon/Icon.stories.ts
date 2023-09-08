import LogosLight from "../Logos/LogosLight";
import { FlagList } from "../icons/Flags";
import { PaymentList } from "../icons/Payments";
import { Icon } from "./Icon";
import { ICONS_MAP } from "./IconCommon";

const IconNames = Object.keys(ICONS_MAP);
const FlagNames = Object.keys(FlagList);
const LogoNames = Object.keys(LogosLight);
const PaymentNames = Object.keys(PaymentList);

export default {
  component: Icon,
  title: "Display/Icon",
  tags: ["icon", "autodocs"],
  argTypes: {
    name: {
      options: [...IconNames, ...FlagNames, ...LogoNames, ...PaymentNames],
      control: { type: "select" },
    },
  },
};

export const Playground = {
  args: {
    name: "users",
    width: "1rem",
    height: "16px",
  },
};
