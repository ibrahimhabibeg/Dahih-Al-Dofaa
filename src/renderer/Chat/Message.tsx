import React from "react";
import { Box, Avatar, useTheme } from "@mui/material";
import { Person } from "@mui/icons-material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";
import Markdown from "react-markdown";

const Message = ({ message }: { message: Message }) => {
  const theme = useTheme();
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
      <Box width={"90%"}>
        <Markdown>{message.content}</Markdown>
      </Box>
    </Box>
  );
};

export default Message;
