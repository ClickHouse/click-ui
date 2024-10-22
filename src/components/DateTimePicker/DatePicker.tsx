import { useEffect, useId, useState } from "react";
import { isSameDate, useCalendar, UseCalendarOptions } from "@h6s/calendar";
import Dropdown from "../Dropdown/Dropdown";
import { Icon } from "../Icon/Icon";
import { InputElement, InputWrapper } from "../Input/InputWrapper";
import { Container } from "../Container/Container";
import styled from "styled-components";

const locale = "en-US";
const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
const headerDateFormatter = new Intl.DateTimeFormat(locale, {
  month: "short",
  year: "numeric",
});
const selectedDateFormatter = new Intl.DateTimeFormat(locale, {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const HighlightedInputWrapper = styled(InputWrapper)<{ $isActive: boolean }>`
  ${({ $isActive, theme }) => {
    return `border: ${theme.click.datePicker.dateOption.stroke} solid ${
      $isActive
        ? theme.click.datePicker.dateOption.color.stroke.active
        : theme.click.datePicker.dateOption.color.stroke.default
    };`;
  }}
}`;

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
  width: 250px;

  thead tr {
    height: ${({ theme }) => theme.click.datePicker.dateOption.size.height};
  }

  tbody {
    cursor: pointer;
  }

  td, th {
    ${({ theme }) =>
      `border: ${theme.click.datePicker.dateOption.stroke} solid transparent`};
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
  $isCurrentMonth?: boolean;
  $isSelected?: boolean;
  $isToday?: boolean;
}>`
  ${({ theme }) => `
    border-radius: ${theme.click.datePicker.dateOption.radii.default};
    font: ${theme.click.datePicker.dateOption.typography.label.default};
  `}

  ${({ $isCurrentMonth, theme }) =>
    !$isCurrentMonth &&
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

  ${({ $isToday }) => $isToday && "font-weight: bold;"}

  &:hover {
    ${({ theme }) =>
      `border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.stroke.hover}`};
  }
`;

interface DatePickerInputProps {
  isActive: boolean;
  disabled: boolean;
  id?: string;
  selectedDate?: Date;
}

const DatePickerInput = ({
  isActive,
  disabled,
  id,
  selectedDate,
}: DatePickerInputProps) => {
  const defaultId = useId();
  const formattedSelectedDate =
    selectedDate instanceof Date ? selectedDateFormatter.format(selectedDate) : "";

  return (
    <HighlightedInputWrapper
      $isActive={isActive}
      disabled={disabled}
      id={id ?? defaultId}
    >
      <Icon name="calendar" />
      <InputElement
        data-testid="datepicker-input"
        readOnly
        value={formattedSelectedDate}
      />
    </HighlightedInputWrapper>
  );
};

interface CalendarProps {
  closeDatepicker: () => void;
  selectedDate?: Date;
  setSelectedDate: (selectedDate: Date) => void;
}

const Calendar = ({ closeDatepicker, selectedDate, setSelectedDate }: CalendarProps) => {
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
    <Container
      data-testid="datepicker-calendar-container"
      fillWidth={false}
      orientation="vertical"
      padding="sm"
    >
      <Container
        justifyContent="space-between"
        orientation="horizontal"
      >
        <Icon
          cursor="pointer"
          name="arrow-left"
          onClick={handlePreviousClick}
        />
        <UnselectableTitle>{headerDateFormatter.format(headerDate)}</UnselectableTitle>
        <Icon
          cursor="pointer"
          name="arrow-right"
          onClick={handleNextClick}
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
                  const isSelected = selectedDate
                    ? isSameDate(selectedDate, fullDate)
                    : false;
                  const isCurrentDate = isSameDate(new Date(), fullDate);

                  return (
                    <DateTableCell
                      $isCurrentMonth={isCurrentMonth}
                      $isSelected={isSelected}
                      $isToday={isCurrentDate}
                      key={dayKey}
                      onClick={() => {
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
    </Container>
  );
};

export interface DatePickerProps {
  date?: Date;
  disabled?: boolean;
  onSelectDate: (selectedDate: Date) => void;
}

export const DatePicker = ({ date, disabled = false, onSelectDate }: DatePickerProps) => {
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
          data-testid="datepicker-inpcontainer"
          isActive={isOpen}
          disabled={disabled}
          selectedDate={selectedDate}
        />
      </Dropdown.Trigger>
      <Dropdown.Content align="start">
        <Calendar
          closeDatepicker={closeDatePicker}
          selectedDate={selectedDate}
          setSelectedDate={handleSelectDate}
        />
      </Dropdown.Content>
    </Dropdown>
  );
};
