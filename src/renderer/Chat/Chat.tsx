import React from "react";
import { Box } from "@mui/material";
import ChatTopBar from "./ChatTopBar";
import useScrollbarStyle from "../UI/useScrollbarStyle";
import SubmitButton from "./SubmitButton";
import ChatList from "./ChatList";
import requiresLLM from "../Requirers/RequiresLLM";
import requiresEmbeddings from "../Requirers/RequiresEmbeddings";

const Chat = () => {
  const scrollbarStyle = useScrollbarStyle();

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
        <ChatTopBar />
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
        <ChatList />
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
        <SubmitButton />
      </Box>
    </Box>
  );
};

export default requiresLLM(requiresEmbeddings(Chat));
