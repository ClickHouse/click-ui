import { styled } from "styled-components";
import { InputElement, InputStartContent, InputWrapper } from "../Input/InputWrapper";
import { ReactNode, useCallback, useId } from "react";
import { Icon } from "../Icon/Icon";
import { Container } from "../Container/Container";
import { useCalendar, UseCalendarOptions } from "@h6s/calendar";
import { IconButton } from "../IconButton/IconButton";
import { Text } from "../Typography/Text/Text";
import {
  headerDateFormatter,
  selectedDateFormatter,
  selectedDateTimeDateFormatter,
  selectedDateTimeFormatter,
  timeFormatter,
  weekdayFormatter,
} from "./utils";

const explicitWidth = '250px';

const HighlightedInputWrapper = styled(InputWrapper)<{
  $isActive: boolean;
  $width?: string;
}>`
  ${({ $isActive, $width, theme }) => {
    return `border: ${theme.click.datePicker.dateOption.stroke} solid ${
      $isActive
        ? theme.click.datePicker.dateOption.color.stroke.active
        : theme.click.field.color.stroke.default
    };
    width: ${$width ? $width : explicitWidth};
    ${$width && `min-width: ${explicitWidth};`}
    `;
  }}
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
    selectedDate instanceof Date ? selectedDateFormatter.format(selectedDate) : '';

  return (
    <HighlightedInputWrapper
      $isActive={isActive}
      disabled={disabled}
      id={id ?? defaultId}
    >
      <InputStartContent>
        <Icon name="calendar" />
      </InputStartContent>
      <InputElement
        $hasStartContent
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

  let formattedValue = (
    <Text
      color="muted"
      component="span"
    >
      {placeholder ?? ''}
    </Text>
  );
  if (selectedStartDate) {
    if (selectedEndDate) {
      formattedValue = (
        <span>
          {selectedDateFormatter.format(selectedStartDate)} –{" "}
          {selectedDateFormatter.format(selectedEndDate)}
        </span>
      );
    } else {
      formattedValue = (
        <span>
          {selectedDateFormatter.format(selectedStartDate)}{' '}
          <Text
            color="muted"
            component="span"
          >
            – end date
          </Text>
        </span>
      );
    }
  }

  return (
    <HighlightedInputWrapper
      $isActive={isActive}
      disabled={disabled}
      id={id ?? defaultId}
    >
      <InputStartContent>
        <Icon name="calendar" />
      </InputStartContent>
      <InputElement
        $hasStartContent
        as="div"
        data-testid="daterangepicker-input"
      >
        {formattedValue}
      </InputElement>
    </HighlightedInputWrapper>
  );
};

interface DateTimePickerInputProps {
  isActive: boolean;
  disabled: boolean;
  endTimeIsSet: boolean;
  id?: string;
  placeholder?: string;
  selectedEndDate?: Date;
  selectedStartDate?: Date;
  startTimeIsSet: boolean;
}

export const DateTimePickerInput = ({
  isActive,
  disabled,
  endTimeIsSet,
  id,
  placeholder,
  selectedEndDate,
  selectedStartDate,
  startTimeIsSet,
}: DateTimePickerInputProps) => {
  const defaultId = useId();

  let formattedValue = (
    <Text
      color="muted"
      component="span"
    >
      {placeholder ?? ""}
    </Text>
  );
  if (selectedStartDate) {
    if (selectedEndDate) {
      if (endTimeIsSet) {
        formattedValue = (
          <span>
            {selectedDateTimeFormatter
              .format(selectedStartDate)
              .replace("AM", "am")
              .replace("PM", "pm")}{" "}
            –{" "}
            {selectedDateTimeFormatter
              .format(selectedEndDate)
              .replace("AM", "am")
              .replace("PM", "pm")}
          </span>
        );
      } else {
        formattedValue = (
          <span>
            {selectedDateTimeDateFormatter.format(selectedStartDate)},{" "}
            {timeFormatter
              .format(selectedStartDate)
              .replace("AM", "am")
              .replace("PM", "pm")}{" "}
            – {selectedDateTimeDateFormatter.format(selectedEndDate)},{" "}
            <Text
              color="muted"
              component="span"
            >
              00:00
            </Text>
          </span>
        );
      }
    } else {
      if (startTimeIsSet) {
        formattedValue = (
          <span>
            {selectedDateTimeFormatter
              .format(selectedStartDate)
              .replace("AM", "am")
              .replace("PM", "pm")}{" "}
            <Text
              color="muted"
              component="span"
            >
              – end date
            </Text>
          </span>
        );
      } else {
        formattedValue = (
          <span>
            {selectedDateTimeDateFormatter.format(selectedStartDate)},{" "}
            <Text
              color="muted"
              component="span"
            >
              00:00
            </Text>
            <Text
              color="muted"
              component="span"
            >
              {" "}
              – end date
            </Text>
          </span>
        );
      }
    }
  }

  return (
    <HighlightedInputWrapper
      $isActive={isActive}
      disabled={disabled}
      id={id ?? defaultId}
      $width="max-content"
    >
      <InputStartContent>
        <Icon name="calendar" />
      </InputStartContent>
      <InputElement
        $hasStartContent
        as="div"
        data-testid="datetimepicker-input"
      >
        {formattedValue}
      </InputElement>
    </HighlightedInputWrapper>
  );
};

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
  font: ${({ theme }) => theme.typography.styles.product.text.normal.md};
  table-layout: fixed;
  user-select: none;
  width: ${explicitWidth};

  thead tr {
    height: ${({ theme }) => theme.click.datePicker.dateOption.size.height};
  }

  tbody {
    cursor: pointer;
  }

  td,
  th {
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

export type Body = ReturnType<typeof useCalendar>['body'];

interface CalendarRendererProps {
  calendarOptions?: UseCalendarOptions;
  children: (body: Body) => ReactNode;
}

export const CalendarRenderer = ({
  calendarOptions = {},
  children,
  ...props
}: CalendarRendererProps) => {
  const { body, headers, month, navigation, year } = useCalendar({
    defaultWeekStart: 1,
    ...calendarOptions,
  });

  const handleNextClick = useCallback((): void => {
    navigation.toNext();
  }, [navigation]);

  const handlePreviousClick = useCallback((): void => {
    navigation.toPrev();
  }, [navigation]);

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
          data-testid="calendar-previous-month"
          icon="chevron-left"
          onClick={handlePreviousClick}
          size="sm"
          type="ghost"
        />
        <UnselectableTitle>{headerDateFormatter.format(headerDate)}</UnselectableTitle>
        <IconButton
          data-testid="calendar-next-month"
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
        <tbody>{children(body)}</tbody>
      </DateTable>
    </DatePickerContainer>
  );
};
