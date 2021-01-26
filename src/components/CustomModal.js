import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getDate, getDayEvents } from "../lib/utils";
import styled from "styled-components";
import Event from "./Event";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(80, 80, 80, 0.7)",
  },
};

export default function CustomModal({
  closeModal,
  editingDate,
  events,
  modalIsOpen,
  setEvents,
}) {
  const [dayEvents, setDayEvents] = useState();
  const [inputValue, setInputValue] = useState("");
  const formattedDate = `${editingDate.month}/${editingDate.day}/${editingDate.year}`;
  useEffect(() => {
    const eventsToSet = getDayEvents(
      events,
      editingDate.day,
      editingDate.month,
      editingDate.year
    );
    setDayEvents(eventsToSet);
  }, [events]);

  const handleAddEvent = (eventTitle) => {
    if (
      !events.find(
        ({ date, title }) =>
          eventTitle === title && getDate(date, true) === formattedDate
      ) &&
      inputValue
    ) {
      setEvents(
        events.concat({ title: eventTitle, date: new Date(formattedDate) })
      );
      setInputValue("");
    }
  };
  const handleKeyDown = (key) => key === "Enter" && handleAddEvent(inputValue);
  const handleRemoveEvent = (eventTitle) => {
    const filteredEvents = events.filter(({ date, title }) => {
      if (getDate(date, true) === formattedDate) {
        return title !== eventTitle;
      }
    });
    setEvents(filteredEvents);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <Container>
        <CloseButton onClick={closeModal}>✗</CloseButton>
        <Text>{formattedDate}</Text>
        {dayEvents &&
          dayEvents.map((title) => (
            <Event
              key={title}
              forModal
              removeFn={(title) => handleRemoveEvent(title)}
              title={title}
            />
          ))}
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e.key)}
          placeholder="New event"
          value={inputValue}
        />
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  width: 90%;
`;

const Text = styled.h4``;

const CloseButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 32px;
  position: absolute;
  right: 10px;
  top: 10px;
`;
