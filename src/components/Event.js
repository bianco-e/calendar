import styled from "styled-components";

export default function Event({ forModal, removeFn, title }) {
  return (
    <EventContainer forModal={forModal}>
      {forModal && (
        <RemoveButton onClick={() => removeFn(title)}>🗑</RemoveButton>
      )}
      <EventText forModal={forModal}>{title}</EventText>
    </EventContainer>
  );
}

const EventContainer = styled.div`
  align-items: center;
  background: #d51;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  margin-bottom: 2px;
  width: 100%;
  ${({ forModal }) =>
    forModal &&
    `
      margin-bottom: 8px;
      min-height: 20px;
      padding: 5px 20px;
      position: relative;
      width: 82%;
    `}
`;

const EventText = styled.span`
  color: #fff;
  font-size: 11px;
  text-align: center;
  ${({ forModal }) =>
    forModal &&
    `
      font-size: 18px;
    `}
`;

const RemoveButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  position: absolute;
  right: 0;
`;
