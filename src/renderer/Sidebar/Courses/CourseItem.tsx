import React, { useEffect, useState } from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";

type CourseItemProps = {
  course: { title: string; id: string };
  handleCourseClick: (course: { title: string; id: string }) => void;
};

const CourseItem = ({ course, handleCourseClick }: CourseItemProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSelected(location.pathname.includes(course.id));
  }, [location, course.id]);

  return (
    <ListItemButton
      key={course.id}
      onClick={() => handleCourseClick(course)}
      selected={isSelected}
    >
      <ListItemText primary={course.title} />
    </ListItemButton>
  );
};

export default CourseItem;
