import { Args, Meta, StoryObj } from "@storybook/react";
import { DateRange, DateRangePicker } from "./DateRangePicker";
import dayjs from "dayjs";

const getMonthsByNumber = (numberOfMonths: number): Array<DateRange> => {
  const now = dayjs();

  if (numberOfMonths < 0) {
    const lastSixMonths: Array<DateRange> = [];
    for (let i = 0; i < Math.abs(numberOfMonths); i++) {
      const date = now.subtract(i, "month");
      lastSixMonths.push({
        startDate: date.startOf("month").toDate(),
        endDate: i === 0 ? now.toDate() : date.endOf("month").toDate(),
      });
    }

    return lastSixMonths.reverse();
  }

  const nextSixMonths: Array<DateRange> = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const date = now.add(i, "month");
    nextSixMonths.push({
      startDate: date.startOf("month").toDate(),
      endDate: i === 0 ? now.toDate() : date.endOf("month").toDate(),
    });
  }

  return nextSixMonths;
};

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
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
    onSelectDateRange: {
      control: "object",
    },
  },
  tags: ["autodocs"],
  title: "Display/DateRangePicker",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    predefinedDatesList: [],
  },
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;

    return (
      <DateRangePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        startDate={startDate}
      />
    );
  },
};

export const PredefinedDatesLastSixMonths: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedDatesList = getMonthsByNumber(-6);

    return (
      <DateRangePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        predefinedDatesList={predefinedDatesList}
        startDate={startDate}
      />
    );
  },
};

export const PredefinedDatesNextSixMonths: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedDatesList = getMonthsByNumber(6);

    return (
      <DateRangePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        predefinedDatesList={predefinedDatesList}
        startDate={startDate}
      />
    );
  },
};

export const PredefinedDatesArbitraryDates: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedDatesList = [
      { startDate: new Date("04/14/2025"), endDate: new Date("05/14/2025") },
      { startDate: new Date("05/14/2025"), endDate: new Date("06/14/2025") },
      { startDate: new Date("06/14/2025"), endDate: new Date("07/14/2025") },
    ];

    return (
      <DateRangePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        predefinedDatesList={predefinedDatesList}
        startDate={startDate}
      />
    );
  },
};

export const PredefinedDatesScrollable: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedDatesList = [
      { startDate: new Date("09/14/2024"), endDate: new Date("10/14/2024") },
      { startDate: new Date("10/14/2024"), endDate: new Date("11/14/2024") },
      { startDate: new Date("11/14/2024"), endDate: new Date("12/14/2024") },
      { startDate: new Date("12/14/2024"), endDate: new Date("01/14/2025") },
      { startDate: new Date("01/14/2025"), endDate: new Date("02/14/2025") },
      { startDate: new Date("02/14/2025"), endDate: new Date("03/14/2025") },
      { startDate: new Date("03/14/2025"), endDate: new Date("04/14/2025") },
      { startDate: new Date("04/14/2025"), endDate: new Date("05/14/2025") },
      { startDate: new Date("05/14/2025"), endDate: new Date("06/14/2025") },
      { startDate: new Date("06/14/2025"), endDate: new Date("07/14/2025") },
    ];

    return (
      <DateRangePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        predefinedDatesList={predefinedDatesList}
        startDate={startDate}
      />
    );
  },
};
