import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useParams } from "react-router-dom";
import { Send } from "@mui/icons-material";
import Message from "./Message";
import LoadingBotMessage from "./LoadingBotMessage";
import ChatTopBar from "./ChatTopBar";
import useScrollbarStyle from "../UI/useScrollbarStyle";
import useMessages from "./useMessages";
import useIsLoadingMessage from "./useIsLoadingMessage";

const Chat = () => {
  const { courseId, chatId } = useParams();
  const [question, setQuestion] = useState<string>("");
  const messages = useMessages({ courseId, chatId });
  const loading = useIsLoadingMessage({ courseId, chatId });

  const listRef = useRef(null);

  const scrollbarStyle = useScrollbarStyle();

  useEffect(() => {
    setQuestion("");
  }, [courseId, chatId]);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.api.message.sendMessage(courseId, chatId, question);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "10vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ChatTopBar chatId={chatId} courseId={courseId} />
      </Box>
      <Box
        sx={{
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          width: "100%",
          ...scrollbarStyle,
        }}
      >
        <Box width={"80%"} ref={listRef}>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {loading && <LoadingBotMessage />}
        </Box>
      </Box>
      <Box
        sx={{
          height: "15vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "80%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <OutlinedInput
            disabled={loading}
            fullWidth={true}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton disabled={loading || question === ""} type="submit">
                  <Send />
                </IconButton>
              </InputAdornment>
            }
          />
        </form>
      </Box>
    </Box>
  );
};

export default Chat;
