import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { isSameDate, UseCalendarOptions } from '@h6s/calendar';
import * as Popover from '@radix-ui/react-popover';
import { styled } from 'styled-components';
import { Body, CalendarRenderer, DatePickerInput, DateTableCell } from './Common';
import { DatePickerProps } from './DatePicker.types';

const DAYS_IN_WEEK = 7;

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
  autoFocus?: boolean;
}

const Calendar = ({
  calendarBody,
  closeDatepicker,
  futureDatesDisabled,
  selectedDate,
  setSelectedDate,
  autoFocus = false,
}: CalendarProps) => {
  const allDays = calendarBody.value.flatMap(week => week.value);
  const totalDays = allDays.length;

  const today = new Date();
  const initialFocusIndex = allDays.findIndex(day =>
    selectedDate ? isSameDate(selectedDate, day.value) : isSameDate(today, day.value)
  );

  const [focusedDayIndex, setFocusedDayIndex] = useState<number>(
    initialFocusIndex >= 0 ? initialFocusIndex : 0
  );
  const dayRefs = useRef<Array<HTMLTableCellElement | null>>([]);

  useEffect(() => {
    dayRefs.current[focusedDayIndex]?.focus();
  }, [focusedDayIndex]);

  useEffect(() => {
    if (autoFocus && initialFocusIndex >= 0) {
      const timeoutId = setTimeout(() => {
        dayRefs.current[initialFocusIndex]?.focus();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [autoFocus, initialFocusIndex]);

  const onDayKeyDown = useCallback(
    (
      e: KeyboardEvent<HTMLTableCellElement>,
      index: number,
      fullDate: Date,
      isDisabled: boolean
    ) => {
      let newIndex = index;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          newIndex = (index + 1) % totalDays;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = (index - 1 + totalDays) % totalDays;
          break;
        case 'ArrowDown':
          e.preventDefault();
          newIndex = (index + DAYS_IN_WEEK) % totalDays;
          break;
        case 'ArrowUp':
          e.preventDefault();
          newIndex = (index - DAYS_IN_WEEK + totalDays) % totalDays;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!isDisabled) {
            setSelectedDate(fullDate);
            closeDatepicker();
          }
          return;
        default:
          return;
      }

      setFocusedDayIndex(newIndex);
      dayRefs.current[newIndex]?.focus();
    },
    [totalDays, setSelectedDate, closeDatepicker]
  );

  let dayIndex = 0;

  return calendarBody.value.map(({ key: weekKey, value: week }) => {
    return (
      <tr key={weekKey}>
        {week.map(({ date, isCurrentMonth, key: dayKey, value: fullDate }) => {
          const isSelected = selectedDate && isSameDate(selectedDate, fullDate);
          const isPresent = isSameDate(today, fullDate);
          const isDisabled = futureDatesDisabled ? fullDate > today : false;
          const currentIndex = dayIndex;
          dayIndex++;

          const handleClick = () => {
            if (isDisabled) {
              return false;
            }
            setSelectedDate(fullDate);
            closeDatepicker();
          };

          return (
            <DateTableCell
              ref={el => {
                dayRefs.current[currentIndex] = el;
              }}
              $isCurrentMonth={isCurrentMonth}
              $isDisabled={isDisabled}
              $isSelected={isSelected}
              $isPresent={isPresent}
              key={dayKey}
              onClick={handleClick}
              onKeyDown={e => onDayKeyDown(e, currentIndex, fullDate, isDisabled)}
              tabIndex={currentIndex === focusedDayIndex ? 0 : -1}
              role="gridcell"
              aria-label={fullDate.toDateString()}
            >
              {date}
            </DateTableCell>
          );
        })}
      </tr>
    );
  });
};

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
  const [autoFocusCalendar, setAutoFocusCalendar] = useState<boolean>(false);

  const calendarOptions: UseCalendarOptions = {};

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
        setAutoFocusCalendar(false);
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

  const onTriggerKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
      setAutoFocusCalendar(true);
    }
  }, []);

  return (
    <Popover.Root
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <PopoverTrigger
        disabled={disabled}
        onKeyDown={onTriggerKeyDown}
      >
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
        <PopoverContent
          align="start"
          sideOffset={4}
        >
          <CalendarRenderer
            calendarOptions={calendarOptions}
            onYearSelect={onYearSelect}
            onMonthSelect={onMonthSelect}
            selectedDate={selectedDate}
          >
            {body => (
              <Calendar
                autoFocus={autoFocusCalendar}
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
