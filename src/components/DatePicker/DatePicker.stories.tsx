import { Args } from '@storybook/react-vite';
import { dayjs } from '@/utils/date';
import { DatePicker } from '@/components/DatePicker';
import { getNextNDatesForDatePickerAllowOnlyList } from './utils';
import { Text } from '../Text';

const defaultStory = {
  args: {
    allowOnlyDatesList: [],
    onSelectDate: (date: Date) => {
      console.log('Date selected: ', date);
    },
  },
  argTypes: {
    date: {
      control: 'date',
    },
    futureDatesDisabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    onSelectDate: {
      control: 'object',
    },
  },
  component: DatePicker,
  render: (args: Args) => {
    const date = args.date ? new Date(args.date) : undefined;
    return (
      <DatePicker
        allowOnlyDatesList={args.allowOnlyDatesList}
        date={date}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDate={args.onSelectDate}
        placeholder={args.placeholder}
      />
    );
  },
  title: 'Display/DatePicker',
  tags: ['autodocs'],
};

export default defaultStory;

export const Default = {
  ...defaultStory,
};

export const DatePickerAllowOnlyNext30Days = {
  ...defaultStory,
  args: {
    ...defaultStory.args,
    allowOnlyDatesList: getNextNDatesForDatePickerAllowOnlyList(30),
  },
};

export const ResponsivePositioningDisabled = {
  ...defaultStory,
  render: (args: Args) => {
    const date = args.date ? new Date(args.date) : undefined;
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <DatePicker
          date={date}
          onSelectDate={args.onSelectDate}
          placeholder={args.placeholder}
          responsivePositioning={false}
        />
      </div>
    );
  },
};

export const SelectedDate = {
  ...defaultStory,
  render: () => (
    <DatePicker
      date={new Date('2026-07-20T12:00:00')}
      onSelectDate={() => {}}
      placeholder="Pick a date"
    />
  ),
};

export const TimezoneLocalVsUTC = {
  ...defaultStory,
  render: (args: Args) => {
    const date = args.date ? new Date(args.date) : new Date('2026-04-30T01:00:00Z');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Text>For system tz date {dayjs(date).format('YYYY/DD/MM HH:mm')}</Text>
        <div>
          <Text>system</Text>
          <DatePicker
            date={date}
            onSelectDate={date => console.log('system selected:', date.toISOString())}
            timezone="system"
          />
        </div>
        <div>
          <Text>UTC</Text>
          <DatePicker
            date={date}
            onSelectDate={date => console.log('UTC selected:', date.toISOString())}
            timezone="UTC"
          />
        </div>
      </div>
    );
  },
};
