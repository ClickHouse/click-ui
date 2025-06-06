import { Args } from "@storybook/react";
import { DateRangePicker } from "./DateRangePicker";

const defaultStory = {
  args: {
    onSelectDateRange: (startDate: Date, endDate: Date) => {
      console.log("Date range selected: ", startDate, endDate);
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
    predefinedDatesCount: {
      control: "number",
      default: 0,
    },
    onSelectDateRange: {
      control: "object",
    },
  },
  component: DateRangePicker,
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedDatesCount = args.predefinedDatesCount
      ? args.predefinedDatesCount
      : undefined;

    return (
      <DateRangePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        predefinedDatesCount={predefinedDatesCount}
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
