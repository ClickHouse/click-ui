import { Args } from "@storybook/react";
import { DateRangePicker } from "./DateRangePicker";

const defaultStory = {
  args: {
    onSelectDate: (date: Date) => {
      console.log("Date selected: ", date);
    },
  },
  argTypes: {
    startDate: {
      control: "date",
    },
    endDate: {
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
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    return (
      <DateRangePicker
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDate={args.onSelectDate}
        placeholder={args.placeholder}
        startDate={startDate}
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
