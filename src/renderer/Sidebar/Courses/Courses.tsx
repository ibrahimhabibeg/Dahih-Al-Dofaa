import React, { useEffect, useState } from "react";
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
import AddCourseModal from "./AddCourseModal";

const Courses = () => {
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  useEffect(() => {
    window.api.getCourses().then((courses) => {
      setCourses(courses);
    });
  }, []);

  const addCourse = async (courseTitle: string) => {
    const courses = await window.api.addCourse(courseTitle);
    setCourses(courses);
    setIsAddingCourse(false);
  };

  const closeAddCourseModal = () => {
    setIsAddingCourse(false);
  };

  return (
    <Box marginTop={3}>
      <AddCourseModal
        isOpen={isAddingCourse}
        onClose={closeAddCourseModal}
        addCourse={addCourse}
      />
      <Typography variant="h6" marginLeft={2}>
        Courses
      </Typography>
      <List>
        <ListItemButton onClick={() => setIsAddingCourse(true)}>
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
