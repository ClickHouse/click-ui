import { useEffect, useState } from "react";
import { isSameDate, useCalendar, UseCalendarOptions } from "@h6s/calendar";
import { styled } from "styled-components";
import Dropdown from "../Dropdown/Dropdown";
import { Container } from "../Container/Container";
import { IconButton } from "../IconButton/IconButton";
import { DatePickerInput } from "./Common";

const locale = "en-US";
const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
const headerDateFormatter = new Intl.DateTimeFormat(locale, {
  month: "short",
  year: "numeric",
});

const explicitWidth = "250px";

const DatePickerContainer = styled(Container)`
  background: ${({ theme }) =>
    theme.click.datePicker.dateOption.color.background.default};
`;

const UnselectableTitle = styled.h2`
  ${({ theme }) => `
    color: ${theme.click.datePicker.color.title.default};
    font: ${theme.click.datePicker.typography.title.default};
  `}

  user-select: none;
`;

const DateTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  font: ${({ theme }) => theme.typography.styles.product.text.normal.md}
  table-layout: fixed;
  user-select: none;
  width: ${explicitWidth};

  thead tr {
    height: ${({ theme }) => theme.click.datePicker.dateOption.size.height};
  }

  tbody {
    cursor: pointer;
  }

  td, th {
    ${({ theme }) =>
      `border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.stroke.default}`};
    padding: 4px;
  }
`;

const DateTableHeader = styled.th`
  ${({ theme }) => `
    color: ${theme.click.datePicker.color.daytitle.default};
    font: ${theme.click.datePicker.typography.daytitle.default};
  `}

  width: 14%;
`;

const DateTableCell = styled.td<{
  $isBetweenStartAndEndDates?: boolean;
  $isCurrentMonth?: boolean;
  $isDisabled?: boolean;
  $isSelected?: boolean;
  $isToday?: boolean;
}>`
  ${({ theme }) => `
    border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.stroke.default};
    border-radius: ${theme.click.datePicker.dateOption.radii.default};
    font: ${theme.click.datePicker.dateOption.typography.label.default};
  `}

  ${({ $isBetweenStartAndEndDates, theme }) =>
    $isBetweenStartAndEndDates &&
    `
    background: ${theme.click.datePicker.dateOption.color.background.range};
    border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.background.range} !important;
    border-radius: 0;
    `}

  ${({ $isCurrentMonth, $isDisabled, theme }) =>
    (!$isCurrentMonth || $isDisabled) &&
    `
    color: ${theme.click.datePicker.dateOption.color.label.disabled};
    font: ${theme.click.datePicker.dateOption.typography.label.disabled};
  `}

  ${({ $isSelected, theme }) =>
    $isSelected &&
    `
      background: ${theme.click.datePicker.dateOption.color.background.active};
      color: ${theme.click.datePicker.dateOption.color.label.active};
    `}


  text-align: center;

  ${({ $isToday, theme }) =>
    $isToday && `font: ${theme.click.datePicker.dateOption.typography.label.active};`}

  &:hover {
    ${({ $isDisabled, theme }) =>
      `border: ${theme.click.datePicker.dateOption.stroke} solid ${
        $isDisabled
          ? theme.click.datePicker.dateOption.color.stroke.disabled
          : theme.click.datePicker.dateOption.color.stroke.hover
      } !important;
      border-radius: ${theme.click.datePicker.dateOption.radii.default} !important;`};
  }
`;

interface CalendarProps {
  closeDatepicker: () => void;
  futureDatesDisabled: boolean;
  selectedDate?: Date;
  setSelectedDate: (selectedDate: Date) => void;
  startDate?: Date;
  endDate?: Date;
}

const Calendar = ({
  closeDatepicker,
  futureDatesDisabled,
  selectedDate,
  setSelectedDate,
  startDate,
  endDate,
}: CalendarProps) => {
  const calendarOptions: UseCalendarOptions = {
    defaultWeekStart: 1,
  };

  if (selectedDate) {
    calendarOptions.defaultDate = selectedDate;
  }
  const { body, headers, month, navigation, year } = useCalendar(calendarOptions);

  const handleNextClick = (): void => {
    navigation.toNext();
  };

  const handlePreviousClick = (): void => {
    navigation.toPrev();
  };

  const headerDate = new Date();
  headerDate.setMonth(month);
  headerDate.setFullYear(year);

  return (
    <DatePickerContainer
      data-testid="datepicker-calendar-container"
      isResponsive={false}
      fillWidth={false}
      orientation="vertical"
      padding="sm"
    >
      <Container
        isResponsive={false}
        justifyContent="space-between"
        orientation="horizontal"
      >
        <IconButton
          icon="chevron-left"
          onClick={handlePreviousClick}
          size="sm"
          type="ghost"
        />
        <UnselectableTitle>{headerDateFormatter.format(headerDate)}</UnselectableTitle>
        <IconButton
          icon="chevron-right"
          onClick={handleNextClick}
          size="sm"
          type="ghost"
        />
      </Container>
      <DateTable>
        <thead>
          <tr>
            {headers.weekDays.map(({ key, value: date }) => {
              return (
                <DateTableHeader key={key}>
                  {weekdayFormatter.format(date)}
                </DateTableHeader>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {body.value.map(({ key: weekKey, value: week }) => {
            return (
              <tr key={weekKey}>
                {week.map(({ date, isCurrentMonth, key: dayKey, value: fullDate }) => {
                  const isSelected =
                    (startDate && isSameDate(startDate, fullDate)) ||
                    (endDate && isSameDate(endDate, fullDate));

                  const today = new Date();

                  const isCurrentDate = isSameDate(today, fullDate);
                  const isDisabled = futureDatesDisabled ? fullDate > today : false;
                  const isBetweenStartAndEndDates =
                    startDate && fullDate > startDate && endDate && fullDate < endDate;

                  if (isBetweenStartAndEndDates) {
                    console.log("between", fullDate);
                  }

                  return (
                    <DateTableCell
                      $isBetweenStartAndEndDates={isBetweenStartAndEndDates}
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
                })}
              </tr>
            );
          })}
        </tbody>
      </DateTable>
    </DatePickerContainer>
  );
};

export interface DatePickerProps {
  date?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  onSelectDate: (selectedDate: Date) => void;
  placeholder?: string;
}

export const DateRangePicker = ({
  date,
  disabled = false,
  futureDatesDisabled = false,
  onSelectDate,
  placeholder,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  const closeDatePicker = () => {
    if (startDate && endDate) {
      setIsOpen(false);
    }
  };

  const handleSelectDate = (selectedDate: Date): void => {
    if (startDate) {
      if (isSameDate(startDate, selectedDate)) {
        console.log("same date!");
      }

      if (selectedDate < startDate) {
        setEndDate(startDate);
      }

      setEndDate(selectedDate);
      setSelectedDate(selectedDate);
      onSelectDate(selectedDate);
      return;
    }

    setStartDate(selectedDate);
  };

  return (
    <Dropdown
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <Dropdown.Trigger disabled={disabled}>
        <DatePickerInput
          data-testid="datepicker-inpcontainer"
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
          setSelectedDate={handleSelectDate}
          startDate={startDate}
          endDate={endDate}
        />
      </Dropdown.Content>
    </Dropdown>
  );
};
