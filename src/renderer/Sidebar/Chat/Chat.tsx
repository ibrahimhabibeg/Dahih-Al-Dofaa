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
    <Box display={"flex"} flexDirection={"column"} height={"100vh"}>
      <Box
        height={"25vh"}
        sx={{
          overflowY: "auto",
          ...scrollbarStyle,
        }}
      >
        <TopBar handleBackClick={handleBackClick} course={course} />
      </Box>
      <Box
        height={"65vh"}
        sx={{
          overflowY: "auto",
          ...scrollbarStyle,
        }}
      >
        <ChatList course={course} />
      </Box>
      <Box height={"10vh"}>
        <DocumnetsButton courseId={course.id} />
      </Box>
    </Box>
  );
};

export default Chat;
