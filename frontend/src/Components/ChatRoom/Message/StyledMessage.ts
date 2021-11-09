import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

interface MessageProps {
  id: string;
}

export const StyledWrapper = styled.div`
  background: #f8f8f8;
  max-height: 70vh;
  display: grid;
  overflow: scroll;
`;

export const StyledMessageWrapper = styled.div`
  display: grid;
`;

export const StyledMessage = styled.div<MessageProps>`
  background: ${(props) =>
    props.id === "1" ? "var(--dark-green)" : "var(--chat-green)"};
  width: fit-content;
  height: fit-content;
  max-width: 70%;
  padding: 1rem;
  border-radius: 1.5rem;
  justify-self: ${(props) => (props.id === "1" ? "end" : "start")};
  margin: ${(props) => (props.id === "1" ? "0 1rem 0 0" : "0 0 0 1rem")};
  align-self: end;
`;

export const StyledText = styled.p`
  color: white;
  margin: 0;
  padding: 0;
`;

export const StyledDate = styled.p<MessageProps>`
  font-size: 0.7rem;
  color: black;
  font-style: italic;
  width: fit-content;
  justify-self: ${(props) => (props.id === "1" ? "end" : "start")};
  margin: ${(props) => (props.id === "1" ? "0 1.7rem 0 0" : "0 0 0 1.7rem")};
`;

export const StyledAvatar = styled(Avatar)`
  
`;
