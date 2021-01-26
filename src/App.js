import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import MonthsSlider from "./components/MonthsSlider";
import CustomModal from "./components/CustomModal";
import { getDate } from "./lib/utils";
import { useLocation } from "react-router-dom";

const fakeEvents = [
  {
    date: new Date(),
    title: "Trash day!",
  },
  {
    date: new Date(),
    title: "Other stuff",
  },
];

export default function App() {
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingDate, setEditingDate] = useState();
  const [events, setEvents] = useState(fakeEvents);
  const { search } = useLocation();
  const today = new Date();

  useEffect(() => {
    const { month, year } = getDate(
      search ? new Date(search.substring(1)) : new Date()
    );
    setCurrentMonth(month);
    setCurrentYear(year);
  }, []);

  const onClickDate = (selectedDate) => {
    setModalIsOpen(true);
    setEditingDate(selectedDate);
  };

  return (
    <div style={{ width: "700px", height: "400px" }}>
      <MonthsSlider
        month={currentMonth}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
        year={currentYear}
      />
      <Calendar
        todayDate={getDate(today)}
        month={currentMonth}
        year={currentYear}
        events={events}
        onClickDate={onClickDate}
      />
      {modalIsOpen && (
        <CustomModal
          closeModal={() => setModalIsOpen(false)}
          editingDate={editingDate}
          events={events}
          modalIsOpen={modalIsOpen}
          setEvents={setEvents}
        />
      )}
    </div>
  );
}
