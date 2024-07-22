import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Message from "./Message";
import LoadingBotMessage from "./LoadingBotMessage";
import useMessages from "./useMessages";
import useIsLoadingMessage from "./useIsLoadingMessage";
import usePartialMessage from "./usePartialMessage";
import PartialMessage from "./PartialMessage";

const ChatList = () => {
  const { courseId, chatId } = useParams();
  const messages = useMessages({ courseId, chatId });
  const loading = useIsLoadingMessage({ courseId, chatId });
  const partialMessage = usePartialMessage({ courseId, chatId });

  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <Box width={"80%"} ref={listRef}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {partialMessage ? (
        <PartialMessage message={partialMessage} />
      ) : (
        loading && <LoadingBotMessage />
      )}
    </Box>
  );
};

export default ChatList;
