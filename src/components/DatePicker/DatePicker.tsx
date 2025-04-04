import { useEffect, useState } from "react";
import { isSameDate, UseCalendarOptions } from "@h6s/calendar";
import Dropdown from "../Dropdown/Dropdown";
import { CalendarRenderer, DatePickerInput, DateTableCell, WeekRenderer } from "./Common";

interface CalendarProps {
  closeDatepicker: () => void;
  futureDatesDisabled: boolean;
  selectedDate?: Date;
  setSelectedDate: (selectedDate: Date) => void;
}

const Calendar = ({
  closeDatepicker,
  futureDatesDisabled,
  selectedDate,
  setSelectedDate,
}: CalendarProps) => {
  const calendarOptions: UseCalendarOptions = {};

  // If a is selected, open the calendar to that date
  if (selectedDate) {
    calendarOptions.defaultDate = selectedDate;
  }

  const weekRenderer: WeekRenderer = ({
    date,
    isCurrentMonth,
    key: dayKey,
    value: fullDate,
  }) => {
    const isSelected = selectedDate ? isSameDate(selectedDate, fullDate) : false;
    const today = new Date();
    const isCurrentDate = isSameDate(today, fullDate);
    const isDisabled = futureDatesDisabled ? fullDate > today : false;

    return (
      <DateTableCell
        $isCurrentMonth={isCurrentMonth}
        $isDisabled={isDisabled}
        $isSelected={isSelected}
        $isToday={isCurrentDate}
        key={dayKey}
        onClick={() => {
          if (isDisabled) {
            return false;
          }
          setSelectedDate(fullDate);
          closeDatepicker();
        }}
      >
        {date}
      </DateTableCell>
    );
  };

  return <CalendarRenderer weekRenderer={weekRenderer} />;
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
        <Calendar
          closeDatepicker={closeDatePicker}
          futureDatesDisabled={futureDatesDisabled}
          selectedDate={selectedDate}
          setSelectedDate={handleSelectDate}
        />
      </Dropdown.Content>
    </Dropdown>
  );
};
