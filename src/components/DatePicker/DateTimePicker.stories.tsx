import { Args, Meta, StoryObj } from '@storybook/react-vite';
import { DateTimePicker } from './DateTimePicker';
import { DateRangeListItem, getPredefinedTimePeriodsForDateTimePicker } from './utils';
import dayjs from 'dayjs';

const meta: Meta<typeof DateTimePicker> = {
  component: DateTimePicker,
  args: {
    maxRangeLength: undefined,
    onSelectDateRange: (startDate: Date, endDate: Date) => {
      console.log('Date range selected: ', startDate, endDate);
    },
  },
  tags: ['autodocs'],
  title: 'Display/DateTimePicker',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    predefinedTimesList: [],
  },
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;

    return (
      <DateTimePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        startDate={startDate}
        shouldShowSeconds={args.shouldShowSeconds}
      />
    );
  },
};

export const PredefinedTimesDefault: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();

    return (
      <DateTimePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        predefinedTimesList={predefinedTimesList}
        startDate={startDate}
        shouldShowSeconds={args.shouldShowSeconds}
      />
    );
  },
};

export const PredefinedDatesScrollable: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const now = dayjs();
    const predefinedTimesList: Array<DateRangeListItem> = [
      {
        dateRange: {
          startDate: now.subtract(15, 'minute').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past 15 minutes',
      },
      {
        dateRange: {
          startDate: now.subtract(30, 'minute').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past 30 minutes',
      },
      {
        dateRange: {
          startDate: now.subtract(1, 'hour').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past hour',
      },
      {
        dateRange: {
          startDate: now.subtract(2, 'hour').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past 2 hours',
      },
      {
        dateRange: {
          startDate: now.subtract(6, 'hour').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past 6 hours',
      },
      {
        dateRange: {
          startDate: now.subtract(12, 'hour').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past 12 hours',
      },
      {
        dateRange: {
          startDate: now.subtract(1, 'day').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past day',
      },
      {
        dateRange: {
          startDate: now.subtract(1, 'week').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past week',
      },
      {
        dateRange: {
          startDate: now.subtract(2, 'week').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past 2 weeks',
      },
      {
        dateRange: {
          startDate: now.subtract(1, 'month').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past month',
      },
      {
        dateRange: {
          startDate: now.subtract(3, 'month').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past 3 months',
      },
      {
        dateRange: {
          startDate: now.subtract(6, 'month').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past 6 months',
      },
      {
        dateRange: {
          startDate: now.subtract(1, 'year').toDate(),
          endDate: now.toDate(),
        },
        label: 'Past year',
      },
    ];

    return (
      <DateTimePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        predefinedTimesList={predefinedTimesList}
        startDate={startDate}
        shouldShowSeconds={args.shouldShowSeconds}
      />
    );
  },
};

export const DateTimeWithMaxRange: Story = {
  args: {
    maxRangeLength: 15,
    predefinedTimesList: [],
  },
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;

    return (
      <DateTimePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        startDate={startDate}
        shouldShowSeconds={args.shouldShowSeconds}
      />
    );
  },
};

export const DateTimeFutureStartDatesDisabled: Story = {
  args: {
    futureStartDatesDisabled: true,
    predefinedTimesList: [],
  },
};
