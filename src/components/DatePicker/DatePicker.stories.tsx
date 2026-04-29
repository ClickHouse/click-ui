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

export const TimezoneLocalVsUTC = {
  ...defaultStory,
  render: (args: Args) => {
    const date = args.date ? new Date(args.date) : new Date('2026-04-30T01:00:00Z');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Text>For local tz date {dayjs(date).format('YYYY/DD/MM HH:mm')}</Text>
        <div>
          <Text>local</Text>
          <DatePicker
            date={date}
            onSelectDate={date => console.log('local selected:', date.toISOString())}
            timezone="local"
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
