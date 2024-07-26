import { DateTime } from "./DateTime";

export default {
  component: DateTime,
  title: "Display/DateTime",
  tags: ["autodocs"],
};

export const Playground = {
  args: {
    date: new Date(),
    systemTimeZone: "America/Los_Angeles",
    title: "DateTime",
  },
};
