import React from "react";
import useChats from "./useChats";
import ChatItem from "./ChatItem";
import { Add } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type PropsType = {
  course: {
    id: string;
    title: string;
  };
};

const ChatList = ({ course }: PropsType) => {
  const chats = useChats(course.id);

  const navigate = useNavigate();

  const addChat = () => {
    window.api.addChat(course.id).then((chat) => {
      navigate(`/chat/${course.id}/${chat.id}`);
    });
  };

  return (
    <List>
      <ListItemButton onClick={addChat}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary={"New Chat"} />
      </ListItemButton>
      {chats.map((chat) => (
        <ChatItem key={chat.id} course={course} chat={chat} />
      ))}
    </List>
  );
};

export default ChatList;
