"use client";

import { useEffect, useState } from "react";
import { isSameDate, UseCalendarOptions } from "@h6s/calendar";
import { Dropdown } from "@/components";
import { Body, CalendarRenderer, DatePickerInput, DateTableCell } from "./Common";

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
          const isSelected = selectedDate ? isSameDate(selectedDate, fullDate) : false;
          const today = new Date();
          const isCurrentDate = isSameDate(today, fullDate);
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
              $isToday={isCurrentDate}
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

  const closeDatePicker = () => {
    setIsOpen(false);
  };

  const handleSelectDate = (selectedDate: Date): void => {
    setSelectedDate(selectedDate);
    onSelectDate(selectedDate);
  };

  return (
    <Dropdown
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <Dropdown.Trigger disabled={disabled}>
        <DatePickerInput
          data-testid="datepicker-input-container"
          disabled={disabled}
          isActive={isOpen}
          placeholder={placeholder}
          selectedDate={selectedDate}
        />
      </Dropdown.Trigger>
      <Dropdown.Content align="start">
        <CalendarRenderer calendarOptions={calendarOptions}>
          {body => (
            <Calendar
              calendarBody={body}
              closeDatepicker={closeDatePicker}
              futureDatesDisabled={futureDatesDisabled}
              selectedDate={selectedDate}
              setSelectedDate={handleSelectDate}
            />
          )}
        </CalendarRenderer>
      </Dropdown.Content>
    </Dropdown>
  );
};
