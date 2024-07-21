import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useParams } from "react-router-dom";
import { Send } from "@mui/icons-material";
import Message from "./Message";
import LoadingBotMessage from "./LoadingBotMessage";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { courseId, chatId } = useParams();
  const listRef = useRef(null);

  useEffect(() => {
    window.api.getMessages(courseId, chatId).then((messages) => {
      setMessages(messages);
    });
    setQuestion("");
    setLoading(false);
  }, [courseId, chatId]);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  const handleSubmit = () => {
    setLoading(true);

    window.api.chat(courseId, chatId, question).then((response) => {
      setMessages([
        ...messages,
        { content: question, sender: "human" },
        { content: response, sender: "bot" },
      ]);
      setQuestion("");
      setLoading(false);
    });
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
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          width: "100%",
        }}
      >
        <Box width={"80%"} ref={listRef}>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {loading && (
            <>
              <Message message={{ content: question, sender: "human" }} />
              <LoadingBotMessage />
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          height: "20vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "80%",
        }}
      >
        <OutlinedInput
          disabled={loading}
          fullWidth={true}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit} disabled={loading}>
                <Send />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </Box>
  );
};

export default Chat;
