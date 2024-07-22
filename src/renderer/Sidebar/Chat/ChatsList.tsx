import React from "react";
import useChats from "./useChats";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

type PropsType = {
  course: {
    id: string;
    title: string;
  };
};

const ChatList = ({ course }: PropsType) => {
  const chats = useChats(course.id);
  const navigate = useNavigate();

  return (
    <List>
      {chats.map((chat) => (
        <Box key={chat.id}>
          <ListItemButton
            key={chat.id}
            onClick={() => navigate(`/chat/${course.id}/${chat.id}`)}
          >
            <ListItemText>{chat.title}</ListItemText>
          </ListItemButton>
        </Box>
      ))}
    </List>
  );
};

export default ChatList;
