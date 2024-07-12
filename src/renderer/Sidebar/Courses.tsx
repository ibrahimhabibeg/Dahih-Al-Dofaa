import React from "react";
import {
  Box,
  List,
  ListItem,
  Typography,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const Courses = () => {
  const courses = [
    {
      id: "1",
      title: "Course 1",
    },
    {
      id: "2",
      title: "Course 2",
    },
    {
      id: "3",
      title: "Course 3",
    },
    {
      id: "4",
      title: "Course 4",
    },
  ];

  return (
    <Box marginTop={3}>
      <Typography variant="h6" marginLeft={2}>Courses</Typography>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={"New Course"} />
        </ListItemButton>
        {courses.map((course) => (
          <>
            <Divider />
            <ListItem key={course.id}>
              <ListItemText primary={course.title} />
            </ListItem>
          </>
        ))}
      </List>
    </Box>
  );
};

export default Courses;
