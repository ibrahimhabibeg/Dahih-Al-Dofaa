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
    window.api.chatSubscribe(courseId, chatId);
    window.api.chatIsLoadingMessage(courseId, chatId).then((isLoading) => {
      setLoading(isLoading);
    });
    window.api.onChatMessage((receviedMessageChatID, message) => {
      if (receviedMessageChatID === chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
        setLoading(false);
      }
    });
    setQuestion("");

    return () => {
      window.api.chatUnsubscribe(courseId, chatId);
      window.api.unsubscribeChatMessage();
    };
  }, [courseId, chatId]);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.api.chat(courseId, chatId, question);
    setLoading(true);
    setQuestion("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: question, sender: "human" },
    ]);
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
          {loading && <LoadingBotMessage />}
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
