import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ArrowBack, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type PropsType = {
  handleBackClick: () => void;
  course: {
    title: string;
    id: string;
  };
};

const TopBar = ({ handleBackClick, course }: PropsType) => {
  const navigate = useNavigate();

  const addChat = () => {
    window.api.addChat(course.id).then((chat) => {
      navigate(`/chat/${course.id}/${chat.id}`);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-around",
      }}
    >
      <List>
        <ListItemButton onClick={handleBackClick}>
          <ListItemIcon>
            <ArrowBack />
          </ListItemIcon>
          <ListItemText>Back to all courses</ListItemText>
        </ListItemButton>
      </List>
      <Typography variant="h6" marginLeft={2} marginTop={2}>
        {course.title} Chats
      </Typography>
      <List>
        <ListItemButton onClick={addChat}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={"New Chat"} />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default TopBar;
