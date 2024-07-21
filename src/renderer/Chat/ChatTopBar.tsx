import React, { useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ChatTopBar = ({
  chatId,
  courseId,
}: {
  chatId: string;
  courseId: string;
}) => {
  const [chatName, setChatName] = React.useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    window.api.getChat(courseId, chatId).then((chat) => {
      setChatName(chat.title);
    });
  }, [chatId, courseId]);

  const handleDelete = () => {
    window.api.removeChat(courseId, chatId);
    navigate(`/main_window`);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
      }}
    >
      <Typography variant="h5">{chatName}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <IconButton sx={{ marginRight: 3 }}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatTopBar;
