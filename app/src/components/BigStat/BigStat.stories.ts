import { BigStat } from "./bigStat";

export default {
  component: BigStat,
  title: "Big Stat",
  tags: ["big-stat"],
};

export const Default = {
  args: {
    label: "last successfull backup",
    largeValue: "12 hours ago",
    state: "default",
  },
};
