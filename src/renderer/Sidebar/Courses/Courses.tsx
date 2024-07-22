import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  Typography,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import AddCourseModal from "./AddCourseModal";
import useScrollbarStyle from "../../UI/useScrollbarStyle";

type CoursesProps = {
  handleCourseClick: (course: { title: string; id: string }) => void;
};

const Courses = ({ handleCourseClick }: CoursesProps) => {
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const scrollbarStyle = useScrollbarStyle();

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
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        ...scrollbarStyle,
      }}
    >
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
          <Box key={course.id}>
            <Divider />
            <ListItemButton
              key={course.id}
              onClick={() => handleCourseClick(course)}
            >
              <ListItemText primary={course.title} />
            </ListItemButton>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Courses;
