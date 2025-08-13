import { Args, Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker } from "./DateRangePicker";
import { getPredefinedMonthsForDateRangePicker } from "./utils";

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  args: {
    maxRangeLength: undefined,
    onSelectDateRange: (startDate: Date, endDate: Date) => {
      console.log("Date range selected: ", startDate, endDate);
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
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        startDate={startDate}
      />
    );
  },
};

export const DateRangeWithMaxRange: Story = {
  args: {
    maxRangeLength: 15,
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
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        startDate={startDate}
      />
    );
  },
};

export const DateRangeFutureStartDatesDisabled: Story = {
  args: {
    futureStartDatesDisabled: true,
    predefinedDatesList: [],
  },
};

export const PredefinedDatesLastSixMonths: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedDatesList = getPredefinedMonthsForDateRangePicker(-6);

    return (
      <DateRangePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
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
    const predefinedDatesList = getPredefinedMonthsForDateRangePicker(6);

    return (
      <DateRangePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
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
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
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
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        predefinedDatesList={predefinedDatesList}
        startDate={startDate}
      />
    );
  },
};
