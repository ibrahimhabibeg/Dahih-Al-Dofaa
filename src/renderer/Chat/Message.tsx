import React, { useState } from "react";
import { Box, Avatar, useTheme, IconButton } from "@mui/material";
import { ContentCopy, Done, Person } from "@mui/icons-material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";
import Markdown from "react-markdown";
import RefrencedTexts from "./RefrencedTexts";

const Message = ({ message }: { message: Message }) => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        marginBottom: 3,
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Box width={"10%"} marginTop={2}>
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
      <Box width={"80%"}>
        <Markdown>{message.content}</Markdown>
        <RefrencedTexts refrencedTexts={message.refrencedTexts} />
      </Box>
      <Box width={"10%"}>
        <IconButton onClick={copyToClipboard}>
          {copied ? <Done /> : <ContentCopy />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Message;
