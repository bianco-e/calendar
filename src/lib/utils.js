const MONTHS_DATA = {
  1: { length: 31, name: "January" },
  2: { length: 28, name: "February" },
  3: { length: 31, name: "March" },
  4: { length: 30, name: "April" },
  5: { length: 31, name: "May" },
  6: { length: 30, name: "June" },
  7: { length: 31, name: "July" },
  8: { length: 31, name: "August" },
  9: { length: 30, name: "September" },
  10: { length: 31, name: "October" },
  11: { length: 30, name: "November" },
  12: { length: 31, name: "December" },
};

export const getMonthLength = (month, year) => {
  const length = MONTHS_DATA[month].length;
  if (month != 2) return length;
  const isLeapYear =
    year % 4 === 0 && year % 100 > 0
      ? true
      : year % 4 === 0 && year % 400 === 0;
  return isLeapYear ? 29 : length;
};

export const getMonthName = (month) => MONTHS_DATA[month].name;

export const getWeekDay = (dateObject) => dateObject.getDay();

export const getDate = (dateObject, formatted = false) => {
  const formattedDate = dateObject.toLocaleDateString("en-US");
  if (formatted) return formattedDate;
  const [month, day, year] = formattedDate.split("/");
  return {
    weekDay: getWeekDay(dateObject),
    month: parseInt(month),
    day: parseInt(day),
    year: parseInt(year),
  };
};

export const getDayEvents = (events, currentDay, currentMonth, currentYear) => {
  return events.reduce((acc, current) => {
    const { day, month, year } = getDate(current.date);
    if (day != currentDay || month != currentMonth || year != currentYear)
      return acc;
    return acc.concat([current.title]);
  }, []);
};
