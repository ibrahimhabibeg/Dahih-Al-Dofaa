import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

type PropsType = {
  handleBackClick: () => void;
  course: {
    title: string;
    id: string;
  };
};

const TopBar = ({ handleBackClick, course }: PropsType) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
      <Typography variant="body1" marginLeft={2} marginTop={2}>
        {course.title} Chats
      </Typography>
    </Box>
  );
};

export default TopBar;
