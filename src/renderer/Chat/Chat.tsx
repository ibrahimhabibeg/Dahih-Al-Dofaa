import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";
import { Person, Send } from "@mui/icons-material";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { courseId, chatId } = useParams();
  const theme = useTheme();

  useEffect(() => {
    window.api.getMessages(courseId, chatId).then((messages) => {
      setMessages(messages);
    });
    setQuestion("");
    setLoading(false);
  }, [courseId, chatId]);

  const handleSubmit = async () => {
    setLoading(true);
    setMessages((currentMessage) => [
      ...currentMessage,
      { content: question, sender: "human" },
    ]);
    const message = await window.api.chat(courseId, chatId, question);
    setMessages((currentMessage) => [
      ...currentMessage,
      { content: message, sender: "bot" },
    ]);
    setQuestion("");
    setLoading(false);
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
        }}
      >
        <Box width={"80%"}>
          {messages.map((message) => (
            <Box
              sx={{
                marginTop: 3,
                marginBottom: 3,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Box width={"10%"}>
                {message.sender === "human" ? (
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: theme.palette.primary.light,
                    }}
                  >
                    <Person sx={{ fontSize: 20 }} />
                  </Avatar>
                ) : (
                  <img src={Logo} alt="Ollama Logo" width={24} />
                )}
              </Box>
              <Box width={"90%"}>
                <Typography>{message.content}</Typography>
              </Box>
            </Box>
          ))}
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
