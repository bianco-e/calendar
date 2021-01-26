import { getMonthName } from "../lib/utils";
import styled from "styled-components";

export default function MonthsSlider({
  month,
  setCurrentMonth,
  year,
  setCurrentYear,
}) {
  const handleClick = (diff) => {
    const nextMonth = month + diff;
    if (nextMonth > 12) {
      setCurrentYear(year + 1);
      return setCurrentMonth(1);
    }
    if (nextMonth < 1) {
      setCurrentYear(year - 1);
      return setCurrentMonth(12);
    }
    return setCurrentMonth(nextMonth);
  };
  return (
    <Container>
      <ArrowButton onClick={() => handleClick(-1)}>{"<"}</ArrowButton>
      {month && (
        <MonthName>
          {getMonthName(month)} {year}
        </MonthName>
      )}
      <ArrowButton onClick={() => handleClick(1)}>{">"}</ArrowButton>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  width: 90%;
`;

const ArrowButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
`;

const MonthName = styled.span`
  font-size: 24px;
  text-align: center;
  width: 60%;
`;
