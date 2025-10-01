import React, { ReactNode, useCallback, useId } from "react";
import clsx from "clsx";
import {
  InputElement,
  InputStartContent,
  InputWrapper,
} from "@/components/Input/InputWrapper";
import { Icon } from "@/components";
import { Container } from "@/components";
import { useCalendar, UseCalendarOptions } from "@h6s/calendar";
import { IconButton } from "@/components";
import { Text } from "@/components";
import { headerDateFormatter, selectedDateFormatter, weekdayFormatter } from "./utils";
import styles from "./Common.module.scss";

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
    <InputWrapper
      className={clsx(styles.cuiHighlightedInputWrapper, {
        [styles.cuiActive]: isActive,
        [styles.cuiInactive]: !isActive,
      })}
      disabled={disabled}
      id={id ?? defaultId}
    >
      <InputStartContent>
        <Icon name="calendar" />
      </InputStartContent>
      <InputElement
        hasStartContent
        data-testid="datepicker-input"
        placeholder={placeholder}
        readOnly
        value={formattedSelectedDate}
      />
    </InputWrapper>
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
      {placeholder ?? ""}
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
          {selectedDateFormatter.format(selectedStartDate)}{" "}
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
    <InputWrapper
      className={clsx(styles.cuiHighlightedInputWrapper, {
        [styles.cuiActive]: isActive,
        [styles.cuiInactive]: !isActive,
      })}
      disabled={disabled}
      id={id ?? defaultId}
    >
      <InputStartContent>
        <Icon name="calendar" />
      </InputStartContent>
      <div
        className="input-element-wrapper"
        data-testid="daterangepicker-input"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "var(--click-input-space-y) var(--click-input-space-x)",
          minHeight: "var(--click-input-size-height-md)",
          backgroundColor: "var(--click-input-color-background-default)",
          border: "var(--click-input-stroke-border-default)",
          borderRadius: "var(--click-input-radii-all)",
          fontSize: "var(--click-input-typography-text-default)",
        }}
      >
        {formattedValue}
      </div>
    </InputWrapper>
  );
};

interface DateTableCellProps {
  $isCurrentMonth?: boolean;
  $isDisabled?: boolean;
  $isSelected?: boolean;
  $isToday?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const DateTableCell = ({
  $isCurrentMonth,
  $isDisabled,
  $isSelected,
  $isToday,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: DateTableCellProps) => {
  return (
    <td
      className={clsx(styles.cuiDateTableCell, {
        [styles.cuiNotCurrentMonth]: !$isCurrentMonth,
        [styles.cuiDisabled]: $isDisabled,
        [styles.cuiSelected]: $isSelected,
        [styles.cuiToday]: $isToday,
      })}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </td>
  );
};

export type Body = ReturnType<typeof useCalendar>["body"];

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
    <Container
      className={styles.cuiDatePickerContainer}
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
        <h2 className={styles.cuiUnselectableTitle}>
          {headerDateFormatter.format(headerDate)}
        </h2>
        <IconButton
          data-testid="calendar-next-month"
          icon="chevron-right"
          onClick={handleNextClick}
          size="sm"
          type="ghost"
        />
      </Container>
      <table className={styles.cuiDateTable}>
        <thead>
          <tr>
            {headers.weekDays.map(({ key, value: date }) => {
              return (
                <th
                  key={key}
                  className={styles.cuiDateTableHeader}
                >
                  {weekdayFormatter.format(date)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children(body)}</tbody>
      </table>
    </Container>
  );
};
