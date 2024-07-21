import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ChatTopBar = ({
  chatId,
  courseId,
}: {
  chatId: string;
  courseId: string;
}) => {
  const [chatName, setChatName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const handleEdit = () => {
    setIsEditing(true);
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
      {isEditing ? (
        <TextField
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            window.api.renameChat(courseId, chatId, chatName);
          }}
        />
      ) : (
        <Typography variant="h5">{chatName}</Typography>
      )}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <IconButton sx={{ marginRight: 3 }} onClick={handleEdit}>
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