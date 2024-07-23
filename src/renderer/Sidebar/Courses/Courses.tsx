import React, { useState } from "react";
import {
  Box,
  List,
  Typography,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import AddCourseModal from "./AddCourseModal";
import useScrollbarStyle from "../../UI/useScrollbarStyle";
import CourseItem from "./CourseItem";
import useCourses from "./useCourses";

type CoursesProps = {
  handleCourseClick: (course: { title: string; id: string }) => void;
};

const Courses = ({ handleCourseClick }: CoursesProps) => {
  const courses = useCourses();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const scrollbarStyle = useScrollbarStyle();

  const addCourse = async (courseTitle: string) => {
    window.api.course.add(courseTitle);
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
      <Typography variant="h6" marginLeft={2} marginTop={2}>
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
          <CourseItem
            key={course.id}
            course={course}
            handleCourseClick={handleCourseClick}
          />
        ))}
      </List>
    </Box>
  );
};

export default Courses;
