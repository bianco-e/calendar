import styled from "styled-components";
import Event from "./Event";

export default function Day({
  dayNumber,
  isDayInCurrentMonth,
  isToday,
  month,
  onClick,
  todayEvents,
  year,
}) {
  return (
    <DayContainer
      isOut={!isDayInCurrentMonth}
      isToday={isToday}
      onClick={() =>
        isDayInCurrentMonth && onClick({ month, day: dayNumber, year })
      }
    >
      {isDayInCurrentMonth && <DayNumber>{dayNumber}</DayNumber>}
      {todayEvents.length > 0 &&
        todayEvents.map((title) => <Event title={title} />)}
    </DayContainer>
  );
}

const DayContainer = styled.div`
  align-items: center;
  background: #2a2a2a;
  border: 1px solid #1a1a1a;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: flex-start;
  overflow-y: auto;
  padding: 1px 0;
  width: 14%;
  ${({ isToday }) => isToday && `background: #5a5a5a;`}
  ${({ isOut }) => isOut && `background: rgba(80, 80, 80, 0.4);`}
`;
const DayNumber = styled.span`
  font-size: 12px;
  margin-bottom: 2px;
`;
