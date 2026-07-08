import { Args, Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { DateRangePicker } from './DateRangePicker';
import {
  getNextNDatesForDatePickerAllowOnlyList,
  getPredefinedMonthsForDateRangePicker,
} from './utils';
import { Text } from '../Text';

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  args: {
    maxRangeLength: undefined,
    onSelectDateRange: (startDate: Date, endDate: Date) => {
      console.log('Date range selected: ', startDate, endDate);
    },
  },
  tags: ['autodocs'],
  title: 'Display/DateRangePicker',
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

export const DateRangePickerAllowOnlyNext30Days: Story = {
  args: {
    allowOnlyDatesList: getNextNDatesForDatePickerAllowOnlyList(30),
    predefinedDatesList: [],
  },
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;

    return (
      <DateRangePicker
        key="default"
        allowOnlyDatesList={args.allowOnlyDatesList}
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

export const DateRangePickerLeftSide: Story = {
  args: {
    predefinedDatesList: [],
  },
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;

    const predefinedDatesList = getPredefinedMonthsForDateRangePicker(-6);

    return (
      <div style={{ alignItems: 'end', float: 'right' }}>
        <DateRangePicker
          key="default"
          endDate={endDate}
          disabled={args.disabled}
          futureDatesDisabled={args.futureDatesDisabled}
          futureStartDatesDisabled={args.futureStartDatesDisabled}
          maxRangeLength={args.maxRangeLength}
          onSelectDateRange={args.onSelectDateRange}
          openDirection="left"
          placeholder={args.placeholder}
          predefinedDatesList={predefinedDatesList}
          startDate={startDate}
        />
      </div>
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
      { startDate: new Date('04/14/2025'), endDate: new Date('05/14/2025') },
      { startDate: new Date('05/14/2025'), endDate: new Date('06/14/2025') },
      { startDate: new Date('06/14/2025'), endDate: new Date('07/14/2025') },
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

export const ResponsivePositioningDisabled: Story = {
  args: {
    predefinedDatesList: [],
  },
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedDatesList = getPredefinedMonthsForDateRangePicker(-6);

    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <DateRangePicker
          key="default"
          endDate={endDate}
          onSelectDateRange={args.onSelectDateRange}
          predefinedDatesList={predefinedDatesList}
          responsivePositioning={false}
          startDate={startDate}
        />
      </div>
    );
  },
};

export const SelectedDate: Story = {
  args: {
    predefinedDatesList: [],
  },
  render: (args: Args) => (
    <DateRangePicker
      key="selected-date"
      startDate={new Date('2026-07-10T12:00:00')}
      endDate={new Date('2026-07-20T12:00:00')}
      onSelectDateRange={args.onSelectDateRange}
    />
  ),
};

export const PredefinedDatesWithSelectedDate: Story = {
  render: (args: Args) => (
    <DateRangePicker
      key="predefined-dates-with-selected-date"
      startDate={new Date('2026-07-10T12:00:00')}
      endDate={new Date('2026-07-20T12:00:00')}
      onSelectDateRange={args.onSelectDateRange}
      predefinedDatesList={[
        {
          startDate: new Date('2026-07-01T12:00:00'),
          endDate: new Date('2026-07-31T12:00:00'),
        },
        {
          startDate: new Date('2026-06-01T12:00:00'),
          endDate: new Date('2026-06-30T12:00:00'),
        },
        {
          startDate: new Date('2026-05-01T12:00:00'),
          endDate: new Date('2026-05-31T12:00:00'),
        },
      ]}
    />
  ),
};

export const TimezoneLocalVsUTC: Story = {
  render: (args: Args) => {
    const startDate = args.startDate
      ? new Date(args.startDate)
      : new Date('2026-04-15T01:00:00Z');
    const endDate = args.endDate
      ? new Date(args.endDate)
      : new Date('2026-04-30T01:00:00Z');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Text>
            For system tz start date {dayjs(startDate).format('YYYY/DD/MM HH:mm')} and end
            date {dayjs(endDate).format('YYYY/DD/MM HH:mm')}
          </Text>
          <Text>system</Text>
          <DateRangePicker
            endDate={endDate}
            onSelectDateRange={(startDate, endDate) =>
              console.log(
                'system selected:',
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
          <DateRangePicker
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

export const DisabledPastDatesBugCheck: Story = {
  args: {
    maxRangeLength: 31,
  },
  render: (args: Args) => {
    const predefinedDatesList = getPredefinedMonthsForDateRangePicker(6);

    const startOfMonth = new Date('May 1, 2026');
    const endOfMonth = new Date('May 31, 2026');

    return (
      <DateRangePicker
        startDate={startOfMonth}
        endDate={endOfMonth}
        maxRangeLength={args.maxRangeLength}
        futureStartDatesDisabled={true}
        predefinedDatesList={predefinedDatesList}
        onSelectDateRange={args.onSelectDateRange}
      />
    );
  },
};

export const PredefinedDatesScrollable: Story = {
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;
    const predefinedDatesList = [
      { startDate: new Date('09/14/2024'), endDate: new Date('10/14/2024') },
      { startDate: new Date('10/14/2024'), endDate: new Date('11/14/2024') },
      { startDate: new Date('11/14/2024'), endDate: new Date('12/14/2024') },
      { startDate: new Date('12/14/2024'), endDate: new Date('01/14/2025') },
      { startDate: new Date('01/14/2025'), endDate: new Date('02/14/2025') },
      { startDate: new Date('02/14/2025'), endDate: new Date('03/14/2025') },
      { startDate: new Date('03/14/2025'), endDate: new Date('04/14/2025') },
      { startDate: new Date('04/14/2025'), endDate: new Date('05/14/2025') },
      { startDate: new Date('05/14/2025'), endDate: new Date('06/14/2025') },
      { startDate: new Date('06/14/2025'), endDate: new Date('07/14/2025') },
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
