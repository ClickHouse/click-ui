import { useCallback, useEffect, useState } from 'react';
import { isSameDate, UseCalendarOptions } from '@h6s/calendar';
import { Dropdown } from '../Dropdown/Dropdown';
import { Body, CalendarRenderer, DatePickerInput, DateTableCell } from './Common';

interface CalendarProps {
  calendarBody: Body;
  closeDatepicker: () => void;
  futureDatesDisabled: boolean;
  selectedDate?: Date;
  setSelectedDate: (selectedDate: Date) => void;
}

const Calendar = ({
  calendarBody,
  closeDatepicker,
  futureDatesDisabled,
  selectedDate,
  setSelectedDate,
}: CalendarProps) => {
  return calendarBody.value.map(({ key: weekKey, value: week }) => {
    return (
      <tr key={weekKey}>
        {week.map(({ date, isCurrentMonth, key: dayKey, value: fullDate }) => {
          const today = new Date();
          const isSelected = selectedDate && isSameDate(selectedDate, fullDate);
          const isPresent = isSameDate(today, fullDate);
          const isDisabled = futureDatesDisabled ? fullDate > today : false;

          const handleClick = () => {
            if (isDisabled) {
              return false;
            }
            setSelectedDate(fullDate);
            closeDatepicker();
          };

          return (
            <DateTableCell
              // TODO: try to improve reusability of cell
              // accross day, month and year
              // e.g. isCurrentMonthy vs isPresent
              $isCurrentMonth={isCurrentMonth}
              $isDisabled={isDisabled}
              $isSelected={isSelected}
              $isPresent={isPresent}
              key={dayKey}
              onClick={handleClick}
            >
              {date}
            </DateTableCell>
          );
        })}
      </tr>
    );
  });
};

export interface DatePickerProps {
  date?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  onSelectDate: (selectedDate: Date) => void;
  placeholder?: string;
}

export const DatePicker = ({
  date,
  disabled = false,
  futureDatesDisabled = false,
  onSelectDate,
  placeholder,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [partialYear, setPartialYear] = useState<number>();
  const [partialMonth, setPartialMonth] = useState<number>();

  const calendarOptions: UseCalendarOptions = {};

  // If a date is selected, open the calendar to that date
  if (selectedDate) {
    calendarOptions.defaultDate = selectedDate;
  }

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  const resetPartialState = useCallback(() => {
    setPartialYear(undefined);
    setPartialMonth(undefined);
  }, []);

  const onOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        resetPartialState();
      }
    },
    [resetPartialState]
  );

  const onCloseDatePicker = useCallback(() => {
    setIsOpen(false);
    resetPartialState();
  }, [resetPartialState]);

  const onDateSelect = useCallback(
    (date: Date): void => {
      setSelectedDate(date);
      onSelectDate(date);
      resetPartialState();
    },
    [onSelectDate, resetPartialState]
  );

  const onYearSelect = useCallback((year: number) => {
    setPartialYear(year);
    setPartialMonth(undefined);
  }, []);

  const onMonthSelect = useCallback((year: number, month: number) => {
    setPartialYear(year);
    setPartialMonth(month);
  }, []);

  return (
    <Dropdown
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <Dropdown.Trigger disabled={disabled}>
        <DatePickerInput
          data-testid="datepicker-input-container"
          disabled={disabled}
          isActive={isOpen}
          partialMonth={partialMonth}
          partialYear={partialYear}
          placeholder={placeholder}
          selectedDate={selectedDate}
        />
      </Dropdown.Trigger>
      <Dropdown.Content align="start">
        <CalendarRenderer
          calendarOptions={calendarOptions}
          onYearSelect={onYearSelect}
          onMonthSelect={onMonthSelect}
          selectedDate={selectedDate}
        >
          {body => (
            <Calendar
              calendarBody={body}
              closeDatepicker={onCloseDatePicker}
              futureDatesDisabled={futureDatesDisabled}
              selectedDate={selectedDate}
              setSelectedDate={onDateSelect}
            />
          )}
        </CalendarRenderer>
      </Dropdown.Content>
    </Dropdown>
  );
};
