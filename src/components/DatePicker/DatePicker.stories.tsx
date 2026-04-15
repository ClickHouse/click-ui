import { Args } from '@storybook/react-vite';
import { DatePicker } from '@/components/DatePicker';
import { getNextNDatesForDatePickerAllowOnlyList } from './utils';

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
