import styled from "styled-components";
import { InputElement, InputWrapper } from "../Input/InputWrapper";
import { ReactNode, useId } from "react";
import { Icon } from "../Icon/Icon";
import { Container, ContainerProps } from "../Container/Container";
import { useCalendar, UseCalendarOptions } from "@h6s/calendar";
import { IconButton } from "../IconButton/IconButton";

const locale = "en-US";
const selectedDateFormatter = new Intl.DateTimeFormat(locale, {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const explicitWidth = "250px";

const HighlightedInputWrapper = styled(InputWrapper)<{ $isActive: boolean }>`
  ${({ $isActive, theme }) => {
    return `border: ${theme.click.datePicker.dateOption.stroke} solid ${
      $isActive
        ? theme.click.datePicker.dateOption.color.stroke.active
        : theme.click.field.color.stroke.default
    };`;
  }}

  width: ${explicitWidth};
}`;

interface DatePickerInputProps {
  isActive: boolean;
  disabled: boolean;
  id?: string;
  placeholder?: string;
  selectedDate?: Date;
}

export const DatePickerInput = ({
  isActive,
  disabled,
  id,
  placeholder,
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
        placeholder={placeholder}
        readOnly
        value={formattedSelectedDate}
      />
    </HighlightedInputWrapper>
  );
};

interface DateRangePickerInputProps {
  isActive: boolean;
  disabled: boolean;
  id?: string;
  placeholder?: string;
  selectedEndDate?: Date;
  selectedStartDate?: Date;
}

export const DateRangePickerInput = ({
  isActive,
  disabled,
  id,
  placeholder,
  selectedEndDate,
  selectedStartDate,
}: DateRangePickerInputProps) => {
  const defaultId = useId();

  let formattedValue = "";
  if (selectedStartDate) {
    formattedValue = selectedDateFormatter.format(selectedStartDate);

    formattedValue = `${formattedValue} - ${
      selectedEndDate ? selectedDateFormatter.format(selectedEndDate) : "end date"
    }`;
  }

  return (
    <HighlightedInputWrapper
      $isActive={isActive}
      disabled={disabled}
      id={id ?? defaultId}
    >
      <Icon name="calendar" />
      <InputElement
        data-testid="datepicker-input"
        placeholder={placeholder}
        readOnly
        value={formattedValue}
      />
    </HighlightedInputWrapper>
  );
};

const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
const headerDateFormatter = new Intl.DateTimeFormat(locale, {
  month: "short",
  year: "numeric",
});

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

export const DateTableCell = styled.td<{
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
      };


    border-radius: ${theme.click.datePicker.dateOption.radii.default};`};
  }
`;

// Taken from h6s/calendar
type Week = {
  value: Date;
} & {
  date: number;
  isCurrentMonth: boolean;
  isCurrentDate: boolean;
  isWeekend: boolean;
} & {
  key: string;
};

export type WeekRenderer = (week: Week) => ReactNode;

interface CalendarRendererProps extends ContainerProps {
  calendarOptions: UseCalendarOptions;
  renderWeek: WeekRenderer;
}

export const CalendarRenderer = ({
  calendarOptions,
  renderWeek,
  ...props
}: CalendarRendererProps) => {
  const { body, headers, month, navigation, year } = useCalendar({
    defaultWeekStart: 1,
    ...calendarOptions,
  });

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
      {...props}
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
            return <tr key={weekKey}>{week.map(renderWeek)}</tr>;
          })}
        </tbody>
      </DateTable>
    </DatePickerContainer>
  );
};
