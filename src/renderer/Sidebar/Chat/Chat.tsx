import React from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ArrowBack, Add, Article } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useChats from "./useChats";

type ChatProps = {
  course: {
    id: string;
    title: string;
  };
  handleBackClick: () => void;
};

const Chat = ({ course, handleBackClick }: ChatProps) => {
  const chats = useChats(course.id);
  const navigate = useNavigate();

  const addChat = () => {
    window.api.addChat(course.id).then((chat) => {
      navigate(`/chat/${course.id}/${chat.id}`);
    });
  };

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100vh"}>
      <Box height={"90%"}>
        <List>
          <ListItemButton onClick={handleBackClick}>
            <ListItemIcon>
              <ArrowBack />
            </ListItemIcon>
            <ListItemText>Back to all courses</ListItemText>
          </ListItemButton>
        </List>
        <Typography variant="h6" marginLeft={1} marginTop={2}>
          {course.title} Chats
        </Typography>
        <List>
          <ListItemButton onClick={addChat}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary={"New Chat"} />
          </ListItemButton>
          {chats.map((chat) => (
            <Box key={chat.id}>
              <Divider />
              <ListItemButton
                key={chat.id}
                onClick={() => navigate(`/chat/${course.id}/${chat.id}`)}
              >
                <ListItemText>{chat.title}</ListItemText>
              </ListItemButton>
            </Box>
          ))}
        </List>
      </Box>
      <Box height={"10%"}>
        <Divider />
        <List>
          <ListItemButton onClick={() => navigate(`/documents/${course.id}`)}>
            <ListItemIcon>
              <Article />
            </ListItemIcon>
            <ListItemText primary={"Documents"} />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default Chat;
