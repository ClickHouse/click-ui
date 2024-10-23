import { Args } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const defaultStory = {
  args: {
    onSelectDate: (date: Date) => {
      console.log("Date selected: ", date);
    },
  },
  argTypes: {
    date: {
      control: "date",
    },
    futureDatesDisabled: {
      control: "boolean",
    },
    onSelectDate: {
      control: "object",
    },
  },
  component: DatePicker,
  render: (args: Args) => {
    const date = args.date ? new Date(args.date) : undefined;
    return (
      <DatePicker
        date={date}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDate={args.onSelectDate}
      />
    );
  },
  title: "Display/DatePicker",
  tags: ["autodocs"],
};

export default defaultStory;

export const Playground = {
  ...defaultStory,
};
