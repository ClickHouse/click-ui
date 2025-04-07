import { Args } from "@storybook/react";
import { DateDetails } from "./DateDetails";

export default {
  argTypes: {
    side: {
      control: {
        type: "select",
      },
      options: ["top", "right", "left", "bottom"],
    },
    date: {
      control: "date",
    },
    systemTimeZone: {
      options: [
        "America/Denver",
        "America/Los_Angeles",
        "America/New_York",
        "Asia/Shanghai",
        "Asia/Tokyo",
        "Europe/London",
        "Europe/Berlin",
        "Europe/Moscow",
        "Europe/Rome",
      ],
      control: {
        type: "select",
      },
    },
  },
  component: DateDetails,
  title: "Display/DateDetails",
  tags: ["autodocs"],
};

export const Playground = {
  args: {
    date: new Date(),
    side: "top",
    systemTimeZone: undefined,
    title: "DateDetails",
  },
  render: (args: Args) => {
    const date = args.date ? new Date(args.date) : new Date();
    return (
      <DateDetails
        date={date}
        side={args.side}
        systemTimeZone={args.systemTimeZone}
      />
    );
  },
};
