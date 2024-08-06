import React from "react";
import { Box } from "@mui/material";
import TopBar from "./TopBar";
import DocumnetsButton from "./DocumentsButton";
import ChatList from "./ChatsList";
import useScrollbarStyle from "../../UI/useScrollbarStyle";

type ChatProps = {
  course: {
    id: string;
    title: string;
  };
  handleBackClick: () => void;
};

const Chat = ({ course, handleBackClick }: ChatProps) => {
  const scrollbarStyle = useScrollbarStyle();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        overflowY: "auto",
        ...scrollbarStyle,
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <TopBar handleBackClick={handleBackClick} course={course} />
        <ChatList course={course} />
      </Box>
      <DocumnetsButton courseId={course.id} />
    </Box>
  );
};

export default Chat;
