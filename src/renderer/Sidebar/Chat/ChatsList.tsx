import React from "react";
import useChats from "./useChats";
import { List } from "@mui/material";
import ChatItem from "./ChatItem";

type PropsType = {
  course: {
    id: string;
    title: string;
  };
};

const ChatList = ({ course }: PropsType) => {
  const chats = useChats(course.id);

  return (
    <List>
      {chats.map((chat) => (
        <ChatItem key={chat.id} course={course} chat={chat} />
      ))}
    </List>
  );
};

export default ChatList;
