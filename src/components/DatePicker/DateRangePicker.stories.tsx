import { Args } from "@storybook/react";
import { DateRangePicker } from "./DateRangePicker";

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
    placeholder: {
      control: "text",
    },
    onSelectDate: {
      control: "object",
    },
  },
  component: DateRangePicker,
  render: (args: Args) => {
    const date = args.date ? new Date(args.date) : undefined;
    return (
      <DateRangePicker
        date={date}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDate={args.onSelectDate}
        placeholder={args.placeholder}
      />
    );
  },
  title: "Display/DateRangePicker",
  tags: ["autodocs"],
};

export default defaultStory;

export const Playground = {
  ...defaultStory,
};
