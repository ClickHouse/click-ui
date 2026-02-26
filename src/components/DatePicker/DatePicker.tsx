import { useCallback, useEffect, useState } from 'react';
import { isSameDate, UseCalendarOptions } from '@h6s/calendar';
import * as Popover from '@radix-ui/react-popover';
import { styled } from 'styled-components';
import { Body, CalendarRenderer, DatePickerInput, DateTableCell } from './Common';

const PopoverTrigger = styled(Popover.Trigger)`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: fit-content;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
  }
`;

const PopoverContent = styled(Popover.Content)`
  z-index: 1;
  outline: none;

  ${({ theme }) => `
    border: 1px solid ${theme.click.genericMenu.panel.color.stroke.default};
    background: ${theme.click.genericMenu.panel.color.background.default};
    box-shadow: ${theme.click.genericMenu.panel.shadow.default};
    border-radius: ${theme.click.genericMenu.panel.radii.all};
  `}

  &:focus {
    outline: none;
  }
`;

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
          const isSelected = selectedDate
            ? isSameDate(selectedDate, fullDate)
            : isSameDate(today, fullDate);
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
              $isCurrentMonth={isCurrentMonth}
              $isDisabled={isDisabled}
              $isSelected={isSelected}
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
    <Popover.Root
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <PopoverTrigger disabled={disabled}>
        <DatePickerInput
          data-testid="datepicker-input-container"
          disabled={disabled}
          isActive={isOpen}
          partialMonth={partialMonth}
          partialYear={partialYear}
          placeholder={placeholder}
          selectedDate={selectedDate}
        />
      </PopoverTrigger>
      <Popover.Portal>
        <PopoverContent align="start" sideOffset={4}>
          <CalendarRenderer
            calendarOptions={calendarOptions}
            onYearSelect={onYearSelect}
            onMonthSelect={onMonthSelect}
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
        </PopoverContent>
      </Popover.Portal>
    </Popover.Root>
  );
};
