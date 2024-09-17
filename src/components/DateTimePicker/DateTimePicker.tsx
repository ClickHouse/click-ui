import { useId, useState } from "react";
import { useCalendar } from "@h6s/calendar";
import Dropdown from "../Dropdown/Dropdown";
import { Icon } from "../Icon/Icon";
import { InputElement, InputWrapper } from "../Input/InputWrapper";
import { Container } from "../Container/Container";

const weekdayFormatter = new Intl.DateTimeFormat(undefined, { weekday: "short" });
const headerDateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  year: "numeric",
});
const selectedDateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  month: "short",
  year: "numeric"
})

const DateTimeInputField = ({ id, selectedDate }) => {
  const defaultId = useId();
  const formattedSelectedDate = selectedDate ? selectedDateFormatter.format(selectedDate) : '';
  return (
    <InputWrapper
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
      fillWidth
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
      <table>
        <thead>
          <tr>
            {headers.weekDays.map(({ key, value: date }) => {
              return <th key={key}>{weekdayFormatter.format(date)}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {body.value.map(({ key: weekKey, value: week }) => {
            console.log("week", week);
            return (
              <tr key={weekKey}>
                {week.map(({ date, key: dayKey, value: fullDate, }) => {
                  if (selectedDate.getTime() === fullDate.getTime()) {
                    console.log('SAME', fullDate);
                  }
                  return <td key={dayKey} onClick={() => {
                    console.log('clicked', fullDate);
                    setSelectedDate(fullDate);
                    closeDatepicker();
                  }}>{date}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};

export const DateTimePicker = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

console.log('selectedDate', selectedDate);
  const closeDatePicker = () => {
    setIsOpen(false);
  }

  return (
    <Dropdown onOpenChange={setIsOpen} open={isOpen}>
      <Dropdown.Trigger>
        <DateTimeInputField selectedDate={selectedDate} />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Calendar closeDatepicker={closeDatePicker} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </Dropdown.Content>
    </Dropdown>
  );
};
