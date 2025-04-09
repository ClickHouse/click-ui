import { useCallback, useEffect, useState } from "react";
import { isSameDate, UseCalendarOptions } from "@h6s/calendar";
import { styled } from "styled-components";
import Dropdown from "../Dropdown/Dropdown";
import { Body, CalendarRenderer, DateRangePickerInput, DateTableCell } from "./Common";

const DateRangeTableCell = styled(DateTableCell)<{
  $shouldShowRangeIndicator?: boolean;
}>`
  ${({ $shouldShowRangeIndicator, theme }) =>
    $shouldShowRangeIndicator &&
    `
    background: ${theme.click.datePicker.dateOption.color.background.range};
    border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.background.range};
    border-radius: 0;
    `}
`;

interface CalendarProps {
  calendarBody: Body;
  closeDatepicker: () => void;
  futureDatesDisabled: boolean;
  setSelectedDate: (selectedDate: Date) => void;
  startDate?: Date;
  endDate?: Date;
}

const Calendar = ({
  calendarBody,
  closeDatepicker,
  futureDatesDisabled,
  setSelectedDate,
  startDate,
  endDate,
}: CalendarProps) => {
  const [hoveredDate, setHoveredDate] = useState<Date>();

  const calendarOptions: UseCalendarOptions = {};

  // If a start date is selected, open the calendar to that date
  if (startDate) {
    calendarOptions.defaultDate = startDate;
  }

  const handleMouseOut = (): void => {
    setHoveredDate(undefined);
  };

  return calendarBody.value.map(({ key: weekKey, value: week }) => {
    return (
      <tr key={weekKey}>
        {week.map(({ date, isCurrentMonth, key: dayKey, value: fullDate }) => {
          const isSelected =
            (startDate && isSameDate(startDate, fullDate)) ||
            (endDate && isSameDate(endDate, fullDate));

          const today = new Date();

          const isCurrentDate = isSameDate(today, fullDate);
          const isDisabled = futureDatesDisabled ? fullDate > today : false;
          const isBetweenStartAndEndDates = Boolean(
            startDate && endDate && fullDate > startDate && fullDate < endDate
          );

          const shouldShowRangeIndicator =
            !endDate &&
            Boolean(
              startDate && hoveredDate && fullDate > startDate && fullDate < hoveredDate
            );

          const handleMouseEnter = () => {
            console.log("mouseEnter");
            setHoveredDate(fullDate);
          };

          const handleClick = () => {
            if (isDisabled) {
              return false;
            }
            setSelectedDate(fullDate);

            // User has a date range selected and clicked the selected end date.
            // This will cause the end date to be unselected, thus do not close the datepicker.
            if (startDate && endDate && isSameDate(fullDate, endDate)) {
              return;
            }

            // Only close the datepicker if the user hasn't clicked the selected start date.
            if (startDate && !isSameDate(fullDate, startDate)) {
              closeDatepicker();
              return;
            }
          };
          return (
            <DateRangeTableCell
              $shouldShowRangeIndicator={
                shouldShowRangeIndicator || isBetweenStartAndEndDates
              }
              $isCurrentMonth={isCurrentMonth}
              $isDisabled={isDisabled}
              $isSelected={isSelected}
              $isToday={isCurrentDate}
              key={dayKey}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseOut}
            >
              {date}
            </DateRangeTableCell>
          );
        })}
      </tr>
    );
  });
};

export interface DatePickerProps {
  endDate?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  onSelectDateRange: (selectedStartDate: Date, selectedEndDate: Date) => void;
  placeholder?: string;
  startDate?: Date;
}

export const DateRangePicker = ({
  endDate,
  startDate,
  disabled = false,
  futureDatesDisabled = false,
  onSelectDateRange,
  placeholder = "start date - end date",
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();

  useEffect(() => {
    if (startDate) {
      setSelectedStartDate(startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setSelectedEndDate(endDate);
    }
  }, [endDate]);

  const closeDatePicker = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const handleSelectDate = useCallback(
    (selectedDate: Date): void => {
      // Start date and end date are selected, user clicks end date.
      // Reset the end date.
      if (selectedEndDate && isSameDate(selectedEndDate, selectedDate)) {
        setSelectedEndDate(undefined);
        return;
      }

      if (selectedStartDate) {
        if (isSameDate(selectedStartDate, selectedDate)) {
          // Start date and end date are selected, user clicks start date.
          // Set the start date to the old end date, reset end date.
          if (selectedEndDate) {
            setSelectedStartDate(selectedEndDate);
            setSelectedEndDate(undefined);
            return;
          }

          // Start date is selected, user clicks start date.
          // Reset the start date.
          setSelectedStartDate(undefined);
          return;
        }

        // Start date is selected, user clicks an earlier date.
        // Set the earlier date to the new start date.
        if (selectedDate < selectedStartDate) {
          setSelectedStartDate(selectedDate);
          return;
        }

        // Otherwise, set the end date to the date the user clicked.
        setSelectedEndDate(selectedDate);
        onSelectDateRange(selectedStartDate, selectedDate);
        return;
      }

      setSelectedStartDate(selectedDate);
    },
    [onSelectDateRange, selectedEndDate, selectedStartDate]
  );

  return (
    <Dropdown
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <Dropdown.Trigger disabled={disabled}>
        <DateRangePickerInput
          data-testid="datepicker-input-container"
          disabled={disabled}
          isActive={isOpen}
          placeholder={placeholder}
          selectedEndDate={selectedEndDate}
          selectedStartDate={selectedStartDate}
        />
      </Dropdown.Trigger>
      <Dropdown.Content align="start">
        <CalendarRenderer>
          {body => (
            <Calendar
              calendarBody={body}
              closeDatepicker={closeDatePicker}
              futureDatesDisabled={futureDatesDisabled}
              setSelectedDate={handleSelectDate}
              startDate={selectedStartDate}
              endDate={selectedEndDate}
            />
          )}
        </CalendarRenderer>
      </Dropdown.Content>
    </Dropdown>
  );
};
