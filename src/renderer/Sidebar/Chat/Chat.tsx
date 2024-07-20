import React, { useEffect } from "react";
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

type ChatProps = {
  course: {
    id: string;
    title: string;
  };
  handleBackClick: () => void;
};

const Chat = ({ course, handleBackClick }: ChatProps) => {
  const [chats, setChats] = React.useState<ChatType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.api.getChats(course.id).then((chats) => {
      setChats(chats);
    });
  }, [course]);

  const addChat = async () => {
    await window.api.addChat(course.id);
    const newChats = await window.api.getChats(course.id);
    setChats(newChats);
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
            <>
              <Divider />
              <ListItemButton key={chat.id}>
                <ListItemText>{chat.title}</ListItemText>
              </ListItemButton>
            </>
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
