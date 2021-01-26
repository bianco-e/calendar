import { useEffect, useState } from "react";
import { getDayEvents, getMonthLength, getWeekDay } from "../lib/utils";
import styled from "styled-components";
import Day from "./Day";

export default function Calendar({
  todayDate,
  events,
  month,
  year,
  onClickDate,
}) {
  const [firstWeekDay, setFirstWeekDay] = useState();
  useEffect(() => {
    setFirstWeekDay(getWeekDay(new Date(`${month}/01/${year}`)));
  }, [month]);

  const isToday = (index) => {
    return (
      index == todayDate.day &&
      todayDate.month == month &&
      todayDate.year == year
    );
  };

  return (
    <CalendarContainer>
      {new Array(42).fill("").map((item, index) => {
        const dayNumber = index - firstWeekDay + 1;
        const isDayInCurrentMonth =
          dayNumber > 0 && dayNumber < getMonthLength(month, year);
        return (
          <Day
            dayNumber={dayNumber}
            isDayInCurrentMonth={isDayInCurrentMonth}
            isToday={isToday(dayNumber)}
            key={index}
            month={month}
            onClick={onClickDate}
            todayEvents={getDayEvents(events, dayNumber, month, year)}
            year={year}
          />
        );
      })}
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
