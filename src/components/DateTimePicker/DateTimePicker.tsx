import { useId, useState } from "react";
import { useCalendar } from "@h6s/calendar";
import Dropdown from "../Dropdown/Dropdown";
import { Icon } from "../Icon/Icon";
import { InputElement, InputWrapper } from "../Input/InputWrapper";
import { Container } from "../Container/Container";
import styled from "styled-components";

const locale = 'en-US';
const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
const headerDateFormatter = new Intl.DateTimeFormat(locale, {
  month: "short",
  year: "numeric",
});
const selectedDateFormatter = new Intl.DateTimeFormat(locale, {
  day: "2-digit",
  month: "short",
  year: "numeric"
})

// ${({ theme }) => {
//     return `
//       ${theme.global.color.accent.default}
//     `
//   }}

//border: 1px solid ${({ theme }) => theme.palette.slate}

const DateTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  font: ${({ theme }) => theme.typography.styles.product.text.normal.md }
  table-layout: fixed;
  width: 250px;

  tbody {
    cursor: pointer;
  }

  th {
    width: 14%;
  }

  td {
    text-align: center;
  }

  td, th {
    border: 1px solid transparent;
    padding: ${({ theme }) => {
      console.log(theme.click.table.body.cell.space.md);
      // return theme.click.table.body.cell.space.sm.x;
      return '4px;'
    }}
  }
`;

const DateTableBody = styled.tbody`
  cursor: pointer;
`

const DateTableCell = styled.td<{ $isSelected?: boolean; $isToday?: boolean }>`
  ${({ $isSelected }) => $isSelected && `background: black; color: white;`}
  border-radius: ${({ theme }) => theme.border.radii[1]};

  ${({ $isToday }) => $isToday && 'font-weight: bold;'}

  &:hover {
    border: 1px solid black;
  }
`;

interface DateTimeInputFieldProps {
  disabled: boolean;
  id?: string;
  selectedDate?: Date;
}

const DateTimeInputField = ({ disabled, id, selectedDate }: DateTimeInputFieldProps) => {
  const defaultId = useId();
  const formattedSelectedDate = selectedDate ? selectedDateFormatter.format(selectedDate) : '';
  return (
    <InputWrapper
      disabled={disabled}
      id={id ?? defaultId}
    >
      <Icon name="calendar" />
      <InputElement readOnly value={formattedSelectedDate} />
    </InputWrapper>
  );
};

const Calendar = ({ closeDatepicker, selectedDate, setSelectedDate }) => {
  const { body, headers, month, navigation, view, year } = useCalendar({
    defaultWeekStart: 1,
  });
  console.log(headers, body, view, month, year);

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
        {headerDateFormatter.format(headerDate)}
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
              return <th key={key}>{weekdayFormatter.format(date)}</th>;
            })}
          </tr>
        </thead>
        <DateTableBody>
          {body.value.map(({ key: weekKey, value: week }) => {
            return (
              <tr key={weekKey}>
                {week.map(({ date, isCurrentDate, key: dayKey, value: fullDate }) => {
                  const isSelected = selectedDate?.getTime() === fullDate.getTime();

                  if (isSelected) {
                    console.log('SAME', fullDate);
                  }

                  return <DateTableCell $isSelected={isSelected} $isToday={isCurrentDate} key={dayKey} onClick={() => {
                    setSelectedDate(fullDate);
                    closeDatepicker();
                  }}>{date}</DateTableCell>;
                })}
              </tr>
            );
          })}
        </DateTableBody>
      </DateTable>
    </Container>
  );
};

export const DateTimePicker = ({ disabled = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const closeDatePicker = () => {
    setIsOpen(false);
  }

  return (
    <Dropdown onOpenChange={setIsOpen} open={isOpen}>
      <Dropdown.Trigger disabled={disabled}>
        <DateTimeInputField disabled={disabled} selectedDate={selectedDate} />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Calendar closeDatepicker={closeDatePicker} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </Dropdown.Content>
    </Dropdown>
  );
};
