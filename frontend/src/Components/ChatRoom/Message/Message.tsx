import {
  StyledWrapper,
  StyledMessage,
  StyledText,
  StyledMessageWrapper,
  StyledDateOrRead,
  StyledAvatar,
  StyledAvatarWrapper,
  StyledDateAndRead,
  StyledCheckedIcon,
} from "./StyledMessage";
import { useMessage } from "../../../Contexts/MessageContext";
import { useEffect } from "react";
import { useDrawer } from "../../../Contexts/DrawerContext";
import { Message as MessageProps } from "../../../Interfaces/Interfaces";
import { useAuth } from "../../../Contexts/AuthContext";
import { useSocket } from "../../../Contexts/SocketContext";

const msgWrapper = document.getElementsByClassName("msgWrapper");
const scrollToBottom = (node: HTMLCollectionOf<Element>) => {
  node[0].scrollTop = node[0].scrollHeight;
};

const Message = () => {
  const { messages, getAllChatMsg } = useMessage();
  const { chatId } = useDrawer();
  const { whoAmI } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    getAllChatMsg(chatId);
    socket.emit("join", chatId);
    scrollToBottom(msgWrapper);
    return () => {
      socket.emit("leave", chatId);
    };
  }, []);

  useEffect(() => {
    scrollToBottom(msgWrapper);
  }, [messages]);

  const renderMessageContent = (message: MessageProps, index: number) => (
    <StyledMessageWrapper key={message.id}>
      {message.writer.id !== whoAmI.id ? (
        renderAvatarContent(message)
      ) : (
        <StyledMessage sender={message.writer.id === whoAmI.id}>
          <StyledText>{message.message}</StyledText>
        </StyledMessage>
      )}
      {index === messages.length - 1 && message.writer.id === whoAmI.id ? (
        renderDateAndRead(message)
      ) : (
        <StyledDateOrRead sender={message.writer.id === whoAmI.id}>
          2020-10-12
        </StyledDateOrRead>
      )}
    </StyledMessageWrapper>
  );

  const renderAvatarContent = (message: MessageProps) => (
    <StyledAvatarWrapper>
      {message.writer.id !== whoAmI.id && (
        <StyledAvatar>{message.writer.username.charAt(0)}</StyledAvatar>
      )}
      <StyledMessage sender={message.writer.id === whoAmI.id}>
        <StyledText>{message.message}</StyledText>
      </StyledMessage>
    </StyledAvatarWrapper>
  );

  const renderDateAndRead = (message: MessageProps) => (
    <StyledDateAndRead>
      <StyledDateOrRead sender={message.writer.id === whoAmI.id} read={true}>
        2020-10-12
      </StyledDateOrRead>
      <StyledDateOrRead sender={message.writer.id === whoAmI.id}>
        <StyledCheckedIcon />
        Läst
      </StyledDateOrRead>
    </StyledDateAndRead>
  );

  return (
    <StyledWrapper className="msgWrapper">
      {messages &&
        messages.map((message: MessageProps, index: number) =>
          renderMessageContent(message, index)
        )}
    </StyledWrapper>
  );
};

export default Message;
