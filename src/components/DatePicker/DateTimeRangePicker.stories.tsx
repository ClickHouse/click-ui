import { Args, Meta, StoryObj } from '@storybook/react-vite';
import { DateTimeRangePicker } from './DateTimeRangePicker';
import { DateRangeListItem, getPredefinedTimePeriodsForDateTimePicker } from './utils';
import dayjs from 'dayjs';
import { Text } from '../Text';

const oneHourInMilliseconds = 3600 * 1000;

const meta: Meta<typeof DateTimeRangePicker> = {
  component: DateTimeRangePicker,
  args: {
    maxRangeLength: undefined,
    onSelectDateRange: (startDate: Date, endDate: Date, predefinedDateLabel) => {
      console.log(
        'Date range selected: ',
        startDate,
        endDate,
        'predefinedDateLabel: ',
        predefinedDateLabel
      );
    },
  },
  tags: ['autodocs'],
  title: 'Display/DateTimeRangePicker',
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
      <DateTimeRangePicker
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

export const DateTimeRangePickerLeftSide: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();

    return (
      <div style={{ alignItems: 'end', float: 'right' }}>
        <DateTimeRangePicker
          key="default"
          endDate={endDate}
          disabled={args.disabled}
          futureDatesDisabled={args.futureDatesDisabled}
          futureStartDatesDisabled={args.futureStartDatesDisabled}
          maxRangeLength={args.maxRangeLength}
          onSelectDateRange={args.onSelectDateRange}
          openDirection="left"
          placeholder={args.placeholder}
          predefinedTimesList={predefinedTimesList}
          startDate={startDate}
          shouldShowSeconds={args.shouldShowSeconds}
        />
      </div>
    );
  },
};

export const PredefinedTimesDefault: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();

    return (
      <DateTimeRangePicker
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
    const now = dayjs('2026-05-01T12:00:00Z');
    const predefinedTimesList: DateRangeListItem[] = [
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
      <DateTimeRangePicker
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
      <DateTimeRangePicker
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

export const SetStartAndEndDate: Story = {
  args: {
    maxRangeLength: 15,
    predefinedTimesList: [],
  },
  render: (args: Args) => {
    const endDate = args.endDate
      ? new Date(args.endDate)
      : new Date('2026-05-01T12:00:00Z');
    const startDate = args.startDate
      ? new Date(args.startDate)
      : new Date(endDate.getTime() - 3600);

    const futureDatesDisabled = args.futureDatesDisabled ?? true;

    return (
      <DateTimeRangePicker
        key="default"
        defaultActiveTab="endDate"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={futureDatesDisabled}
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

export const PredefinedTimesWithSetStartAndEndDate: Story = {
  args: {
    maxRangeLength: 15,
  },
  render: (args: Args) => {
    const endDate = args.endDate
      ? new Date(args.endDate)
      : new Date('July 4, 2026 11:25 AM');
    const startDate = new Date(endDate.getTime() - oneHourInMilliseconds);

    const futureDatesDisabled = args.futureDatesDisabled ?? true;
    const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();

    return (
      <DateTimeRangePicker
        key="default"
        defaultActiveTab="endDate"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={futureDatesDisabled}
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

export const DateTimeFutureStartDatesDisabled: Story = {
  args: {
    futureStartDatesDisabled: true,
    predefinedTimesList: [],
  },
};

export const TimezoneLocalVsUTC: Story = {
  render: (args: Args) => {
    const startDate = args.startDate
      ? new Date(args.startDate)
      : dayjs('2026-05-01T12:00:00Z').subtract(6, 'hour').toDate();
    const endDate = args.endDate
      ? new Date(args.endDate)
      : new Date('2026-05-01T12:00:00Z');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Text>local</Text>
          <DateTimeRangePicker
            endDate={endDate}
            onSelectDateRange={(startDate, endDate) =>
              console.log(
                'local selected:',
                startDate.toISOString(),
                endDate.toISOString()
              )
            }
            startDate={startDate}
            timezone="system"
          />
        </div>
        <div>
          <Text>UTC</Text>
          <DateTimeRangePicker
            endDate={endDate}
            onSelectDateRange={(startDate, endDate) =>
              console.log('UTC selected:', startDate.toISOString(), endDate.toISOString())
            }
            startDate={startDate}
            timezone="UTC"
          />
        </div>
      </div>
    );
  },
};

// Visual-regression fixtures: fixed start/end dates so the tabbed calendar,
// time input, predefined-times panel, and error state render deterministically.
// The spec pins the clock so the "today" highlight is stable.
export const VRDateTimeRangePicker: Story = {
  args: {
    predefinedTimesList: [],
  },
  render: (args: Args) => (
    <DateTimeRangePicker
      key="vr"
      startDate={new Date('2026-07-10T10:00:00')}
      endDate={new Date('2026-07-20T14:00:00')}
      onSelectDateRange={args.onSelectDateRange}
    />
  ),
};

export const VRDateTimeRangePickerError: Story = {
  args: {
    predefinedTimesList: [],
  },
  render: (args: Args) => (
    <DateTimeRangePicker
      key="vr"
      startDate={new Date('2026-07-20T14:00:00')}
      endDate={new Date('2026-07-20T10:00:00')}
      onSelectDateRange={args.onSelectDateRange}
    />
  ),
};

export const VRDateTimeRangePickerPredefined: Story = {
  render: (args: Args) => (
    <DateTimeRangePicker
      key="vr"
      startDate={new Date('2026-07-10T10:00:00')}
      endDate={new Date('2026-07-20T14:00:00')}
      onSelectDateRange={args.onSelectDateRange}
      predefinedTimesList={[
        {
          dateRange: {
            startDate: new Date('2026-07-19T14:00:00'),
            endDate: new Date('2026-07-20T14:00:00'),
          },
          label: 'Past day',
        },
        {
          dateRange: {
            startDate: new Date('2026-07-13T14:00:00'),
            endDate: new Date('2026-07-20T14:00:00'),
          },
          label: 'Past week',
        },
      ]}
    />
  ),
};

export const DontFireIfInvalid: Story = {
  args: {
    maxRangeLength: 15,
    predefinedTimesList: [],
    shouldShowSeconds: true,
  },
  render: (args: Args) => {
    const endDate = args.endDate
      ? new Date(args.endDate)
      : new Date('2026-05-01T12:00:00Z');
    const startDate = args.startDate
      ? new Date(args.startDate)
      : new Date(endDate.getTime() - 3600);

    const futureDatesDisabled = args.futureDatesDisabled ?? true;

    return (
      <DateTimeRangePicker
        key="default"
        defaultActiveTab="endDate"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={futureDatesDisabled}
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        startDate={startDate}
        shouldFireIfInvalid={false}
        shouldShowSeconds={args.shouldShowSeconds}
      />
    );
  },
};

export const DefaultActiveTabEndDate: Story = {
  args: {
    maxRangeLength: 15,
    predefinedTimesList: [],
  },
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;

    return (
      <DateTimeRangePicker
        key="default"
        defaultActiveTab="endDate"
        disabled={args.disabled}
        endDate={endDate}
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

export const ResponsivePositioningDisabled: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();

    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <DateTimeRangePicker
          key="default"
          endDate={endDate}
          onSelectDateRange={args.onSelectDateRange}
          predefinedTimesList={predefinedTimesList}
          responsivePositioning={false}
          startDate={startDate}
        />
      </div>
    );
  },
};
